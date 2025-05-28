/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { ID, objectHasAttr } from '../../../../../_metronic/helpers'
import { ServiceCategory } from '../../core/_models'
import { NumericFormat as NumberFormat}from 'react-number-format';
import { useCalendarItem } from '../../core/CalendarItemProvider';

type Props = {
    serviceCategory: ServiceCategory
}

const ServiceItem: React.FC<Props> = ({serviceCategory}) => {
  const {itemDatas, setItemDatas} = useCalendarItem()

  const handleClickService = (checked: boolean, serviceId: ID) => {
    if(checked)
      setItemDatas({...itemDatas, service_ids: [...itemDatas.service_ids, serviceId]})
    else
      setItemDatas({...itemDatas, service_ids: itemDatas.service_ids.filter(itemServiceId => itemServiceId !== serviceId)})
  }

  return (
    <>
    {objectHasAttr(serviceCategory.services) &&
      (<div className='card card-flush mb-4'>
        <div className='card-header'>
          <div className="card-title flex-column">
            <h3 className="fw-bold mb-1">{serviceCategory.name}</h3>
          </div>
        </div>

        <div className='card-body pt-1 pb-5'>
          {serviceCategory.services && serviceCategory.services.filter(service => itemDatas.type?.id !== undefined ? service.type === itemDatas.type?.id : true).map((service, index) => {
              const checkedService = itemDatas.service_ids.includes(service.id)
              return (
                <div key={service.id}>
                  <div className='d-flex align-items-center mb-1 text-gray-900 fs-lg-5 fs-6'>
                      <div className='form-check form-check-custom form-check-solid mx-5'>
                          <input className='form-check-input' type='checkbox' checked={checkedService}
                            onChange={(e) => handleClickService(e.target.checked, service.id)}/>
                      </div>
                      <div className='flex-grow-1'>
                          <span className=''>{service.name}</span>
                          <span className='text-muted fw-semibold d-block'>{service.duration} мин</span>
                      </div>
                      <NumberFormat
                          className="align-self-start pt-1"
                          value={service.price} 
                          displayType={'text'}
                          thousandSeparator={true}
                      />
                      <span className='align-self-start pt-1'>{' ₮'} </span>
                    
                  </div>
                  {index+1 !== serviceCategory.services?.length && <div className="separator separator-dashed my-2"></div>}
                </div>
              )
          })}
        
        </div>
      </div>)
    }
    </>
  )
}

export {ServiceItem}
