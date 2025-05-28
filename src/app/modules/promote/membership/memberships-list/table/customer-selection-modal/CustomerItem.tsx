import { FC } from "react"
import { Customer } from "../../core/_models"

type Props = {
    customer: Customer
    addCustomerItem: (customer_id: string) => void
    removeCustomerItem: (customer_id: string) => void
    checked: boolean
}

export const CustomerItem:FC<Props> = ({customer, addCustomerItem, removeCustomerItem, checked}) => {
    
    return (
        <div className="menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary">
            <div className="menu-item">
                {/* <div className="separator separator-dashed my-1"></div> */}

                <div className='d-flex flex-stack py-2 menu-link'>
                    <div className='d-flex align-items-center'>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                checked={checked}
                                value={customer.id?.toString()}
                                onChange={(val) => {
                                    val.target.checked ? 
                                    addCustomerItem(val.target.value)
                                    :
                                    removeCustomerItem(val.target.value)
                                }}
                            /> 
                        </div>

                        <div className='ms-5'>
                            <div className='fs-5 fw-bolder text-hover-primary text-gray-800 mb-2'>
                            {customer.lastname?.charAt(0)}. { customer.firstname} 
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