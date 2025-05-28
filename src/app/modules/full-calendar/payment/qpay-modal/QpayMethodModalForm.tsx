/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {ID} from '../../../../../_metronic/helpers'
import {qpayInvoice, qpayInvoiceCheck} from '../../core/_requests'
import {QpayInvoiceRequest} from '../../../customer-management/core/_models'
import axios from 'axios'
import css from '../style.module.css'
import { SuccessAlert } from '../../../../../_metronic/helpers/alerts/Success'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { useCalendarView } from '../../core/CalendarViewProvider'
import { useAuth } from '../../../auth'

declare global {
  interface Window {
    Echo: any
    Pusher: any
  }
}

type Props = {
  togglePaymentModal: () => void
  addSplitPayment: (
    split_amount: string,
    coupon_code_id: ID,
    bank_account_id: ID,
    desc: string
  ) => void
  totalLeftPayment: number
}

const paymentMethodSchema = Yup.object().shape({
  amount: Yup.string()
    .required('Төлөх дүн оруулна уу')
    .test('min-value', 'Төлөх дүн оруулна уу', function (split_payment_amount, ctx) {
      const intVal = (split_payment_amount && split_payment_amount.replaceAll(',', '')) || '0'
      return parseInt(intVal) > 0
    }),
  desc: Yup.string().required('Гүйлгээний утга оруулна уу.'),
  left_payment: Yup.number().min(0, 'Илүү төлбөр оруулсан байна'),
})

const QpayMethodModalForm: FC<Props> = ({
  togglePaymentModal,
  addSplitPayment,
  totalLeftPayment
}) => {
  let {eventIdForUpdate} = useCalendarView()
  const [qpayResponse, setQpayResponse] = useState<any>({})
  const {settings} = useAuth();
  const [leftPayment, setLeftPayment] = useState(totalLeftPayment)
  const [qpayInvoiceData] = useState<QpayInvoiceRequest>({
    amount: '' + totalLeftPayment,
    desc: '',
    appointment_id: '' + eventIdForUpdate
  })
  
  // window.Echo = null;

  const formik = useFormik({
    initialValues: qpayInvoiceData,
    validationSchema: paymentMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      values.amount = (values.amount as string).replaceAll(',', '')
      qpayInvoice(values).then((response) => setQpayResponse(response))
    },
  })
  
  useEffect(() => {
    const integerSplitPayment = (formik.values.amount as string).replaceAll(',', '') || '0'
    const subLeftPayment = totalLeftPayment - parseInt(integerSplitPayment)

    setLeftPayment(subLeftPayment)
  }, [formik.values.amount])

  const invoiceQPay = async () => {
    window.Pusher = Pusher
    window.Echo = new Echo({
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            axios
              .post(
                process.env.REACT_APP_API_URL + '/socket/auth',
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                }
              )
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
            var paid_amount = (formik.values.amount as string).replaceAll(',', '')
            addSplitPayment(paid_amount, 0, 0, formik.values.desc || '')
            SuccessAlert('Qpay төлбөр амжилттай төлөгдлөө.')
            togglePaymentModal()
            window.Echo.disconnect()
          }
        }
      )
    }, 0)
  }

  useEffect(() => {
    if (Object.keys(qpayResponse).length !== 0) {
      invoiceQPay()
    }
  }, [qpayResponse])

  // useEffect(() => { 
  //   cancel()
  //   SuccessAlert('Таны төлбөр амжилттай төлөгдлөө')
  // }, [qpayResponseCheck])

  const cancel = () => {
    if(window.Echo)
    window.Echo.disconnect()
    togglePaymentModal()
  }

  function qpayInvoiceCheckd(){
    qpayInvoiceCheck({invoice_id:`${qpayResponse.invoice_id}`}).then((response:any)=>{
      if(response.success === true) {
        SuccessAlert('Таны төлбөр амжилттай төлөгдсөн байна')
        var paid_amount = (formik.values.amount as string).replaceAll(',', '')
        addSplitPayment(paid_amount, 0, 0, formik.values.desc || '')
      }
      else WarningAlert('Төлбөр төлөгдсөн эсэхийг дансны хуулгаар шалгана уу!')})
    window.Echo.leaveChannel(`Qpay.Invoice.${qpayResponse.invoice_id}`)
  }

  if (Object.keys(qpayResponse).length === 0)
    return (
      <>
        <form
          id='kt_modal_add_payment_form'
          className='form'
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div
            className='d-flex flex-column scroll-y me-n5 pe-5'
            id='kt_modal_add_payment_scroll'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='auto'
            data-kt-scroll-dependencies='#kt_modal_add_payment_header'
            data-kt-scroll-wrappers='#kt_modal_add_payment_scroll'
            data-kt-scroll-offset='300px'
          >
            <div className='d-flex align-items-center mb-4'>
              <div className='flex-grow-1'>
                <div className='text-gray-800 fw-bolder fs-5'>ТӨЛБӨР</div>
              </div>

              <NumberFormat
                className='text-gray-800 fw-bolder align-self-start fs-5'
                value={totalLeftPayment}
                displayType={'text'}
                thousandSeparator={true}
              />
              <span className='text-gray-800 fw-bold align-self-start fs-5'>{' ₮'} </span>
            </div>

            <div className='row mb-6'>
              <div className='col-md-3 col-xl-3'>
                <div className='fs-6 fw-bold mt-2 mb-3 required'>Төлөх дүн</div>
              </div>
              <div className='col-md-9 col-xl-9 fv-row'>
                <div className='input-group'>
                  <span className='input-group-text' id='basic-addon1'>
                    <span>₮ </span>
                  </span>
                  <NumberFormat
                    className='form-control'
                    {...formik.getFieldProps('amount')}
                    thousandSeparator={true}
                  />
                </div>
                {formik.touched.amount && formik.errors.amount && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.amount}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-md-3 col-xl-3'>
                <div className='fs-6 fw-bold mt-2 mb-3'>Гүйлгээний утга</div>
              </div>
              <div className='col-md-9 col-xl-9 fv-row'>
                <textarea
                  className='form-control mb-2'
                  rows={3}
                  placeholder='Гүйлгээний утга'
                  {...formik.getFieldProps('desc')}
                ></textarea>
                {formik.touched.desc && formik.errors.desc && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.desc}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='d-flex align-items-center mb-4'>
              <div className='flex-grow-1'>
                <div className='text-muted fw-bold fs-5'>Үлдэгдэл төлбөр:</div>
              </div>

              <NumberFormat
                className='text-muted fw-bold align-self-start fs-6'
                value={leftPayment}
                displayType={'text'}
                thousandSeparator={true}
              />
              <span className='text-muted fw-bold align-self-start fs-6'>{' ₮'} </span>
            </div>
          </div>

          <div className='text-center pt-10'>
            <button
              type='reset'
              onClick={() => cancel()}
              className='btn btn-light me-3'
              data-kt-users-modal-action='cancel'
              disabled={formik.isSubmitting}
            >
              Болих
            </button>

            <button
              type='submit'
              className='btn btn-primary'
              data-kt-users-modal-action='submit'
              disabled={formik.isSubmitting || !formik.touched}
            >
              <span className='indicator-label'>QR авах</span>
              {formik.isSubmitting && (
                <span className='indicator-progress'>
                  Түр хүлээнэ үү...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </>
    )
  else
    return (
      <>
        <div className={css.qpayForm}>
          <img src={'data:image/png;base64, ' + qpayResponse.qr_image} alt='QR CODE' className='d-inline-block h-20 border'/>
          <div className='text-center pt-10'>
            <button
              type='reset'
              onClick={() => cancel()}
              className='btn btn-light me-3'
            >
              Болих
            </button>

            <button
              type='button'
              className='btn btn-primary'
              onClick={()=>qpayInvoiceCheckd()}
            >
              <span className='indicator-label'>Шалгах</span>
            </button>
          </div>
        </div>
      </>
    )
}

export {QpayMethodModalForm}
