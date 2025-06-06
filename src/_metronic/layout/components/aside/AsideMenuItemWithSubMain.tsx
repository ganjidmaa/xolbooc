import {FC} from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {checkIsActive, WithChildren} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  bsTitle?: string
}

const AsideMenuItemWithSubMain: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  bsTitle,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  return (
    <div
      className={clsx('menu-item py-3', {'here show': isActive})}
      data-kt-menu-trigger='click'
      data-kt-menu-placement='right-start'
    >
      <OverlayTrigger
        placement='right'
        delay={{show: 250, hide: 400}}
        overlay={(props) => (
          <Tooltip id='button-tooltip' {...props}>
            {title}
          </Tooltip>
        )}
      >
        <span className='menu-link menu-center'>
          {fontIcon && aside.menuIcon === 'font' && (
            <>
              <span className='menu-icon me-0'>
                <i className={clsx('bi', fontIcon, 'fs-2')}></i>
              </span>
              {/* <span className='menu-title me-4'>{title}</span> */}
            </>
          )}
        </span>
      </OverlayTrigger>
      <div
        className={clsx('menu-sub menu-sub-dropdown px-1 py-4', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSubMain}
