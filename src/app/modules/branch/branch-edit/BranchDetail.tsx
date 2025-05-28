import * as Yup from 'yup'
import {useFormik} from 'formik'
import Datetime from 'react-datetime'
import Moment from 'moment'
import {Branch} from '../core/_models'
import {FC, useState} from 'react'
import {NotifySuccess} from '../../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../_metronic/helpers/alerts/Error'
import {CRUD_RESPONSES} from '../../../../_metronic/helpers'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {createBranch, updateBranch} from '../core/_requests'
import {useNavigate} from 'react-router-dom'
import {useQueryResponse} from '../branches-list/provider/QueryResponseProvider'

const branchSchema = Yup.object().shape({
  name: Yup.string().required('Салбарын нэр оруулна уу'),
  address: Yup.string().required('Салбарын хаяг оруулна уу'),
  phone: Yup.string()
    .required('Утасны дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .min(8, '8 оронтой дугаар оруулна уу'),
  start_time: Yup.string().required('Салбарын ажиллах цаг оруулна уу'),
  end_time: Yup.string().required('Салбарын ажиллах цаг оруулна уу'),
  business_days: Yup.string().required('Ядаж нэг ажиллах өдөр сонгоно уу'),
})

type Props = {
  branch: Branch
}

export const BranchDetail: FC<Props> = ({branch}) => {
  const navigate = useNavigate()
  const {refetch} = useQueryResponse()
  const [isLoading, setIsLoading] = useState(false)
  const [data] = useState<Branch>({
    ...branch,
    name: branch.name || '',
    phone: branch.phone || '',
    address: branch.address || '',
    slot_duration: branch.slot_duration || '30',
    start_time: branch.start_time || '09:00',
    end_time: branch.end_time || '18:00',
    lunch_start_time: branch.lunch_start_time || '',
    lunch_end_time: branch.lunch_end_time || '',
    business_days: branch.business_days || '12345',
  })

  const formik = useFormik({
    initialValues: data,
    validationSchema: branchSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setIsLoading(true)
      setSubmitting(false)
      values.business_days = checkedDays
      try {
        var response: any = {}

        if (values.id) response = await updateBranch(values)
        else response = await createBranch(values)

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
        navigate('/branch/list')
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

  const cancel = () => {
    navigate(-1)
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
    if (checkedDays.includes(value)) {
      var updatedWeekdayState = checkedDays.replace(value, '')
    } else {
      var updatedWeekdayState = checkedDays + value
    }
    changeCheckedDays(updatedWeekdayState)
  }
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title fs-3 fw-bolder'>Дэлгэрэнгүй</div>
      </div>
      <form className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='card-body p-9'>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-bold mt-2 mb-3 required'>Салбарын нэр</div>
            </div>
            <div className='col-xl-8 fv-row'>
              <input type='text' className='form-control' {...formik.getFieldProps('name')} />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.name}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-bold mt-2 mb-3 required'>Салбарын утас</div>
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

          <div className='row mb-8'>
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

          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-bold mt-2 mb-3 required'>Ажлын өдрүүд</div>
            </div>
            <div className='col-xl-8 fv-row'>
              <div className='form-group'>
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
          </div>


            <div className='row mb-8'>
                <div className='col-xl-3'>
                    <div className='fs-6 fw-bold mt-2 mb-3'>Цайны цаг</div>
                </div>
                <div className='col-6 col-xl-4 fv-row'>
                    <Datetime
                        className='timePicker'
                        dateFormat={false}
                        timeFormat='HH:mm'
                        {...formik.getFieldProps('lunch_start_time')}
                        onChange={(val) => {
                        handleOnChangeTime('lunch_start_time', val)
                        }}
                    />
                </div>
                <div className='col-6 col-xl-4 fv-row'>
                    <Datetime
                        className='timePicker'
                        dateFormat={false}
                        timeFormat='HH:mm'
                        {...formik.getFieldProps('lunch_end_time')}
                        onChange={(val) => {
                        handleOnChangeTime('lunch_end_time', val)
                        }}
                    />
                </div>
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                          {"Цайны цагаар захиалга авдаг бол хоосон орхиж болно."}
                  </div>
                </div>
            </div>

            <div className='row mb-8'>
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
                  <option value='80'>80 мин</option>
                  <option value='100'>100 мин</option>
                  <option value='120'>120 мин</option>
                  <option value='140'>140 мин</option>
                  <option value='160'>160 мин</option>
                  <option value='180'>180 мин</option>
                  <option value='200'>200 мин</option>
                  <option value='240'>240 мин</option>
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
          
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button
            type='button'
            className='btn btn-light btn-active-light-primary me-2'
            onClick={() => cancel()}
          >
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
