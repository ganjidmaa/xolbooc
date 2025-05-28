import { FC, useEffect, useState } from "react"
import { ID } from "../../../../../../../_metronic/helpers"
import { SelectedService, Service, ServiceCategory } from "../../core/_models"

type Props = {
    serviceCategory: ServiceCategory
    services: Array<Service>
    serviceItemProp: SelectedService | undefined
    allServiceChecked: boolean
    removeServiceGroupItem: (category_id: string) => void
    addServiceGroupItem: (category_id: string) => void
    addServiceItem: (category_id: ID, service_id: string) => void
    removeServiceItem: (category_id: ID, service_id: string) => void
}

export const ServiceItem:FC<Props> = ({serviceCategory, services, removeServiceGroupItem, addServiceGroupItem, serviceItemProp, addServiceItem, removeServiceItem}) => {
    const [serviceItemData, setServiceItemData] = useState(serviceItemProp)

    useEffect(() => {
        setServiceItemData(serviceItemProp)
    }, [serviceItemProp])

    return (
        <div className="menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary">
            <div className="menu-item">
                <div className="separator separator-dashed my-1"></div>
                <div className='d-flex flex-stack py-2 menu-link'>
                    <div className='d-flex align-items-center'>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                checked={serviceItemData?.group_selection || false}
                                value={serviceCategory.id?.toString()}
                                onChange={(val) => {
                                    val.target.checked ? 
                                    addServiceGroupItem(val.target.value)
                                    :
                                    removeServiceGroupItem(val.target.value)
                                }}
                            /> 
                        </div>
                        <div className='ms-5'>
                            <div className='fs-5 fw-bolder text-gray-800'>
                                {serviceCategory.name}
                            </div>
                        </div>
                    </div>
                </div>
                {services && services.map(service => {
                    return (
                    <div className='d-flex flex-stack py-2 ms-11 menu-link' key={service.id}>
                        <div className='d-flex align-items-center'>

                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    checked={serviceItemData?.service_ids?.find((service_id) => service_id === service.id) ? true : false}
                                    value={service.id?.toString()}
                                    onChange={(val) => {
                                        val.target.checked ? 
                                        addServiceItem(serviceCategory.id, val.target.value)
                                        :
                                        removeServiceItem(serviceCategory.id, val.target.value)
                                        }
                                    }
                                /> 
                            </div>
                            <div className='ms-5'>
                                <div className='fs-5 fw-bold text-hover-primary text-gray-800 mb-2'>
                                    {service.name}
                                </div>
                                <div className='fw-bold text-gray-400'>{service.duration} </div>
                            </div>
                        </div>

                        <div className='d-flex flex-column align-items-end ms-2'>
                            <span className='fw-bold text-muted fs-7 mb-1'>{ service.price} ₮</span>
                        </div>
                    </div>
                    )
                })
                }
                    
            </div>

            <div className='separator separator-dashed d-none'></div>
        </div>
    )
}