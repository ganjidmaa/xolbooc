import * as Yup from 'yup'
import {useFormik} from 'formik'
import Datetime from 'react-datetime'
import Moment from 'moment'
import {
  CRUD_RESPONSES,
  DropzoneComponent,
  ConvertFileToBase64,
  KTSVG,
} from '../../../_metronic/helpers'
import {PaymentMethod, Settings} from './core/_models'
import {FC, useState} from 'react'
import {updateSettings} from './core/_requests'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {NotifySuccess} from '../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../_metronic/helpers/alerts/Error'
import {useAuth} from '../auth'
import {PaymentMethods} from './PaymentMethods'
import clsx from 'clsx'

const settingsSchema = Yup.object().shape({
  company_name: Yup.string().required('Байгууллагын нэр оруулна уу'),
  phone: Yup.string()
    .required('Утасны дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .min(8, '8 оронтой дугаар оруулна уу'),
  start_time: Yup.string().required('Байгууллагын нэр оруулна уу'),
  end_time: Yup.string().required('Байгууллагын нэр оруулна уу'),
  address: Yup.string().required('Байгууллагын хаяг оруулна уу'),
  email: Yup.string()
    .email('Имэйлийн загвар буруу байна')
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Имэйл оруулна уу'),
  daily_sms_reminder_txt: Yup.string().when('sms_send', {
    is: 1,
    then: Yup.string().required('Цаг захиалгын сануулга оруулна уу'),
  }),
  monthly_sms_reminder_txt: Yup.string().when('sms_send', {
    is: 1,
    then: Yup.string().required('Давтан ирэх сануулга оруулна уу'),
  }),
  daily_sms_reminder_minutes: Yup.number().when('sms_send', {
    is: 1,
    then: Yup.number().required('Цаг захиалгын сануулга илгээх хугацаа оруулна уу'),
  }),
  monthly_sms_reminder_months: Yup.number().when('sms_send', {
    is: 1,
    then: Yup.number().required('Давтан ирэх сануулга илгээх хугацаа оруулна уу'),
  }),
})

type Props = {
  settings: Settings
}

export const SettingsDetail: FC<Props> = ({settings}) => {
  const {refetch} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [data] = useState<Settings>({
    ...settings,
    logo: settings.logo || [],
    company_name: settings.company_name || '',
    phone: settings.phone || '',
    email: settings.email || '',
    address: settings.address || '',
    limit_date_usage: settings.limit_date_usage || '',
    slot_duration: settings.slot_duration || '30',
    start_time: settings.start_time || '',
    end_time: settings.end_time || '',
    file: settings.file || {},
    business_days: settings.business_days || '12345',
    sms_send: settings.sms_send || 0,
    fb_url: settings.fb_url || '',
    insta_url: settings.insta_url || '',
  })
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>([])

  const formik = useFormik({
    initialValues: data,
    validationSchema: settingsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setIsLoading(true)
      setSubmitting(false)
      values.business_days = checkedDays
      try {
        const response = await updateSettings(values, paymentMethods)
        const status = response.payload?.status
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setIsLoading(false)
        setSubmitting(true)
        NotifySuccess('Амжилттай хадгалагдлаа')
        refetch()
      }
    },
  })

  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.target.value)
  }

  const handleOnChangeTime = (field: string, value: any) => {
    value = Moment(value).format('HH:mm')
    formik.setFieldValue(field, value)
  }

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then((response) => {
      formik.setFieldValue(field, response)
    })
  }

  const updatePaymentMethods = (methods: Array<PaymentMethod>) => {
    setPaymentMethods(methods)
  }
  const weekDays = [
    {
      name: 'Даваа',
      value: '1',
    },
    {
      name: 'Мягмар',
      value: '2',
    },
    {
      name: 'Лхагва',
      value: '3',
    },
    {
      name: 'Пүрэв',
      value: '4',
    },
    {
      name: 'Баасан',
      value: '5',
    },
    {
      name: 'Бямба',
      value: '6',
    },
    {
      name: 'Ням',
      value: '0',
    },
  ]

  const [checkedDays, changeCheckedDays] = useState(formik.values.business_days as string)

  const handleWeekdayChange = (value: string) => {
    var updatedWeekdayState = ''
    if (checkedDays.includes(value)) {
      updatedWeekdayState = checkedDays.replace(value, '')
    } else {
      updatedWeekdayState = checkedDays + value
    }
    changeCheckedDays(updatedWeekdayState)
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto gap-7 gap-lg-10 w-lg-550px w-xl-700px mb-7 me-lg-5'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-title'>
              <h3 className='fw-bolder'>Ерөнхий мэдээлэл</h3>
            </div>
          </div>
          <form className='form' onSubmit={formik.handleSubmit} noValidate>
            <div className='card-body p-9'>
              <div className='row mb-5'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Лого</div>
                </div>
                <div className='col-lg-8'>
                  <DropzoneComponent setAcceptedImg={setFile} data={formik.values.logo} />
                  <input {...formik.getFieldProps('file')} hidden />
                  {/* <div className="form-text">Allowed file types: png, jpg, jpeg.</div> */}
                </div>
              </div>
              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>Байгууллагын нэр</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <input
                    type='text'
                    className='form-control'
                    {...formik.getFieldProps('company_name')}
                  />
                  {formik.touched.company_name && formik.errors.company_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.company_name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>Утас</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <NumberFormat
                    className='form-control'
                    {...formik.getFieldProps('phone')}
                    thousandSeparator={false}
                    allowLeadingZeros={false}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.phone}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>Имэйл</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <input
                    placeholder='Имэйл'
                    {...formik.getFieldProps('email')}
                    className={clsx(
                      'form-control form-control-lg form-control',
                      {'is-invalid': formik.touched.email && formik.errors.email},
                      {'is-valid': formik.touched.email && !formik.errors.email}
                    )}
                    type='email'
                    name='email'
                    autoComplete='off'
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.email}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>Ажлын цаг</div>
                </div>
                <div className='col-6 col-xl-4 fv-row'>
                  <Datetime
                    className='timePicker'
                    dateFormat={false}
                    timeFormat='HH:mm'
                    {...formik.getFieldProps('start_time')}
                    onChange={(val) => {
                      handleOnChangeTime('start_time', val)
                    }}
                  />
                </div>
                <div className='col-6 col-xl-4 fv-row'>
                  <Datetime
                    className='timePicker'
                    dateFormat={false}
                    timeFormat='HH:mm'
                    {...formik.getFieldProps('end_time')}
                    onChange={(val) => {
                      handleOnChangeTime('end_time', val)
                    }}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-xl-3 col-form-label fw-bold fs-6'>
                  Салбартай эсэх
                </label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                      className='form-check-input w-45px h-30px'
                      type='checkbox'
                      {...formik.getFieldProps('has_branch')}
                      checked={formik.values.has_branch}
                    />
                    <label className='form-check-label'></label>
                  </div>
                </div>
              </div>
              {!formik.values.has_branch && (
                <div className='row mb-6'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-bold mt-2 mb-3 required'>Ажиллах өдрүүд</div>
                  </div>
                  <div className='col-xl-8 fv-row'>
                    {weekDays.map(({name, value}, index) => {
                      return (
                        <div className='form-check form-check-inline' key={index}>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id={`business-days-${index}`}
                            checked={checkedDays.includes(value)}
                            onChange={() => handleWeekdayChange(value)}
                            value={value}
                          />
                          <label className='form-check-label' htmlFor='business_days'>
                            {name}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>
                    Ажилтанд цаг захиалгын имэйл илгээх
                  </div>
                </div>

                <div className='col-lg-8 d-flex align-items-center'>
                  <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                      className='form-check-input w-45px h-30px'
                      type='checkbox'
                      {...formik.getFieldProps('appointment_email_to_user')}
                      checked={formik.values.appointment_email_to_user}
                    />
                    <label className='form-check-label'></label>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Календарийн хугацаа</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <select
                    className='form-control'
                    {...formik.getFieldProps('slot_duration')}
                    onChange={(opt) => {
                      handleOnChange('slot_duration', opt)
                    }}
                  >
                    <option value='10'>10 мин</option>
                    <option value='15'>15 мин</option>
                    <option value='20'>20 мин</option>
                    <option value='30'>30 мин</option>
                    <option value='60'>60 мин</option>
                  </select>
                </div>
              </div>

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Үзлэгийн дундаж хугацаа</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <select
                    className='form-control'
                    {...formik.getFieldProps('default_duration')}
                    onChange={(opt) => {
                      handleOnChange('default_duration', opt)
                    }}
                  >
                    <option value='20'>20 мин</option>
                    <option value='30'>30 мин</option>
                    <option value='40'>40 мин</option>
                    <option value='60'>60 мин</option>
                    <option value='80'>80 мин</option>
                  </select>
                </div>
              </div>

              <div className='row mb-8'>
                <div className='col-lg-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 required'>Хаяг</div>
                </div>
                <div className='col-lg-8 fv-row'>
                  <textarea
                    className='form-control'
                    placeholder='Хаяг'
                    {...formik.getFieldProps('address')}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.address}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3 '>Фэйсбүүк хаягын холбоос /link/ </div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <input type='text' className='form-control' {...formik.getFieldProps('fb_url')} />
                </div>
              </div>

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Инстаграм хаягын холбоос /link/ </div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <input
                    type='text'
                    className='form-control'
                    {...formik.getFieldProps('insta_url')}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <div className='col-xl-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Ашиглалтын хугацаа</div>
                </div>
                <div className='col-xl-8 fv-row'>
                  <div className='position-relative d-flex align-items-center'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen014.svg'
                      className='svg-icon position-absolute ms-4 mb-1 svg-icon-2 '
                    />
                    <input
                      className='form-control ps-12'
                      disabled
                      {...formik.getFieldProps('limit_date_usage')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='reset' className='btn btn-light btn-active-light-primary me-2'>
                Цуцлах
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
              >
                <span className='indicator-label'>Хадгалах</span>
                {(formik.isSubmitting || isLoading) && (
                  <span className='indicator-progress'>
                    Түр хүлээнэ үү...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
        <PaymentMethods updatePaymentMethods={updatePaymentMethods} />
      </div>
    </div>
  )
}
