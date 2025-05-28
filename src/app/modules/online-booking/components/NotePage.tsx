import {useNavigate} from 'react-router-dom'
import {useCalendarData} from '../core/CalendarDataProvider'
import {bookingAppointment} from '../core/_requests'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {CRUD_RESPONSES} from '../../../../_metronic/helpers'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../_metronic/helpers/alerts/Error'
import {initialCalendarItem} from '../core/_models'
import {BookingCard} from '../BookingCard'
import {SuccessAlert} from '../../../../_metronic/helpers/alerts/Success'
import {useAuth} from '../../auth'
import {useState} from 'react'

export const NotePage = () => {
  const {settings} = useAuth()
  const navigate = useNavigate()
  const {onlineBookingSettings} = useCalendarData()
  const {itemDatas, setItemDatas, setActiveTab} = useCalendarItem()
  const [pending, setPending] = useState(false)
  const formattedAmount =
    Intl.NumberFormat('en-US').format(
      parseInt(
        onlineBookingSettings?.validate_amount ? onlineBookingSettings?.validate_amount : '0'
      )
    ) + '₮'
  let createSuccess = 0
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!itemDatas.customer?.firstname || !itemDatas.customer.phone) {
      return ErrorAlert('Алдаа гарсан тул дараа дахин оролдоно уу!')
    }
    setPending(true)
    // console.log(itemDatas)
    try {
      const response = await bookingAppointment(itemDatas)
      const status = response.payload?.status
      setItemDatas({...itemDatas, id: response.data?.id})
      if (status && status === 200) {
        createSuccess = 200
      }
      // status && status === 201 && ErrorAlert(CRUD_RESPONSES.role_limit)
      if (status && status === 202) {
        createSuccess = 202
      }
    } catch (ex: any) {
      console.error(ex)
      ex.response?.status === 403
        ? WarningAlert(CRUD_RESPONSES.failed_authorization)
        : ErrorAlert(CRUD_RESPONSES.error)
    } finally {
      setPending(false)
      if (onlineBookingSettings.choose_qpay && settings?.use_qpay === 1) {
        if (createSuccess === 200) {
          if (onlineBookingSettings.choose_autoDiscard) {
            WarningAlert(
              'Таны цаг захиалга үүслээ. Урьчилгаа төлбөрөө 10 мин дотор төлөөгүй тохиолдолд захиалга автоматаар цуцлагдахыг анхаарна уу!'
            )
          } else {
            WarningAlert(
              'Таны цаг захиалга үүслээ. Урьчилгаа төлбөрөө төлснөөр захиалга баталгаажих болно!'
            )
          }
          createSuccess = 0
          navigate('/booking/payment')
        } else if (createSuccess === 202) {
          WarningAlert('Уучлаарай! Тухайн цаг дээр өөр захиалга хийгдсэн тул өөр цаг сонгоно уу.')
        } else {
          ErrorAlert('Түр хүлээгээд дахин оролдоно уу!')
        }
      } else {
        if (createSuccess === 200) {
          SuccessAlert('Таны цаг захиалга амжилттай бүртгэгдлээ.')
          createSuccess = 0
          setItemDatas(initialCalendarItem.itemDatas)
          setActiveTab(0)
          navigate('/booking')
        } else if (createSuccess === 202) {
          WarningAlert('Уучлаарай! Тухайн цаг дээр захиалга хийгдсэн тул өөр цаг сонгоно уу.')
        } else {
          ErrorAlert('Түр хүлээгээд дахин оролдоно уу!!!')
        }
      }
    }
  }
  let userName
  if (onlineBookingSettings.choose_user) {
    userName = itemDatas?.user?.lastname?.substring(0, 1) + '.' + itemDatas?.user?.firstname
  }

  return (
    <BookingCard
      title='Оруулсан мэдээллээ шалгах'
      body={
        <div style={{height: '100%'}}>
          <form className='form' onSubmit={handleSubmit} noValidate>
            <div className='row' style={{width: '100%'}}>
              <div className='col-12 col-xl-6'>
                {settings?.has_branch !== false && (
                  <div className='d-flex border-bottom pb-1'>
                    <span className='min-w-100px min-w-sm-150px'>Салбарын нэр: </span>
                    <div className='fw-bolder'>{itemDatas?.branch?.name}</div>
                  </div>
                )}
                <div className='d-flex border-bottom pb-1 mt-2'>
                  <span className='min-w-100px min-w-sm-150px'>Захиалсан цаг: </span>
                  <div className='fw-bolder'>
                    {itemDatas?.event_date} - {itemDatas?.start_time}
                  </div>
                </div>
                {onlineBookingSettings.choose_user && (
                  <div className='d-flex border-bottom pb-1 mt-2'>
                    <span className='min-w-100px min-w-sm-150px'>Гоо сайханч: </span>
                    <div className='fw-bolder'>{userName}</div>
                  </div>
                )}
                {onlineBookingSettings.choose_qpay && (
                  <div className='d-flex mt-2 border-bottom pb-1'>
                    <span className='min-w-100px min-w-sm-150px'>Урьдчилгаа: </span>
                    <div className='fw-bolder'>{formattedAmount}</div>
                  </div>
                )}
              </div>
              <div className='col-12 col-xl-6'>
                <div className='d-flex border-bottom pb-1 mt-2 mt-xl-0'>
                  <span className='min-w-100px min-w-sm-150px'>Нэр: </span>
                  <div className='fw-bolder'>
                    {itemDatas?.customer?.lastname?.charAt(0)}.{itemDatas?.customer?.firstname}
                  </div>
                </div>
                {itemDatas?.customer?.phone && (
                  <div className='d-flex border-bottom pb-1 mt-2'>
                    <span className='min-w-100px min-w-sm-150px'>Утас: </span>
                    <div className='fw-bolder'>{itemDatas?.customer?.phone}</div>
                  </div>
                )}
                {/* {itemDatas?.customer?.registerno&&<div className="d-flex border-bottom pb-1 mt-2"><span className="min-w-100px min-w-sm-150px">Регистр: </span><div className="fw-bolder">{itemDatas?.customer?.registerno}</div></div>} */}
                {/* {itemDatas?.customer?.desc&&<div className="d-flex border-bottom pb-1 mt-2"><span className="min-w-100px min-w-sm-150px">Нэмэлт: </span><div className="fs-6">{itemDatas?.customer?.desc}</div></div>} */}
              </div>
            </div>
            <div className='mt-10 notice bg-light-secondary rounded border-secondary border p-4 fs-6'>
              <p className=''> {onlineBookingSettings.important_info} </p>
            </div>
            <div className='d-flex justify-content-center align-self-end pt-6'>
              <button
                onClick={() => {
                  navigate('/booking')
                }}
                className='btn btn-secondary me-5 fw-bolder'
              >
                Нүүр хуудас
              </button>
              <div>
                <button className='btn btn-dark' disabled={pending} type='submit'>
                  <span className='fw-bolder'>
                    {onlineBookingSettings.choose_qpay && settings?.use_qpay === 1
                      ? 'Qpay-ээр төлөх'
                      : 'Хадгалах'}
                  </span>
                  {pending && (
                    <span className='indicator-progress'>
                      Түр хүлээнэ үү...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    />
  )
}
