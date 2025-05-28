import { createContext, FC, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { QUERIES, WithChildren } from "../../../../_metronic/helpers"
import { CalendarDataContextProps, initialCalendarData } from "./_models"
import { getMasterDatas } from "./_requests"

const CalendarDataContext = createContext<CalendarDataContextProps>(initialCalendarData)

const CalendarDataProvider: FC<WithChildren> = ({children}) => {
    const [serviceCategories, setServiceCategories] = useState(initialCalendarData.serviceCategories)
    const [businessDays, setBusinessDays] = useState(initialCalendarData.businessDays)
    const [users, setUsers] = useState(initialCalendarData.users)
    const [branches, setBranches] = useState(initialCalendarData.branches)
    const [onlineBookingSettings, setOnlineBookingSettings] = useState(initialCalendarData.onlineBookingSettings)
    const [types, setTypes] = useState(initialCalendarData.types)

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
            setServiceCategories(response.serviceCategories)
            setUsers(response.users)
            setBranches(response.branches)
            setOnlineBookingSettings(response.bookingSettings)
            setTypes(response.types)
        }
    }, [response])

    return (
        <CalendarDataContext.Provider 
            value={{
                serviceCategories,
                setServiceCategories,
                businessDays,
                setBusinessDays,
                users,
                setTypes,
                types,
                setUsers,
                onlineBookingSettings,
                refetch,
                branches
            }}
        >
            {children}
        </CalendarDataContext.Provider>
    )
}

const useCalendarData = () => useContext(CalendarDataContext)

export {CalendarDataProvider, useCalendarData}