import { FC } from "react"
import { useCalendarQuery } from "../core/CalendarQueryProvider"
import { Customer, initialCalendarQuery } from "../core/_models"

type Props = {
    customer: Customer
}

export const CustomerItem:FC<Props> = ({customer}) => {
    const {setEventCustomer, updateState} = useCalendarQuery()

    const setSelectedCustomer = () => {
        setEventCustomer(customer)
        updateState(initialCalendarQuery.state)
    }

    return (
        <div className="menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary">
            <div className="menu-item ">
                <div className='d-flex flex-stack py-2 menu-link' onClick={setSelectedCustomer}>
                    <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px symbol-circle'>
                            <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                            {customer.label?.charAt(0)}
                            </span>
                        </div>

                        <div className='ms-5'>
                            <div className='fs-5 fw-bolder text-hover-primary text-gray-800 mb-2'>
                            {customer.lastname?.charAt(0)}. { customer.label} 
                            </div>
                            <div className='fw-bold text-gray-400'>{customer.phone} {customer.phone2}</div>
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                        <span className='text-muted fs-7 mb-1'>{customer.registerno}</span>
                    </div>
                </div>
            </div>

            <div className='separator separator-dashed d-none'></div>
        </div>
    )
}