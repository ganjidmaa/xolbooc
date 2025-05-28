/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { dashboardType } from '../../../../app/pages/dashboard/core/consts'

type Props = {
  chartType: string
}

const Dropdown2: FC<Props> = ({chartType}) => {
  return (
    <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-state-bg menu-title-gray-700 menu-state-primary menu-state-bullet-primary fw-semibold py-4 fs-base w-175px'
        data-kt-menu='true'
      >
        {chartType !== dashboardType.chartOne && <div className='menu-item px-0 my-0'>
          <a href='#'
            className={'menu-link px-6 py-2'}
          >
            <span className='menu-title'>Энэ сар</span>
          </a>
        </div>
        }
        
        {chartType !== dashboardType.chartOne && <div className='menu-item px-0 my-0'>
          <a href='#'
            className={'menu-link px-6 py-2'}
          >
            <span className='menu-title'>Өнгөрсөн сар</span>
          </a>
        </div>
        }

        <div className='menu-item px-0 my-0'>
          <a href='#'
            className={'menu-link px-6 py-2'}
          >
            <span className='menu-title'>Энэ жил</span>
          </a>
        </div>

        <div className='menu-item px-0 my-0'>
          <a href='#'
            className={'menu-link px-6 py-2'}
          >
            <span className='menu-title'>Өнгөрсөн жил</span>
          </a>
        </div>
      </div>
  )
}

export {Dropdown2}
