import {FC, useEffect} from 'react'
import { DiscountMethodModalForm } from './DiscountMethodModalForm'
import { DiscountMethodModalHeader } from './DiscountMethodModalHeader'
import { Discount } from '../../core/_models'

type Props = {
  toggleDiscountModal: () => void
  calculateDiscountAmount: (amount: number, type: string) => void
  discountList: Array<Discount>
}
const DiscountMethodModal: FC<Props> = ({toggleDiscountModal, calculateDiscountAmount, discountList}) => {
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
            <DiscountMethodModalHeader toggleDiscountModal={toggleDiscountModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <DiscountMethodModalForm toggleDiscountModal={toggleDiscountModal} calculateDiscountAmount={calculateDiscountAmount} discountList={discountList}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {DiscountMethodModal}
