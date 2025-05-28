import { FC } from 'react'
import { CouponCodeModalForm } from './CouponCodeModalForm'

type Props = {
  toggleCouponModal: () => void
  totalLeftPayment: number
  addSplitPayment: (split_amount: string) => void
}

const CouponCodeModalFormWrapper:FC<Props> = ({toggleCouponModal, addSplitPayment, totalLeftPayment}) => {
  return <CouponCodeModalForm toggleCouponModal={toggleCouponModal} addSplitPayment={addSplitPayment} totalLeftPayment={totalLeftPayment}/>
}

export {CouponCodeModalFormWrapper}
