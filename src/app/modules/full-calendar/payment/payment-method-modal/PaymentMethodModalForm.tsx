/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { SplitPayment } from '../../core/_models'
import { NumericFormat as NumberFormat}from 'react-number-format'
import Select from 'react-select';
import { useCalendarData } from '../../core/CalendarDataProvider'
import { ID } from '../../../../../_metronic/helpers'


type Props = {
  togglePaymentModal: () => void
  addSplitPayment: (split_amount: string, coupon_code_id: ID, bank_account_id: ID, desc: string) => void
  totalLeftPayment: number
  paymentType: string
}

const paymentMethodSchema = Yup.object().shape({
  split_payment_amount: Yup.string()
    .required('Төлөх дүн оруулна уу')
    .test('min-value', 'Төлөх дүн оруулна уу', function(split_payment_amount, ctx) {
      const intVal = (split_payment_amount && split_payment_amount.replaceAll(',', '')) || '0';
      return parseInt(intVal) > 0;
    }),
  left_payment: Yup.number()
    .min(0, 'Илүү төлбөр оруулсан байна'),
  bank_account_id: Yup.number()
    .test('min-value', 'Банк сонгоно уу', function(bankAccount, ctx) {
      return ctx.parent.payment_type === 'mobile' && !ctx.parent.bank_account_id ? false : true;
    }),
})

const PaymentMethodModalForm: FC<Props> = ({togglePaymentModal, addSplitPayment, totalLeftPayment, paymentType}) => {
  const {bankAccounts} = useCalendarData()
  const [paymentForEdit] = useState<SplitPayment>({
    split_payment_amount: ''+totalLeftPayment,
    left_payment: 0,
    bank_account_id: 0,
    payment_type: paymentType,
    desc: ''
  })
  const [accountNumber, setAccountNumber] = useState('')

  const formik = useFormik({
    initialValues: paymentForEdit,
    validationSchema: paymentMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      const integerValue = values.split_payment_amount.replaceAll(',', '')
      addSplitPayment(integerValue, 0, values.bank_account_id, values.desc || '')
      togglePaymentModal()
    },
  })

  useEffect(() => {
    const integerSplitPayment = formik.values.split_payment_amount.replaceAll(',', '') || '0'
    const subLeftPayment = totalLeftPayment - parseInt(integerSplitPayment)

    formik.setFieldValue('left_payment', subLeftPayment)
  }, [formik.values.split_payment_amount])
  
  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.value)
    setAccountNumber(option.account_number)
  }

  const cancel = () => {
    togglePaymentModal()
  }

  return (
    <>
      <form id='kt_modal_add_payment_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
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
                  <div className='text-gray-800 fw-bolder fs-5'>
                      ТӨЛБӨР
                  </div>
              </div>
              
              <NumberFormat
                  className="text-gray-800 fw-bolder align-self-start fs-5"
                  value={totalLeftPayment} 
                  displayType={'text'}
                  thousandSeparator={true}
              />
              <span className='text-gray-800 fw-bold align-self-start fs-5'>{' ₮'} </span>
          </div>

          <div className="row mb-6">
              <div className="col-md-3 col-xl-3">
                  <div className="fs-6 fw-bold mt-2 mb-3 required">Төлөх дүн</div>
              </div>
              <div className="col-md-9 col-xl-9 fv-row">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                      <span>₮ </span>
                  </span>
                  <NumberFormat
                      className="form-control"
                      {...formik.getFieldProps('split_payment_amount')}
                      thousandSeparator={true}
                      // onChange={(val) => onChangePayment(val)}
                  />
                </div>
                {formik.touched.split_payment_amount && formik.errors.split_payment_amount && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.split_payment_amount}</div>
                  </div>
                )} 
                {formik.errors.left_payment && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.left_payment}</div>
                  </div>
                )} 
              </div>
          </div>

          {paymentType === 'barter' &&
          <div className="row mb-6">
              <div className="col-md-3 col-xl-3">
                  <div className="fs-6 fw-bold mt-2 mb-3">Тайлбар</div>
              </div>
              <div className="col-md-9 col-xl-9 fv-row">
                <textarea
                    className='form-control mb-2'
                    rows={3}
                    placeholder='Нэмэлт мэдээлэл'
                    {...formik.getFieldProps('desc')}
                ></textarea>
              </div>
          </div>
          }

          {paymentType === 'mobile' && 
          <div className="row mb-6">
              <div className="col-md-3 col-xl-3">
                  <div className="fs-6 fw-bold mt-2 mb-3 required">Банк</div>
              </div>
              <div className="col-md-9 col-xl-9 fv-row">
                  <Select 
                      options={bankAccounts}
                      id='bank_account_id'
                      {...formik.getFieldProps('bank_account_id')} 
                      value={bankAccounts && formik.values.bank_account_id ? bankAccounts.filter(bankAccount => bankAccount.value === formik.values.bank_account_id)[0] : []}
                      onChange={(opt) => {handleOnChange('bank_account_id', opt)}}
                  />
                  <NumberFormat
                      className="form-control"
                      value={accountNumber}
                      disabled={true} 
                  />
                  {formik.errors.bank_account_id && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.bank_account_id}</div>
                    </div>
                  )}
              </div>
          </div>
          }
          
          <div className='d-flex align-items-center mb-4'>
              <div className='flex-grow-1'>
                  <div className='text-muted fw-bold fs-5'>
                    Үлдэгдэл төлбөр:
                  </div>
              </div>
              
              <NumberFormat
                  className="text-muted fw-bold align-self-start fs-6"
                  {...formik.getFieldProps('left_payment')}
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
            <span className='indicator-label'>Хадгалах</span>
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
}

export {PaymentMethodModalForm}
