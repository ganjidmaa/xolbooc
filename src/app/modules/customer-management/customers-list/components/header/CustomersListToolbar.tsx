
import { KTSVG } from '../../../../../../_metronic/helpers'
import { useAuth } from '../../../../auth'
import { userCanCreateCustomers } from '../../../core/consts'
import {useListView} from '../../provider/ListViewProvider'
import { CustomersListFilter } from './CustomersListFilter'

const CustomersListToolbar = () => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const { setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <CustomersListFilter />

      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Татах
      </button> */}

      {userCanCreateCustomers(userRole) && 
        <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Нэмэх
        </button>
      }
    </div>
  )
}

export {CustomersListToolbar}
