/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl, toApiPublicUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  const blankImg = toAbsoluteUrl('/media/avatars/blank.svg')
  const navigate = useNavigate()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={currentUser?.avatar ? toApiPublicUrl(currentUser.avatar) : blankImg} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.lastname} {currentUser?.firstname}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <div onClick={() => {
              navigate('/user/list/account/overview', {state: {userId: currentUser?.id}})
            }} className='menu-link px-5'>
          Миний профайл
        </div>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Гарах
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
