/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useState} from 'react'
import { useFormik } from 'formik'
import { NumericFormat as NumberFormat}from 'react-number-format'
import { Discount } from '../../core/_models'
import * as Yup from 'yup'

type Props = {
  toggleDiscountModal: () => void
  calculateDiscountAmount: (amount: number, tyoe: string) => void
  discountList: Array<Discount>
}

const discountMethodSchema = Yup.object().shape({
  amount: Yup.string()
    .required('Дүн оруулна уу')
    .test('amount-type', '100%-с илүү дүн оруулж болохгүй.', function(amount, ctx) {
      let res = true
      if(ctx.parent.type === 'percent')
        res = amount && parseInt(amount) > 100 ? false : true
      return res  
    })
    .test('min-amount', 'Дүн оруулна уу', function(amount) {
      return amount && parseInt(amount) < 1 ? false : true
    }),
  type: Yup.string()
    .required('Төрөл сонгоно уу')
    .test('amount-limit', '100%-с илүү дүн оруулж болохгүй.', function(type, ctx) {
      let res = true
      
      if(type === 'percent' && ctx.parent.amount) {
        const amount = ctx.parent.amount.replaceAll(',', '')
        res = amount && parseInt(amount) > 100 ? false : true
      }
        
      return res  
    }),
})

const DiscountMethodModalForm: FC<Props> = ({toggleDiscountModal, calculateDiscountAmount, discountList}) => {
  const [discountInitialValue] = useState<Discount>({
    'amount': (discountList[0]?.type === 'percent' ? discountList[0]?.percent : discountList[0]?.amount) || '',
    'type': discountList[0]?.type || 'percent'
  })
  const [type, setType] = useState('percent')
  const [typeClassName] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-primary btn-outline btn-active-success')
  const [typeClassNameActive] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-primary btn-outline btn-active-success active')
 
  const formik = useFormik({
    initialValues: discountInitialValue,
    validationSchema: discountMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      const amount = values.amount.replaceAll(',', '')
      calculateDiscountAmount(parseInt(amount), type)
      toggleDiscountModal()
    },
  })

  const handleOnChange = (field: string, selectedVal: any) => {
    formik.setFieldValue(field, selectedVal.target.value)
    setType(selectedVal.target.value)
  }

  return (
    <>
      <form id='kt_modal_add_payment_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-offset='300px'
        >
          <div className='row mb-6'>
            <div className='fv-row col-4 col-lg-3'>
              <label className="d-block fw-bold fs-6 mb-2 required">Хөнгөлөх дүн</label>

              <div className="btn-group w-100 w-lg-50" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button]">
                <label className={type === 'percent' ? typeClassNameActive : typeClassName} data-kt-button="true">
                    <input className="btn-check text-active-primary" type="radio"
                      {...formik.getFieldProps('type')}  
                      value='percent'
                      checked={type === 'percent'}
                      onChange={(val) => {handleOnChange('type', val)}}
                    />
                    %
                </label>

                <label className={type === 'cash' ? typeClassNameActive : typeClassName} data-kt-button="true">
                    <input className="btn-check" type="radio" 
                      {...formik.getFieldProps('type')}
                      value='cash'
                      checked={type === 'cash'}
                      onChange={(val) => {handleOnChange('type', val)}}
                    />
                    ₮
                </label>
              </div>
            </div>

            <div className='fv-row col-8 col-lg-9'>
              <label className="d-block fw-bold fs-6 mb-2" style={{color: 'white'}}> .</label>
              <div className='input-group'>
                <span className="input-group-text" id="basic-addon1">
                  <span hidden={type === 'percent'}>₮ </span>
                  <span hidden={type === 'cash'}>%</span>
                </span>

                <NumberFormat
                    className="form-control"
                    {...formik.getFieldProps('amount')} 
                    thousandSeparator={formik.values.type === 'percent' ? false : true}
                    allowLeadingZeros={false}
                />
              </div>
             
              {((formik.touched.type && formik.errors.type) || (formik.touched.amount && formik.errors.amount)) && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.amount ? formik.errors.amount : formik.errors.type}</div>
                </div>
              )} 
            </div>
          </div>

        </div>

        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => toggleDiscountModal()}
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

export {DiscountMethodModalForm}
