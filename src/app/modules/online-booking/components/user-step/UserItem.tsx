/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { User } from '../../core/_models'
import { useCalendarItem } from '../../core/CalendarItemProvider';

type Props = {
    user: User
}

const UserItem: React.FC<Props> = ({user}) => {
  const {itemDatas, setItemDatas, activeTab, setActiveTab} = useCalendarItem()

  const handleClickUser = () => {
      setItemDatas({...itemDatas, user: user})
      user && setActiveTab(activeTab + 1)
  }

  return (
    <div className='menu menu-column menu-rounded menu-state-bg ' onClick={(e) => handleClickUser()}>
      
      <div className='menu-item'>
        <div className='d-flex align-items-center mb-1 menu-link'>
            <div className='flex-grow-1'>
                <span className='text-hover-primary'>
                  {user.lastname} {user.firstname?.toUpperCase()}
                </span>
            </div>
            <div>
              <i className='fa fa-solid fa-angles-right fs-5 pe-2 text-primary'></i>
            </div>
        </div>
        
        <div className='separator border border-dashed' />
      </div>
    </div>
  )
}

export {UserItem}
