import { useNavigate } from 'react-router-dom'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { useAuth } from '../../../../auth'
import { userCanCreateServices } from '../../../core/consts'

const ServicesListToolbar = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const openEditModal = () => {
    return navigate('/app_options/list/detail')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <ServicesListFilter /> */}

      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Татах
      </button> */}

      {userCanCreateServices(userRole) && 
        <div className='me-0'>
          <button type='button' className='btn btn-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
            onClick={openEditModal}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            Нэмэх
          </button>
        </div>
      }
    </div>
  )
}

export {ServicesListToolbar}
