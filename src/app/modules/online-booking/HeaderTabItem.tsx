import clsx from "clsx"
import { FC } from "react"
import { useCalendarItem } from "./core/CalendarItemProvider"

type Props = {
    itemData: any
}

const HeaderTabItem:FC<Props> = ({itemData}) => {
    const {activeTab, setActiveTab, readyNextStep, fetchUsersApi} = useCalendarItem()

    return (
        <div className={clsx('btn btn-icon flex-column btn-text-gray-500 btn-active-text-gray-700 rounded-3 h-50px w-50px h-md-65px w-md-65px h-lg-90px w-lg-90px fw-semibold', 
            {'active bg-light border border-2': activeTab === itemData.tabId})}
            onClick={() => {
                if(activeTab > itemData.tabId) 
                    setActiveTab(itemData.tabId)
                else {
                    if(readyNextStep()) {
                        setActiveTab(itemData.tabId)
                        fetchUsersApi()
                    }
                }
            }}
        >
            <i className={clsx("text-primary fs-1 mb-2 ", itemData.icon)} ></i>
            <span className="fs-8 fs-lg-7 fw-bold d-none d-md-block">{itemData.title}</span>
            <span className="fs-8 fs-lg-7 fw-bold d-md-none">{itemData.breakedTitle}</span>
        </div>
    )
}

export default HeaderTabItem