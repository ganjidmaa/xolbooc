import {useQuery} from 'react-query'
import { CategoryEditModalForm } from './CategoryEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, objectHasAttr, QUERIES} from '../../../../../_metronic/helpers'
import { useListView } from '../provider/ListViewProvider'
import { getCategoryById } from '../../core/_requests'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'
import { Category } from '../../core/_models'
import { useEffect, useState } from 'react'

const CategoryEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [category, setCategory] = useState<Category>({})

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.SERVICES_LIST}-category-${itemIdForUpdate}`,
    () => {
      return getCategoryById(itemIdForUpdate)
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
    if(data && data.data) {
      setCategory(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <CategoryEditModalForm isServiceLoading={isLoading} category={{id: undefined}} />
  }

  if (!isLoading && !error && objectHasAttr(category)) {
    return <CategoryEditModalForm isServiceLoading={isLoading} category={category} />
  }

  return null
}

export {CategoryEditModalFormWrapper}
