import {useQuery} from 'react-query'
import {ResourceEditModalForm} from './ResourceEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, objectHasAttr, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../provider/ListViewProvider'
import { getResourceById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { Resource } from '../../core/_models'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'

const ResourceEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [resource, setResource] = useState<Resource>({})

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.RESOURCES_LIST}-resource-${itemIdForUpdate}`,
    () => {
      return getResourceById(itemIdForUpdate)
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
      setResource(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <ResourceEditModalForm isLoading={isLoading} resource={{id: undefined}} />
  }

  if (!isLoading && !error && data && objectHasAttr(resource)) {
    return <ResourceEditModalForm isLoading={isLoading} resource={resource} />
  }

  return null
}

export {ResourceEditModalFormWrapper}
