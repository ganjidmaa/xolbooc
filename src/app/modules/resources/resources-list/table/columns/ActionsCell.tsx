/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { userCanDeleteResources, userCanUpdateResources } from '../../../core/consts'
import { useListView } from '../../provider/ListViewProvider'
import { deleteResource } from '../../../core/_requests'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryResponse } from '../../provider/QueryResponseProvider'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { useAuth } from '../../../../auth'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const {setItemIdForUpdate} = useListView()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteResource(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.RESOURCES_LIST}-${query}`])
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
    {(userCanUpdateResources(userRole) || userCanDeleteResources(userRole)) && 
      <div className="d-flex align-items-center ">
        {userCanUpdateResources(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-success ps-4 pe-2 py-2 me-4" onClick={openEditModal}>
            <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-success svg-icon-2" />
          </a>
        }

        {userCanDeleteResources(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-danger ps-4 pe-2 py-2" onClick={() => handleDelete()}>
            <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-danger svg-icon-2" />
          </a>
        }
      </div>
    }
    </>
  )
}

export {ActionsCell}
