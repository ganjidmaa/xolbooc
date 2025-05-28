/* eslint-disable react-hooks/exhaustive-deps */
import {NumericFormat as NumberFormat} from 'react-number-format'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {KTSVG, objectHasAttr} from '../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useAuth} from '../../auth'
import {ItemDetailOnlineBooking} from './service-step/ItemDetail'
import {useCalendarData} from '../core/CalendarDataProvider'
import {Service} from '../core/_models'

const BookingAside = () => {
  const {settings} = useAuth()
  const {serviceCategories, onlineBookingSettings} = useCalendarData()
  const {itemDatas, setItemDatas} = useCalendarItem()
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [desc, setDesc] = useState('')
  const [userName, setUserName] = useState('')
  const [branchName, setBranchName] = useState('')
  const [TypeName, setTypeName] = useState('')
  const [services, setServices] = useState<Array<Service>>([])
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  useEffect(() => {
    let serviceArr: Array<Service> = []
    serviceCategories.map((serviceCategory) => {
      if (objectHasAttr(serviceCategory.services)) {
        serviceArr.push(...serviceCategory.services)
      }
    })
    serviceArr = serviceArr.filter((service) => itemDatas.service_ids.includes(service.id))

    setServices(serviceArr)
  }, [itemDatas.service_ids, serviceCategories])

  useEffect(() => {
    if (itemDatas.event_date) setEventDate(itemDatas.event_date)

    if (itemDatas.type) setTypeName(itemDatas.type.name as string)

    if (itemDatas.start_time) setEventTime(itemDatas.start_time)

    if (itemDatas.customer?.desc) setDesc(itemDatas.customer?.desc)

    if (itemDatas.customer?.firstname) {
      const lastname = itemDatas.customer?.lastname ? itemDatas.customer?.lastname[0] : ''
      setCustomerName(lastname + '.' + itemDatas.customer?.firstname)
    }

    if (itemDatas.user) {
      const lastname = itemDatas.user?.lastname ? itemDatas.user?.lastname[0] + '.' : ''
      setUserName(lastname + itemDatas.user?.firstname)
    }

    itemDatas.branch && setBranchName(itemDatas.branch.name)
  }, [itemDatas])

  useEffect(() => {
    let durationSum = 0
    let paymentSum = 0
    services &&
      services.map((service) => {
        durationSum += parseInt(service?.duration || '0')
        paymentSum += parseInt(service?.price || '0')
      })

    setTotalDuration(durationSum)
    setTotalPayment(paymentSum)
    setItemDatas({...itemDatas, total_duration: durationSum})
  }, [services])

  return (
    <div className='flex-column flex-lg-row-auto gap-7 gap-lg-10 w-lg-350px w-xl-400px mb-7 me-lg-5'>
      <div className='card pb-4'>
        <div className='card-header'>
          <div className='card-title d-flex justify-content-between w-100 me-0'>
            <div className='d-flex align-items-center'>
              {<span className='fw-bolder'>{settings?.company_name}</span>}
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          {settings?.has_branch && (
            <div className='d-flex align-items-center mb-3'>
              <KTSVG
                path='/media/icons/duotune/abstract/abs048.svg'
                className='svg-icon-1 svg-icon-success me-3 lh-0'
              />

              {branchName && <span className='fw-bolder text-gray-700'>{branchName}</span>}
            </div>
          )}

          {settings?.has_service_type && (
            <div className='d-flex align-items-center mb-3'>
              <KTSVG
                path='/media/icons/duotune/general/gen003.svg'
                className='svg-icon-1 svg-icon-success me-3 lh-0'
              />

              {branchName && <span className='fw-bolder text-gray-700'>{TypeName}</span>}
            </div>
          )}

          {onlineBookingSettings.choose_user && (
            <div className='d-flex align-items-center mb-3'>
              <KTSVG
                path='/media/icons/duotune/communication/com006.svg'
                className='svg-icon-1 svg-icon-success me-3 lh-0'
              />

              {userName && <span className='fw-bolder text-gray-700'>{userName}</span>}
            </div>
          )}

          <div className='d-flex align-items-center mb-3'>
            <KTSVG
              path='/media/icons/duotune/general/gen014.svg'
              className='svg-icon-1 svg-icon-success me-3 lh-0'
            />

            {eventDate && <span className='fw-bolder text-gray-700'>{eventDate}</span>}
          </div>

          <div className='d-flex align-items-center mb-3'>
            <KTSVG
              path='/media/icons/duotune/general/gen013.svg'
              className='svg-icon-1 svg-icon-success me-3 lh-0'
            />

            {eventTime && <span className='fw-bolder text-gray-700'>{eventTime}</span>}
          </div>

          <div className='d-flex align-items-center mb-3'>
            <KTSVG
              path='/media/icons/duotune/general/gen026.svg'
              className='svg-icon-1 svg-icon-success me-3 lh-0'
            />

            {customerName && <span className='fw-bolder text-gray-700'>{customerName}</span>}
          </div>

          <div className='separator mb-5 border-dark'></div>

          {services.map((service, index) => {
            return <ItemDetailOnlineBooking key={index} item={service} />
          })}

          <div className='separator separator-dashed my-3'></div>

          <div className='d-flex mb-10 text-gray-700 fs-6 fw-bold'>
            <div className='flex-grow-1'>
              {Math.floor(totalDuration / 60) > 0 && Math.floor(totalDuration / 60) + 'цаг '}
              {totalDuration % 60 > 0 && (totalDuration % 60) + 'мин'}
            </div>

            <NumberFormat
              className='align-self-start pt-1'
              value={totalPayment}
              displayType={'text'}
              thousandSeparator={true}
            />
            <span className='align-self-start pt-1'>{' ₮'} </span>
          </div>

          {desc && (
            <div className='pt-3 notice d-flex bg-light-dark rounded border-dark border border-dashed p-6'>
              <div className='d-flex flex-stack flex-grow-1 fs-6 text-gray-700'>
                <div className='fw-bold'>
                  <div className='text-gray-800 fw-bolder mb-2'>Нэмэлт мэдээлэл</div>
                  <div> {desc} </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export {BookingAside}
