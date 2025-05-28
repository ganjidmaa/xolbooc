import { FC } from 'react'
import {KTSVG} from '../../../../../../../_metronic/helpers'

type Props = {
  toggleCustomerModal: () => void
}

const CustomersModalHeader:FC<Props> = ({toggleCustomerModal}) => {

  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>Гишүүд сонгох</h2>
      
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => toggleCustomerModal()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>

    </div>
  )
}

export {CustomersModalHeader}
