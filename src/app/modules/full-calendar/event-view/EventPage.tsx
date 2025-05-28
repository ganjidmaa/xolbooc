import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { isNotEmpty, objectHasAttr, QUERIES } from "../../../../_metronic/helpers"
import { EventDetail } from "../components/event-item/EventDetail"
import { useCalendarView } from "../core/CalendarViewProvider"
import { getEventById } from "../core/_requests"
import { PaymentAside } from "../payment/PaymentAside"
import { useCalendarItem } from "../core/CalendarItemProvider"
import { EventEditDetail } from "../event-edit/EventEditDetail"
import { useCalendarQuery } from "../core/CalendarQueryProvider"
import { EventViewAside } from "./EventViewAside"
import { Event } from "../core/_models"

export const EventPage = () => {
    const {eventIdForUpdate} = useCalendarView()
    const {setItemDatas, setDesc, setConclusion, setDiagnosis} = useCalendarItem()
    const {eventCustomer, setEventCustomer} = useCalendarQuery()
    const enableQuery = isNotEmpty(eventIdForUpdate)
    const [asideType, setAsideType] = useState('')
    const [event, setEvent] = useState<Event>()

    const { 
        refetch,
        data: eventDatas,
    } = useQuery(`${QUERIES.EVENT_DETAIL}-${eventIdForUpdate}`,
        () => {
            return getEventById(eventIdForUpdate)
        },
        {
            cacheTime: 0,
            enabled: enableQuery
        }
    )
    // setDesc('')
    // setConclusion('')
    useEffect(() => {
        if(eventDatas) {
            setEvent(eventDatas.appointment)

            const eventObj = eventDatas.appointment
            const selectedCustomer = eventDatas.customer
            if(selectedCustomer) {setEventCustomer(selectedCustomer)}
            if(eventObj.item_values && objectHasAttr(eventObj.item_values)) {
                setItemDatas(eventObj.item_values)
            }
            setDesc(eventObj.desc || '')
            setConclusion(eventObj.conclusion || '')
            setDiagnosis(eventObj.diagnosis || '')

            const status = eventObj.status
            let type = (status === 'completed' || status === 'part_paid' || status === 'unpaid') ? 'view' : 'edit'
            !asideType && setAsideType(type)
        }
    }, [eventDatas])

    const changeAsideType = (type: string, withRefresh = false) => {
        setAsideType(type)
        withRefresh && refetch()
    }

    return(
        <div className="form d-flex flex-column flex-lg-row">
            {asideType === 'edit' && event && <EventEditDetail event={event} viewType={asideType} changeAsideType={changeAsideType}/>}

            {asideType !== 'edit' && <>
                <div className="flex-column flex-lg-row-auto gap-7 gap-lg-10 me-lg-5">
                    <div className="card card-flush pb-4 pt-2" style={{height: '100%'}} >   
                        {asideType === 'view' && eventCustomer && event && objectHasAttr(eventCustomer) &&
                            <EventViewAside event={event} asideType={asideType} changeAsideType={changeAsideType}/>
                        }

                        {asideType === 'payment' && 
                            <PaymentAside changeAsideType={changeAsideType} event={event} viewType={asideType}/>
                        }
                    </div>
                </div>

                {event && <EventDetail event={event}/>}
            </>}

        </div>
    )
}