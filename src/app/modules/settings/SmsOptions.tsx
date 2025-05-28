import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  CRUD_RESPONSES,
  quillModules,
} from '../../../_metronic/helpers'
import {Settings} from './core/_models'
import {FC, useState} from 'react'
import {updateSettings} from './core/_requests'
import {NotifySuccess} from '../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../_metronic/helpers/alerts/Error'
import {useAuth} from '../auth'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TinyEditor } from '../../../_metronic/helpers/components/TinyEditor'


const settingsSchema = Yup.object().shape({
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

export const SmsOptions: FC = () => {
    const {settings, refetch} = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [data] = useState<Settings>({
        ...settings as Settings,
        sms_send: settings?.sms_send || 0,
        file: settings?.file || {}
    })

    const formik = useFormik({
        initialValues: data,
        validationSchema: settingsSchema,
        onSubmit: async (values, {setSubmitting}) => {
        setIsLoading(true)
        setSubmitting(false)
        try {
            const response = await updateSettings(values, [])
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


    return (
        <div className='d-flex flex-column flex-lg-row'>
        <div className='flex-column flex-lg-row-auto w-100 w-xl-80 mb-7 me-lg-5'>
            <div className='card'>
            <div className='card-header'>
                <div className='card-title'>
                <h3 className='fw-bolder'>Мессеж тохиргоо</h3>
                </div>
            </div>
            <form className='form' onSubmit={formik.handleSubmit} noValidate>
                <div className='card-body p-9'>
                    {formik.values.sms_send === 1 && (
                        <>
                        <div className='row mb-6'>
                            <div className='col-xl-3'>
                                <div className='fs-6 fw-bold mt-2 mb-3 required'>Цаг захиалгын сануулга</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                                <textarea
                                    placeholder='Цаг захиалгын сануулга'
                                    className='form-control'
                                    {...formik.getFieldProps('daily_sms_reminder_txt')}
                                />
                                {formik.touched.daily_sms_reminder_txt && formik.errors.daily_sms_reminder_txt && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                        {formik.errors.daily_sms_reminder_txt}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <div className='col-xl-3'>
                                <div className='fs-6 fw-bold mt-2 mb-3 required'>Илгээх хугацаа <br/> / мин /</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                                <input
                                    type='number'
                                    className='form-control'
                                    {...formik.getFieldProps('daily_sms_reminder_minutes')}
                                />
                                {formik.touched.daily_sms_reminder_minutes && formik.errors.daily_sms_reminder_minutes && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                        {formik.errors.daily_sms_reminder_minutes}
                                        </div>
                                    </div>
                                )}  
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <div className='col-xl-3'>
                            <div className='fs-6 fw-bold mt-2 mb-3 required'>Давтан ирэх сануулга</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                                <textarea
                                    placeholder='Давтан ирэх сануулга'
                                    className='form-control'
                                    {...formik.getFieldProps('monthly_sms_reminder_txt')}
                                />
                                {formik.touched.monthly_sms_reminder_txt && formik.errors.monthly_sms_reminder_txt && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                        {formik.errors.monthly_sms_reminder_txt}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mb-4'>
                            <div className='col-xl-3'>
                            <div className='fs-6 fw-bold mt-2 mb-3 required'>Илгээх хугацаа <br/> / өдрөөр /</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                                <input
                                    type='number'
                                    className='form-control'
                                    {...formik.getFieldProps('monthly_sms_reminder_months')}
                                />
                                {formik.touched.monthly_sms_reminder_months && formik.errors.monthly_sms_reminder_months && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                        {formik.errors.monthly_sms_reminder_months}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <div className='col-xl-3'>
                                <div className='fs-6 fw-bold mt-2 mb-3'>Онлайн захиалга баталгаажсан үед</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                                <textarea
                                    placeholder='Цаг захиалга амжилттай хийгдсэн үед'
                                    className='form-control'
                                    {...formik.getFieldProps('online_booking_sms_text')}
                                />
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <div className='col-xl-3'>
                            <div className='fs-6 fw-bold mt-2 mb-3'>Мэссэжийн түлхүүр үг</div>
                            </div>
                            <div className='col-xl-3 fv-row'>
                                <span>$customer - үйлчлүүлэгчийн нэр</span><br />
                                <span>$user     - гоо сайханчийн нэр</span><br />
                            </div>
                            <div className='col-xl-3 fv-row'>
                                <span>$time     - үйлчилгээний цаг</span><br />
                                <span>$tel      - байгууллагын дугаар</span><br />
                            </div>
                            <div className='col-xl-3 fv-row'>
                                <span>$date     - үйлчилгээний огноо</span><br />
                                <span>$company  - байгууллагын нэр</span>
                            </div>
                        </div>

                        <div className='row mb-4'>
                            <div className='col-xl-3'>
                                <div className='fs-6 fw-bold mt-2 mb-3'>Имэйлийн нэмэлт мэдээлэл</div>
                            </div>
                            <div className='col-xl-8 fv-row'>
                            <TinyEditor
                                    value={formik.values.online_booking_email_info || ''}
                                    setValue={(content) => formik.setFieldValue('online_booking_email_info', content)}
                                    height={400}
                                    />
                            </div>
                        </div>
                        </>
                    )}
                </div>

                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                    <button type='reset' className='btn btn-light btn-active-light-primary me-2'>
                        Цуцлах
                    </button>
                    <button type='submit' className='btn btn-primary'
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
        
        </div>
    )
}
