import * as Yup from 'yup'
import { useFormik } from 'formik';
import { ConvertFileToBase64, CRUD_RESPONSES, DropzoneComponent } from '../../../_metronic/helpers';
import { OnlineBookingSettings } from './core/_models';
import { FC, useState } from 'react';
import { updateBookingSettings } from './core/_requests';
import { NotifySuccess } from '../../../_metronic/helpers/notify/NotifySuccess';
import { WarningAlert } from '../../../_metronic/helpers/alerts/Warning';
import { ErrorAlert } from '../../../_metronic/helpers/alerts/Error';
import { useAuth } from '../auth';
import { NumericFormat as NumberFormat } from 'react-number-format'

const settingsSchema = Yup.object().shape({
    location: Yup.string().required('Байгууллагын хаяг оруулна уу'),
    about: Yup.string().required('Байгууллагын тухай мэдээлэл оруулна уу'),
})

type Props = {
    bookingSettings: OnlineBookingSettings
}

export const BookingSettingsDetail: FC<Props> = ({bookingSettings}) => {
    const {refetch} = useAuth()
    const {settings, currentUser} = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const formattedAmount = Intl.NumberFormat('en-US').format(parseInt(bookingSettings.validate_amount?bookingSettings.validate_amount:'0')) + '₮';
    const [validateAmount, setValidateAmount] = useState(formattedAmount)
    const [data] = useState<OnlineBookingSettings>({
        ...bookingSettings,
        image: bookingSettings.image || [],
        choose_user: bookingSettings.choose_user || false,
        choose_qpay: bookingSettings.choose_qpay || false,
        choose_autoDiscard: bookingSettings.choose_autoDiscard || false,
        validate_amount: formattedAmount || '',
        about: bookingSettings.about || '',
        important_info: bookingSettings.important_info || '',
        location: bookingSettings.location || '',
        file: bookingSettings.file || {},
    })

    const formik = useFormik({
        initialValues: data,
        validationSchema: settingsSchema,
        onSubmit: async(values, {setSubmitting}) => {
            setIsLoading(true)
            setSubmitting(false)
            values.validate_amount = validateAmount
            try {
                const response = await updateBookingSettings(values)
                const status = response.payload?.status
                status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
            } catch (ex: any) {
                console.error(ex)
                ex.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            } finally {
                setIsLoading(false)
                setSubmitting(true)
                NotifySuccess('Амжилттай хадгалагдлаа')
                refetch()
            }
        },
    })

    const setFile = (field: string, value: any) => {
        ConvertFileToBase64(value[0]).then(response => {
          formik.setFieldValue(field, response)
        })
    }

    var currentURL = window.location.href;
    var searchStr = '/settings/online-booking';
    var replace = '/booking/index';
    var regex = new RegExp(searchStr, 'g');
    var onlineLink = currentURL.replace(regex, replace);


    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title fs-3 fw-bolder">Ерөнхий мэдээлэл</div>
            </div>
            <div className='my-10 mx-4 mx-md-20 notice bg-light-warning rounded border-warning border p-4 fs-6'>
                <h3 className='text-center'>Урьдчилгаа төлбөртэй холбоотой анхаарах зүйлс</h3>
                <ul>
                    <li className='mb-2'>
                        Зарим үед манай програмаас үл хамааран 
                        Qpay-ийн холболт, банкны сүлжээний доголдол болон бусад зүйлсийн 
                        улмаас хэрэглэгчийн данснаас төлбөр гарсан боловч захиалга баталгаажаагүй байх магадлалтай.
                    </li>
                    <li>
                        Урьдчилгаа төлбөр нь "Нэр Утас uridchilgaa" гэсэн гүйлгээний утгатай хийгдэнэ. <br/>
                        Жишээ нь: <strong>Солонго 89****** uridchilgaa</strong><br />
                        Дээрх загвараар өөрийн данснаас гүйлгээг баталгаажуулах боломжтой.
                    </li>
                    <li>
                        <strong>Цаг захиалгыг автоматаар цуцлах</strong> сонголтыг хийснээр урьдчилгаа төлбөр баталгаажуулаагүй хэрэглэгчийн захиалгыг 30 минутын дараа автоматаар устгана.
                    </li>
                </ul>
            </div>
            <form className="form" onSubmit={formik.handleSubmit} noValidate>
                <div className="card-body p-9">

                    <div className="row mb-5">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3">Нүүр зураг</div>
                        </div>
                        
                        <div className="col-lg-8">
                            <DropzoneComponent setAcceptedImg={setFile} data={formik.values.image}/>
                            <input {...formik.getFieldProps('file')} hidden/>
                            <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                        </div>
                    </div>

                    <div className="row mb-8 d-lg-flex align-items-center">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3">Ажилтан сонгуулах эсэх</div>
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
                    {settings?.use_qpay === 1 && (
                        <div className="row mb-8 d-lg-flex align-items-center">
                            <div className="col-lg-3">
                                <div className="fs-6 fw-bold mt-2 mb-3">Урьдчилгаа төлбөр авах эсэх (QPAY)</div>
                            </div>

                            <div className='col-lg-8 fv-row'>
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
                        </div>
                    )}
                    {formik.values.choose_qpay&&settings?.use_qpay === 1 && 
                        <>
                            <div className="row mb-8 d-lg-flex align-items-center">
                                <div className="col-lg-3">
                                    <div className="fs-6 fw-bold mt-2 mb-3">Цаг захиалгыг автоматаар цуцлах <span className='fw-light d-lg-block'>( Урьдчилгаа төлбөр төлөгдөөгүй тохиолдолд )</span></div>
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
                            <div className="row mb-8 d-lg-flex align-items-center">
                                <div className="col-lg-3">
                                    <div className="fs-6 fw-bold mt-2 mb-3">Урьдчилгаа төлбөр</div>
                                </div>

                                <div className='col-lg-8 fv-row w-200px'>
                                    <NumberFormat
                                        className="form-control"
                                        placeholder="Мөнгөн дүн"
                                        suffix='₮'
                                        onValueChange={(values:any) => {
                                            const {formattedValue, value} = values;
                                            setValidateAmount(value);
                                        }}
                                        value={formattedAmount}
                                        thousandSeparator=','
                                    />
                                    <label className='form-check-label'></label>
                                    {formik.touched.validate_amount && formik.errors.validate_amount && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.validate_amount}</div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </>
                    }
                    
                   
                    {/* <div className="row mb-8">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3 required">Хаяг</div>
                        </div>
                        <div className="col-lg-8 fv-row">
                            <input type="text" 
                                className="form-control" 
                                {...formik.getFieldProps('location')} 
                            />  
                            {formik.touched.location && formik.errors.location && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.location}</div>
                            </div>
                            )}                       
                        </div>
                    </div> */}

                    <div className="row mb-8">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3 required">Бидний тухай</div>
                        </div>
                        <div className="col-lg-8 fv-row">
                            <textarea
                                className="form-control" 
                                placeholder="Нүүр хуудсанд гарах дэлгэрэнгүй мэдээлэл" 
                                {...formik.getFieldProps('about')} 
                            />
                            {formik.touched.about && formik.errors.about && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.about}</div>
                            </div>
                            )}                         
                        </div>
                    </div>

                    <div className="row mb-8">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3 required">Анхааруулга текст</div>
                        </div>
                        <div className="col-lg-8 fv-row">
                            <textarea
                                className="form-control" 
                                placeholder="Анхааруулах тэмдэглэл" 
                                {...formik.getFieldProps('important_info')} 
                            />                      
                        </div>
                    </div>
                    <div className="row mb-8">
                        <div className="col-lg-3">
                            <div className="fs-6 fw-bold mt-2 mb-3">Онлайн захиалгийн холбоос</div>
                        </div>
                        <div className="col-lg-8 fv-row">
                            <h4><a href={onlineLink}>{onlineLink}</a></h4>
                        </div>
                    </div>
                        
                </div>
                
               
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <button type="reset" className="btn btn-light btn-active-light-primary me-2">Цуцлах</button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
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
