/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Moment from 'moment'
import ReactTooltip from 'react-tooltip'
import FullCalendar from '@fullcalendar/react'
import {formatDate} from '@fullcalendar/core'
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
// import timeGridPlugin from '@fullcalendar/timegrid';
// import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'

import {useCalendarView} from '../core/CalendarViewProvider'
import {getEvents, changeEvent, cancelEvent} from '../core/_requests'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {useCalendarData} from '../core/CalendarDataProvider'
import {useCalendarQuery} from '../core/CalendarQueryProvider'
import {User, Resource} from '../core/_models'
import {CRUD_RESPONSES, ID, ROLES} from '../../../../_metronic/helpers'
import {userCanCreateEvents, userCanUpdateEvents, userCanViewAllEvents} from '../core/consts'
import {NotifyWarning} from '../../../../_metronic/helpers/notify/NotifyWarning'
import {NotifyError} from '../../../../_metronic/helpers/notify/NotifyError'
import {useAuth} from '../../auth'
import {ErrorAlert} from '../../../../_metronic/helpers/alerts/Error'
import {InfoAlert} from '../../../../_metronic/helpers/alerts/Info'

var customDayNames = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба']
var customDayShortNames = ['Ня', 'Да', 'Мя', 'Лха', 'Пү', 'Ба', 'Бя']
const blockedTimeColor = '#708090'

const CustomHeaderNames = (gridType: string, dayIndex: number, date: Date) => {
  if (gridType === 'timeGridWeek' || gridType === 'resourceTimeline') {
    let weekDay = formatDate(date, {
      month: 'numeric',
      day: 'numeric',
    })
    return customDayShortNames[dayIndex] + ' ' + weekDay
  } else {
    return customDayNames[dayIndex]
  }
}

const style = {
  menuItemStyle: {
    width: 'auto',
    minWidth: '130px',
    left: '113px',
    top: '59px',
    backgroundColor: '#fff',
    zIndex: '100',
    boxShadow: '0px 4px 13px -2px #bbb',
    height: 'auto',
    maxHeight: '250px',
    overflow: 'scroll',
    borderRadius: '2px',
  },
  borderStyle: {
    borderRadius: '0px !important',
  },
}

const FullCalendarView: FC = () => {
  const navigate = useNavigate()
  const {currentUser, settings} = useAuth()
  const userRole: string = currentUser?.role || ''
  const loginUserId: number = currentUser?.id || 0

  const {USER} = ROLES
  const {eventStartDate, setEventStartDate, setEventIdForUpdate, setEventUserId, activeTab} =
    useCalendarView()
  const {setEventCustomer} = useCalendarQuery()
  const {resources, users, branches} = useCalendarData()
  const {setItemDatas} = useCalendarItem()
  const [userLists, setUserLists] = useState<any>([])
  const [events, setEvents] = useState<any>([])
  const [dates, setDates] = useState<{startDate: string; endDate: string}>()

  const [openMenu, setOpenMenu] = useState(false)
  const [filterTitle, setFilterTitle] = useState('Шүүлтүүр')
  const [slotMinTime, setSlotMinTime] = useState('')
  const [slotMaxTime, setSlotMaxTime] = useState('')
  const [slotDuration, setSlotDuration] = useState(settings?.slot_duration as string)
  const [businessDays, setBusinessDays] = useState('12345')

  useEffect(() => {
    setItemDatas([])
    setEventCustomer({})
    setDates({
      startDate: Moment().format('YYYY-MM-DD 00:00:00'),
      endDate: Moment().add(1, 'days').format('YYYY-MM-DD 00:00:00'),
    })
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      const newUsers = userCanViewAllEvents(userRole)
        ? settings?.has_branch
          ? users.filter((user) => (user.branch_id as string).includes(activeTab + ''))
          : users
        : users.filter((user) => user.id === loginUserId)
      setUserLists(newUsers)
    }
  }, [users, activeTab])

  useEffect(() => {
    if (settings?.has_branch) {
      const branch = branches.filter((branch) => branch.id === activeTab)[0]
      branch && branch.end_time && setSlotMaxTime(branch.end_time)
      branch && branch.start_time && setSlotMinTime(branch.start_time)
      branch && branch.slot_duration && setSlotDuration(branch.slot_duration)
      branch && branch.business_days && setBusinessDays(branch.business_days)
    } else {
      settings && settings.start_time && setSlotMinTime(settings.start_time)
      settings && settings.end_time && setSlotMaxTime(settings.end_time)
      settings && settings.business_days && setBusinessDays(settings.business_days)
    }
  }, [settings, activeTab, branches])

  useEffect(() => {
    if (dates) {
      userRole !== USER ? fetchEvents() : fetchEvents('user', loginUserId)
    }
  }, [dates, activeTab])

  const fetchEvents = async (type?: string, res_id?: ID) => {
    try {
      const params = type
        ? {...dates, type, res_id, branch_id: activeTab}
        : {...dates, branch_id: activeTab}
      const response = await getEvents(params)
      const status = response.payload?.status
      const responseEvents = response.data ? response.data : []
      status && status === 200 && setEvents(responseEvents)
    } catch (ex: any) {
      console.error(ex.response)
      ex.response?.status === 422
        ? NotifyError(ex.response?.data?.message, 8000)
        : ErrorAlert(CRUD_RESPONSES.error)
    }
  }

  const handleDelete = async (appointment_id: ID) => {
    const {value: buttonType} = await InfoAlert('Та устгахдаа итгэлтэй байна уу?', true)
    if (buttonType) {
      await cancelEvent(appointment_id, {cancel_type: 'time_block', status: 'time_block'})
      fetchEvents()
    }
  }

  const eventOnChange = (event: any) => {
    var start = Moment(event.start).format('YYYY-MM-DD HH:mm:ss')
    var end = Moment(event.end).format('YYYY-MM-DD HH:mm:ss')
    var appointment_id = event.id
    var resource_id = event._def.resourceIds[0]

    var request = {
      start_time: start,
      end_time: end,
      id: appointment_id,
      user_id: resource_id,
    }
    changeEvent(request)
  }

  const dateOnChange = (dateInfo: any) => {
    const dateInfoStart = Moment(dateInfo.start).format('YYYY-MM-DD HH:mm:ss')
    const dateInfoEnd = Moment(dateInfo.end).format('YYYY-MM-DD HH:mm:ss')
    if (dates && dateInfoStart !== dates.startDate && dateInfoEnd !== dates.endDate) {
      setDates({
        startDate: dateInfoStart,
        endDate: dateInfoEnd,
      })
    }
  }

  const filterResource = (resource: any, type: string) => {
    let filteredResources = []
    let filteredName = ''
    let resourceVal = 0

    if (resource.length === 0) {
      filteredResources =
        type === 'user' ? users.filter((user) => user.branch_id === activeTab) : resources
      filteredName = type === 'user' ? 'Бүх ажилтан' : 'Бүх нөөц'
    } else {
      filteredResources = [resource]
      filteredName = resource.label
      resourceVal = resource.value
    }

    setFilterTitle(filteredName)
    fetchEvents(type, resourceVal)
    setUserLists(filteredResources)
    setOpenMenu(!openMenu)
  }
  const[targetDate, setTargetDate] = useState<string | null>(null)
  useEffect(()=>{
    setTargetDate(sessionStorage.getItem('target_date'))
    sessionStorage.removeItem('target_date')
  },[sessionStorage.getItem('target_date')])
  useEffect(() => {
    window.Echo.private(`users.${currentUser?.id}`).notification(async (notification: any) => {
      if (notification.type === 'App\\Notifications\\EventsChanged') {
        var start_date = Date.parse(dates?.startDate as string)
        var end_date = Date.parse(dates?.endDate as string)
        var event_date = Date.parse(notification.data.event_date)
        if (
          notification.data.branch_id === activeTab &&
          event_date < end_date &&
          event_date > start_date
        ) {
          fetchEvents()
        }
      }
    })
  }, [dates])
  const CustomDropdown = () => {
    return (
      <div
        style={{...style.menuItemStyle, position: 'absolute'}}
        className='menu menu-column menu-rounded menu-state-bg menu-state-icon-primary'
      >
        <div className='menu-item'>
          <div
            className='d-flex flex-stack py-2 px-4 text-gray-700 fw-bolder menu-link text-hover-primary'
            style={{...style.borderStyle}}
            onClick={() => filterResource([], 'user')}
          >
            Бүх ажилтан
          </div>
          {users.length > 0 &&
            users.map((user: User, index: number) => {
              return (
                <div
                  key={index}
                  className='d-flex flex-stack py-2 px-4 menu-link'
                  style={style.borderStyle}
                  onClick={() => filterResource(user, 'user')}
                >
                  {user.label}
                </div>
              )
            })}

          <div className='separator'></div>
          <div
            className='d-flex flex-stack py-2 px-4 text-gray-700 fw-bolder menu-link text-hover-primary'
            style={{...style.borderStyle}}
            onClick={() => filterResource([], 'resource')}
          >
            Бүх нөөц
          </div>
          {resources.length > 0 &&
            resources.map((resource: Resource, index: number) => {
              return (
                <div
                  key={index}
                  className='d-flex flex-stack py-2 px-4 menu-link'
                  style={style.borderStyle}
                  onClick={() => filterResource(resource, 'resource')}
                >
                  {resource.label}
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  const tooltipText = (info: any) => {
    if (info.event.backgroundColor !== blockedTimeColor) {
      return (
        '<div style="font-weight: 700; line-height: 16px; font-size: 12px;"> ' +
        `<div style="text-align: center; padding-top: 3px;"> Нэр: ${info.event.title}  <br/> ` +
        `Утас: ${info.event.extendedProps.cust_phone}  <br/> ` +
        `Цаг: ${Moment(info.event.startStr).format('HH:mm')} - ${Moment(info.event.endStr).format(
          'HH:mm'
        )}  <br/>` +
        `Эмчилгээ: ${info.event.extendedProps.service_name} <div/>` +
        '</div>'
      )
    } else {
      return (
        '<div style="font-weight: 700; line-height: 16px; font-size: 12px;"> ' +
        `<div style="text-align: center; padding-top: 3px;"> ${info.event.title}  <br/> ` +
        `Цаг: ${Moment(info.event.startStr).format('HH:mm')} - ${Moment(info.event.endStr).format(
          'HH:mm'
        )}  <br/>`
      )
    }
  }
  const initialView =
    settings?.calendar_view_type === 'timeline' && userRole !== USER
      ? 'resourceTimeline'
      : 'resourceTimeGrid'
  return (
    <div className='card'>
      <div className='card-body'>
        <ReactTooltip
          place='top'
          type='dark'
          html={true}
          offset={{top: 0}}
          effect='solid'
          textColor='white'
          className='px-3 py-1'
        />
        {openMenu && <CustomDropdown />}
        {slotMinTime && slotMaxTime &&(
          <FullCalendar
            plugins={[
              resourceDayGridPlugin,
              interactionPlugin,
              resourceTimeGridPlugin,
              momentPlugin,
              resourceTimelinePlugin,
            ]}
            initialView={initialView}
            initialDate={ eventStartDate || (targetDate && new Date(targetDate)) || Moment().format('YYYY-MM-DD HH:mm:ss')}
            schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
            headerToolbar={{
              left: 'prev,next myCustomButton',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,' + initialView + ',today',
            }}
            weekNumberCalculation='ISO'
            height='auto'
            customButtons={{
              myCustomButton: {
                text: filterTitle,
                click: function () {
                  setOpenMenu(!openMenu)
                },
              },
            }}
            buttonText={{
              today: 'Өнөөдөр',
              month: 'Сар',
              week: 'Долоо хоног',
              day: 'Өдөр',
              resourceTimeline: 'Өдөр',
              resourceTimeGrid: 'Өдөр',
            }}
            navLinks={true}
            allDaySlot={false}
            selectable={true}
            slotMinTime={slotMinTime}
            slotMaxTime={slotMaxTime}
            slotDuration={{minutes: parseInt(slotDuration)}}
            editable={true}
            nowIndicator={true}
            now={Moment().format()}
            resourceAreaWidth={'15%'}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: true,
              meridiem: 'short',
              hour12: false,
            }}
            views={{
              dayGridMonth: {
                dayHeaderFormat: {
                  weekday: 'long',
                  omitCommas: true,
                },
                titleFormat: 'YYYY/MM',
              },
              timeGrid: {
                dayHeaderFormat: {
                  weekday: 'short',
                  month: 'numeric',
                  day: 'numeric',
                  omitCommas: true,
                },
                titleFormat: 'MM/DD',
              },
            }}
            titleFormat={function (arg) {
              return CustomHeaderNames(
                'resourceTimeline',
                arg.date.marker.getDay(),
                arg.date.marker
              )
            }}
            selectOverlap={function (event) {
              return event.display !== 'background'
            }}
            eventOverlap={function (stillEvent, movingEvent) {
              return (
                stillEvent.display !== 'background' ||
                stillEvent.backgroundColor !== blockedTimeColor
              )
            }}
            dayHeaderContent={function (arg) {
              return CustomHeaderNames(arg.view.type, arg.date.getDay(), arg.date)
            }}
            resourceAreaHeaderContent='Ажилчид'
            datesSet={function (dateInfo) {
              dateOnChange(dateInfo)
            }}
            events={events}
            resources={userLists}
            eventClick={function (info) {
              if (businessDays.includes(Moment(info.event.start).format('d'))) {
                if (userCanUpdateEvents(userRole)) {
                  if (info.event.backgroundColor !== blockedTimeColor) {
                    info.jsEvent.preventDefault() // don't let the browser navigate
                    setEventStartDate(Moment(info.event.start).format('YYYY-MM-DD HH:mm:ss'))
                    setEventIdForUpdate(
                      info.event._def.extendedProps.appointment_id
                        ? parseInt(info.event._def.extendedProps.appointment_id)
                        : 0
                    )
                    const userId =
                      (info.event._def.resourceIds && info.event._def.resourceIds[0]) || '0'
                    setEventUserId(Number(userId))
                    navigate('/calendar/index/event/view')
                  } else {
                    handleDelete(info.event._def.extendedProps.appointment_id)
                  }
                }
              }
            }}
            dateClick={function (info) {
              if (businessDays.includes(Moment(info.date).format('d'))) {
                if (userCanCreateEvents(userRole)) {
                  const clickedElement = info.jsEvent.target as HTMLElement
                  if (!clickedElement.classList.contains('fc-bg-event')) {
                    setEventStartDate(Moment(info.date).format('YYYY-MM-DD HH:mm:ss'))
                    setEventUserId(info.resource ? parseInt(info.resource.id) : 0)
                    setEventIdForUpdate(0)
                    navigate('/calendar/index/event/edit')
                  }
                }
              }
            }}
            eventChange={function (info) {
              if (userCanUpdateEvents(userRole)) {
                eventOnChange(info.event)
              } else {
                NotifyWarning('Өөрчлөх эрх байхгүй байна.')
              }
            }}
            eventMouseEnter={function (info) {
              const html = tooltipText(info)
              info.el.setAttribute('data-tip', html)
              ReactTooltip.rebuild()
            }}
          />
        )}
      </div>
    </div>
  )
}

export {FullCalendarView}
