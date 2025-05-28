import {Link} from 'react-router-dom'
import Moment from 'moment'
import clsx from 'clsx'
import {useCalendarItem} from '../../core/CalendarItemProvider'
import {TimeItem} from './TimeItem'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {getAvailableDays, getAvailableHours} from '../../core/_requests'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BookingCard} from '../../BookingCard'
import {AvailableDays, AvailableHours} from '../../core/_models'

export const DateIndex = () => {
  const {itemDatas, setItemDatas, setActiveTab, activeTab} = useCalendarItem()
  const [days, setDays] = useState<AvailableDays>()
  const [hours, setHours] = useState<AvailableHours>()
  // const [eventDate, setEventDate] = useState(itemDatas.event_date || Moment().format('YYYY/MM/DD'))
  const [eventDate, setEventDate] = useState<string>()
  const [firstRender, setFirstRender] = useState(true)
  const enabledQuery: boolean = firstRender
  const enabledTimeQuery: boolean = false
  const weekends = [
    {value: 1, name: 'Да'},
    {value: 2, name: 'Мя'},
    {value: 3, name: 'Лх'},
    {value: 4, name: 'Пү'},
    {value: 5, name: 'Ба'},
    {value: 6, name: 'Бя'},
    {value: 0, name: 'Ня'},
  ]

  const handleDate = (date: string) => {
    setItemDatas({...itemDatas, event_date: date})
    setEventDate(date)
  }

  const handleTime = (time: string) => {
    setItemDatas({...itemDatas, start_time: time})

    if (itemDatas.event_date && time) {
      setActiveTab(activeTab + 1)
    }
  }

  useEffect(() => {
    setFirstRender(false)
    // setItemDatas({...itemDatas, event_date: eventDate})
  }, [])

  const {
    refetch: refetchDays,
    isLoading: isLoadingDays,
    data: daysResponse,
  } = useQuery(
    `${QUERIES.ONLINE_BOOKING}-available_days`,
    () => {
      const getAvailableDayRequest = {branch_id: itemDatas.branch?.id, user: itemDatas.user?.id}
      return getAvailableDays(getAvailableDayRequest)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
    }
  )

  const {
    refetch,
    isLoading,
    data: response,
  } = useQuery(
    `${QUERIES.ONLINE_BOOKING}-available_hours`,
    () => {
      const getAvailableHourRequest = {
        branch_id: itemDatas.branch?.id,
        service_ids: itemDatas.service_ids,
        user: itemDatas.user?.id,
        event_date: eventDate,
      }
      return getAvailableHours(getAvailableHourRequest)
    },
    {
      cacheTime: 0,
      enabled: enabledTimeQuery,
    }
  )

  useEffect(() => {
    if (daysResponse) {
      setDays(daysResponse)
    }
  }, [daysResponse])

  useEffect(() => {
    if (response) {
      setHours(response)
    }
  }, [response])

  useEffect(() => {
    if (eventDate) {
      refetch()
    }
  }, [eventDate])

  return (
    <>
      <BookingCard
        title='Цаг авах өдрөө сонгоно уу'
        subTitle={
          Moment().format('YYYY/MM/DD') + ' - ' + Moment().add(13, 'days').format('YYYY/MM/DD')
        }
        body={
          <>
            <ul className='nav nav-pills d-flex flex-wrap hover-scroll-x py-2 justify-content-center justify-content-lg-start justify-content-xl-center'>
              {days &&
                days.map((dateStr) => {
                  var calendarDate = Moment(dateStr.date)
                  var weekDay = calendarDate.day()
                  var weekName = weekends.filter((weekend) => weekend.value === weekDay)[0].name

                  return (
                    <li
                      className='nav-item me-1'
                      key={dateStr.date}
                      style={{marginTop: 5}}
                      onClick={() =>
                        dateStr.enabled && handleDate(calendarDate.format('YYYY/MM/DD'))
                      }
                    >
                      <Link
                        data-bs-toggle='tab'
                        to='#'
                        className={clsx(
                          'nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-dark text-hover-white',
                          {
                            'border border-dark text-dark': dateStr.enabled ? true : false,
                            'border border-secondary bg-secondary text-dark': !dateStr.enabled
                              ? true
                              : false,
                            active: eventDate === calendarDate.format('YYYY/MM/DD'),
                            disabled: !dateStr.enabled,
                          }
                        )}
                      >
                        <span
                          className={`opacity-50 fs-7 fw-semibold ${
                            eventDate === calendarDate.format('YYYY/MM/DD') && 'text-white'
                          }`}
                        >
                          {weekName}
                        </span>
                        <span
                          className={`fs-6 fw-bold ${
                            eventDate === calendarDate.format('YYYY/MM/DD') && 'text-white'
                          }`}
                        >
                          {calendarDate.format('DD')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
            </ul>
            <div className='py-2 justify-content-center px-3 px-xl-10 ms-1 ms-md-5'>
              {hours &&
                hours.map((hour, index) => {
                  return <TimeItem key={index} hour={hour.head_time} handleTime={handleTime} />
                })}
              {hours?.length === 0 && <div>Уг үйлчилгээг үзүүлэх боломжит цаг дууссан байна.</div>}
            </div>
          </>
        }
      />
      {/* {isLoading && <Loading />} */}
    </>
  )
}
