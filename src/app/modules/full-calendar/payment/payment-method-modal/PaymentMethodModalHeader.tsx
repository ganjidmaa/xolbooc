import { FC } from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'

type Props = {
  togglePaymentModal: () => void
}

const PaymentMethodModalHeader: FC<Props> = ({togglePaymentModal}) => {

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>Төлбөр оруулах</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => togglePaymentModal()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {PaymentMethodModalHeader}
