/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import { useAuth } from '../../../../../auth'
import { userCanDeleteCoupons, userCanUpdateCoupons } from '../../core/const'
import { inactiveCouponCode } from '../../core/_requests'
import { useMutation, useQueryClient } from 'react-query'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  id: ID
}

const CouponCodeActionsCell: FC<Props> = ({id}) => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const showDetialView = () => {
    return navigate('/promote/coupon/code/detail', {state: {'couponCodeId': id}})
  }

  const inactiveSelectedCode = useMutation(() => inactiveCouponCode(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.COUPON_CODES_LIST}-${query}`])
      NotifySuccess('Идэвхгүй боллоо.')
    },
    onError: (ex: any) => {
      ex.response?.status === 403 ? 
        WarningAlert(CRUD_RESPONSES.failed_authorization)
      : 
        ErrorAlert(CRUD_RESPONSES.error)
    }
  })

  return (
      <div className='d-flex justify-content-center'>
        {userCanUpdateCoupons(userRole) && 
          <div
            className='btn btn-light btn-light-success btn-sm ps-4 pe-2 py-2'
            onClick={showDetialView}
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-success svg-icon-2' />
          </div>
        }

        {userCanDeleteCoupons(userRole) && 
          <Link to=''
            className='btn btn-light btn-light-danger btn-sm ps-4 pe-2 py-2'
            onClick={() => inactiveSelectedCode.mutate()}
          >
            <KTSVG
              path='/media/icons/duotune/general/gen040.svg'
              className='svg-icon-danger svg-icon-2'
            />
          </Link>
        }
      </div>
  )
}

export {CouponCodeActionsCell}
