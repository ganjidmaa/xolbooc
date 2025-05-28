import {FC, useEffect} from 'react'
import { ID } from '../../../../../../../_metronic/helpers'
import { CustomersModalFormWrapper } from './CustomersModalFormWrapper'
import { CustomersModalHeader } from './CustomersModalHeader'

type Props = {
  toggleCustomerModal: () => void
  selectedCustomersProp: Array<ID>
}

const CustomersModal:FC<Props> = ({toggleCustomerModal, selectedCustomersProp}) => {
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
        id='kt_modal_add_customer'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <CustomersModalHeader toggleCustomerModal={toggleCustomerModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 mb-7'>
              <CustomersModalFormWrapper toggleCustomerModal={toggleCustomerModal} selectedCustomersProp={selectedCustomersProp}/>
            </div>
          </div>
        </div>

      </div>
      
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {CustomersModal}
