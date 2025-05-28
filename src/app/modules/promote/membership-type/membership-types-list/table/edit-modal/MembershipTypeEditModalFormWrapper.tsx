import {useQuery} from 'react-query'
import { MembershipTypeEditModalForm } from './MembershipTypeEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, QUERIES} from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { getMembershipTypeById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { MembershipType } from '../../core/_models'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

const MembershipTypeEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [membershipType, setMembershipType] = useState<MembershipType>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.MEMBERSHIP_TYPES_LIST}-membership_type-${itemIdForUpdate}`,
    () => {
      return getMembershipTypeById(itemIdForUpdate)
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
      setMembershipType(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <MembershipTypeEditModalForm membershipType={{id: undefined}} isLoading={isLoading}/>
  }

  if (!isLoading && !error && membershipType) {
    return <MembershipTypeEditModalForm isLoading={isLoading} membershipType={membershipType} />
  }

  return null
}

export {MembershipTypeEditModalFormWrapper}
