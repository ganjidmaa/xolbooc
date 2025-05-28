/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { CRUD_RESPONSES, ID, KTSVG, QUERIES } from '../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useAuth } from '../../../../auth'
import { userCanDeleteDiscounts, userCanUpdateDiscounts } from '../../core/const'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteAccount } from '../../core/_requests'

type Props = {
  id: ID
}

const DiscountActionsCell: FC<Props> = ({id}) => {
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

  const deleteItem = useMutation(() => deleteAccount(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.ACCOUNT_LIST}-${query}`])
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
    <div className='d-flex justify-content-end flex-shrink-0'>
      {userCanUpdateDiscounts(userRole) && 
        <Link to=''
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          onClick={showDetialView}
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </Link>
      }
      
      {userCanDeleteDiscounts(userRole) && 
        <Link to=''
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          onClick={() => handleDelete()}
        >
          <KTSVG
            path='/media/icons/duotune/general/gen027.svg'
            className='svg-icon-3'
          />
        </Link>
      }
    </div>
  )
}

export {DiscountActionsCell}
