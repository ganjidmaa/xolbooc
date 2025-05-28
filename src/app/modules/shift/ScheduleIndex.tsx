import React, {useEffect, useState} from 'react'
import {CRUD_RESPONSES, KTCard, KTCardBody} from '../../../_metronic/helpers'
import Moment from 'moment'
import Datetime from 'react-datetime'
import {getScheduleData} from './core/_requests'
import {ShiftHoursByUser} from './core/_models'
import {NotifyError} from '../../../_metronic/helpers/notify/NotifyError'
import {ErrorAlert} from '../../../_metronic/helpers/alerts/Error'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'

const datePickerProps = {
  className: 'form-control bg-body',
}

const ScheduleIndex: React.FC = () => {
  const navigate = useNavigate()
  const [dates, setDates] = useState<{startDate: string; endDate: string}>()
  const [schedules, setSchedules] = useState<ShiftHoursByUser[]>([])
  const [datesInRange, setDatesInRange] = useState<string[]>([])
  const [daysName, setDaysName] = useState<string[]>([])
  const [startDate, setStartDate] = useState(Moment().format('YYYY/MM/DD'))

  useEffect(() => {
    setDates({
      startDate: Moment(startDate).format('YYYY/MM/DD'),
      endDate: Moment(startDate).add(7, 'days').format('YYYY/MM/DD'),
    })
  }, [startDate])

  useEffect(() => {
    if (dates) {
      fetchSchedules()
      getDatesInRange()
    }
  }, [dates])

  const fetchSchedules = async () => {
    try {
      const response = await getScheduleData({...dates})
      const status = response.payload?.status
      const responseData = response.data as Array<ShiftHoursByUser>
      status && status === 200 && setSchedules(responseData)
    } catch (ex: any) {
      ex.response?.status === 422
        ? NotifyError(ex.response?.data?.message, 8000)
        : ErrorAlert(CRUD_RESPONSES.error)
    }
  }

  const convertEngToMn = (eng: string) => {
    const result =
      eng === 'Mon'
        ? 'Даваа'
        : eng === 'Tue'
        ? 'Мягмар'
        : eng === 'Wed'
        ? 'Лхагва'
        : eng === 'Thu'
        ? 'Пүрэв'
        : eng === 'Fri'
        ? 'Баасан'
        : eng === 'Sat'
        ? 'Бямба'
        : 'Ням'
    return result
  }

  function getDatesInRange() {
    if (!dates) return

    const startDate = Moment(dates.startDate)
    const endDate = Moment(dates.endDate).subtract(1, 'day')
    const dateRanges = []
    const dayNames = []
    let currentDate = Moment(startDate)

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      dateRanges.push(currentDate.format('YYYY/MM/DD'))
      dayNames.push(Moment(currentDate.format('YYYY/MM/DD')).format('ddd'))
      currentDate = currentDate.add(1, 'day')
    }
    setDatesInRange(dateRanges)
    setDaysName(dayNames)
  }

  return (
    <KTCard>
      <KTCardBody className='py-4'>
        <div>
          <div className='fw-bolder fs-6 text-gray-800'>
            <div className='text-star'>
              <div className='date-navigation'>
                {/* <IoIosArrowBack /> */}
                <div className='fv-row'>
                  <label className='fs-6 fw-bold mb-2'>Хугацааны завсар</label>

                  <div className='d-flex flex-column flex-sm-row'>
                    <div className='d-flex gap-2 align-items-center position-relative'>
                      <Datetime
                        className='col-6'
                        timeFormat={false}
                        dateFormat='YYYY/MM/DD'
                        initialValue={startDate}
                        inputProps={datePickerProps}
                        onChange={(val) => {
                          setStartDate(Moment(val).format('YYYY/MM/DD'))
                        }}
                      />
                      <span> - </span>
                      <div className='col-6'>
                        <div className='form-control bg-body'>{dates?.endDate}</div>
                      </div>
                    </div>
                    <div className='ms-0 ms-sm-auto mt-2 mt-sm-0'>
                      <button className='btn btn-primary' onClick={() => navigate('/shift/form')}>
                        <span className='indicator-label'>Үүсгэх</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <IoIosArrowForward /> */}
              </div>
            </div>
            {/* <th className='text-end bg-light px-2'>
                </th> */}
          </div>
        </div>
        <div className='py-5' style={{overflowX: 'auto'}}>
          <table className='table table-row-bordered table-rounded border table-row-gray-300'>
            <thead>
              <tr className='fw-bolder fs-6 text-gray-800 py-7 bg-light'>
                <th className='px-2'>Ажилтан</th>
                {datesInRange.map((day, index) => (
                  <th key={index} className='px-2 text-center' style={{minWidth: '100px'}}>
                    <div>
                      <div>{day}</div>
                      <div className='fw-lighter'>{convertEngToMn(daysName[index])}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedules.map((member) => (
                <tr key={member.id}>
                  <td>
                    {/* <img src={member.avatarUrl} alt={member.name} className="avatar" /> */}
                    <div
                      className='d-flex gap-2'
                      style={{paddingLeft: '4px', alignItems: 'center'}}
                    >
                      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                        <div
                          className={clsx(
                            'symbol-label fs-3',
                            `bg-light-${member.color}`,
                            `text-${member.color}`
                          )}
                        >
                          {member.name && member.name[0].toUpperCase()}
                        </div>
                      </div>
                      <div className='' style={{lineHeight: 1.2}}>
                        {member.name}
                      </div>
                      {/* <p className="hours">{member.hours}</p> */}
                    </div>
                    {/* <FaPencilAlt className="edit-icon" /> */}
                  </td>
                  {member.businessHours.map((shift, index) => (
                    <td key={index} className=''>
                      {shift !== ' - ' ? (
                        <div
                          className='p-2 m-2 rounded-2 text-center'
                          style={{backgroundColor: 'hsl(200,100%,94%)'}}
                        >
                          {shift}
                        </div>
                      ) : (
                        <div className=''></div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default ScheduleIndex
