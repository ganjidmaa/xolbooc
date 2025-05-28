import Moment from "moment"
import { FC } from "react"
import { NumericFormat as NumberFormat } from "react-number-format"
import { AppointmentStatusColor, AppointmentStatus } from "../../../../../_metronic/helpers"
import { AppointmentHistory } from "../../core/_models"

type Props = {
    appointment: AppointmentHistory
}

const labelStyle = {
    style: {
        flexShrink: 0,
        width: '65px'
    }
}

const AppointmentItem: FC<Props> = ({appointment}) => {
    const statusName = AppointmentStatus
    const statusColor = AppointmentStatusColor

    const appointmentStatusColor = statusColor.filter(color => color.value === appointment.status)[0]?.name

    return (
        <>
            <div className='d-flex mb-8'>
                <div className="border border-primary bg-light-primary rounded p-3 me-4 h-65px" 
                    style={{...labelStyle.style, textAlign: 'center'}}>
                    <span className="fs-6 fw-bolder text-gray-700">{Moment(appointment.event_date).format('MM/DD')} </span>
                    <br/>
                    
                    <span className="fs-7 text-gray-700">{Moment(appointment.event_date).format('YYYY')} </span>                    
                </div>
                
                <div className='bullet bullet-vertical bg-secondary h-auto me-5'></div>

                <div className="w-100">
                    {appointment.events.map((event, index) => {
                        return (
                            <div className='d-flex mb-4' key={index}>
                                <div className='flex-grow-1'>
                                    <div className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                                        {event.service_name}                      
                                    </div>
                                    <span className=' text-gray-700 fw-bold d-block'>
                                        <i className="fas fa-clock text-primary"></i> 
                                        {" " + Moment(event.start_time).format('HH:mm')}
                                    </span>
                                    <span className='text-muted fw-bold d-block'> 
                                        {event.user_name + ' дээр '} {event.duration + 'мин'} {event.resource_name} 
                                    </span>
                                </div>
                                
                                <NumberFormat
                                    className="text-gray-800 fw-bold align-self-start pt-1"
                                    value={event.service_price} 
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                                <span className='text-gray-800 fw-bold align-self-start pt-1'>{' ₮'} </span>
                            </div>
                        )
                    })}

                    <div className={`alert border border-`+(appointmentStatusColor)+
                        ` text-`+(appointmentStatusColor)+
                        ` px-2 py-1 mb-0 border-radius-2 d-inline-block`}>
                        {statusName.filter(name => name.value === appointment.status)[0]?.name}
                    </div>

                </div>
            </div>
        </>
    )
}

export default AppointmentItem