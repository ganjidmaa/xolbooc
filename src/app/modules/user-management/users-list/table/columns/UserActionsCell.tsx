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
import { NotifyError } from '../../../../../../_metronic/helpers/notify/NotifyError'
import { useAccountDetail } from '../../../core/AccountDetailProvider'
import { userCanDeleteUsers, userCanUpdateUsers } from '../../../core/consts'
import { deleteUser } from '../../../core/_requests'
import { useQueryResponse } from '../../provider/QueryResponseProvider'
import { useAuth } from '../../../../auth'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const {setItemIdForDetail} = useAccountDetail()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const showDetail = () => {
    setItemIdForDetail(id)
    navigate('/user/list/account/overview')
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (res: any) => {
      if(res === 200) {
        // ✅ update detail view directly
        queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
        NotifySuccess('Амжилттай устгалаа.')
      }
      else if(res === 201) {
        NotifyError('Админ эрхтэй хэрэглэгч устгах боломжгүй.')
      }
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
    {(userCanUpdateUsers(userRole) || userCanDeleteUsers(userRole)) && 

      <div className="d-flex align-items-center ">
        {userCanUpdateUsers(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-success ps-4 pe-2 py-2 me-4" onClick={showDetail}>
            <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-success svg-icon-2" />
          </a>
        }

        {userCanDeleteUsers(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-danger ps-4 pe-2 py-2" onClick={() => handleDelete()}>
            <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-danger svg-icon-2" />
          </a>
        }
      </div>
      
    }
    </>
  )
}

export {UserActionsCell}
