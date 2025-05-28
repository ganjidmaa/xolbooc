import * as Yup from 'yup'
import {useFormik} from 'formik'
import {ConvertFileToBase64, CRUD_RESPONSES, DropzoneComponent} from '../../../_metronic/helpers'
import {OnlineBookingSettings} from './core/_models'
import {FC, useState} from 'react'
import {updateBookingSettings} from './core/_requests'
import {NotifySuccess} from '../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../_metronic/helpers/alerts/Error'
import {useAuth} from '../auth'
import {NumericFormat as NumberFormat} from 'react-number-format'

const settingsSchema = Yup.object().shape({
  location: Yup.string().required('Байгууллагын хаяг оруулна уу'),
  about: Yup.string().required('Байгууллагын тухай мэдээлэл оруулна уу'),
})

type Props = {
  bookingSettings: OnlineBookingSettings
}

export const BookingSettingsDetail: FC<Props> = ({bookingSettings}) => {
  const {refetch} = useAuth()
  const {settings} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [themeColor, setThemeColor] = useState(bookingSettings.theme_color || 'baige')
  const [theme, setTheme] = useState(bookingSettings.theme_selection || 1)

  const [data] = useState<OnlineBookingSettings>({
    ...bookingSettings,
    image: bookingSettings.image || [],
    choose_user: bookingSettings.choose_user || false,
    choose_qpay: bookingSettings.choose_qpay || false,
    choose_autoDiscard: bookingSettings.choose_autoDiscard || false,
    about: bookingSettings.about || '',
    important_info: bookingSettings.important_info || '',
    location: bookingSettings.location || '',
    file: bookingSettings.file || [],
    group_booking: bookingSettings.group_booking || false,
    group_booking_limit: bookingSettings.group_booking_limit || 0,
    theme_color: bookingSettings.theme_color || 'baige',
    theme_selection: bookingSettings.theme_selection || 1,
  })

  const formik = useFormik({
    initialValues: data,
    validationSchema: settingsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setIsLoading(true)
      setSubmitting(false)
      values.validate_amount = values.validate_amount ? values.validate_amount.replaceAll(',', '') : '0'
      values.theme_color = themeColor
      values.theme_selection = theme
      try {
        const response = await updateBookingSettings(values)
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

  const setFile = (field: string, value: any) => {
    let base64_files: string[] = []
    value.forEach((fileData: any) => {
      ConvertFileToBase64(fileData).then((response) => {
        base64_files.push(response as string)
      })
    })

    formik.setFieldValue(field, base64_files)
  }

  var currentURL = window.location.href
  var searchStr = '/booking-settings/online-booking'
  var replace = '/booking'
  var regex = new RegExp(searchStr, 'g')
  var onlineLink = currentURL.replace(regex, replace)

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title fs-3 fw-bolder'>Ерөнхий мэдээлэл</div>
      </div>
      {formik.values?.choose_qpay && (
        <div className='my-10 mx-4 mx-md-20 notice bg-light-warning rounded border-warning border p-4 fs-6'>
          <h3 className='text-center'>Урьдчилгаа төлбөртэй холбоотой анхаарах зүйлс</h3>
          <ul>
            <li className='mb-2'>
              Зарим үед манай програмаас үл хамааран Qpay-ийн холболт, банкны сүлжээний доголдол
              болон бусад зүйлсийн улмаас хэрэглэгчийн данснаас төлбөр гарсан боловч захиалга
              баталгаажаагүй байх магадлалтай.
            </li>
            <li>
              Урьдчилгаа төлбөр нь "Нэр Утас uridchilgaa" гэсэн гүйлгээний утгатай хийгдэнэ. <br />
              Жишээ нь: <strong>Солонго 89****** uridchilgaa</strong>
              <br />
              Дээрх загвараар өөрийн данснаас гүйлгээг баталгаажуулах боломжтой.
            </li>
            <li>
              <strong>Цаг захиалгыг автоматаар цуцлах</strong> сонголтыг хийснээр урьдчилгаа төлбөр
              баталгаажуулаагүй хэрэглэгчийн захиалгыг 30 минутын дараа автоматаар устгана.
            </li>
          </ul>
        </div>
      )}
      <form className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='card-body p-9'>
          <div className='row mb-5'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Нүүр зураг</div>
            </div>

            <div className='col-lg-8'>
              <DropzoneComponent
                setAcceptedImg={setFile}
                data={formik.values.image}
                isMultiple={true}
              />
              <input {...formik.getFieldProps('file')} hidden />
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            </div>
          </div>

          <div className='row mb-8 d-lg-flex align-items-center'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Ажилтан сонгуулах эсэх</div>
            </div>

            <div className='col-lg-8 fv-row'>
              <div className='form-check form-check-solid form-switch fv-row'>
                <input
                  className='form-check-input w-45px h-30px'
                  type='checkbox'
                  {...formik.getFieldProps('choose_user')}
                  checked={formik.values.choose_user}
                />
                <label className='form-check-label'></label>
              </div>
            </div>
          </div>
          {/* <div className='row mb-8 d-lg-flex align-items-center'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Загвар</div>
            </div>

            <div className='col-lg-8 fv-row'>
              <div className='d-flex gap-4 gap-sm-10'>
                <div className='form-check form-check-custom form-check-solid form-check-lg'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='theme'
                    id='flexThemeCheckboxSm1'
                    checked={theme === 1}
                    onChange={() => setTheme(1)}
                  />
                  <label className='form-check-label' htmlFor='flexThemeCheckboxSm1'>
                    Загвар 1
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid form-check-lg'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='theme'
                    id='flexThemeCheckboxSm2'
                    checked={theme === 2}
                    onChange={() => setTheme(2)}
                  />
                  <label className='form-check-label' htmlFor='flexThemeCheckboxSm2'>
                    Загвар 2
                  </label>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className='row mb-8 d-lg-flex align-items-center'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Загварын өнгө</div>
            </div>

            <div className='col-lg-8 fv-row'>
              <div className='d-flex gap-4 gap-sm-10'>
                <div className='form-check form-check-custom form-check-solid form-check-lg'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='theme_color'
                    id='flexCheckboxSm1'
                    checked={themeColor === 'baige'}
                    onChange={() => setThemeColor('baige')}
                  />
                  <label
                    className='form-check-label'
                    style={{
                      width: 38,
                      height: 20,
                      backgroundColor: '#ffe8d1',
                      border: '2px solid #ffe8d1',
                      borderRadius: 3,
                    }}
                    htmlFor='flexCheckboxSm1'
                  ></label>
                </div>
                <div className='form-check form-check-custom form-check-solid form-check-lg'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='theme_color'
                    id='flexCheckboxSm2'
                    checked={themeColor === 'blue'}
                    onChange={() => setThemeColor('blue')}
                  />
                  <label
                    className='form-check-label'
                    style={{
                      width: 38,
                      height: 20,
                      backgroundColor: '#c0efff',
                      border: '2px solid #c0efff',
                      borderRadius: 3,
                    }}
                    htmlFor='flexCheckboxSm2'
                  ></label>
                </div>
                <div className='form-check form-check-custom form-check-solid form-check-lg'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='theme_color'
                    id='flexCheckboxSm3'
                    checked={themeColor === 'teal'}
                    onChange={() => setThemeColor('teal')}
                  />
                  <label
                    className='form-check-label'
                    style={{
                      width: 38,
                      height: 20,
                      backgroundColor: '#d2d9e3',
                      border: '2px solid #d2d9e3',
                      borderRadius: 3,
                    }}
                    htmlFor='flexCheckboxSm3'
                  ></label>
                </div>
              </div>
            </div>
          </div> */}
          {settings?.use_qpay === 1 && (
            <div className='row mb-8 d-lg-flex align-items-center'>
              <div className='col-lg-3'>
                <div className='fs-6 fw-bold mt-2 mb-3'>Урьдчилгаа төлбөр авах эсэх (QPAY)</div>
              </div>

              <div className='col-lg-3 fv-row'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    {...formik.getFieldProps('choose_qpay')}
                    checked={formik.values.choose_qpay}
                  />
                  <label className='form-check-label'></label>
                </div>
              </div>

              {formik.values.choose_qpay && (
                <>
                  <div className='col-lg-2'>
                    <div className='fs-6 fw-bold mt-2 mb-3'>Урьдчилгаа төлбөр</div>
                  </div>

                  <div className='col-lg-3 fv-row'>
                    <NumberFormat
                      placeholder='Мөнгөн дүн'
                      className="form-control"
                      suffix='₮'
                      {...formik.getFieldProps('validate_amount')}
                      thousandSeparator={true}
                  />
                    <label className='form-check-label'></label>
                    {formik.touched.validate_amount && formik.errors.validate_amount && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.validate_amount}</div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {formik.values.choose_qpay && settings?.use_qpay === 1 && (
            <>
              <div className='row mb-8 d-lg-flex align-items-center'>
                <div className='col-lg-3'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>
                    Цаг захиалгыг автоматаар цуцлах{' '}
                    <span className='fw-light d-lg-block'>
                      ( Урьдчилгаа төлбөр төлөгдөөгүй тохиолдолд )
                    </span>
                  </div>
                </div>

                <div className='col-lg-8 fv-row'>
                  <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                      className='form-check-input w-45px h-30px'
                      type='checkbox'
                      {...formik.getFieldProps('choose_autoDiscard')}
                      checked={formik.values.choose_autoDiscard}
                    />
                    <label className='form-check-label'></label>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className='row mb-8 d-lg-flex align-items-center'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Давхар захиалга авах</div>
            </div>

            <div className='col-lg-3 fv-row'>
              <div className='form-check form-check-solid form-switch fv-row'>
                <input
                  className='form-check-input w-45px h-30px'
                  type='checkbox'
                  {...formik.getFieldProps('group_booking')}
                  checked={formik.values.group_booking}
                />
                <label className='form-check-label'></label>
              </div>
            </div>
            {formik.values.group_booking && (
              <>
                <div className='col-lg-2'>
                  <div className='fs-6 fw-bold mt-2 mb-3'>Захиалгын тоо хязгаарлах</div>
                </div>

                <div className='col-lg-3 fv-row'>
                  <NumberFormat
                    className='form-control'
                    placeholder='Захиалгын тооны хязгаар'
                    {...formik.getFieldProps('group_booking_limit')}
                    thousandSeparator={false}
                    allowLeadingZeros={false}
                  />
                </div>
              </>
            )}
          </div>

          <div className='row mb-8'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3 required'>Бидний тухай</div>
            </div>
            <div className='col-lg-8 fv-row'>
              <textarea
                className='form-control'
                placeholder='Нүүр хуудсанд гарах дэлгэрэнгүй мэдээлэл'
                {...formik.getFieldProps('about')}
              />
              {formik.touched.about && formik.errors.about && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.about}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-8'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3 required'>Анхааруулга текст</div>
            </div>
            <div className='col-lg-8 fv-row'>
              <textarea
                className='form-control'
                placeholder='Анхааруулах тэмдэглэл'
                {...formik.getFieldProps('important_info')}
              />
            </div>
          </div>
          <div className='row mb-8'>
            <div className='col-lg-3'>
              <div className='fs-6 fw-bold mt-2 mb-3'>Онлайн захиалгын холбоос</div>
            </div>
            <div className='col-lg-8 fv-row'>
              <h4>
                <a href={onlineLink}>{onlineLink}</a>
              </h4>
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
  )
}
