/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {CRUD_RESPONSES, ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useAuth } from '../../../../auth'
import { userCanCreateServices, userCanDeleteServices, userCanUpdateServices } from '../../../core/consts'
import { deleteCategory } from '../../../core/_requests'
import {useListView} from '../../provider/ListViewProvider'
import {useQueryResponse} from '../../provider/QueryResponseProvider'
// import {deleteUser} from '../../../core/_requests'

type Props = {
  id: ID
}

const ServiceNestedActionsCell: FC<Props> = ({id}) => {
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const openCreateModal = () => {
    return navigate('/service/list/detail', {state: {selectedCategoryId: id}})
  }

  const deleteItem = useMutation(() => deleteCategory(id), {
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
      {userCanCreateServices(userRole) &&
        <a href='#'
          onClick={openCreateModal}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
        </a>
      }
      {userCanUpdateServices(userRole) &&
        <Link
          to='#'
          onClick={openEditModal}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </Link>
      }
      {userCanDeleteServices(userRole) &&
        <a href='#' 
          onClick={() => handleDelete()}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a>
      }
    </>
  )
}

export {ServiceNestedActionsCell}
