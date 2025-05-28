import { FC } from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'

type Props = {
  toggleDiscountModal: () => void
}

const DiscountMethodModalHeader: FC<Props> = ({toggleDiscountModal}) => {

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>Хөнгөлөлт</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => toggleDiscountModal()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {DiscountMethodModalHeader}
