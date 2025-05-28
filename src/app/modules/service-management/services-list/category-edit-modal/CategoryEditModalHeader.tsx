import {KTSVG} from '../../../../../_metronic/helpers'
import { useListView } from '../provider/ListViewProvider'


const CategoryEditModalHeader = () => {
  const {setItemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>Ангилал үүсгэх</h2>
      
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

export {CategoryEditModalHeader}
