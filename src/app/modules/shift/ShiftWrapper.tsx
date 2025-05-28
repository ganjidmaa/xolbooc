import { Outlet } from "react-router-dom"
import { ShiftMasterDataProvider } from "./core/ShiftMasterDataProvider"
import { TimeOffProvider } from "./core/TimeOffProvider"
import { ScheduleProvider } from "./core/ScheduleProvider"


const ShiftWrapper = () => {
    return (
        <ShiftMasterDataProvider>
            <TimeOffProvider>
                <ScheduleProvider>
                    <Outlet />
                </ScheduleProvider>
            </TimeOffProvider>
        </ShiftMasterDataProvider>
    )
}


export {ShiftWrapper}