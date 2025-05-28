import {useQuery} from 'react-query'
import {ServiceMethodModalForm} from './ServiceMethodModalForm'
import {useEffect, useState} from 'react'
import { ServiceMethod, initialServiceMethod } from '../core/_models'
import { useListView } from '../service-method-list/provider/ListViewProvider'
import { QUERIES , CRUD_RESPONSES} from '../../../../_metronic/helpers'
import { getServiceMethodById } from '../core/_requests'
import { ErrorAlert } from '../../../../_metronic/helpers/alerts/Error'

const ServiceMethodModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const [serviceMethod, setServiceMethod] = useState<ServiceMethod>()
  const {isLoading, data} = useQuery(
    `${QUERIES.SERVICE_METHODS_LIST}-${itemIdForUpdate}`,
    () => {
        return getServiceMethodById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
        ErrorAlert(CRUD_RESPONSES.error)
      },
    }
  )

  useEffect(() => {
    if (data) 
      setServiceMethod(data.data as ServiceMethod)
  }, [data])

  if (serviceMethod && !isLoading) {
    return <ServiceMethodModalForm serviceMethod={serviceMethod}/>
  }else if (serviceMethod === null && !isLoading){
    return <ServiceMethodModalForm serviceMethod={initialServiceMethod}/>
  }
  return (
  <>
  <div>
    Loading....
  </div>
  </>)
}

export {ServiceMethodModalFormWrapper}
