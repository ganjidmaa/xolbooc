import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { CRUD_RESPONSES, ID, isNotEmpty, paymentStatusColors, QUERIES } from "../../../../_metronic/helpers"
import { NumericFormat as NumberFormat } from "react-number-format";
import { getPaymentDetails, voidPayment } from "../core/_requests";
import { InfoAlert } from "../../../../_metronic/helpers/alerts/Info";
import { FC, useEffect, useState } from "react";
import { WarningAlert } from "../../../../_metronic/helpers/alerts/Warning";
import { ErrorAlert } from "../../../../_metronic/helpers/alerts/Error";
import { Payment } from "../../customer-management/core/_models";
import { Invoice } from "../core/_models";

type Props = {
    changeAsideType: (type: string) => void
    invoiceState?: Invoice
    viewType: string
}

export const PaymentDetail: FC<Props> = ({ changeAsideType, invoiceState, viewType }) => {
    const navigate = useNavigate()
    const location: any = useLocation()
    const invoice = invoiceState || location.state?.invoice

    const currentStatus = paymentStatusColors.filter(statusColor => statusColor.status === invoice.state)[0];
    const enablePaymentQuery = isNotEmpty(invoice.id)
    const [paymentDetailDatas, setPaymentDetailDatas] = useState<Array<Payment>>([])
 
    const {
        data,
    } = useQuery(`${QUERIES.PAYMENT_DETAIL}-${invoice.id}`,
        () => {
            return getPaymentDetails(invoice.id)
        },
        {
            cacheTime: 0,
            enabled: enablePaymentQuery,
            onError: (err: any) => {
                console.log('err', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
            retryOnMount: false,
            retry: false,
        }
    )
    
    useEffect(() => {
        if(data && data.data) {
            setPaymentDetailDatas(data.data)
        }
    }, [data])

    const totalPayment = invoice.payment
    const totalPaid = invoice.paid
    const leftPayment = invoice.stored_left_payment;
    const payable = invoice.payable;

    const handleDelete = async (invoiceId: ID) => {
        const {value: buttonType} = await InfoAlert('Та устгахдаа итгэлтэй байна уу?', true)
        if(buttonType) {
            voidPaymentFN(invoiceId)
        }
    }

    const voidPaymentFN = async (invoiceId: ID) => {
        try {
            voidPayment(invoiceId)
        } catch (ex) {
            console.error(ex)
        } finally {
            InfoAlert('Амжилттай буцаалаа.')
            navigate(-1)
        }
    }

    return (
        <div>
            <div className='d-flex mb-1 text-gray-700 fs-6 fw-bold'>
                <div className='text-gray-800 fw-bold fs-6 flex-grow-1'> Төлбөр </div>
                <NumberFormat
                    className="align-self-end mb-1"
                    value={totalPayment} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>

            <div className='d-flex mb-1 text-gray-700 fs-6 fw-bold'>
                <div className='text-gray-800 fs-6 flex-grow-1'> Хөнгөлөлт </div>
                {invoice.membership_name ? `(${invoice.membership_name })` : ''} 
                <NumberFormat
                    className="align-self-end mb-1"
                    value={invoice.discount_amount} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>

            {/* {viewType === 'view' && 
            <div className='d-flex mb-1 text-gray-700 fw-bold fs-6'>
                <div className='text-gray-800 flex-grow-1 fs-6'> Төлөх дүн </div>
                <NumberFormat
                    className="align-self-end mb-1"
                    value={payable} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>
            } */}

            <div className='d-flex mb-1 text-gray-700 fs-6 fw-bold'>
                <div className='text-gray-800 fs-6 flex-grow-1'> Төлcөн дүн </div>
                <NumberFormat
                    className="align-self-end mb-1"
                    value={totalPaid} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>

            <div className='d-flex mb-1 text-gray-700 fs-6 fw-bold'>
                <div className='text-gray-800 fw-bold fs-6 flex-grow-1'> Үлдэгдэл </div>
                <NumberFormat
                    className="align-self-end mb-1"
                    value={leftPayment} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>

            {/* {viewType === 'payment' && <div className='d-flex mb-1 text-gray-700 fw-bold fs-6'> */}
            {<div className='d-flex mb-1 text-gray-700 fw-bold fs-6'>
                <div className='text-gray-800 flex-grow-1 fs-6'> Төлөх дүн </div>
                <NumberFormat
                    className="align-self-end mb-1"
                    value={payable} 
                    displayType={'text'}
                    thousandSeparator={true}
                />₮
            </div>
            }

            {viewType === 'view' && 
            <span className={`badge badge-${currentStatus?.color}`}>
                {currentStatus?.name}
            </span>
            }
            {viewType === 'view' && paymentDetailDatas && paymentDetailDatas.length > 0 && <>
                <div className="separator separator-dashed my-2"></div>
                <div className="d-flex flex-column justify-content-center flex-row-fluid pe-11 mt-3">
                    {paymentDetailDatas.map((paymentDetail, index) => {
                        return(
                        <div key={index}>
                            <div className="d-flex fs-7 fw-bold text-gray-700 align-items-center">
                                <div className="bullet bg-success me-3"></div>
                                <div className="me-3">{paymentDetail.payment_date},</div>
                                <div>{paymentDetail.type}</div>
                                <NumberFormat
                                    className="ms-auto align-self-end"
                                    value={paymentDetail.paid} 
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />₮
                            </div>
                            {paymentDetail.desc && 
                                <div className="d-flex fs-7 text-gray-700 align-items-center mb-1 ps-5">
                                    {paymentDetail.desc}
                                </div>
                            }
                            {paymentDetail.coupon_code &&
                                <div className="d-flex fs-7 text-gray-700 align-items-center mb-1 ps-5">
                                    {paymentDetail.coupon_code}
                                </div>
                            }
                            {paymentDetail.bank_account && 
                                <div className="d-flex fs-7 text-gray-700 align-items-center mb-1 ps-5">
                                    {paymentDetail.bank_account}
                                </div>
                            }
                            
                        </div>
                        )
                    })}
                </div>
            </>}

            {viewType === 'view' && invoice.state && invoice.state !== 'voided' && 
                <div className="d-flex justify-content-end mt-2"> 
                    <div className="d-flex">
                        {invoice.state !== 'completed' && <button className="btn btn-sm btn-primary me-5"
                            onClick={() => changeAsideType && changeAsideType('payment')}>
                            <span className='indicator-label'>Төлбөр төлөх</span>                            
                        </button>
                        }
                        <button className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(invoice.id)}>
                            <span className='indicator-label'>₮ Цуцлах</span>                            
                        </button>
                    </div>
                </div>
            }
        </div>
           
    )
}