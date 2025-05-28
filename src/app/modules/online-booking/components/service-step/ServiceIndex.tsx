import { useCalendarData } from "../../core/CalendarDataProvider"
import { useCalendarItem } from "../../core/CalendarItemProvider"
import { getBranchUsers } from "../../core/_requests"
import { ServiceItem } from "./ServiceItem"

export const ServiceIndex = () => {
    const {serviceCategories, setUsers, onlineBookingSettings} = useCalendarData()
    const {readyNextStep, setActiveTab, activeTab, itemDatas} = useCalendarItem()

    const fetchUsersApi = async () => {
        const getUsersRequest = {branch_id: itemDatas.branch?.id,service_ids: itemDatas.service_ids}
        const response = await getBranchUsers(getUsersRequest)
        response && setUsers(response)
    }

    const handleServiceClick = () => {
        onlineBookingSettings.choose_user && fetchUsersApi()
        readyNextStep() && setActiveTab(activeTab + 1)
    }
    
    return (
        <div className="d-flex flex-column flex-row-fluid gap-5 gap-lg-7">
            
            {serviceCategories.filter(serviceCategory => serviceCategory.services.filter(service => itemDatas.type?.id !== undefined ? service.type === itemDatas.type?.id : true).length > 0).map(serviceCategory => {
                return (
                    <ServiceItem serviceCategory={serviceCategory} key={serviceCategory.id}/>
                )
            })}

            <div className="d-flex justify-content-end mt-0"> 
                <div className="d-flex" onClick={() => handleServiceClick()}>
                    <button className="btn btn-sm btn-primary">
                        <span className='indicator-label'>Үргэлжлүүлэх</span>                            
                    </button>
                </div> 
            </div> 
                
        </div>
    )
}
