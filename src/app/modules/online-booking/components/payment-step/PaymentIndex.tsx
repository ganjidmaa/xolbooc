import {useEffect, useState} from 'react'
import {useCalendarItem} from '../../core/CalendarItemProvider'
import {BookingCard} from '../../BookingCard'
import css from './style.module.css'
import {initialCalendarItem} from '../../core/_models'
import {useNavigate} from 'react-router-dom'
import {useCalendarData} from '../../core/CalendarDataProvider'
import {qpayInvoice, qpayInvoiceCheck} from '../../../full-calendar/core/_requests'
import {SuccessAlert} from '../../../../../_metronic/helpers/alerts/Success'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'
import {WarningAlert} from '../../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {InfoAlert} from '../../../../../_metronic/helpers/alerts/Info'

declare global {
  interface Window {
    Echo: any
    Pusher: any
  }
}

type QpayDeeplinkProps = {
  link: string
  logo: string
  name: string
  description: string
}

export const PaymentIndex = () => {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const [isResponse, setIsResponse] = useState(false)
  const [qpayResponse, setQpayResponse] = useState<any>({})
  const {onlineBookingSettings} = useCalendarData()
  const {itemDatas, setItemDatas, setActiveTab} = useCalendarItem()
  const [minutes, setMinutes] = useState(9)
  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    if (itemDatas.customer?.firstname && itemDatas.customer.phone) {
      const validQpayData = {
        amount: '' + onlineBookingSettings.validate_amount,
        desc:
          '' +
          itemDatas.customer?.firstname +
          ' ' +
          itemDatas.customer?.phone +
          ' ' +
          'uridchilgaa',
        appointment_id: '' + itemDatas.id,
        branch_id: itemDatas.branch?.id,
      }
      qpayInvoice(validQpayData)
        .then((response) => {
          setQpayResponse(response)
        })
        .catch((err) => {
          ErrorAlert('Түр хүлээгээд дахин оролдоно уу!')
          navigate('/booking')
        })
    } else {
      console.log('tried to redirect payment step!!!')
    }
  }, [])

  useEffect(() => {
    if (Object.keys(qpayResponse).length !== 0) {
      setIsResponse(true)
      invoiceQPay()
    }
  }, [qpayResponse])

  const JumpToApp = (link: string) => {
    window.open(link)
  }

  const invoiceQPay = async () => {
    window.Pusher = Pusher
    window.Echo = new Echo({
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            axios
              .post(process.env.REACT_APP_API_URL + '/socket/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(null, response.data)
              })
              .catch((error) => {
                callback(error)
              })
          },
        }
      },
      broadcaster: 'pusher',
      key: process.env.REACT_APP_SOCKET_KEY,
      cluster: 'mt1',
      wsHost: 'socket.xolbooc.com',
      wsPort: 80,
      wssPort: 443,
      forceTLS: true,
      disableStatus: true,
    })
    setTimeout(() => {
      window.Echo.private(`Qpay.Invoice.${qpayResponse.invoice_id}`).listen(
        'QpayPaid',
        (e: any) => {
          if (e.success == true) {
            SuccessAlert('Qpay төлбөр амжилттай төлөгдлөө.')
            window.Echo.disconnect()
            setItemDatas(initialCalendarItem.itemDatas)
            setActiveTab(0)
            navigate('/booking')
          }
        }
      )
    }, 0)
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  function qpayInvoiceCheckd() {
    setPending(true)
    qpayInvoiceCheck({invoice_id: `${qpayResponse.invoice_id}`}).then((response: any) => {
      if (response.success === true) {
        SuccessAlert('Таны төлбөр амжилттай төлөгдсөн байна')
        window.Echo.disconnect()
        setPending(false)
        navigate('/booking')
      } else {
        WarningAlert('Таны төлбөр төлөгдөөгүй байна!')
        setPending(false)
      }
    })
  }

  const backToWelcomePage = async () => {
    const {value: buttonType} = await InfoAlert(
      'Баталгаажуулалт хийгдээгүй тул таны сонгосон цагт 30минут дотор дахин захиалга хийх боломжгүй болно!',
      true
    )
    if (buttonType) {
      setItemDatas(initialCalendarItem.itemDatas)
      setActiveTab(0)
      window.Echo.disconnect()
      navigate('/booking')
    }
  }

  return (
    <div className='d-flex flex-column flex-row-fluid '>
      <div className='card card-flush'>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className='fw-bold '>Урьдчилгаа төлбөр төлөлт</h3>
          </div>
        </div>

        <div
          className='card-body p-0 p-md-9 pt-2 position-relative'
          style={{borderTop: '1px solid #eee'}}
        >
          <div className={`${css.mobileCheckBtn} d-block d-md-none`}>
            <button
              onClick={() => qpayInvoiceCheckd()}
              className=' my-2 btn btn-dark fw-bold fs-6 '
            >
              ШАЛГАХ
            </button>
          </div>
          <div className='h-100 h-lg-500px text-gray-900 fs-lg-5 fs-6'>
            <div className='d-flex flex-column justify-content-center align-items-center gap-2 position-relative'>
              <div className='mb-4 px-3 text-center'>
                Төлбөр амжилттай төлөгдсөн эсэхийг <strong>ШАЛГАХ</strong> товч дээр дарж шалгана
                уу.
              </div>
              {/* <div className={`${css.warningText} text-danger`}>Хугацаа дуусахаас өмнө төлбөр төлөлт хийгээгүй тохиолдолд захиалга цуцлагдахыг анхаарна уу!</div> */}
              {isResponse && (
                <>
                  <div className={css.qrContainer}>
                    {minutes === 0 && seconds === 0 ? (
                      <div
                        style={{
                          backgroundImage: `url("${'/media/timeover.jpeg'}")`,
                          backgroundSize: 'contain',
                        }}
                        className='w-md-200px h-md-200px w-150px h-150px'
                      ></div>
                    ) : (
                      <img
                        src={'data:image/png;base64, ' + qpayResponse.qr_image}
                        alt='QR CODE'
                        className='d-inline-block'
                      />
                    )}
                  </div>
                  <div className={`d-block d-md-none w-100 mt-8 mb-20`}>
                    <div className={css.deeplinkContainer}>
                      {qpayResponse?.qPay_deeplink?.map(
                        (item: QpayDeeplinkProps, index: number) => {
                          return (
                            <div
                              key={index}
                              onClick={() => JumpToApp(item.link)}
                              className={css.deeplinkCard}
                            >
                              <img src={item.logo} alt={item.name} />
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className={css.countdown}>
                {minutes === 0 && seconds === 0 ? null : (
                  <h2>
                    {' '}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </h2>
                )}
              </div>

              <button
                disabled={pending}
                onClick={() => qpayInvoiceCheckd()}
                className='d-none d-md-block my-2 btn btn-dark fw-bold fs-6'
              >
                ШАЛГАХ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
