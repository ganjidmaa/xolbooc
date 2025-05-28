import { createContext, FC, useContext, useState } from "react"
import { WithChildren } from "../../../../_metronic/helpers"
import { CalendarItemContextProps, initialCalendarItem, Item } from "./_models"
import { useAuth } from "../../auth"

const CalendarItemContext = createContext<CalendarItemContextProps>(initialCalendarItem)

const CalendarItemProvider: FC<WithChildren> = ({children}) => {
    const {settings} = useAuth()
    const [itemDatas, setItemDatas] = useState<Array<Item>>([])
    const [desc, setDesc] = useState<string>('')
    const [initialValue] = useState<Item>({
        start_time: '',
        service_id: undefined,
        resource_id: 0,
        user_id: undefined,
        duration: settings?.default_duration, 
        allow_resources: false,
        price: '0'
    })

    return (
        <CalendarItemContext.Provider 
            value={{
                initialValue,
                itemDatas, 
                setItemDatas,
                desc, 
                setDesc
            }}
        >
            {children}
        </CalendarItemContext.Provider>
    )
}

const useCalendarItem = () => useContext(CalendarItemContext)

export {CalendarItemProvider, useCalendarItem}