import { FC, createContext, useState, useContext } from "react"
import { 
    WithChildren,
} from "../../../../_metronic/helpers"
import { ScheduleContextProps, initialScheduleData } from "./_models"

const ShiftDataContext = createContext<ScheduleContextProps>(initialScheduleData)

const ScheduleProvider: FC<WithChildren> = ({children}) => {  
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <ShiftDataContext.Provider
            value={{
                endDate,
                setEndDate,
                startDate,
                setStartDate
            }}
        >   
            {children}
        </ShiftDataContext.Provider>
    )
}

const useCalendarData = () => useContext(ShiftDataContext)

export {ScheduleProvider, useCalendarData}