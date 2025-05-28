import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { isNotEmpty, QUERIES } from "../../../../../_metronic/helpers"
import { EventDetail } from "../../../full-calendar/components/event-item/EventDetail"
import { getEventById } from "../../../full-calendar/core/_requests"
import { PaymentAside } from "../../../full-calendar/payment/PaymentAside"
import { useMasterData } from "../../customers-list/provider/MasterDataProvider"
import { PaymentDetail } from "../../../full-calendar/payment/PaymentDetail"
import { Event } from "../../core/_models"

export const PaymentPage = () => {
    const location: any = useLocation()
    const {customer} = useMasterData()
    const eventId = location.state?.eventId
    const invoice = location.state?.invoice
    const enableQuery = isNotEmpty(eventId)
    const [asideType, setAsideType] = useState<string>('view')
    const [event, setEvent] = useState<Event>()
    
    const {
        data: eventDatas,
    } = useQuery(`${QUERIES.EVENT_DETAIL}-${eventId}`,
        () => {
            return getEventById(eventId)
        },
        {
            cacheTime: 0,
            enabled: enableQuery
        }
    )

    useEffect(() => {
        if(eventDatas) {
            setEvent(eventDatas.appointment)
        }
    }, [eventDatas])

    const changeAsideType = () => {
        setAsideType('payment')
    }

    return (
        <div className="form d-flex flex-column flex-lg-row">
            {asideType === 'view' && 
                <div className="flex-column flex-lg-row-auto gap-7 gap-lg-10 w-100 w-lg-350px w-xl-450px mb-7 me-lg-5">
                    <div className="card pb-2">
                        <div className="card-header">
                            <div className='card-title m-0'>
                                <h3 className='fw-bolder m-0'>Төлбөрийн мэдээлэл</h3>
                            </div>
                        </div>
                        <div className="card-body p-9 pt-4">
                            <PaymentDetail changeAsideType={changeAsideType} viewType={asideType}/>
                        </div>
                    </div>
                </div>
            }
            {customer && event && asideType === 'payment' && 
                <div className="flex-column flex-lg-row-auto gap-7 gap-lg-10 w-lg-450px w-xl-500px mb-7 me-lg-5">
                    <div className="card card-flush pb-4 pt-2" >   
                        <PaymentAside changeAsideType={changeAsideType}
                            invoiceId={invoice?.id}
                            viewType={asideType}
                            event={event}
                        />
                    </div>
                </div>
            }
            {event && <EventDetail event={event}/> }
        </div>
    )
}