/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {ID, objectHasAttr} from '../../../../../_metronic/helpers'
import {ServiceCategory} from '../../core/_models'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {useCalendarItem} from '../../core/CalendarItemProvider'

type Props = {
  serviceCategory: ServiceCategory
}

const ServiceItem: React.FC<Props> = ({serviceCategory}) => {
  const {itemDatas, setItemDatas} = useCalendarItem()

  const handleClickService = (checked: boolean, serviceId: ID) => {
    if (checked) setItemDatas({...itemDatas, service_ids: [...itemDatas.service_ids, serviceId]})
    else
      setItemDatas({
        ...itemDatas,
        service_ids: itemDatas.service_ids.filter((itemServiceId) => itemServiceId !== serviceId),
      })
  }

  return (
    <div className='mb-14'>
      {objectHasAttr(serviceCategory.services) && (
        <div className='card card-flush mb-4'>
          <div className='card-header'>
            <div className='card-title flex-column'>
              <h3 className='fw-bold mb-1'>{serviceCategory.name}</h3>
            </div>
          </div>

          <div className='card-body pt-1 pb-5'>
            {serviceCategory.services &&
              serviceCategory.services
                .filter((service) =>
                  itemDatas.type?.id !== undefined ? service.type === itemDatas.type?.id : true
                )
                .map((service, index) => {
                  const checkedService = itemDatas.service_ids.includes(service.id)
                  return (
                    <div key={service.id}>
                      <label
                        htmlFor={`online-booking-service-checkbox-${service.id}`}
                        className='cursor-pointer d-block'
                      >
                        <div className='d-flex align-items-center mb-1 text-gray-900 fs-lg-5 fs-6'>
                          <div className='mx-5'>
                            <input
                              id={`online-booking-service-checkbox-${service.id}`}
                              type='checkbox'
                              checked={checkedService}
                              style={{
                                accentColor: '#333',
                                width: '1.5rem',
                                height: '1.5rem',
                              }}
                              onChange={(e) => handleClickService(e.target.checked, service.id)}
                            />
                          </div>
                          <div className='flex-grow-1'>
                            <span className=''>{service.name}</span>
                            <span className='text-muted fw-semibold d-block'>
                              {service.duration} мин
                            </span>
                          </div>
                          <NumberFormat
                            className='align-self-start pt-1'
                            value={service.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          <span className='align-self-start pt-1'>{' ₮'} </span>
                        </div>
                      </label>
                      {index + 1 !== serviceCategory.services?.length && (
                        <div className='separator separator-dashed my-2'></div>
                      )}
                    </div>
                  )
                })}
          </div>
        </div>
      )}
    </div>
  )
}

export {ServiceItem}
