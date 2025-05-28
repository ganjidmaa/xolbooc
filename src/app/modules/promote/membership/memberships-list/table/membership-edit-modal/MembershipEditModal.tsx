import {FC, useEffect} from 'react'
import { MembershipEditModalFormWrapper } from './MembershipEditModalFormWrapper'
import { MembershipEditModalHeader } from './MembershipEditModalHeader'
import { ID } from '../../../../../../../_metronic/helpers'

type Props = {
  createType: string
  closeModal?: () => void
  customerId?: ID
}

const MembershipEditModal:FC<Props> = ({ createType, closeModal, customerId = 0 }) => {
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
        id='kt_modal_add_membership'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <MembershipEditModalHeader closeModal={closeModal} createType={createType}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <MembershipEditModalFormWrapper closeModal={closeModal} createType={createType} customerId={customerId}/>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {MembershipEditModal}
