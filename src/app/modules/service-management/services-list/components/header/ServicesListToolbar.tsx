import { KTSVG } from '../../../../../../_metronic/helpers'
import { useAuth } from '../../../../auth'
import { userCanCreateServices } from '../../../core/consts'
import { Dropdown } from './ServicesCreationDropdown'

const ServicesListToolbar = () => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

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
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            Нэмэх
          </button>

          <Dropdown />
        </div>
      }
    </div>
  )
}

export {ServicesListToolbar}
