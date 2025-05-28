// @ts-nocheck
import clsx from 'clsx'
import {KTSVG, Notifi} from '../../../helpers'
import { useAuth } from '../../../../app/modules/auth'
import { useEffect, useState } from 'react'
import './spin.css'

type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const HeaderNotificationsMenu = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {

  const {currentUser} = useAuth()
  const [notifications, setNotifications] = useState<Array<Notifi>>([])
  const [newNotif, setNewNotif] = useState(false)

  useEffect(() => {
    window.Echo.private(`users.${currentUser?.id}`).notification((notification:any) => {
      if(notification.type === "App\\Notifications\\NotificationCreate"){
        setNotifications([...notifications, {context: notification.context}])
        setNewNotif(true)
      }
    });

  }, [notifications])

  useEffect(() => {
    if(newNotif){
      const notiSong = new Audio('/media/notification.wav');
      notiSong.play();
      setNewNotif(false);
    }
    
  }, [newNotif])
  
  return (
    <>
      <a
        href='#'
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach='parent'
        data-kt-menu-placement={menuPlacement}
      >

          <span className={clsx(notifications.length !== 0 && 'spin')}>
            <KTSVG
              path='/media/icons/duotune/abstract/abs039.svg'
              className={clsx('theme-dark-hide', toggleBtnIconClass)}
            />
          </span>
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-300px'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        {notifications.length !== 0 && notifications.toReversed().map((notification, index) => {
          return (<div className='menu-item px-3 my-0' key={index}>
          <a
            href='/calendar/index'
            className={clsx('menu-link px-3 py-2')}
            onClick={() => {
              setNotifications(notifications.filter((noti) => {return noti !== notification}))
              sessionStorage.setItem('target_date', notification.context)
            }}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG path='/media/icons/duotune/general/gen007.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>{notification.context} өдөр шинэ захиалга үүслээ.</span>
          </a>
        </div>)
        })}
        {notifications.length === 0 && 
        <div>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2')}
            onClick={() => {}}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG path='/media/icons/duotune/general/gen007.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>Одоогоор мэдэгдэл байхгүй байна.</span>
          </a>
        </div>
        }
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {HeaderNotificationsMenu}
