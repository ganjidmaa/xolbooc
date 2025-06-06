import {KTSVG} from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'

const CommentEditModalHeader = () => {
  const {setItemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>Сэтгэгдэл үүсгэх</h2>
      
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
    </div>
  )
}

export {CommentEditModalHeader}
