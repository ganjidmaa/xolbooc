import React, {useEffect, useState} from 'react'
import Datetime from 'react-datetime'
import Select from 'react-select'
import {useCalendarData} from './core/ShiftMasterDataProvider'
import {Schedule, ScheduleData} from './core/_models'
import Moment from 'moment'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {NotifyError} from '../../../_metronic/helpers/notify/NotifyError'
import {ErrorAlert} from '../../../_metronic/helpers/alerts/Error'
import {CRUD_RESPONSES} from '../../../_metronic/helpers'
import {NotifySuccess} from '../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../_metronic/helpers/alerts/Warning'
import {storeShift} from './core/_requests'
import {useTimeOffData} from './core/TimeOffProvider'
import {TimeOffModal} from './time-off-modal/TimeOffModal'
import {useAuth} from '../auth'
import {useNavigate} from 'react-router-dom'

const datePickerProps = {
  className: 'form-control bg-body',
}

const scheduleSchema = Yup.object().shape({
  // start_date: Yup.string()
  //   .min(3, 'Багадаа 3 тэмдэгт байна')
  //   .max(50, 'Ихдээ 50 тэмдэгт байна')
  //   .required('Нэр оруулна уу'),
})

const ScheduleForm: React.FC = () => {
  const {timeOffIdForUpdate, setTimeOffIdForUpdate} = useTimeOffData()
  const {branches, users} = useCalendarData()
  const [selectedUserId, setSelectedUserId] = useState(0)
  const [selectedBranchId, setSelectedBranchId] = useState(0)
  const [startDate, setStartDate] = useState(Moment().format('YYYY/MM/DD'))
  const [endDate, setEndDate] = useState(Moment().add(1, 'year').format('YYYY/MM/DD'))
  const [loading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('00:00')
  const [checkedDays, changeCheckedDays] = useState('')
  const {settings} = useAuth()
  const navigate = useNavigate()

  const [schedule, setSchedule] = useState<Schedule>({
    monday: {enabled: false, start: startTime, end: endTime, name: 'Monday', dayIndex: 1},
    tuesday: {enabled: false, start: startTime, end: endTime, name: 'Tuesday', dayIndex: 2},
    wednesday: {enabled: false, start: startTime, end: endTime, name: 'Wednesday', dayIndex: 3},
    thursday: {enabled: false, start: startTime, end: endTime, name: 'Thursday', dayIndex: 4},
    friday: {enabled: false, start: startTime, end: endTime, name: 'Friday', dayIndex: 5},
    saturday: {enabled: false, start: startTime, end: endTime, name: 'Saturday', dayIndex: 6},
    sunday: {enabled: false, start: startTime, end: endTime, name: 'Sunday', dayIndex: 0},
  })

  const [data] = useState<ScheduleData>({
    schedule,
    start_date: startDate,
    end_date: endDate,
    user_id: selectedUserId,
    branch_id: selectedBranchId,
  })

  useEffect(() => {
    if (settings?.has_branch && selectedBranchId) {
      let branch = branches.find((branch) => branch.id === selectedBranchId)
      setStartTime(branch?.start_time || '00:00')
      setEndTime(branch?.end_time || '00:00')
      changeCheckedDays(branch?.business_days || '')
    } else {
      settings && settings.start_time && setStartTime(settings.start_time)
      settings && settings.end_time && setEndTime(settings.end_time)
      changeCheckedDays(settings?.business_days || '')
    }
  }, [selectedBranchId, settings, branches])

  useEffect(() => {
    setSchedule({
      monday: {
        enabled: checkedDays.includes('1'),
        start: startTime,
        end: endTime,
        name: 'Даваа',
        dayIndex: 1,
      },
      tuesday: {
        enabled: checkedDays.includes('2'),
        start: startTime,
        end: endTime,
        name: 'Мягмар',
        dayIndex: 2,
      },
      wednesday: {
        enabled: checkedDays.includes('3'),
        start: startTime,
        end: endTime,
        name: 'Лхагва',
        dayIndex: 3,
      },
      thursday: {
        enabled: checkedDays.includes('4'),
        start: startTime,
        end: endTime,
        name: 'Пүрэв',
        dayIndex: 4,
      },
      friday: {
        enabled: checkedDays.includes('5'),
        start: startTime,
        end: endTime,
        name: 'Баасан',
        dayIndex: 5,
      },
      saturday: {
        enabled: checkedDays.includes('6'),
        start: startTime,
        end: endTime,
        name: 'Бямба',
        dayIndex: 6,
      },
      sunday: {
        enabled: checkedDays.includes('0'),
        start: startTime,
        end: endTime,
        name: 'Ням',
        dayIndex: 0,
      },
    })
  }, [startTime, endTime, checkedDays])

  const handleCheckboxChange = (day: keyof Schedule) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled: !schedule[day].enabled,
      },
    })
  }

  const handleShiftChange = (day: keyof Schedule, field: string, value: string) => {
    const shift = {[field]: value}

    setSchedule({
      ...schedule,
      [day]: {...schedule[day], ...shift},
    })
  }

  const formik = useFormik({
    initialValues: data,
    validationSchema: scheduleSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setLoading(true)
      setSubmitting(false)
      try {
        values.branch_id = selectedBranchId
        values.start_date = startDate
        values.end_date = endDate
        values.user_id = selectedUserId
        values.schedule = schedule

        const response = await storeShift(values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        status && status === 201 && NotifyError(CRUD_RESPONSES.role_limit)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setLoading(false)
        setSubmitting(true)
        // refetch()
      }
    },
  })

  return (
    <div className='card'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Цагийн хуваарь</h3>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        <div className='card-body border-top p-9 pt-4'>
          <div className='fs-6 d-flex flex-column flex-xl-row'>
            <div className='col-lg-4 card-body border mb-8 mb-xl-0'>
              {/* <button onClick={(e) => {setTimeOffIdForUpdate(null)}} type='button'>
                  XXX
                  </button> */}

              {settings && settings.has_branch && (
                <div className='col-10 fv-row mb-6'>
                  <label className='fs-6 fw-bold mb-2 required'>Салбар</label>

                  <Select
                    options={branches}
                    id='branch_id'
                    value={
                      branches && selectedBranchId
                        ? branches.filter((branch) => branch.value === selectedBranchId)[0]
                        : []
                    }
                    onChange={(opt) => {
                      setSelectedBranchId(opt?.value as number)
                    }}
                  />
                </div>
              )}
              <div className='col-10 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2 required'>Ажилтан</label>

                <Select
                  options={users}
                  id='user_id'
                  value={
                    users && selectedUserId
                      ? users.filter((user) => user.value === selectedUserId)[0]
                      : []
                  }
                  onChange={(opt) => {
                    setSelectedUserId(opt?.value as number)
                  }}
                />
              </div>

              <div className='col-10 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2 required'>Эхлэх огноо</label>

                <div className='d-flex align-items-center position-relative'>
                  <Datetime
                    className='col-12'
                    timeFormat={false}
                    dateFormat='YYYY/MM/DD'
                    initialValue={startDate}
                    inputProps={datePickerProps}
                    onChange={(val) => {
                      setStartDate(Moment(val).format('YYYY/MM/DD'))
                    }}
                  />
                </div>
              </div>

              <div className='col-10 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2 required'>Дуусах огноо</label>

                <div className='d-flex align-items-center position-relative'>
                  <Datetime
                    className='col-12'
                    timeFormat={false}
                    dateFormat='YYYY/MM/DD'
                    initialValue={endDate}
                    inputProps={datePickerProps}
                    onChange={(val) => {
                      setEndDate(Moment(val).format('YYYY/MM/DD'))
                    }}
                  />
                </div>
              </div>

              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  className='btn btn-secondary me-2'
                  onClick={() => navigate('/shift/schedules')}
                >
                  Буцах
                </button>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {!loading && 'Хадгалах'}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Түр хүлээнэ үү...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className='col-lg-7 card-body border flex-lg-row-fluid ms-lg-15'>
              {Object.entries(schedule).map(([day, data]) => {
                return (
                  <div className='row mb-5 mt-3' key={day}>
                    <div className='col-4'>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input me-1 me-sm-4'
                          type='checkbox'
                          id={`business-days-${day}`}
                          checked={data.enabled}
                          onChange={() => handleCheckboxChange(day as keyof Schedule)}
                        />
                        <label className='form-check-label fw-bold' htmlFor='business_days'>
                          {data.name}
                        </label>
                      </div>
                    </div>
                    <div className='col-8'>
                      {data.enabled && (
                        <div className='row'>
                          <div className='col-6 col-xl-6'>
                            <Datetime
                              className='timePicker'
                              dateFormat={false}
                              timeFormat='HH:mm'
                              value={data.start}
                              onChange={(e) =>
                                handleShiftChange(
                                  day as keyof Schedule,
                                  'start',
                                  Moment(e).format('HH:mm')
                                )
                              }
                            />
                          </div>
                          <div className='col-6 col-xl-6'>
                            <Datetime
                              className='timePicker'
                              dateFormat={false}
                              timeFormat='HH:mm'
                              value={data.end}
                              onChange={(e) =>
                                handleShiftChange(
                                  day as keyof Schedule,
                                  'end',
                                  Moment(e).format('HH:mm')
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                      {!data.enabled && (
                        <div
                          className='text-muted'
                          style={{
                            height: '43px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Ажиллахгүй өдөр
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </form>
      {timeOffIdForUpdate !== undefined && <TimeOffModal />}
    </div>
  )
}

export default ScheduleForm
