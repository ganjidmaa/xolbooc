/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import {EventEditAside} from './EventEditAside'
import {TimeLineItem} from './TimeLineItem'
import Datetime from 'react-datetime'
import Moment from 'moment'
import {useCalendarView} from '../core/CalendarViewProvider'
import {KTSVG, objectHasAttr} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {createEvent, updateEvent} from '../core/_requests'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {useCalendarQuery} from '../core/CalendarQueryProvider'
import {Event, Item} from '../core/_models'
import {popOverlay} from '../core/popOverlay'
import {OverlayTrigger} from 'react-bootstrap'
import { HealthConditionModal } from './health-condition-modal/HealthConditionModal'

const datePickerProps = {
  style: {
    border: 'none',
    fontWeight: 600,
    fontSize: '1.45rem',
    width: '165px',
  },
  className: 'form-select form-select-transparent',
}

type Props = {
  event?: Event
  viewType?: string
  changeAsideType?: (type: string, withRefresh: boolean) => void
}

const EventEditDetail: FC<Props> = ({
  event = {},
  viewType = 'create',
  changeAsideType = () => {},
}) => {
  const navigate = useNavigate()
  const {eventStartDate, eventIdForUpdate, eventUserId, activeTab, setHealthCondition, healthCondition} = useCalendarView()
  const {eventCustomer} = useCalendarQuery()
  const {itemDatas, initialValue, desc, setItemDatas, conclusion, diagnosis} = useCalendarItem()
  const [validForm, setValidForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState(Moment(eventStartDate).format('YYYY/MM/DD'))
  const [descState, setDescState] = useState(eventIdForUpdate === 0 ? '' : desc)
  const [diagnosisState, setDiagnosisState] = useState(eventIdForUpdate === 0 ? '' : diagnosis)
  const [conclusionState, setConclusionState] = useState(eventIdForUpdate === 0 ? '' : conclusion)
  const [readyNextItem, setReadyNextItem] = useState(false)
  const [lastEndTime, setLastEndTime] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  var timeLineItem: Item = {}

  useEffect(() => {
    if (objectHasAttr(eventCustomer)) setValidForm(true)
    else validForm && setValidForm(false)
    setLastEndTime(itemDatas[itemDatas.length - 1]?.end_time as string)
  }, [itemDatas, eventCustomer])

  const handleSubmit = async (closing: boolean, isHistory: boolean, isBlockTime: boolean = false) => {
    setIsSubmitting(true)
    const formValues = {
      item_values: itemDatas.length > 0 ? itemDatas : [{...timeLineItem, service_id: 0}],
      event_date: startDate,
      desc: descState,
      diagnosis: diagnosisState,
      conclusion: conclusionState,
      customer_id: eventCustomer?.value || 0,
      appointment_id: eventIdForUpdate || 0,
      branch_id: activeTab,
      is_history: isHistory,
      is_time_block: isBlockTime
    }

    try {
      if (eventIdForUpdate) {
        await updateEvent(formValues)
      } else {
        await createEvent(formValues)
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setIsSubmitting(false)
      closing && cancel()
      return true
    }
  }

  const cancel = () => {
    navigate('/calendar/index')
  }

  const handleOnChangeDate = (value: any) => {
    value = Moment(value).format('YYYY/MM/DD')
    setStartDate(value)
  }

  const readyNextButton = (value: boolean) => {
    setReadyNextItem(value)
  }

  const addingNewEvent = () => {
    let items: Array<Item> = [timeLineItem]
    const freq = timeLineItem.frequency as number

    let lastTime = timeLineItem.end_time
    const eventDate = Moment(eventStartDate).format('YYYY/MM/DD')

    if (freq > 1) {
      for (let i = 1; i < freq; i++) {
        const endTime = Moment(eventDate + ' ' + lastTime)
          .add(timeLineItem.duration, 'minutes')
          .format('HH:mm')
        items.push({...timeLineItem, start_time: lastTime, end_time: endTime})
        lastTime = endTime
      }
    }

    setItemDatas((prevItemDatas) => {
      return [...prevItemDatas, ...items]
    })
    readyNextButton(false)
  }

  const getTimeLineData = (formValue: Item) => {
    timeLineItem = formValue
  }
  const openHealthConditionModal = () => {
    setHealthCondition(eventIdForUpdate)
  }

  const popover = popOverlay('Эмчилгээ сонгоно уу.')

  return (
    <div className='d-flex flex-column flex-lg-row w-100'>
      <EventEditAside
        isSubmitting={isSubmitting}
        validForm={validForm}
        handleSubmit={handleSubmit}
        event={event}
        viewType={viewType}
        changeAsideType={changeAsideType}
      />

      <div className='d-flex flex-column flex-row-fluid'>
        <div className='card pb-4'>
          <div className='card-header'>
            <div className='card-title d-flex justify-content-between w-100 me-0'>
              <div className='d-flex align-items-center'>
                <KTSVG
                  path='/media/icons/duotune/general/gen014.svg'
                  className='svg-icon-1 svg-icon-primary me-3 lh-0'
                />

                <Datetime
                  timeFormat={false}
                  dateFormat='YYYY/MM/DD'
                  initialValue={startDate}
                  inputProps={datePickerProps}
                  onChange={(val) => {
                    handleOnChangeDate(val)
                  }}
                />
              </div>
            <div>
              {eventIdForUpdate == 0 && <button
                className='btn btn-sm btn-icon btn-bg-light btn-active-secondary'
                onClick={() => handleSubmit(true, false ,true)}
                disabled={isSubmitting}
                style={{marginRight: 20}}
              >
                <img src="/media/logos/time_block.png" alt="" height={20} width={20} />
              </button>}

              <button
                className='btn btn-sm btn-icon btn-bg-light btn-active-secondary'
                onClick={() => cancel()}
                disabled={isSubmitting}
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr088.svg'
                  className='svg-icon-1 svg-icon-muted'
                />
              </button>
            </div>
              
            </div>
          </div>
          <div className='card-body'>
            <div className='timeline'>
              {
                <TimeLineItem
                  key={itemDatas.length}
                  userId={eventUserId}
                  item={{
                    ...initialValue,
                    start_time: lastEndTime || Moment(eventStartDate).format('HH:mm'),
                  }}
                  readyNextButton={readyNextButton}
                  getTimeLineData={getTimeLineData}
                />
              }
            </div>

            <div className='mt-1 d-flex timeline'>
              <div className='w-40px me-5'> </div>

              <div className='timeline-content'>
                <label className='fs-6 fw-bold mb-2'>Асуумжийн онош</label>
                <textarea
                  className='form-control mb-2'
                  rows={1}
                  placeholder='Асуумжийн онош'
                  value={diagnosisState}
                  onChange={(val) => setDiagnosisState(val.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className='mt-1 d-flex timeline'>
              <div className='w-40px me-5'> </div>

              <div className='timeline-content'>
                <label className='fs-6 fw-bold mb-2'>Зовиур</label>
                <textarea
                  className='form-control mb-2'
                  rows={3}
                  placeholder='Зовиур'
                  value={descState}
                  onChange={(val) => setDescState(val.target.value)}
                ></textarea>
              </div>
            </div>

            <div className='mt-1 d-flex timeline'>
              <div className='w-40px me-5'> </div>
              <div className='timeline-content'>
                <label className='fs-6 fw-bold mb-2'>Зөвлөмж</label>
                <textarea
                  className='form-control mb-2'
                  rows={3}
                  placeholder='Зөвлөмж'
                  value={conclusionState}
                  onChange={(val) => setConclusionState(val.target.value)}
                ></textarea>
              </div>
            </div>

            <div className='d-flex justify-content-between pt-5 mt-0 border-top'>
              {eventIdForUpdate !== 0 && <div>
                  <button
                    onClick={() => openHealthConditionModal()}
                    type='button'
                    className='btn btn-sm btn-success'
                    disabled={isSubmitting}
                  >
                    <span className='indicator-label'>Асуумж</span>
                    {isSubmitting && (
                      <span className='indicator-progress'>
                        Түр хүлээнэ үү...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
              </div>}

              <div
                onClick={() => {
                  !readyNextItem && setShowTooltip(!showTooltip)
                }}
              >
                <OverlayTrigger show={showTooltip} placement='top' overlay={popover}>
                  <button
                    onClick={() => addingNewEvent()}
                    type='button'
                    className='btn btn-sm btn-success'
                    disabled={!readyNextItem || isSubmitting}
                  >
                    <span className='indicator-label'>Нэмэх</span>
                    {isSubmitting && (
                      <span className='indicator-progress'>
                        Түр хүлээнэ үү...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
      {healthCondition !== undefined && <HealthConditionModal id={undefined} setFunction={undefined} />}
    </div>
  )
}

export {EventEditDetail}
