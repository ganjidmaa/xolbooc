/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react"
import Moment from 'moment';
import { KTSVG, objectHasAttr } from "../../../../../_metronic/helpers";
import { useCalendarItem } from "../../core/CalendarItemProvider";
import { ItemDetail } from "./ItemDetail";
import { useNavigate } from "react-router-dom";
import { NumericFormat as NumberFormat}from "react-number-format";
import { Event } from "../../core/_models";

const datePickerProps = {
    style: {
        border: 'none',
        fontWeight: 600,
        fontSize: '1.45rem',
        width: '165px',
        color: '#5E6278'
    }
}

type Props = {
    event: Event
}

const EventDetail:FC<Props> = ({ event }) => {
    const navigate = useNavigate()
    const {setItemDatas, setDesc} = useCalendarItem()

    useEffect(() => {
        if(event) {
            if(event.item_values && objectHasAttr(event.item_values)) {
                setItemDatas(event.item_values)
                setDesc(event.desc || '')
            }
        }
    }, [event])

    let totalDuration = 0;
    let totalPayment = 0;

    const cancel = () => { 
        navigate(-1)
    }

    return (
        <div className="d-flex flex-column flex-row-fluid">
            <div className="card pb-4">
                <div className="card-header">
                    <div className="card-title d-flex justify-content-between w-100 me-0">
                        <div className="d-flex align-items-center">
                            <KTSVG
                                path='/media/icons/duotune/general/gen014.svg'
                                className='svg-icon-1 svg-icon-primary me-3 lh-0'
                            />
                        
                            {event && <span style={datePickerProps.style}>{Moment(event.event_date).format('YYYY/MM/DD')}</span>}
                        </div>

                        <button className="btn btn-sm btn-icon btn-bg-light btn-active-secondary"
                            onClick={() => cancel()}>
                            <KTSVG path='/media/icons/duotune/arrows/arr088.svg' 
                                className='svg-icon-1 svg-icon-muted'/>                        
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="scroll-y" style={{height: '336px'}}
                        data-kt-scroll='true'
                        data-kt-scroll-activate='{default: true, lg: true}'
                        data-kt-scroll-max-height='350px'
                        data-kt-scroll-offset='0px'
                    >
                        {
                            event && event.item_values && objectHasAttr(event.item_values) && event.item_values.map((item, index) => {
                                totalDuration += parseInt(item?.duration || '0')
                                totalPayment += parseInt(item?.price || '0')
                                return (
                                    <ItemDetail key={index} item={item} viewType='view'/>
                                )
                            })
                        }
                    </div>    
                    <div className="separator separator-dashed my-3"></div>

                    <div className='d-flex mb-15'>
                        <div className='text-gray-800 fw-bolder fs-6 flex-grow-1'>
                            {Math.floor(totalDuration/60) > 0 && Math.floor(totalDuration/60) + 'цаг '} 
                            {totalDuration%60 > 0 && (totalDuration%60  + 'мин')}
                        </div>
                        <NumberFormat
                            className="text-gray-800 fw-bolder fs-6 align-self-end"
                            value={totalPayment} 
                            displayType={'text'}
                            thousandSeparator={true}
                        />
                        <span className='text-gray-800 fw-bolder align-self-start'>{' ₮'} </span>
                    </div>

                    <div className="pt-3 notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
                        <div className="d-flex flex-stack flex-grow-1">
                            <div className="fw-bold">
                                <div className="text-gray-800 fw-bolder fs-6 mb-2">Нэмэлт мэдээлэл</div>
                                <div className="fs-6 text-gray-700"> {event?.desc} </div>
                            </div>
                        </div>  
                    </div>

                </div>
            </div>
        </div>
    )
}

export {EventDetail}