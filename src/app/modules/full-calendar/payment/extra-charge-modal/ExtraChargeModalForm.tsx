/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useState} from 'react'
import { useFormik } from 'formik'
import { NumericFormat as NumberFormat}from 'react-number-format'
import { ExtraCharge } from '../../core/_models'

type Props = {
  toggleExtraChargeModal: () => void
  addExtraPayment: (extraPayment: number) => void
  extraPayment: number
}

// const paymentMethodSchema = Yup.object().shape({
//   extra_payment: Yup.string()
//     .required('Нэмэлт төлбөр оруулна уу')
//     .test('min-value', 'Нэмэлт төлбөр оруулна уу', function(extra_payment, ctx) {
//       const intVal = (extra_payment && extra_payment.replaceAll(',', '')) || '0';
//       return parseInt(intVal) > 0;
//     }),
// })

const ExtraChargeModalForm: FC<Props> = ({toggleExtraChargeModal, addExtraPayment, extraPayment}) => {
  const [extraPaymentInitialValue] = useState<ExtraCharge>({
    'extra_payment': extraPayment+'',
    'note': ''
  })

  const formik = useFormik({
    initialValues: extraPaymentInitialValue,
    // validationSchema: paymentMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      addExtraPayment(parseInt(values.extra_payment.replaceAll(',', '')))
      toggleExtraChargeModal()
    },
  })


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
          <div className='fv-row mb-1'>
            <label className="fw-bold fs-6 mb-2 required">Нэмэлт төлбөр</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                  <span>₮ </span>
              </span>
              <NumberFormat
                  className="form-control"
                  {...formik.getFieldProps('extra_payment')}
                  thousandSeparator={true}
              />
            </div>
            {formik.touched.extra_payment && formik.errors.extra_payment && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.extra_payment}</div>
              </div>
            )} 
          </div>

        </div>

        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => toggleExtraChargeModal()}
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
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
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

export {ExtraChargeModalForm}
