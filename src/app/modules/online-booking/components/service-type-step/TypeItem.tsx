/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Type} from '../../core/_models'
import {useCalendarItem} from '../../core/CalendarItemProvider'

type Props = {
  type: Type
}

const TypeItem: React.FC<Props> = ({type}) => {
  const {itemDatas, setItemDatas, activeTab, setActiveTab} = useCalendarItem()

  const handleClickType = () => {
    setItemDatas({...itemDatas, type: type})
    type && setActiveTab(activeTab + 1)
  }

  return (
    <div
      className='menu menu-column menu-rounded menu-state-bg '
      onClick={(e) => handleClickType()}
    >
      <div className='menu-item'>
        <div className='d-flex align-items-center mb-1 menu-link'>
          <div className='flex-grow-1'>
            <span className='text-hover-dark'>{type.name}</span>
          </div>
          <div>
            <i className='fa fa-solid fa-angles-right fs-5 pe-2 text-dark'></i>
          </div>
        </div>

        <div className='separator border border-dashed' />
      </div>
    </div>
  )
}

export {TypeItem}
