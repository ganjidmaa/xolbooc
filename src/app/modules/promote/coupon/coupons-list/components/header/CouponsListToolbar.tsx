import { KTSVG } from '../../../../../../../_metronic/helpers'
import { useAuth } from '../../../../../auth'
import { userCanCreateCoupons } from '../../core/const'
import {useListView} from '../../core/ListViewProvider'

const CouponsListToolbar = () => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

  const { setItemIdForUpdate} = useListView()
  const openAddCouponModal = () => {
    setItemIdForUpdate(null)
  }
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <CouponsListFilter /> */}

      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Татах
      </button> */}
      {userCanCreateCoupons(userRole) && 
        <button type='button' className='btn btn-primary' onClick={openAddCouponModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Нэмэх
        </button>
      }
    </div>
  )
}

export {CouponsListToolbar}
