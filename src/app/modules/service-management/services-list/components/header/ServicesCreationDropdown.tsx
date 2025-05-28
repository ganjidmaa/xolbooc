/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { useListView } from '../../provider/ListViewProvider'

const Dropdown: FC = () => {
  const navigate = useNavigate()
  const { setItemIdForUpdate } = useListView()
  const openEditModal = () => {
    return navigate('/service/list/detail')
  }
  
  const openAddCategoryModal = () => {
    setItemIdForUpdate(null)
  }
  
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3'
      data-kt-menu='true'
    >
      <div className='menu-item px-3' onClick={openAddCategoryModal}>
        <a href='#' className='menu-link px-3 text-gray-700'>
          Ангилал үүсгэх
        </a>
      </div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3 text-gray-700' onClick={openEditModal}>
        Онош үүсгэх
        </a>
      </div>

    </div>
  )
}

export {Dropdown}
