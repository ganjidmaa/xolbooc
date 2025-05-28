import { CouponCodeEditModalForm } from './CouponCodeEditModalForm'
import { useListView } from '../core/ListViewProvider'
import { useQuery } from 'react-query'
import { CRUD_RESPONSES, QUERIES } from '../../../../../../_metronic/helpers'
import { getCoupons } from '../core/_requests'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { useEffect, useState } from 'react'
import { Coupon } from '../core/_models'

const CouponCodeEditModalFormWrapper = () => {
  const {setItemIdForUpdate} = useListView()
  const [coupons, setCoupons] = useState<Array<Coupon>>([])

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.COUPONS_LIST}-data`,
    () => {
      return getCoupons()
    },
    {
      cacheTime: 0,
      enabled: true,
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
    if(data && data.data) {
      setCoupons(data.data)
    }
  }, [data])

  if (!isLoading && !error && data) {
    return <CouponCodeEditModalForm isLoading={isLoading} coupons={coupons}/>
  }

  return null
}

export {CouponCodeEditModalFormWrapper}
