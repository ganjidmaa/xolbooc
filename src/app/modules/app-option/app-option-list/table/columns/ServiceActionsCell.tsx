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

  const openEditModal = () => {
    return navigate('/app_options/list/detail', {state: {itemIdForUpdate: id}})
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
    {(userCanUpdateServices(userRole) || userCanDeleteServices(userRole)) && <>
      <div
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Үйлдэл
        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
      </div>
      
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {userCanUpdateServices(userRole) &&
          <div className='menu-item px-3'>
            <div 
              onClick={openEditModal}
              className='menu-link px-3'>
              Харах
            </div>
          </div>
        }

        {userCanDeleteServices(userRole) &&
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
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

export {ServiceActionsCell}
