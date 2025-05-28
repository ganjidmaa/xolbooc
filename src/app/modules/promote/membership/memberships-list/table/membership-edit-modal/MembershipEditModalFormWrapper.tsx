import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CRUD_RESPONSES, ID, QUERIES } from '../../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { useListView } from '../../core/ListViewProvider'
import { Membership, MembershipType } from '../../core/_models'
import { getMembershipById } from '../../core/_requests'
import { MembershipEditModalForm } from './MembershipEditModalForm'

type Props = {
  createType: string
  closeModal?: () => void
  customerId?: ID
}

const MembershipEditModalFormWrapper:FC<Props> = ({ createType, closeModal, customerId = 0 }) => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const [membership, setMembership] = useState<Membership | undefined>()
  const [membershipTypes, setMembershipTypes] = useState<Array<MembershipType> | undefined>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.MEMBERSHIPS_LIST}-membership-${itemIdForUpdate}`,
    () => {
      if(createType === 'customer')
        return getMembershipById(customerId, createType)
      else
        return getMembershipById(itemIdForUpdate, createType)
    },
    {
      cacheTime: 0,
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
        setMembership(data.data?.membership)
        setMembershipTypes(data.data?.membership_types)
      }
  }, [data])

  if (!membership && membershipTypes) {
    return <MembershipEditModalForm 
      membership={{id: undefined, selected_customers: []}} 
      isLoading={isLoading} 
      membershipTypes={membershipTypes}
      closeModal={closeModal} createType={createType}
      customerId={customerId}
    />
  }

  if (!isLoading && !error && membership && membershipTypes) {
    return <MembershipEditModalForm 
      isLoading={isLoading} 
      membership={membership} 
      membershipTypes={membershipTypes}
      closeModal={closeModal} createType={createType}
      customerId={customerId}
    />
  }

  return null
}

export {MembershipEditModalFormWrapper}
