import {useQuery} from 'react-query'
import { CouponEditModalForm } from './CouponEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, QUERIES} from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { getCouponById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { Coupon } from '../../core/_models'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

const CouponEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [coupon, setCoupon] = useState<Coupon>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.COUPONS_LIST}-coupon-${itemIdForUpdate}`,
    () => {
      return getCouponById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err: any) => {
        setItemIdForUpdate(undefined)
        console.error(err)
        err.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      },
      retryOnMount: false,
      retry: false,
    }
  )

  useEffect(() => {
    if(data) {
      setCoupon(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <CouponEditModalForm coupon={{id: undefined, selected_services: []}} isLoading={isLoading}/>
  }

  if (!isLoading && !error && coupon) {
    return <CouponEditModalForm isLoading={isLoading} coupon={coupon} />
  }

  return null
}

export {CouponEditModalFormWrapper}
