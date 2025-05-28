import {FC, useEffect} from 'react'
import { QpayMethodModalForm } from './QpayMethodModalForm'
import {QpayMethodModalHeader} from './QpayMethodModalHeader'

type Props = {
  toggleQpayModal: () => void
  addSplitPayment: (split_amount: string) => void
  totalLeftPayment: number
}
const QpayMethodModal: FC<Props> = ({toggleQpayModal, addSplitPayment, totalLeftPayment}) => {
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
            <QpayMethodModalHeader togglePaymentModal={toggleQpayModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <QpayMethodModalForm 
                  togglePaymentModal={toggleQpayModal} 
                  addSplitPayment={addSplitPayment} 
                  totalLeftPayment={totalLeftPayment}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {QpayMethodModal}
