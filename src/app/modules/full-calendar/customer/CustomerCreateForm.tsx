import { useState } from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useCalendarQuery } from '../core/CalendarQueryProvider'
import { Customer } from '../core/_models'
import { createCustomer } from '../core/_requests'
import { useCalendarData } from '../core/CalendarDataProvider'

const editCustomerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нэр оруулна уу'),
  registerno: Yup.string()
    .min(10, '10 оронтой дугаар оруулна уу')
    .max(10, '10 оронтой дугаар оруулна уу'),
  phone: Yup.string()
    .min(8, '8 оронтой дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .required('Утас оруулна уу'),  
})

const CustomerCreateForm = () => {
  const {setEventCustomer} = useCalendarQuery()
  const {refetch} = useCalendarData()

  const [customerForEdit] = useState<Customer>({
    firstname: '',
    lastname: '',
    phone: '',
    registerno: '',
    card_number: '',
    surgery_card_number: ''
  })

  const cancel = (customer?: Customer) => {
    if (customer) {
      setEventCustomer(customer)
      refetch()
    }
    else 
      setEventCustomer({})
  }

  const formik = useFormik({
    initialValues: customerForEdit,
    validationSchema: editCustomerSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      let customerResponse = undefined
      try {
        customerResponse = await createCustomer(values)
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(customerResponse)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_customer_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div className='d-flex flex-column me-n5 pe-5' >
          <div className='fv-row mb-4'>
            {/* <label className="d-block fw-bold fs-6 mb-2">Овог</label> */}
            <input 
              type="text" 
              className="form-control" 
              placeholder="Овог" 
              {...formik.getFieldProps('lastname')} 
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.lastname}</div>
              </div>
            )} 
          </div>

          <div className='fv-row mb-4'>
            {/* <label className="d-block fw-bold fs-6 mb-2 required">Нэр</label> */}
            <input 
              type="text" 
              className="form-control" 
              placeholder="Нэр *" 
              {...formik.getFieldProps('firstname')} 
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.firstname}</div>
              </div>
            )}
          </div>

          <div className='fv-row mb-4'>
            {/* <label className="d-block fs-6 fw-bold mb-2 required">Утас</label> */}
            <input 
              type="phone" 
              className="form-control" 
              placeholder="Утас *" 
              {...formik.getFieldProps('phone')} 
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.phone}</div>
              </div>
            )}
          </div>

          {/* <div className='fv-row mb-4'>
            // {/* <label className="d-block fs-6 fw-bold mb-2">Нэмэлт утас</label> 
            <input 
              type="phone" 
              className="form-control" 
              placeholder="Утас" 
              {...formik.getFieldProps('phone2')} 
            />
            {formik.touched.phone2 && formik.errors.phone2 && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.phone2}</div>
              </div>
            )}
          </div> */}

          <div className='fv-row mb-4'>
            {/* <label className="d-block fs-6 fw-bold mb-2 required">Утас</label> */}
            <input 
              type="text" 
              className="form-control" 
              placeholder="Регистрийн дугаар" 
              {...formik.getFieldProps('registerno')} 
            />
            {formik.touched.registerno && formik.errors.registerno && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.registerno}</div>
              </div>
            )}
          </div>

          <div className='fv-row mb-4'>
            {/* <label className="d-block fs-6 fw-bold mb-2 required">Утас</label> */}
            <input 
              type="text" 
              className="form-control" 
              placeholder="Картын дугаар" 
              {...formik.getFieldProps('card_number')} 
            />
          </div>

          <div className='fv-row mb-4'>
            {/* <label className="d-block fs-6 fw-bold mb-2 required">Утас</label> */}
            <input 
              type="phone" 
              className="form-control" 
              placeholder="Мэс заслын картын дугаар" 
              {...formik.getFieldProps('surgery_card_number')} 
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-5">
          <button
              type='submit'
              className='btn btn-sm btn-info'
              data-kt-customer-create-action='submit'
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
              <span className='indicator-label'>Үүсгэх</span>
              {(formik.isSubmitting) && (
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

export {CustomerCreateForm}
