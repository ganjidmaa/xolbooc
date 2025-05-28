import {KTSVG} from '../../../../../../_metronic/helpers'
import {useAuth} from '../../../../auth'
import {userCanCreateComments} from '../../core/const'
import {useListView} from '../../core/ListViewProvider'

const CommentToolbar = () => {
  const {currentUser} = useAuth()
  const userRole: string = currentUser?.role || ''
  const {setItemIdForUpdate} = useListView()
  const openAddDiscountModal = () => {
    setItemIdForUpdate(null)
  }
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {userCanCreateComments(userRole) && 
        <button type='button' className='btn btn-primary' onClick={openAddDiscountModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Нэмэх
        </button>
      }
    </div>
  )
}

export {CommentToolbar}
