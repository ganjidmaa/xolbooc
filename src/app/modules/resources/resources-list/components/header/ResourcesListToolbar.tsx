import { KTSVG } from '../../../../../../_metronic/helpers'
import { useAuth } from '../../../../auth'
import { userCanCreateResources } from '../../../core/consts'
import { useListView } from '../../provider/ListViewProvider'

const ResourcesListToolbar = () => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  
  const { setItemIdForUpdate} = useListView()
  const openAddResourceModal = () => {
    setItemIdForUpdate(null)
  }
  
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <ResourcesListFilter /> */}

      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Татах
      </button> */}

      {userCanCreateResources(userRole) && 
        <button type='button' className='btn btn-primary' onClick={openAddResourceModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Нэмэх
        </button>
      }
    </div>
  )
}

export {ResourcesListToolbar}
