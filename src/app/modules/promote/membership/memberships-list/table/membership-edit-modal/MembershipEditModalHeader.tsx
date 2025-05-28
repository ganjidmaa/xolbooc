import { FC } from 'react'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'

type Props = {
  createType?: string
  closeModal?: () => void
}

const MembershipEditModalHeader:FC<Props> = ({ createType='membership', closeModal=()=>{} }) => {
  const {setItemIdForUpdate} = useListView()

  const handleClose = () => {
    if(createType === 'customer') {
      closeModal()
    }
    else {
      setItemIdForUpdate(undefined)
    }
  }

  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>Гишүүнчлэл үүсгэх</h2>
      
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => handleClose()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>

    </div>
  )
}

export {MembershipEditModalHeader}
