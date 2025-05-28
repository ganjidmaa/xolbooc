import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {CRUD_RESPONSES, GroupSoumDistrict, Province, QUERIES, roleNames} from '../../../../../_metronic/helpers'
import {useListView} from '../provider/ListViewProvider'
import { useEffect, useState } from 'react'
import { Role } from '../../core/_models'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'
import { getUserById } from '../../core/_requests'
import { Branch } from '../../../branch/core/_models'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const [provinces, setProvinces] = useState<Array<Province>>([])
  const [soumDistricts, setSoumDistricts] = useState<Array<GroupSoumDistrict>>([])
  const [roles, setRoles] = useState<Array<Role>>([])
  const [branches, setBranches] = useState<Array<Branch>>([])

  const {
    isLoading,
    data,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
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
    if(data && data.data) {
      const result = data.data
      setProvinces(result.provinces)
      setSoumDistricts(result.soumDistricts)
      if(result.roles) {
        const customRoles: Array<Role> = []
        result.roles.map(
          role => {
            customRoles.push({...role, label: roleNames.filter(roleName => roleName.value === role.label)[0]?.name})
            return true
          }
        )
        setRoles(customRoles)
        setBranches(result.branches)
      }
    }
  }, [data])

  if (!itemIdForUpdate && provinces && soumDistricts && roles) {
    return <UserEditModalForm isUserLoading={isLoading}
      provinces={provinces} soumDistricts={soumDistricts} 
      roles={roles} branches={branches}/>
  }

  return null
}

export {UserEditModalFormWrapper}
