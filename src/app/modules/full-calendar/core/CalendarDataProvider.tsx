import { createContext, FC, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { 
    QUERIES,
    WithChildren,
} from "../../../../_metronic/helpers"
import { CalendarDataContextProps, initialCalendarData } from "./_models"
import { getMasterDatas } from "./_requests"

const CalendarDataContext = createContext<CalendarDataContextProps>(initialCalendarData)

const CalendarDataProvider: FC<WithChildren> = ({children}) => {
    const [services, setServices] = useState(initialCalendarData.services)
    const [serviceTypes, setServiceTypes] = useState(initialCalendarData.services)
    const [resources, setResources] = useState(initialCalendarData.resources)
    const [users, setUsers] = useState(initialCalendarData.users)
    const [branches, setBranches] = useState(initialCalendarData.branches)
    const [bankAccounts, setBankAccounts] = useState(initialCalendarData.bankAccounts)

    const {
        refetch,
        data: response,
    } = useQuery(`${QUERIES.CALENDAR_MASTER_DATA}-datas`,
        () => {
            return getMasterDatas()
        },
        {cacheTime: 0}
    )

    useEffect(() => {
        if (response) {
            setServices(response.services)
            setServiceTypes(response.serviceTypes)
            setResources(response.resources)
            setUsers(response.users)
            setBranches(response.branches)
            setBankAccounts(response.bankAccounts)
        }
    }, [response])

    return (
        <CalendarDataContext.Provider 
            value={{
                services,
                serviceTypes,
                resources,
                users,
                branches,
                bankAccounts,
                refetch
            }}
        >
            {children}
        </CalendarDataContext.Provider>
    )
}

const useCalendarData = () => useContext(CalendarDataContext)

export {CalendarDataProvider, useCalendarData}