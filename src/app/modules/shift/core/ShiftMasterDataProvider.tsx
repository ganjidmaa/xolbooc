import { FC, createContext, useState, useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { 
    QUERIES, 
    WithChildren,
} from "../../../../_metronic/helpers"
import { CalendarDataContextProps, initialCalendarData } from "./_models"
import { getMasterDatas } from "./_requests"

const ShiftDetailContext = createContext<CalendarDataContextProps>(initialCalendarData)

const ShiftMasterDataProvider: FC<WithChildren> = ({children}) => {  
    const [users, setUsers] = useState(initialCalendarData.users)
    const [branches, setBranches] = useState(initialCalendarData.branches)

    const {
        refetch,
        data: response,
    } = useQuery(`${QUERIES.SHIFT_LIST}-datas`,
        () => {
            return getMasterDatas()
        },
        {cacheTime: 0}
    )

    useEffect(() => {
        if (response) {
            setUsers(response.users)
            setBranches(response.branches)
        }
    }, [response])

    return (
        <ShiftDetailContext.Provider
            value={{
                users,
                refetch,
                branches
            }}
        >   
            {children}
        </ShiftDetailContext.Provider>
    )
}

const useCalendarData = () => useContext(ShiftDetailContext)

export {ShiftMasterDataProvider, useCalendarData}