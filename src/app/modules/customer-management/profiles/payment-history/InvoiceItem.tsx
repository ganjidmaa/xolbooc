import Moment from "moment";
import { FC } from "react";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { paymentStatusColors } from "../../../../../_metronic/helpers";
import { Invoice } from "../../core/_models";

const labelStyle = {
    style: {
        flexShrink: 0,
        width: '65px',
    }
}

type Props = {
    invoice: Invoice
}

export const InvoiceItem:FC<Props> = ({ invoice }) => {
    const navigate = useNavigate()
    
    const currentStatus = paymentStatusColors.filter(statusColor => statusColor.status === invoice.state)[0];

    const showPaymentDetail = () => {
        navigate('/customer/list/payment_detail', 
            {state: { invoice: invoice, eventId: invoice.appointment_id }}
        )
    }

    return (
        <div className='menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary'>
            <div className='menu-item'>
                <div className='d-flex mb-8 menu-link' onClick={() => showPaymentDetail()}>
                    <div className="border border-primary bg-light-primary rounded p-3 me-4 h-65px" 
                        style={{...labelStyle.style, textAlign: 'center'}}>
                        <span className="fs-6 fw-bolder text-gray-700">{Moment(invoice.event_date).format('MM/DD')} </span>
                        <br/>
                        
                        <span className="fs-7 text-gray-700">{Moment(invoice.event_date).format('YYYY')} </span>                    
                    </div>
                    
                    <div className='bullet bullet-vertical bg-secondary h-auto me-5'></div>

                    <div className="w-100">
                        <div className='d-flex text-gray-700 fs-6 fw-bold'>
                            <div className='flex-grow-1'> Төлөх дүн </div>
                            <NumberFormat
                                className="align-self-end mb-0"
                                value={invoice.payment} 
                                displayType={'text'}
                                thousandSeparator={true}
                            /> <span className="pt-1">₮</span>
                        </div>

                        <div className='d-flex mb-1 text-gray-700 fs-6 fw-bold'>
                            <div className='flex-grow-1'> Төлcөн дүн </div>
                            <NumberFormat
                                className="align-self-end mb-0"
                                value={invoice.paid} 
                                displayType={'text'}
                                thousandSeparator={true}
                            /> <span className="pt-1">₮</span>
                        </div>

                        <span className={`badge badge-${currentStatus?.color}`}>
                            {currentStatus?.name}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}