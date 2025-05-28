import { useQuery } from 'react-query'
import { CustomersModalForm } from './CustomersModalForm'
import { CRUD_RESPONSES, ID, QUERIES } from '../../../../../../../_metronic/helpers'
import { FC, useEffect, useState } from 'react'
import { Customer } from '../../core/_models'
import { getDatas } from '../../core/_requests'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  toggleCustomerModal: () => void
  selectedCustomersProp: Array<ID>
}

const CustomersModalFormWrapper:FC<Props> = ({toggleCustomerModal, selectedCustomersProp}) => {
  const [customers, setCustomers] = useState<Array<Customer> | undefined>([])

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.MEMBERSHIPS_LIST}-customers`,
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
    if(data) {
        setCustomers(data.data)
    }
  }, [data])

  if (!isLoading && !error && customers && customers.length > 0) {
    return <CustomersModalForm customers={customers} 
        toggleCustomerModal={toggleCustomerModal} 
        selectedCustomersProp={selectedCustomersProp}
    />
  }

  return null
}

export {CustomersModalFormWrapper}
