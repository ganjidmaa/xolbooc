import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Имэйлийн загвар буруу байна')
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Имэйлээ оруулна уу'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.email)
          .then(({data: {result}}) => {
            const message = result ? 
              'Шинэ нууц үг илгээлээ. Имэйлээ шалгана уу.' 
              : 
              'Бүртгэлтэй имэйл олдсонгүй. Дахин оролдоно уу'
            setStatus(message)
            setHasErrors(false)
            setLoading(false)
            setSubmitting(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('Алдаа гарсан тул дахин оролдоно уу')
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Нууц үг сэргээх</h1>

          <div className='text-gray-400 fw-bold fs-4'>Шинэ нууц үг авах имэйлээ оруулна уу.</div>
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              {formik.status}
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>{formik.status}</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Имэйл</label>
          <div className='input-group'>
            <span className="input-group-text" id="basic-addon1">
              <i className='bi bi-at fs-4'></i>
            </span>
            <input
              type='email'
              placeholder=''
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-lg form-control',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Илгээх</span>
            {loading && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Буцах
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
