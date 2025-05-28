import {useQuery} from 'react-query'
import { AccountEditModalForm } from './AccountEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { getAccountById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { BankAccount } from '../../core/_models'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'

const AccountEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [account, setAccount] = useState<BankAccount>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.ACCOUNT_LIST}-account-${itemIdForUpdate}`,
    () => {
      return getAccountById(itemIdForUpdate)
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
      setAccount(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <AccountEditModalForm account={{id: undefined}} isLoading={isLoading}/>
  }

  if (!isLoading && !error && account) {
    return <AccountEditModalForm isLoading={isLoading} account={account} />
  }

  return null
}

export {AccountEditModalFormWrapper}
