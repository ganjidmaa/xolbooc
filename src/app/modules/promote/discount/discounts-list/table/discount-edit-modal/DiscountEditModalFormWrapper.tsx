import {useQuery} from 'react-query'
import { DiscountEditModalForm } from './DiscountEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, QUERIES} from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { getDiscountById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { Discount } from '../../core/_models'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

const DiscountEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [discount, setDiscount] = useState<Discount>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.DISCOUNTS_LIST}-discount-${itemIdForUpdate}`,
    () => {
      return getDiscountById(itemIdForUpdate)
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
      setDiscount(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <DiscountEditModalForm discount={{id: undefined, selected_services: []}} isLoading={isLoading}/>
  }

  if (!isLoading && !error && discount) {
    return <DiscountEditModalForm isLoading={isLoading} discount={discount} />
  }

  return null
}

export {DiscountEditModalFormWrapper}
