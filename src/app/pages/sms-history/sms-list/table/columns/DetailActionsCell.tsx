/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { userCanUpdateCoupons } from '../../core/const'
import {useListView} from '../../core/ListViewProvider'
import { ID, KTSVG } from '../../../../../../_metronic/helpers'
import { useAuth } from '../../../../../modules/auth'
type Props = {
  id: ID
}

const DetailActionsCell: FC<Props> = ({id}) => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

  const {setItemIdForUpdate} = useListView()


  const showDetialView = () => {
    setItemIdForUpdate(id)
  }

  return (
      <div className='d-flex justify-content-end flex-shrink-0'>
        {userCanUpdateCoupons(userRole) && 
          <Link to=''
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            onClick={showDetialView}
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </Link>
        }
      </div>
  )
}

export {DetailActionsCell}
