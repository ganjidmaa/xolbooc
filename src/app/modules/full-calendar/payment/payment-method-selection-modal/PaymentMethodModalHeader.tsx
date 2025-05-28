import { FC } from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'

type Props = {
  toggleMethodSelectionModal: () => void
}

const PaymentMethodModalHeader: FC<Props> = ({toggleMethodSelectionModal}) => {

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>Төлбөр хэлбэр сонгох</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => toggleMethodSelectionModal()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {PaymentMethodModalHeader}
