import { FC, createContext, useState, useContext } from "react"
import { 
    ID,
    WithChildren,
} from "../../../../_metronic/helpers"
import { TimeOffContextProps } from "./_models"

const TimeOffContext = createContext<TimeOffContextProps>({timeOffIdForUpdate: undefined, setTimeOffIdForUpdate: () => {}})

const TimeOffProvider: FC<WithChildren> = ({children}) => {  
    const [timeOffIdForUpdate, setTimeOffIdForUpdate] = useState<ID>()

    return (
        <TimeOffContext.Provider
            value={{
                timeOffIdForUpdate,
                setTimeOffIdForUpdate,
            }}
        >   
            {children}
        </TimeOffContext.Provider>
    )
}

const useTimeOffData = () => useContext(TimeOffContext)

export {TimeOffProvider, useTimeOffData}