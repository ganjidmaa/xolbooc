/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useAccountDetail } from '../../../../core/AccountDetailProvider'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { NotifyError } from '../../../../../../../_metronic/helpers/notify/NotifyError'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import { CRUD_RESPONSES } from '../../../../../../../_metronic/helpers'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { IUpdateEmail, IUpdatePassword, updatePassword } from '../../../../core/_models'
import { resetPassword, updateEmail } from '../../../../core/_requests'
import clsx from 'clsx'

const emailFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Имэйлийн загвар буруу байна')
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Имэйл хаяг оруулна уу'),
  confirmPassword: Yup.string()
    .min(6, 'Багадаа 6 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нууц үг оруулна уу'),
})

const passwordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Багадаа 6 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Шинэ нууц үг оруулна уу'),
  passwordConfirmation: Yup.string()
    .min(6, 'Багадаа 6 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Шинэ нууц үг давтан оруулна уу')
    .oneOf([Yup.ref('newPassword'), null], 'Нууц үг таарахгүй байна'),
})

const SignInMethod: React.FC = () => {
  const {response: user, refetch} = useAccountDetail()
  const [emailUpdateData] = useState<IUpdateEmail>({
    email: '',
    confirmPassword: ''
  })
  const [passwordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [loading1, setLoading1] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)


  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: async(values, {resetForm}) => {
      setLoading1(true)

      try {
        const response = await updateEmail(user?.id, values)
        const status = response.payload?.status
    
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        status && status === 201 && NotifyError(CRUD_RESPONSES.warning)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 422 ?
          ErrorAlert('Имэйл хаяг бүртгэлтэй байна.')
        :
        ex.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        refetch()
        resetForm()
        setLoading1(false)
        setShowEmailForm(false)
      }
    },
  })

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async(values, {resetForm}) => {
      setLoading2(true)
      try {
        const response = await resetPassword(user?.id, values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess('Амжилттай хадгалагдлаа.') 
        status && status === 201 && NotifyError('Амжилтгүй боллоо. Дахин оролдоно уу.') 
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403 ? 
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        : 
          ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        resetForm()
        setLoading2(false)
        setPasswordForm(false)
      }
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Нэвтрэх эрхийн тохиргоо</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_email' className={' ' + (showEmailForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Имэйл</div>
              <div className='fw-bold text-gray-600'>{user?.email}</div>
            </div>

            <div
              id='kt_signin_email_edit'
              className={'flex-row-fluid ' + (!showEmailForm && 'd-none')}
            >
              <form
                onSubmit={formik1.handleSubmit}
                id='kt_signin_change_email'
                className='form'
                noValidate
              >
                <div className='row mb-6'>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='emailaddress' className='form-label fs-6 fw-bolder mb-3'>
                        Шинэ имэйл хаяг оруулна уу
                      </label>
                      <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1">
                          <i className='bi bi-at fs-4'></i>
                        </span>
                        <input
                          type='email'
                          className={clsx(
                            'form-control form-control-lg form-control',
                            {'is-invalid': formik1.touched.email && formik1.errors.email},
                            {
                              'is-valid': formik1.touched.email && !formik1.errors.email,
                            }
                          )}
                          id='emailaddress'
                          placeholder='Шинэ имэйл хаяг'
                          {...formik1.getFieldProps('email')}
                        />
                      </div>
                      {formik1.touched.email && formik1.errors.email && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik1.errors.email}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='fv-row mb-0'>
                      <label
                        htmlFor='confirmemailpassword'
                        className='form-label fs-6 fw-bolder mb-3'
                      >
                        Нууц үгээр баталгаажуулах
                      </label>
                      <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1" 
                          onClick={() => {setShowPassword(!showPassword)}}
                        >
                          <i className={clsx('fs-4 bi', 
                            {'bi-eye-fill': showPassword},
                            {'bi-eye-slash-fill': !showPassword}
                          )}></i>
                        </span>
                      
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={clsx(
                            'form-control form-control-lg form-control',
                            {
                              'is-invalid': formik1.touched.confirmPassword && formik1.errors.confirmPassword,
                            },
                            {
                              'is-valid': formik1.touched.confirmPassword && !formik1.errors.confirmPassword,
                            }
                          )}
                          id='confirmemailpassword'
                          {...formik1.getFieldProps('confirmPassword')}
                        />
                      </div>
                      {formik1.touched.confirmPassword && formik1.errors.confirmPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik1.errors.confirmPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <button
                    id='kt_signin_submit'
                    type='submit'
                    className='btn btn-primary  me-2 px-6'
                  >
                    {!loading1 && 'Хадгалах'}
                    {loading1 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Түр хүлээнэ үү...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    id='kt_signin_cancel'
                    type='button'
                    onClick={() => {
                      setShowEmailForm(false)
                    }}
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Цуцлах
                  </button>
                </div>
              </form>
            </div>

            <div id='kt_signin_email_button' className={'ms-auto ' + (showEmailForm && 'd-none')}>
              <button
                onClick={() => {
                  setShowEmailForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Имэйл солих
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Нууц үг</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-6'>
                    <div className='fv-row mb-4 mb-lg-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3 required'>
                        Шинэ нууц үг
                      </label>
                      <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1" 
                          onClick={() => {setShowPassword1(!showPassword1)}}
                        >
                          <i className={clsx('fs-4 bi', 
                            {'bi-eye-fill': showPassword1},
                            {'bi-eye-slash-fill': !showPassword1}
                          )}></i>
                        </span>
                        <input
                          type={showPassword1 ? 'text' : 'password'}
                          className={clsx(
                            'form-control form-control-lg form-control',
                            {
                              'is-invalid': formik2.touched.newPassword && formik2.errors.newPassword,
                            },
                            {
                              'is-valid': formik2.touched.newPassword && !formik2.errors.newPassword,
                            }
                          )}
                          id='newpassword'
                          {...formik2.getFieldProps('newPassword')}
                        />
                       </div> 
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-6'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3 required'>
                        Шинэ нууц үг давтах
                      </label>
                      <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1" 
                          onClick={() => {setShowPassword2(!showPassword2)}}
                        >
                          <i className={clsx('fs-4 bi', 
                            {'bi-eye-fill': showPassword2},
                            {'bi-eye-slash-fill': !showPassword2}
                          )}></i>
                        </span>
                        <input
                          type={showPassword2 ? 'text' : 'password'}
                          className={clsx(
                            'form-control form-control-lg form-control',
                            {
                              'is-invalid': formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation,
                            },
                            {
                              'is-valid': formik2.touched.passwordConfirmation && !formik2.errors.passwordConfirmation,
                            }
                          )}
                          id='confirmpassword'
                          {...formik2.getFieldProps('passwordConfirmation')}
                        />
                      </div>
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Нууц үг хамгийн багадаа 6 тэмдэгт агуулсан байна.
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Хадгалах'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Түр хүлээнэ үү...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Цуцлах
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Нууц үг солих
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}
