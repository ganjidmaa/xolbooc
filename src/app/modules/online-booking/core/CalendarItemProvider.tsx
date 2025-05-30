import {createContext, FC, useContext, useEffect, useMemo, useState} from 'react'
import {isNotEmpty, objectHasAttr, WithChildren} from '../../../../_metronic/helpers'
import {CalendarItemContextProps, initialCalendarItem, Item, Step} from './_models'
import {useCalendarData} from './CalendarDataProvider'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../auth'
import {getBranchUsers} from './_requests'
import { NotifyWarning } from '../../../../_metronic/helpers/notify/NotifyWarning'

const CalendarItemContext = createContext<CalendarItemContextProps>(initialCalendarItem)

const CalendarItemProvider: FC<WithChildren> = ({children}) => {
  const navigate = useNavigate()
  const {settings} = useAuth()
  const [itemDatas, setItemDatas] = useState<Item>(initialCalendarItem.itemDatas)
  const [activeTab, setActiveTab] = useState<number>(initialCalendarItem.activeTab)
  const {onlineBookingSettings, setUsers} = useCalendarData()
  const [query, setQuery] = useState<number>(activeTab)
  const updatedQuery = useMemo(() => activeTab, [activeTab])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery, query])

  let bookingStepData = [
    {
      title: 'Салбар',
      breakedTitle: '',
      icon: 'fa-solid fa-map-location-dot',
      path: 'branch',
      errorMessage: 'Салбар сонгоно уу !',
    },
    {
      title: 'Төрөл',
      breakedTitle: '',
      icon: 'fa-solid fa-star',
      path: 'type',
      errorMessage: 'Төрөл сонгоно уу !',
    },
    {
      title: 'Үйлчилгээ',
      breakedTitle: 'Үйлчил гээ',
      icon: 'fa-solid fa-clipboard-list',
      path: 'service',
      errorMessage: 'Үйлчилгээ сонгоно уу !',
    },
    {
      title: 'Гоо сайханч',
      breakedTitle: 'Гоо сайханч',
      icon: 'fa-solid fa-users-gear',
      path: 'user',
      errorMessage: 'Гоо сайханч сонгоно уу !',
    },
    {
      title: 'Цаг сонгох',
      breakedTitle: 'Цаг сонгох',
      icon: 'fa-solid fa-clock',
      path: 'date',
      errorMessage: 'Цаг сонгоно уу !',
    },
    {
      title: 'Үйлчлүүлэгч',
      breakedTitle: 'Үйлчлүү лэгч',
      icon: 'fa-solid fa-user-check',
      path: 'customer',
      errorMessage: 'Өөрийн мэдээллээ оруулна уу !',
    },
    {
      title: 'Шалгах',
      breakedTitle: '',
      icon: 'fa-solid fa-circle-exclamation',
      path: 'note',
      errorMessage: '',
    },
  ]

  const [bookingSteps, setBookingSteps] = useState<Array<Step>>(bookingStepData)

  useEffect(() => {
    let filteredSteps = bookingStepData
    if (onlineBookingSettings.choose_user === false) {
      filteredSteps = filteredSteps.filter((step) => step.path !== 'user')
    }
    if (settings?.has_branch === false) {
      filteredSteps = filteredSteps.filter((step) => step.path !== 'branch')
    }
    if (settings?.has_service_type === false) {
      filteredSteps = filteredSteps.filter((step) => step.path !== 'type')
    }
    setBookingSteps(filteredSteps)
  }, [onlineBookingSettings])

  useEffect(() => {
    const activeTabData =
      bookingSteps && bookingSteps.filter((bookingStep, index) => index + 1 === activeTab)[0]
    activeTabData && navigate(activeTabData.path)
  }, [query])

  const readyNextStep = () => {
    const activeTabData =
      bookingSteps && bookingSteps.filter((bookingStep, index) => index + 1 === activeTab)[0]

    let hasValue = false
    if (activeTabData.path === 'branch') hasValue = objectHasAttr(itemDatas.branch)
    else if (activeTabData.path === 'type') hasValue = objectHasAttr(itemDatas.type)
    else if (activeTabData.path === 'service') hasValue = objectHasAttr(itemDatas.service_ids)
    else if (activeTabData.path === 'date')
      hasValue = isNotEmpty(itemDatas.event_date) && isNotEmpty(itemDatas.start_time)
    else if (activeTabData.path === 'user') {
      hasValue = objectHasAttr(itemDatas.user)
    } else if (activeTabData.path === 'customer') {
      if (
        objectHasAttr(itemDatas.customer) &&
        itemDatas.customer?.lastname &&
        itemDatas.customer.firstname &&
        itemDatas.customer.phone
      ) {
        hasValue = true
      }
    } else if (activeTabData.path === 'note') hasValue = true

    if (!hasValue) {
      const message = activeTabData.errorMessage
      NotifyWarning(message)
    }

    return hasValue
  }

  const fetchUsersApi = async () => {
    const response = await getBranchUsers(itemDatas)
    response && setUsers(response)
    return true
  }
  return (
    <CalendarItemContext.Provider
      value={{
        itemDatas,
        setItemDatas,
        activeTab,
        setActiveTab,
        readyNextStep,
        bookingSteps,
        fetchUsersApi,
      }}
    >
      {children}
    </CalendarItemContext.Provider>
  )
}

const useCalendarItem = () => useContext(CalendarItemContext)

export {CalendarItemProvider, useCalendarItem}
