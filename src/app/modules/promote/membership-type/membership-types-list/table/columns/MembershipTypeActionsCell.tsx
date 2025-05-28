/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {CRUD_RESPONSES, ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { userCanDeleteMembershipTypes, userCanUpdateMembershipTypes } from '../../core/const'
import { Link } from 'react-router-dom'
import { InfoAlert } from '../../../../../../../_metronic/helpers/alerts/Info'
import { deleteMembershipType } from '../../core/_requests'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import { useAuth } from '../../../../../auth'

type Props = {
  id: ID
}

const MembershipTypeActionsCell: FC<Props> = ({id}) => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const showDetialView = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteMembershipType(id), {
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.MEMBERSHIP_TYPES_LIST}-${query}`])
      NotifySuccess('Амжилттай устгалаа.')
    },
    onError: (ex: any) => {
      ex.response?.status === 403 ?
        WarningAlert(CRUD_RESPONSES.failed_authorization)
      :
        ErrorAlert(CRUD_RESPONSES.error)
    }
  })

  const handleDelete = async () => {
    const {value: buttonType} = await InfoAlert('Та устгахдаа итгэлтэй байна уу?', true)
    if(buttonType) {
      await deleteItem.mutateAsync()
    }
  }

  return (
      <div className='d-flex justify-content-center'>
        {userCanUpdateMembershipTypes(userRole) && 
          <Link to=''
            className='btn btn-light btn-light-success btn-sm ps-4 pe-2 py-2 me-4'
            onClick={showDetialView}
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-success svg-icon-2' />
          </Link>
        }

        {userCanDeleteMembershipTypes(userRole) && 
          <Link to=''
            className='btn btn-light btn-light-danger btn-sm ps-4 pe-2 py-2'
            onClick={() => handleDelete()}
          >
            <KTSVG
              path='/media/icons/duotune/general/gen027.svg'
              className='svg-icon-danger svg-icon-2'
            />
          </Link>
        }
      </div>
  )
}

export {MembershipTypeActionsCell}
