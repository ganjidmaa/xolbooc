/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useQueryResponse } from '../../provider/QueryResponseProvider'
import { useAuth } from '../../../../auth'
import { userCanDeleteBranches, userCanUpdateBranches } from '../../../core/consts'
import { deleteBranch } from '../../../core/_requests'
import { useListView } from '../../provider/ListViewProvider'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const showDetialView = () => {
    setItemIdForUpdate(id)
    navigate('/branch/detail')
  }

  const deleteItem = useMutation(() => deleteBranch(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.BRANCH_LIST}-${query}`])
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
    <>
    {(userCanUpdateBranches(userRole) || userCanDeleteBranches(userRole)) && <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Үйлдэл
        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
      </a>
      
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {userCanUpdateBranches(userRole) && 
          <div className='menu-item px-3'>
            <div
              onClick={showDetialView}
              className='menu-link px-3'>
              Харах
            </div>
          </div>
        }

        {userCanDeleteBranches(userRole) && 
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
              data-kt-users-table-filter='delete_row'
              onClick={() => handleDelete()}
            >
              Устгах
            </a>
          </div>
        }
      </div>
      
    </>}
    </>
  )
}

export {UserActionsCell}
