import { FC, createContext, useState, useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { 
    CRUD_RESPONSES, 
    GroupSoumDistrict, 
    ID, 
    isNotEmpty, 
    Province, 
    QUERIES, 
    WithChildren,
} from "../../../../_metronic/helpers"
import { ErrorAlert } from "../../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../../_metronic/helpers/alerts/Warning"
import { Branch } from "../../branch/core/_models"
import { DetailViewContextProps, initialDetailView, Role, User } from "./_models"
import { getUserById } from "./_requests"

const AccountDetailContext = createContext<DetailViewContextProps<User>>(initialDetailView)

const AccountDetailProvider: FC<WithChildren> = ({children}) => {  
    const [itemIdForDetail, setItemIdForDetail] = useState<ID>()
    const [provinces, setProvinces] = useState<Array<Province>>([])
    const [soumDistricts, setSoumDistricts] = useState<Array<GroupSoumDistrict>>([])
    const [user, setUser] = useState<User>({})
    const [roles, setRoles] = useState<Array<Role>>([])
    const [branches, setBranches] = useState<Array<Branch>>([])

    const enabledQuery: boolean = isNotEmpty(itemIdForDetail)
    const {
        data,
        refetch
    } = useQuery(
        `${QUERIES.USER_DETAIL}-${itemIdForDetail}`,
        () => {
            return getUserById(itemIdForDetail)
        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err: any) => {
                setItemIdForDetail(undefined)
                err.response?.status === 403 ? 
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :    
                    ErrorAlert(CRUD_RESPONSES.error)  
            },
            retryOnMount: false,
            retry: false,
        }
    )

    useEffect(() => {
        if(data && data.data) {
            const response = data.data
            setProvinces(response.provinces)
            setSoumDistricts(response.soumDistricts)
            setUser(response.user)
            setRoles(response.roles)
            setBranches(response.branches)
        }
    }, [data])

    return (
        <AccountDetailContext.Provider
            value={{
                itemIdForDetail,
                setItemIdForDetail,
                response: user,
                soumDistricts,
                provinces,
                roles,
                refetch,
                branches
            }}
        >   
            {children}
        </AccountDetailContext.Provider>
    )
}

const useAccountDetail = () => useContext(AccountDetailContext)

export {AccountDetailProvider, useAccountDetail}