import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, PaymentMethod, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getSettingsPublicData, getUserByToken, validateSystemOverdue} from './_requests'
import {QUERIES, WithChildren} from '../../../../_metronic/helpers'
import { NotifyError } from '../../../../_metronic/helpers/notify/NotifyError'
import { useQuery } from 'react-query'
import { Settings } from '../../settings/core/_models'
import { boolean } from 'yup'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
  settings: Settings | undefined
  refetch: () => void
  paymentMethods: Array<PaymentMethod>
  loading: boolean
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  settings: undefined,
  refetch: () => {},
  paymentMethods: [],
  loading: true
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const [settings, setSettings] = useState<Settings | undefined>()
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>([])
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  const {
    data,
    refetch,
  } = useQuery(
      `${QUERIES.SETTINGS_DETAIL}`,
      () => {
          return getSettingsPublicData()
      },
      {
          cacheTime: 0,
          onError: (err) => {
              console.error('getSettings error', err)
          }
      }
  )

  useEffect(() => {
    if(data) {
      setSettings(data.data.settings as Settings)
      setPaymentMethods(data.data.payment_methods as Array<PaymentMethod>)
      setLoading(false)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, settings, refetch, paymentMethods, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          await validateSystemOverdue()

          const {data} = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error: any) {
        console.error(error)
        const status = error.response?.status
        if (!didRequest.current) {
          status && status === 422 && NotifyError(error.response?.data.message, 12000) 
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
