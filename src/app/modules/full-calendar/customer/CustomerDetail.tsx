import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {Link, useNavigate} from 'react-router-dom'
import {
  AppointmentStatus,
  AppointmentTreatmentStatus,
  AppointmentStatusLabel,
  AppointmentTreatmentStatusLabel,
  CRUD_RESPONSES,
  KTSVG,
} from '../../../../_metronic/helpers'
import {StatusSelection} from '../components/StatusSelection'
import {TreatmentStatusSelection} from '../components/TreatmentStatusSelection'
import {useCalendarQuery} from '../core/CalendarQueryProvider'
import {useCalendarView} from '../core/CalendarViewProvider'
import {useCalendarData} from '../core/CalendarDataProvider'
import {updateStatus, updateTreatmentStatus} from '../core/_requests'
import {NotifySuccess} from '../../../../_metronic/helpers/notify/NotifySuccess'
import {NotifyError} from '../../../../_metronic/helpers/notify/NotifyError'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../_metronic/helpers/alerts/Error'

type Props = {
  currentStatus?: string
  currentTreatmentStatus?: string
  startDateTime?: string
  viewType?: string
}

const CustomerDetail: React.FC<Props> = ({
  currentStatus,
  currentTreatmentStatus,
  startDateTime = '',
  viewType = 'edit',
}) => {
  const navigate = useNavigate()
  const {refetch} = useCalendarData()
  const {eventCustomer: customer} = useCalendarQuery()
  const {eventIdForUpdate} = useCalendarView()
  const [status, setStatus] = useState(currentStatus || '')
  const [treatmentStatus, setTreatmentStatus] = useState(currentTreatmentStatus + '' || '')
  const [statusName] = useState(AppointmentStatus)
  const [treatmentStatusName] = useState(AppointmentTreatmentStatus)
  const [statusClass] = useState(AppointmentStatusLabel)
  const [treatmentStatusClass] = useState(AppointmentTreatmentStatusLabel)

  useEffect(() => {
    currentStatus && setStatus(currentStatus)
  }, [currentStatus])

  useEffect(() => {
    currentTreatmentStatus && setTreatmentStatus(currentTreatmentStatus)
  }, [currentTreatmentStatus])

  const changeStatus = async (value: string) => {
    try {
      setStatus(value)
      const response = await updateStatus(eventIdForUpdate, {status: value})
      const status = response.payload?.status

      status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      status && status === 201 && NotifyError(CRUD_RESPONSES.warning)
    } catch (ex: any) {
      console.error(ex)

      ex.response?.status === 403
        ? WarningAlert(CRUD_RESPONSES.failed_authorization)
        : ErrorAlert(CRUD_RESPONSES.error)
    } finally {
      refetch()
    }
  }

  const changeTreatmentStatus = async (value: string) => {
    try {
      setTreatmentStatus(value)
      const response = await updateTreatmentStatus(eventIdForUpdate, {status: value})
      const status = response.payload?.status

      status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      status && status === 201 && NotifyError(CRUD_RESPONSES.warning)
    } catch (ex: any) {
      console.error(ex)

      ex.response?.status === 403
        ? WarningAlert(CRUD_RESPONSES.failed_authorization)
        : ErrorAlert(CRUD_RESPONSES.error)
    } finally {
      refetch()
    }
  }

  const linkToCustomerDetail = () => {
    customer &&
      !customer.deleted_at &&
      navigate('/customer/list/profile/overview', {state: {customerId: customer.id}})
  }

  return (
    <div>
      <div className='d-flex flex-center pb-3'>
        <div className='symbol symbol-80px symbol-circle pe-10'>
          {customer?.avatar_url ? (
            <>
              <img src={customer?.avatar_url} alt='Metronic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </>
          ) : (
            <span className='symbol-label bg-light-danger text-danger fs-5 fw-bolder'>
              {customer?.label?.charAt(0)}
            </span>
          )}
        </div>
        <div className=''>
          <div
            className={clsx('fs-3 text-gray-800 fw-bolder mb-1', !customer?.deleted_at && `text-hover-primary`)}
            style={{textDecoration: "underline"}}
            onClick={() => {linkToCustomerDetail()}}
          >
            {customer?.lastname} {customer?.firstname}
          </div>
      
          <div className='fs-5 fw-bold text-muted mb-1'>
            {customer?.phone} {customer?.phone2}
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap flex-center w-100'>
        <div
          className='border border-gray-300 border-dashed rounded py-3 px-2 mb-3'
          style={{width: '30%'}}
        >
          <div className='d-flex fs-7 fw-bolder text-gray-700'>
            <div className='pe-4'>
              {' '}
              <i className='fas fa-person-circle-check text-success fs-4'></i>{' '}
            </div>

            <div>
              <span className='fw-bold text-muted'>Нийт: </span>
              <span className='w-50px fs-6'>{customer?.total_appointments} </span>
            </div>
          </div>
        </div>

        <div
          className='border border-gray-300 border-dashed rounded py-3 px-2 mx-3 mb-3'
          style={{width: '31%'}}
        >
          <div className='d-flex fs-7 fw-bolder text-gray-700'>
            <div className='pe-4'>
              {' '}
              <i className='fas fa-person-circle-minus text-info fs-4'></i>{' '}
            </div>
            <div>
              <span className='fw-bold text-muted'>Ирээгүй: </span>
              <span className='w-50px fs-6'>{customer?.no_show_appointments} </span>
            </div>
          </div>
        </div>

        <div
          className='border border-gray-300 border-dashed rounded py-3 px-2 mb-3'
          style={{width: '32%'}}
        >
          <div className='d-flex fs-7 fw-bolder text-gray-700'>
            <div className='pe-4'>
              {' '}
              <i className='fas fa-person-circle-xmark text-danger fs-4'></i>{' '}
            </div>
            <div>
              <span className='fw-bold text-muted'>Цуцалсан: </span>
              <span className='w-50px fs-6'>{customer?.cancelled_appointments} </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
    display: 'flex',
    justifyContent: 'space-around',
  }}>
        {viewType === 'edit' && (
          <div>
            <Link
              to=''
              className={statusClass.filter((type) => type.value === status)[0]?.name}
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-start'
              data-kt-menu-flip='bottom-end'
            >
              {status && (
                <>
                  {statusName.filter((type) => type.value === status)[0]?.name}
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr072.svg'
                    className='svg-icon-1 ps-2'
                  />
                </>
              )}
            </Link>

            <StatusSelection changeStatus={changeStatus} currentStatus={status} />
          </div>
        )}
        {viewType === 'edit' && (
          <div style={{
            whiteSpace: 'nowrap',
          }}>
            <Link
              to=''
              className={
                treatmentStatusClass.filter((type) => type.value === treatmentStatus + '')[0]?.name
              }
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-start'
              data-kt-menu-flip='bottom-end'
            >
              {treatmentStatus && (
                <>
                  {
                    treatmentStatusName.filter((type) => type.value === treatmentStatus + '')[0]
                      ?.name
                  }
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr072.svg'
                    className='svg-icon-1 ps-2'
                  />
                </>
              )}
            </Link>
            <TreatmentStatusSelection
              changeTreatmentStatus={changeTreatmentStatus}
              currentTreatmentStatus={treatmentStatus}
            />
          </div>
        )}
      </div>

      <div id='kt_customer_view_details' className='collapse show'>
        <div className='py-1 fs-6'>
          <div className='d-flex flex-column justify-content-center flex-row-fluid pe-11 mb-2'>
            <div className='d-flex fs-6 fw-bold text-gray-700 align-items-center mb-0'>
              <div className='bullet bg-info me-3'></div>
              <div className='text-gray-400'>Нийт мөнгөн дүн</div>
              <NumberFormat
                className='ms-auto align-self-end'
                value={customer?.total_paid || 0}
                displayType={'text'}
                thousandSeparator={true}
              />
              ₮
            </div>
            <div className='d-flex fs-6 fw-bold text-gray-700 align-items-center mb-2'>
              <div className='bullet bg-info me-3'></div>
              <div className='text-gray-400'>Үлдэгдэл</div>
              <NumberFormat
                className='ms-auto align-self-end'
                value={customer?.left_payment || 0}
                displayType={'text'}
                thousandSeparator={true}
              />
              ₮
            </div>
          </div>

          <div className='separator separator-dashed my-3'></div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail
