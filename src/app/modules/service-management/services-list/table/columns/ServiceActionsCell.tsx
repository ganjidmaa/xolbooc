/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import {  useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { userCanDeleteServices, userCanUpdateServices } from '../../../core/consts'
import { useQueryResponse } from '../../provider/QueryResponseProvider'
import { deleteService } from '../../../core/_requests'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useAuth } from '../../../../auth'

type Props = {
  id: ID
}

const ServiceActionsCell: FC<Props> = ({id}) => {
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const showDetail = () => {
    return navigate('/service/list/detail', {state: {itemIdForUpdate: id}})
  }

  const deleteItem = useMutation(() => deleteService(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.SERVICES_LIST}-${query}`])
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
    {(userCanUpdateServices(userRole) || userCanDeleteServices(userRole)) && 
      <div className="d-flex align-items-center ">
      {userCanUpdateServices(userRole) && 
        <a href="#" className="btn btn-sm btn-light btn-light-success ps-4 pe-2 py-2 me-4" onClick={showDetail}>
              <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-success svg-icon-2" />
        </a>
      }

      {userCanDeleteServices(userRole) && 
        <a href="#" className="btn btn-sm btn-light btn-light-danger ps-4 pe-2 py-2" onClick={() => handleDelete()}>
            <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-danger svg-icon-2" />
        </a>
      }
    </div>
    }
    </>
  )
}

export {ServiceActionsCell}
