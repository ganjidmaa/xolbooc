/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react"
import { NumericFormat as NumberFormat} from "react-number-format";
import { useNavigate } from "react-router-dom";
import { CRUD_RESPONSES, ID, isNotEmpty } from "../../../../_metronic/helpers";
import { NotifySuccess } from "../../../../_metronic/helpers/notify/NotifySuccess";
import { useAuth } from "../../auth";
import { CalendarListLoading } from "../components/loading/CalendarListLoading";
import { useCalendarData } from "../core/CalendarDataProvider";
import { useCalendarView } from "../core/CalendarViewProvider";
import { Discount, Event, Invoice, PaymentForm, SplitPayment } from "../core/_models";
import { createPayment } from "../core/_requests";
import { CouponCodeModal } from "./coupon-code-modal/CouponCodeModal";
import { ExtraChargeModal } from "./extra-charge-modal/ExtraChargeModal";
import { PaymentMethodModal } from "./payment-method-modal/PaymentMethodModal";
import { PaymentTypeSelection } from "./PaymentTypeSelection";
import { SplitPaymentItem } from "./SplitPaymentItem";
import { DiscountMethodModal } from "./discount-method-modal/DiscountMethodModal";
import { PaymentDetail } from "./PaymentDetail";
import { QpayMethodModal } from "./qpay-modal/QpayMethodModal";

type Props = {
    changeAsideType: (type: string) => void
    invoiceId?: ID
    viewType: string
    event?: Event
}

export const PaymentAside:FC<Props> = ({viewType, invoiceId=0, event, changeAsideType}) => {
    const navigate = useNavigate()
    const {refetch} = useCalendarData()
    let {eventIdForUpdate} = useCalendarView()
    const { currentUser } = useAuth()

    eventIdForUpdate = !isNotEmpty(eventIdForUpdate) ? event?.id : eventIdForUpdate;
    
    let invoice = event?.invoice
    const [paymentModalBtn, setPaymentModalBtn] = useState(false) 
    const [couponModalBtn, setCouponModalBtn] = useState(false) 
    const [qpayModalBtn, setQpayModalBtn] = useState(false)
    const [extraChargeModalBtn, setExtraChargeModalBtn] = useState(false) 
    const [discountModalBtn, setDiscountModalBtn] = useState(false) 
    const [extraPayment, setExtraPayment] = useState<number>(0)
    const [splitPayments, setSplitPayments] = useState<Array<SplitPayment>>([])
    const [currentPaymentType, setCurrentPaymentType] = useState('')
    const [currentLeftPayment, setCurrentLeftPayment] = useState(0)
    const [currentPaidAmount, setCurrentPaidAmount] = useState(0)
    const [partPaidAmount, setPartPaidAmount] = useState<number>(parseInt(invoice?.paid as string))
    const [totalPaymentState, setTotalPaymentState] = useState<number>(0)
    const [storedLeftPayment, setStoredLeftPayment] = useState<number>(parseInt(invoice?.stored_left_payment as string))
    const [eventStatus, setEventStatus] = useState<string>(event?.status as string)
    const [discountAmount, setDiscountAmount] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [payable, setPayable] = useState(0)
    const [discountedPayable, setDiscountedPayable] = useState(payable)
    const [calculatedInvoice, setCalculatedInvoice] = useState<Invoice>({})
    const [discountList, setDiscountList] = useState<Array<Discount>>([])
    const [hasQpayPayment, setHasQpayPayment] = useState(false)

    const loginUserId: number = currentUser?.id || 0
    
    useEffect(() => {
        setTotalPaymentState(parseInt(invoice?.payment as string))
        setDiscountAmount(parseInt(invoice?.discount_amount as string))
    }, [event, invoice])

    useEffect(() => {
        let updatedPaidAmount = 0;
        splitPayments.map(payment => updatedPaidAmount += parseInt(payment.split_payment_amount))
        setCurrentPaidAmount(updatedPaidAmount)
    }, [splitPayments])

    useEffect(() => {
        let compute_payable = 0
        if(eventStatus === 'part_paid' || eventStatus === 'unpaid') 
            compute_payable = storedLeftPayment + extraPayment
        else
            compute_payable = totalPaymentState - partPaidAmount + storedLeftPayment
        setPayable(compute_payable)    
    }, [storedLeftPayment, extraPayment, totalPaymentState, eventStatus])

    useEffect(() => {
        let discPayable = payable

        if((eventStatus !== 'part_paid' && eventStatus !== 'unpaid') && discountAmount)
            discPayable = (payable - discountAmount)

        setDiscountedPayable(discPayable)    
    }, [discountAmount, payable, eventStatus])

    useEffect(() => {
        setCurrentLeftPayment(discountedPayable - currentPaidAmount)
    }, [discountedPayable, currentPaidAmount])

    useEffect(() => {
        const newInvoice = {
            'id': undefined,
            'payment': String(totalPaymentState), 
            'paid': String(partPaidAmount),
            'discount_amount': String(discountAmount),
            'stored_left_payment': String(storedLeftPayment),
            'payable': String(discountedPayable)
        } 

        setCalculatedInvoice({...invoice, ...newInvoice})
    }, [totalPaymentState, discountAmount, partPaidAmount, storedLeftPayment, discountedPayable, invoice])

    useEffect(() => {
        splitPayments.length > 0 && 
            splitPayments.map((splitPayment, index) => {
                setHasQpayPayment(splitPayment.type === 'qpay')
            })
    }, [splitPayments])

    const openPaymentModal = (type: string) => {
        setCurrentPaymentType(type)
        togglePaymentModal()
    }

    const togglePaymentModal = () => {
        setPaymentModalBtn(!paymentModalBtn)
    }

    const addSplitPayment = (split_amount: string, coupon_code_id: ID = 0, bank_account_id: ID = 0, desc: string = '') => {
        const filteredPayments = splitPayments.filter((splitPayment, index) => splitPayment.type !== currentPaymentType)
        setSplitPayments([...filteredPayments, 
            {
                'type': currentPaymentType, 
                'split_payment_amount': split_amount, 
                'coupon_code_id': coupon_code_id,
                'bank_account_id': bank_account_id,
                'desc': desc
            }
        ])
    }

    const removeSplitPayment = (removeIndex: number) => {
        const filteredPayments = splitPayments.filter((splitPayment, index) => index !== removeIndex)
        setSplitPayments(filteredPayments)
    }

    const openCouponModal = (type: string) => {
        setCurrentPaymentType(type)
        toggleCouponModal()
    }

    const openQpayModal = (type: string) => {
        setCurrentPaymentType(type)
        toggleQpayModal()
    }

    const toggleCouponModal = () => {
        setCouponModalBtn(!couponModalBtn)
    }

    const toggleQpayModal = () => {
        setQpayModalBtn(!qpayModalBtn)
    }

    const addExtraPayment = (extraPayment: number) => {
        setExtraPayment(extraPayment)
        const updatedPayment = extraPayment + totalPaymentState
        setTotalPaymentState(updatedPayment)
    } 

    const toggleExtraChargeModal = () => {
        setExtraChargeModalBtn(!extraChargeModalBtn)
    }

    const toggleDiscountModal = () => {
        setDiscountModalBtn(!discountModalBtn)
    }

    const calculateDiscountAmount = (amount: number, type: string) => {
        let discountPayment = amount
        let percent = 0
        if(type === 'percent') {
            discountPayment = (totalPaymentState * amount) / 100
            percent = amount
        }
        setDiscountAmount(discountPayment)
        setDiscountList([{'amount': discountPayment.toString(), 'percent': percent.toString(), 'type': type}])
    }

    const submitForm = async (state: string) => {
        setLoading(true)
        const msg = state === 'unpaid' ? CRUD_RESPONSES.success : CRUD_RESPONSES.success_payment;

        if ((eventStatus === 'unpaid' || eventStatus ===  'part_paid' || eventStatus === 'completed') && state === 'unpaid') {
            setLoading(false)
            cancel()
            return true;
        }

        try {
            const paymentForm: PaymentForm = {
                id: eventIdForUpdate, 
                split_payments: splitPayments, 
                payment: totalPaymentState, 
                payable: discountedPayable, 
                paid_amount: currentPaidAmount, 
                left_payment: currentLeftPayment,
                state: state,
                user_id: loginUserId,
                invoice_id: invoiceId,
                discounts: discountList
            }
            const response = await createPayment(paymentForm)
            const status = response.payload?.status
            status && status === 200 && NotifySuccess(msg)
        } catch (ex) {
            console.error(ex)
        } finally {
            refetch()
            setLoading(false)
            cancel()
        }
    }

    const cancel = () => {             
        navigate(-1)
    }

    return (<>
        <div className="card-header">
            <div className='card-title d-flex justify-content-between flex-wrap flex-stack w-100 me-0 border-bottom'>
                <h3 className='fw-bolder m-0'>Төлбөр төлөх</h3>
            </div>
        </div>
        <div className="card-body pt-2 pb-1 border-bottom">
            <form id='kt_modal_payment_form' className='form' noValidate>
                <div className="scroll-y me-n5 pe-5"
                    style={{height: '445px'}}
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: true, lg: true}'
                    data-kt-scroll-max-height='450px'
                    data-kt-scroll-offset='0px'
                >
                    <PaymentDetail invoiceState={calculatedInvoice} viewType={viewType} changeAsideType={changeAsideType}/>

                    <div className="separator my-3"></div>
                    {eventStatus !==  'part_paid' && 
                        <div className="row row-cols-2">
                            <div className="col pe-1 mb-6" onClick={() => {toggleExtraChargeModal()}} data-bs-toggle="tooltip" title="Төлбөр нэмэх">
                                <label className="btn btn-outline btn-outline-default d-flex text-start p-4" 
                                    data-kt-button="true">
                                    <span className="fs-6 fw-bolder text-gray-800 d-block">
                                    <i className="fas fa-hand-holding-dollar fs-3 text-danger" />Нэмэлт төлбөр</span>
                                </label>
                            </div>
                            <div className="col pe-1 mb-6" onClick={() => {toggleDiscountModal()}} data-bs-toggle="tooltip" title="Хөнгөлөлт оруулах">
                                <label className="btn btn-outline btn-outline-default d-flex text-start p-4" 
                                    data-kt-button="true">
                                    <span className="fs-6 fw-bolder text-gray-800 d-block">
                                    <i className="fas fa-percentage fs-3 text-danger" />Хөнгөлөлт</span>
                                </label>
                            </div>
                        </div>
                    }
                    
                    {currentLeftPayment > 0 && 
                        <PaymentTypeSelection openCouponModal={openCouponModal} openPaymentModal={openPaymentModal} openQpayModal={openQpayModal} hasQpayPayment={hasQpayPayment}/>
                    }

                    {splitPayments.length > 0 && 
                        splitPayments.map((splitPayment, index) => {
                            const lastItem = splitPayments.length-1 === index ? true : false
                            return (
                                <SplitPaymentItem key={index} index={index} splitPayment={splitPayment} removeSplitPayment={removeSplitPayment} lastItem={lastItem}/>
                            )
                        })
                    }

                    {splitPayments.length > 0 && currentLeftPayment > 0 && 
                    <div className='d-flex mb-2 mt-2'>
                        <div className='text-gray-800 fw-bold fs-6 flex-grow-1'>Үлдэгдэл төлбөр </div>
                        <NumberFormat
                            className="text-gray-800 fw-bold fs-6 align-self-end"
                            value={currentLeftPayment} 
                            displayType={'text'}
                            thousandSeparator={true}
                        />₮
                    </div>
                    }
                </div>
            </form>
        </div>
        <div className='card-footer d-flex justify-content-between py-6 px-9'>
            {splitPayments.length === 0 && currentLeftPayment > 0 && 
                <button className="btn btn-sm btn-primary"
                    onClick={() => submitForm('unpaid')}>
                    <span className='indicator-label'>Дараа төлөх</span>                            
                </button>
            }
            
            {splitPayments.length > 0 && currentLeftPayment > 0 && 
                <button className="btn btn-sm btn-primary"
                    onClick={() => submitForm('part_paid')}>
                    <span className='indicator-label'>Хувааж төлөх</span>                            
                </button>
            }

            {currentLeftPayment === 0 && 
                <button className="btn btn-sm btn-primary" 
                    type="submit"
                    onClick={() => submitForm('completed')}>
                    <span className='indicator-label'>Дуусгах</span>                            
                </button>
            }
        </div>
            
        {loading && <CalendarListLoading />}

        {paymentModalBtn &&                  
            <PaymentMethodModal 
                togglePaymentModal={togglePaymentModal} 
                addSplitPayment={addSplitPayment} 
                totalLeftPayment={currentLeftPayment}
                paymentType={currentPaymentType}/>
        }
        {couponModalBtn &&                  
            <CouponCodeModal toggleCouponModal={toggleCouponModal} addSplitPayment={addSplitPayment} totalLeftPayment={currentLeftPayment} />
        }
        {qpayModalBtn &&                  
            <QpayMethodModal toggleQpayModal={toggleQpayModal} addSplitPayment={addSplitPayment} totalLeftPayment={currentLeftPayment} />
        }
        {extraChargeModalBtn &&                  
            <ExtraChargeModal toggleExtraChargeModal={toggleExtraChargeModal} addExtraPayment={addExtraPayment} extraPayment={extraPayment}/>
        }
        {discountModalBtn &&                  
            <DiscountMethodModal toggleDiscountModal={toggleDiscountModal} calculateDiscountAmount={calculateDiscountAmount} discountList={discountList}/>
        }
        </>
    )
}