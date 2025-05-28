
import { useEffect } from "react"
import { ROLES } from "../../../../_metronic/helpers"
import { useAuth } from "../../auth"
import { useCalendarView } from "../core/CalendarViewProvider"
import { FullCalendarTab } from "./FullCalendarTab"
import { FullCalendarView } from "./FullCalendarView"

export const FullCalendarCard = () => {
    const {settings, currentUser} = useAuth()
    const {activeTab,setActiveTab} = useCalendarView()
    const userRole: string = currentUser?.role || ''
    const {USER} = ROLES;
    let userBranchCount = 0
    if(currentUser?.branch_id) userBranchCount = currentUser?.branch_id?.length;

    useEffect(() => {
        if(activeTab === 0 && settings?.has_branch) {
            setActiveTab(parseInt(currentUser?.branch_id as string))
        }
        else if(!settings?.has_branch) {
            setActiveTab(1)
        }
    }, [])

    return (
        <div className="mt-lg-n9">
            {settings?.has_branch && 
                (userRole !== USER ? <FullCalendarTab branches=''/> :
                    ( userBranchCount > 2 ? <FullCalendarTab branches={currentUser?.branch_id} /> : '')
                ) 
            }
            <FullCalendarView />
        </div>
    )
}