import { FC, useEffect, useState } from "react"
import { paymentMethodColors, paymentMethodIcons } from "../../../../_metronic/helpers"
import clsx from "clsx"
import { PaymentMethodSelecitonModal } from "./payment-method-selection-modal/PaymentMethodModal"
import { PaymentMethod, useAuth } from "../../auth"
import { useCalendarView } from "../core/CalendarViewProvider"

type Props = {
    openPaymentModal: (type: string) => void
    openCouponModal: (type: string) => void
    openQpayModal: (type: string) => void
    hasQpayPayment: boolean
}

export const PaymentTypeSelection:FC<Props> = ({openPaymentModal, openCouponModal, openQpayModal, hasQpayPayment}) => {
    const {paymentMethods, refetch} = useAuth()
    const [paymentMethodsState, setPaymentMethodsState] = useState<Array<PaymentMethod>>([])
    const [toggleMethodSelectionModal, setToggleMethodSelectionModal] = useState<boolean>(false)

    useEffect(() => {
        paymentMethods && setPaymentMethodsState(paymentMethods.filter(paymentMethod => {return paymentMethod.active === true && !['discount', 'discount_card', 'membership'].includes(paymentMethod.slug)}))
    }, [paymentMethods])

    const openPaymentMethodSelection = () => {
        setToggleMethodSelectionModal(!toggleMethodSelectionModal)
    }

    const selectPayment = (paymentMethod: any) => {
        if (paymentMethod.slug === 'coupon') {
            openCouponModal(paymentMethod.slug);
        }else if (paymentMethod.slug === 'qpay'){
            openQpayModal(paymentMethod.slug);
        } else {
            openPaymentModal(paymentMethod.slug);
        }
    }
 
    return (
        <div className='fv-row mb-5'>
            <label className="d-block fw-bold fs-6 mb-5" onClick={() => openPaymentMethodSelection()}>Төлбөрийн хэлбэр
                <i className="fas fa-exclamation-circle ms-2 fs-7" 
                    data-bs-toggle="tooltip" 
                    title="Төлбөрийн хэлбэр сонгоно"></i>
            </label>
            <div className="row row-cols-2 row-cols-md-3 g-6" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button='true']">
                {paymentMethodsState && paymentMethodsState.map((paymentMethod, index) => {
                    return (
                        <div key={index}>
                            {paymentMethod.slug === 'qpay' && hasQpayPayment ?(
                                <div className="col pe-1 opacity-25" key={index}>
                                    <label className="btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-4" data-kt-button="true">
                                        <span className="fs-6 fw-bolder text-gray-800 d-block">
                                            <i className={clsx('fas fa-solid fs-3', 
                                            `${paymentMethodIcons.filter(iconM => iconM.method === paymentMethod.slug)[0]?.icon} text-${paymentMethodColors[index].color}`)} />
                                            {paymentMethod.name}
                                        </span>
                                    </label>
                                </div>
                            ):(
                                <div className="col pe-1" key={index} onClick={() => {selectPayment(paymentMethod)}}>
                                    <label className="btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-4" data-kt-button="true">
                                        <span className="fs-6 fw-bolder text-gray-800 d-block">
                                            <i className={clsx('fas fa-solid fs-3', 
                                            `${paymentMethodIcons.filter(iconM => iconM.method === paymentMethod.slug)[0]?.icon} text-${paymentMethodColors[index].color}`)} />
                                            {paymentMethod.name}
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {toggleMethodSelectionModal && 
            <PaymentMethodSelecitonModal 
                toggleMethodSelectionModal={openPaymentMethodSelection} 
                methods={paymentMethods as Array<PaymentMethod>}
                refetch={refetch}
            />}
        </div>
    )
}