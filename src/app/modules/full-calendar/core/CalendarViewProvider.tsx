import { createContext, FC, useContext, useState } from "react"
import { CalendarViewContextProps, initialCalendarView } from "./_models"
import { ID, WithChildren } from "../../../../_metronic/helpers"

const CalendarViewContext = createContext<CalendarViewContextProps>(initialCalendarView)

const CalendarViewProvider: FC<WithChildren> = ({children}) => {
    const [eventIdForUpdate, setEventIdForUpdate] = useState(initialCalendarView.eventIdForUpdate)
    const [eventStartDate, setEventStartDate] = useState(initialCalendarView.eventStartDate)
    const [eventUserId, setEventUserId] = useState(initialCalendarView.eventUserId)
    const [activeTab, setActiveTab] = useState<ID>(0)
    
    return (
        <CalendarViewContext.Provider 
            value={{
                eventIdForUpdate,
                setEventIdForUpdate,
                eventStartDate,
                setEventStartDate,
                eventUserId,
                setEventUserId,
                activeTab,
                setActiveTab,
            }}
        >
            {children}
        </CalendarViewContext.Provider>
    )
}

const useCalendarView = () => useContext(CalendarViewContext)

export {CalendarViewProvider, useCalendarView}