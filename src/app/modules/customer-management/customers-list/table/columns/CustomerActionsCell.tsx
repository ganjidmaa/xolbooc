/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { useQueryResponse } from '../../provider/QueryResponseProvider'
import { deleteCustomer } from '../../../core/_requests'
import { userCanDeleteCustomers, userCanUpdateCustomers } from '../../../core/consts'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useListView } from '../../provider/ListViewProvider'
import { useAuth } from '../../../../auth'

type Props = {
  id: ID
}

const CustomerActionsCell: FC<Props> = ({id}) => {
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const { currentUser } = useAuth()
  const userRole: string = currentUser?.role || ''

  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const showDetail = () => {
    if (id) {
      setItemIdForUpdate(id)
      navigate('/customer/list/profile/overview')
    }
  }

  const deleteItem = useMutation(() => deleteCustomer(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.CUSTOMERS_LIST}-${query}`])
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
      {(userCanUpdateCustomers(userRole) || userCanDeleteCustomers(userRole)) && <>

      <div className="d-flex align-items-center ">
        {userCanUpdateCustomers(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-success ps-4 pe-2 py-2 me-4" onClick={showDetail}>
                <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-success svg-icon-2" />
          </a>
        }

        {userCanDeleteCustomers(userRole) && 
          <a href="#" className="btn btn-sm btn-light btn-light-danger ps-4 pe-2 py-2" onClick={() => handleDelete()}>
              <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-danger svg-icon-2" />
          </a>
        }
      </div>

      </>}
    </>
  )
}

export {CustomerActionsCell}
