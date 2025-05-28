import Moment from "moment"
import { ChangeEventHandler, FC, useEffect, useRef } from "react"
import { NumericFormat as NumberFormat } from "react-number-format"
import { AppointmentStatusColor, AppointmentStatus, ID } from "../../../../../_metronic/helpers"
import { AppointmentHistory } from "../../core/_models"

type Props = {
    appointment: AppointmentHistory
    openModal: (id:ID)=>void
}

const labelStyle = {
    style: {
        flexShrink: 0,
        width: '65px'
    }
}

const AppointmentItem: FC<Props> = ({appointment, openModal}) => {
    const statusName = AppointmentStatus
    const statusColor = AppointmentStatusColor

    const appointmentStatusColor = statusColor.filter(color => color.value === appointment.status)[0]?.name

    const textareaRefConc = useRef(null);
    const textareaRefDesc = useRef(null);


  useEffect(() => {
    if (textareaRefConc.current) {
      textAreaAdjust(textareaRefConc.current);
    }
    if (textareaRefDesc.current) {
        textAreaAdjust(textareaRefDesc.current);
      }
  }, []);

  const textAreaAdjust = (element: HTMLElement) => {
    element.style.height = '1px';
    element.style.height = `${25 + element.scrollHeight}px`;
  };

    return (
        <>
            <div className='d-flex'>
                <div className="border border-primary bg-light-primary rounded p-3 me-4 h-65px" 
                    style={{...labelStyle.style, textAlign: 'center'}}>
                    <span className="fs-6 fw-bolder text-gray-700">{Moment(appointment.event_date).format('MM/DD')} </span>
                    <br/>
                    
                    <span className="fs-7 text-gray-700">{Moment(appointment.event_date).format('YYYY')} </span>                    
                </div>
                
                <div className='bullet bullet-vertical bg-secondary h-auto me-5'></div>

                <div style={{width: 200}}>
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
                                    <NumberFormat
                                    className="text-gray-800 fw-bold align-self-start pt-1"
                                    value={event.service_price} 
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                                <span className='text-gray-800 fw-bold align-self-start pt-1'>{' ₮'} </span>
                                </div>
                            </div>
                        )
                    })}

                    <div className={`alert border border-`+(appointmentStatusColor)+
                        ` text-`+(appointmentStatusColor)+
                        ` px-2 py-1 mb-0 border-radius-2 d-inline-block`}>
                        {statusName.filter(name => name.value === appointment.status)[0]?.name}
                    </div>

                </div>
                <div style={{flex: 1}}>
                    <div className='row mb-6'>
                        <div className='col-xl-2'>
                            <div className='fs-6 fw-bold mt-2 mb-3'>Зөвлөмж:</div>
                        </div>
                        <div className='col-xl-8 fv-row' style={{flex: 1}}>
                            <textarea
                                className='form-control mb-2'
                                value={appointment.desc}
                                readOnly = {true}
                                ref={textareaRefDesc}
                                style={{ resize: 'none', backgroundColor: '#f3f6f9'}}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row mb-6'>
                        <div className='col-xl-2'>
                            <div className='fs-6 fw-bold mt-2 mb-3'>Зовиур:</div>
                        </div>
                        <div className='col-xl-8 fv-row' style={{flex: 1}}>
                            <textarea
                                className='form-control mb-2'
                                readOnly={true}
                                value={appointment.conclusion}
                                ref={textareaRefConc}
                                style={{ resize: 'none', backgroundColor: '#f3f6f9' }}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='text-center d-flex justify-content-end'>
                <button type='submit' className='btn btn-primary' onClick={()=>openModal(appointment.id)}> 
                    <span className='indicator-label'>Эрүүл мэндийн асуумж</span>
                </button>
            </div> */}
        </>
    )
}

export default AppointmentItem