import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {OnlineCustomer} from '../../core/_models'
import {useCalendarItem} from '../../core/CalendarItemProvider'
import {BookingCard} from '../../BookingCard'

const onlineCustomerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нэр оруулна уу'),
  // lastname: Yup.string()
  //   .min(3, 'Багадаа 3 тэмдэгт байна')
  //   .max(50, 'Ихдээ 50 тэмдэгт байна')
  //   .required('Овог оруулна уу'),
  phone: Yup.string()
    .min(8, '8 оронтой дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .required('Утас оруулна уу'),
  email: Yup.string()
    .email('Имэйлийн загвар буруу байна')
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Имэйлээ оруулна уу'),
})

export const CustomerIndex = () => {
  const {itemDatas, setItemDatas, setActiveTab, activeTab} = useCalendarItem()
  const [data] = useState<OnlineCustomer>({
    ...itemDatas.customer,
    // 'lastname': itemDatas.customer?.lastname || '',
    firstname: itemDatas.customer?.firstname || '',
    phone: itemDatas.customer?.phone || '',
    email: itemDatas.customer?.email || '',
    desc: itemDatas.customer?.desc || '',
  })

  const formik = useFormik({
    initialValues: data,
    validationSchema: onlineCustomerSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      try {
        setItemDatas({...itemDatas, customer: values})
      } finally {
        setActiveTab(activeTab + 1)
        setSubmitting(true)
      }
    },
  })

  useEffect(() => {
    setItemDatas({...itemDatas, customer: formik.values})
  }, [formik.values])

  return (
    <BookingCard
      title='Үйлчлүүлэгчийн бүртгэл'
      body={
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          {/* <div className="mb-4 fv-row">
                        <label className="fs-6 fw-bold mb-2 required">Овог</label>
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Овог"
                            {...formik.getFieldProps('lastname')} 
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{formik.errors.lastname}</div>
                        </div>
                        )}
                    </div>   */}

          <div className='mb-4 fv-row'>
            <label className='fs-6 fw-bold mb-2 required'>Нэр</label>
            <input
              type='text'
              className='form-control mb-2'
              placeholder='Нэр'
              {...formik.getFieldProps('firstname')}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.firstname}</div>
              </div>
            )}
          </div>

          <div className='mb-4 fv-row'>
            <label className='fs-6 fw-bold mb-2 required'>Имэйл</label>
            <input
              type='text'
              className='form-control mb-2'
              placeholder='Имэйл'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.email}</div>
              </div>
            )}
          </div>

          <div className='mb-4 fv-row'>
            <label className='fs-6 fw-bold mb-2 required'>Утас</label>
            <input
              type='number'
              className='form-control mb-2'
              placeholder='Утас'
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.phone}</div>
              </div>
            )}
          </div>

          <div className='fv-row'>
            <label className='fs-6 fw-bold mb-2'>Нэмэлт мэдээлэл</label>
            <textarea
              className='form-control mb-2'
              rows={3}
              placeholder='Нэмэлт мэдээлэл'
              {...formik.getFieldProps('desc')}
            ></textarea>
          </div>

          <div className='d-flex justify-content-end mt-1'>
            <button
              type='submit'
              className='btn btn-sm btn-dark'
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              <span className='indicator-label'>Үргэлжлүүлэх</span>
              {formik.isSubmitting && (
                <span className='indicator-progress'>
                  Түр хүлээнэ үү...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      }
    />
  )
}
