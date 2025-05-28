import {useQuery} from 'react-query'
import { ServiceModalForm } from './ServiceModalForm'
import {CRUD_RESPONSES, QUERIES} from '../../../../../../../_metronic/helpers'
import { getDatas } from '../../core/_requests'
import { FC, useEffect, useState } from 'react'
import { SelectedService, Service, ServiceCategory } from '../../core/_models'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  toggleServiceModal: () => void
  allService: boolean
  selectedServices: Array<SelectedService>
}

const ServiceModalFormWrapper:FC<Props> = ({toggleServiceModal, allService, selectedServices}) => {
  const [services, setServices] = useState<Array<Service>>([])
  const [serviceCategories, setServiceCategories] = useState<Array<ServiceCategory>>([])

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.SERVICES_LIST}-discount`,
    () => {
      return getDatas()
    },
    {
      cacheTime: 0,
      onError: (err: any) => {
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
      const response = data.data
      if(response.services.length > 0) setServices(response.services)
      if(response.service_categories.length > 0) setServiceCategories(response.service_categories)
    }
  }, [data])

  if (!isLoading && !error && services.length > 0 && serviceCategories.length > 0) {
    return <ServiceModalForm services={services} 
        serviceCategories={serviceCategories} 
        toggleServiceModal={toggleServiceModal} 
        allService={allService}
        selectedServices={selectedServices}
    />
  }

  return null
}

export {ServiceModalFormWrapper}
