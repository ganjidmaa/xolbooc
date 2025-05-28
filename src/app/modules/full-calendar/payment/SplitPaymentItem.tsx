import { FC } from "react"
import { NumericFormat as NumberFormat}from "react-number-format"
import { KTSVG } from "../../../../_metronic/helpers"
import { SplitPayment } from "../core/_models"
import { useAuth } from "../../auth"

type Props = {
    index: number
    splitPayment: SplitPayment
    removeSplitPayment: (index: number) => void
    lastItem: boolean
}

export const SplitPaymentItem:FC<Props> = ({index, splitPayment, removeSplitPayment, lastItem}) => {
    const {paymentMethods} = useAuth()
    
    return (
        <>
            <div className='d-flex align-items-center px-6 py-3'>
                <div className='flex-grow-1'>
                    <div className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                        {paymentMethods.filter(paymentMethod => paymentMethod.slug === splitPayment.type)[0].name }
                    </div>
                </div>
                
                <NumberFormat
                    className="text-gray-800 fw-bold align-self-start pt-1"
                    value={splitPayment.split_payment_amount} 
                    displayType={'text'}
                    thousandSeparator={true}
                />
                <span className='text-gray-800 fw-bold align-self-start pt-1'>{' ₮'} </span>
                {splitPayment.type !== 'qpay' && <span onClick={() => {removeSplitPayment(index)}}>
                    <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3 px-4 svg-icon-danger'
                    />
                </span>}
            </div>

            {!lastItem && 
                <div className="separator separator-dashed"></div>
            }
        </>
    )
}