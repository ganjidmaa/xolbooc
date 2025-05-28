import {FC, useEffect} from 'react'
import { CouponCodeModalFormWrapper } from './CouponCodeModalFormWrapper'
import { CouponCodeModalHeader } from './CouponCodeModalHeader'

type Props = {
  toggleCouponModal: () => void
  totalLeftPayment: number
  addSplitPayment: (split_amount: string) => void
}
const CouponCodeModal: FC<Props> = ({toggleCouponModal, addSplitPayment, totalLeftPayment}) => {
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
        id='kt_modal_search_coupon_code'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <CouponCodeModalHeader toggleCouponModal={toggleCouponModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <CouponCodeModalFormWrapper toggleCouponModal={toggleCouponModal} addSplitPayment={addSplitPayment} totalLeftPayment={totalLeftPayment}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {CouponCodeModal}
