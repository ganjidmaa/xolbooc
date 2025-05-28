import {FC, useEffect} from 'react'
import { ExtraChargeModalForm } from './ExtraChargeModalForm'
import { ExtraChargeModalHeader } from './ExtraChargeModalHeader'

type Props = {
  toggleExtraChargeModal: () => void
  addExtraPayment: (extraPayment: number) => void
  extraPayment: number
}
const ExtraChargeModal: FC<Props> = ({toggleExtraChargeModal, addExtraPayment, extraPayment}) => {
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
            <ExtraChargeModalHeader toggleExtraChargeModal={toggleExtraChargeModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <ExtraChargeModalForm toggleExtraChargeModal={toggleExtraChargeModal} addExtraPayment={addExtraPayment} extraPayment={extraPayment}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {ExtraChargeModal}
