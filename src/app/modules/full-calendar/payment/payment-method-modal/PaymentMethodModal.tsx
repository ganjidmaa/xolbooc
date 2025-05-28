import {FC, useEffect} from 'react'
import { PaymentMethodModalForm } from './PaymentMethodModalForm'
import {PaymentMethodModalHeader} from './PaymentMethodModalHeader'

type Props = {
  togglePaymentModal: () => void
  addSplitPayment: (split_amount: string) => void
  totalLeftPayment: number
  paymentType: string
}
const PaymentMethodModal: FC<Props> = ({togglePaymentModal, addSplitPayment, totalLeftPayment, paymentType}) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_payment'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <PaymentMethodModalHeader togglePaymentModal={togglePaymentModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <PaymentMethodModalForm 
                  togglePaymentModal={togglePaymentModal} 
                  addSplitPayment={addSplitPayment} 
                  totalLeftPayment={totalLeftPayment}
                  paymentType={paymentType}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {PaymentMethodModal}
