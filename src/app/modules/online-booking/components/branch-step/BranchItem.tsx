/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Branch} from '../../core/_models'
import {useCalendarItem} from '../../core/CalendarItemProvider'
import {getBranchServices} from '../../core/_requests'
import {useCalendarData} from '../../core/CalendarDataProvider'
import clsx from 'clsx'

type Props = {
  branch: Branch
}

const BranchItem: React.FC<Props> = ({branch}) => {
  const {setServiceCategories} = useCalendarData()
  const {itemDatas, setItemDatas, activeTab, setActiveTab} = useCalendarItem()

  const fetchServicesApi = async () => {
    const response = await getBranchServices(branch.id)
    response && setServiceCategories(response)
  }
  const handleClickBranch = () => {
    fetchServicesApi()
    setItemDatas({...itemDatas, branch: branch})
    branch && setActiveTab(activeTab + 1)
  }

  return (
    <div
      onClick={() => handleClickBranch()}
      style={{textAlign: 'start'}}
      className={clsx(
        'btn btn-sm btn-active-light-dark py-2 border border-dark mb-5 d-flex fs-lg-5 fs-6',
        {active: branch.id === itemDatas.branch?.id}
      )}
    >
      <div className='flex-grow-1'>
        <i className='bi fa-solid bi-building fs-5 pe-2 text-dark'></i>
        <span className='fw-bolder'> {branch.name} </span>
        <br />

        <i className='bi bi-telephone-inbound fs-5 pe-2 text-dark'></i>
        <span> {branch.phone} </span>
        <br />

        <i className='bi fa-solid bi-clock fs-5 pe-2 text-dark'></i>
        <span>
          {' '}
          {branch.start_time} - {branch.end_time}{' '}
        </span>
        <br />

        <i className='bi bi-geo-alt fs-5 pe-2 text-dark'></i>
        <span> {branch.address} </span>
      </div>

      <div className='align-self-center'>
        <i className='fa fa-solid fa-angles-right fs-5 pe-2 text-dark'></i>
      </div>
    </div>
  )
}

export {BranchItem}
