import {FC, useEffect} from 'react'
import { PaymentMethodModalForm } from './PaymentMethodModalForm'
import {PaymentMethodModalHeader} from './PaymentMethodModalHeader'
import { PaymentMethod } from '../../../auth'

type Props = {
  toggleMethodSelectionModal: () => void
  methods: Array<PaymentMethod>
  refetch: () => void
}
const PaymentMethodSelecitonModal: FC<Props> = ({toggleMethodSelectionModal, methods, refetch}) => {
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
            <PaymentMethodModalHeader toggleMethodSelectionModal={toggleMethodSelectionModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <PaymentMethodModalForm 
                  toggleMethodSelectionModal={toggleMethodSelectionModal} methods={methods} refetch={refetch}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {PaymentMethodSelecitonModal}
