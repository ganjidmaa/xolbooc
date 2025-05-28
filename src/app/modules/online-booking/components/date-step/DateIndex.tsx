import {Link} from 'react-router-dom'
import Moment from 'moment'
import clsx from 'clsx'
import {useCalendarItem} from '../../core/CalendarItemProvider'
import {useCalendarData} from '../../core/CalendarDataProvider'
import {useAuth} from '../../../auth'
import {TimeItem} from './TimeItem'
import {useContext, useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {getAvailableHours} from '../../core/_requests'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BookingCard} from '../../BookingCard'
import {Settings} from '../../../user-management/accounts/components/settings/Settings'
import { AvailableHours, Hour } from '../../core/_models'

export const DateIndex = () => {
  const {itemDatas, setItemDatas, setActiveTab, activeTab} = useCalendarItem()
  const [hours, setHours] = useState<AvailableHours>()
  const [eventDate, setEventDate] = useState(itemDatas.event_date || Moment().format('YYYY/MM/DD'))
  const [firstRender, setFirstRender] = useState(true)
  const enabledQuery: boolean = firstRender
  const weekends = [
    {value: 1, name: 'Да'},
    {value: 2, name: 'Мя'},
    {value: 3, name: 'Лх'},
    {value: 4, name: 'Пү'},
    {value: 5, name: 'Ба'},
    {value: 6, name: 'Бя'},
    {value: 0, name: 'Ня'},
  ]
  const dateLength = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  var businessDays: string;    
  const {settings} = useAuth()
  if (settings?.has_branch as boolean == true) {
    businessDays = itemDatas.branch?.business_days as string
  } else {
    businessDays = settings?.business_days as string
  }

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
    setItemDatas({...itemDatas, event_date: eventDate})
  }, [])

  const {refetch,isLoading, data: response} = useQuery(
    `${QUERIES.ONLINE_BOOKING}-available_hours`,
    () => {
      const getAvailableHourRequest = {branch_id: itemDatas.branch?.id, service_ids: itemDatas.service_ids, user: itemDatas.user?.id, event_date: eventDate}
      return getAvailableHours(getAvailableHourRequest)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
    }
  )

  useEffect(() => {
    if (response) {
      setHours(response)
    }
  }, [response])

  useEffect(() => {
    refetch()
  }, [eventDate])

  return (
    <BookingCard
      title='Цаг авах өдрөө сонгоно уу'
      subTitle={
        Moment().format('YYYY/MM/DD') +
        ' - ' +
        Moment()
          .add(dateLength.length - 1, 'days')
          .format('YYYY/MM/DD')
      }
      body={
        <>
          <ul className='nav nav-pills d-flex flex-wrap hover-scroll-x py-2 justify-content-center justify-content-lg-start justify-content-xl-center'>
            {dateLength.map((dateIndex) => {
              const calendarDate = Moment().add(dateIndex, 'days')
              const weekDay = calendarDate.day()
              const weekName = weekends.filter((weekend) => weekend.value === weekDay)[0].name
              if (businessDays.includes(weekDay + '')) {
                return (
                  <li
                    className='nav-item me-1'
                    key={dateIndex}
                    style={{marginTop: 5}}
                    onClick={() => handleDate(calendarDate.format('YYYY/MM/DD'))}
                  >
                    <Link
                      data-bs-toggle='tab'
                      to='#'
                      className={clsx(
                        'nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary',
                        {
                          'border border-primary': true,
                          active: eventDate === calendarDate.format('YYYY/MM/DD'),
                        }
                      )}
                    >
                      <span className={`opacity-50 fs-7 fw-semibold ${eventDate !== calendarDate.format('YYYY/MM/DD') && dateIndex === 0 && 'text-primary'}`}>{weekName}</span>
                      <span className={`fs-6 fw-bold ${eventDate !== calendarDate.format('YYYY/MM/DD') && dateIndex === 0 && 'text-primary'}`}>{calendarDate.format('DD')}</span>
                    </Link>
                  </li>
                )
              } else {
                return <></>
              }
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
  )
}
