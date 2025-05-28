/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import clsx from 'clsx'
import {HeaderNotificationsMenu, ThemeModeSwitcher} from '../../../partials'
import {toAbsoluteUrl, toApiPublicUrl} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'
import {useAuth} from '../../../../app/modules/auth'

const itemClass = 'ms-1 ms-lg-3',
  btnClass = 'btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px',
  userAvatarClass = 'symbol-30px symbol-md-40px',
  btnIconClass = 'svg-icon-1'

const Topbar: FC = () => {
  const {currentUser} = useAuth()
  const blankImg = toAbsoluteUrl('/media/avatars/blank.svg')

  return (
    <div className='d-flex flex-shrink-0'>
      {/* begin::Theme mode */}
      <div className='d-flex align-items-center ms-3'>
        <ThemeModeSwitcher toggleBtnClass=' flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px' />
      </div>
      {/* end::Theme mode */}
      <div className='d-flex align-items-center ms-3'>
        <HeaderNotificationsMenu toggleBtnClass=' flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px'/>
      </div>
      {/* begin::User */}
      <div className={clsx('d-flex align-items-center', itemClass)} id='kt_header_user_menu_toggle'>
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img
            src={currentUser?.avatar ? toApiPublicUrl(currentUser.avatar) : blankImg}
            alt='avatar'
          />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
