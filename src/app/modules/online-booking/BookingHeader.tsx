import { Link, useNavigate } from "react-router-dom"
import { KTSVG } from "../../../_metronic/helpers"
import { useCalendarItem } from "./core/CalendarItemProvider"
import { initialCalendarItem } from "./core/_models"
import HeaderTabItem from "./HeaderTabItem"

const BookingHeader = () => {
    const navigate = useNavigate()
    const {setActiveTab, setItemDatas, bookingSteps } = useCalendarItem()
    
    const cancel = () => { 
        navigate(-1)
    }
    
    return (
        <div className="bg-body d-flex flex-column-auto justify-content-center align-items-start gap-2 gap-sm-4 gap-lg-6 py-4 px-5 px-md-10 overflow-auto w-100">
            <Link to="#" onClick={() => cancel()} className="flex-grow-1 mt-2">
                <KTSVG
                    path='/media/icons/duotune/arrows/arr063.svg'
                    className='svg-icon svg-icon-gray-400 ms-4 mb-1 svg-icon-2x'
                />
            </Link>
            {bookingSteps.map((bookingStep, index) => {
                return (
                    <HeaderTabItem itemData={{...bookingStep, tabId: index+1}} key={index+1} />
                )
            })}
            <Link to="/booking/index" 
                onClick={() => {
                    setItemDatas(initialCalendarItem.itemDatas)
                    setActiveTab(initialCalendarItem.activeTab)
                }}
                className="flex-grow-1 text-end mt-2">
                <KTSVG
                    path='/media/icons/duotune/general/gen034.svg'
                    className='svg-icon svg-icon-gray-400 svg-icon-2x'
                />
            </Link>
        </div>

    )
}

export default BookingHeader