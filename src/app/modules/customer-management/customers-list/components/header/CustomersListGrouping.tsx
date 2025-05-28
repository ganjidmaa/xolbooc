import {useQueryClient, useMutation} from 'react-query'
import {CRUD_RESPONSES, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../provider/ListViewProvider'
import {useQueryResponse} from '../../provider/QueryResponseProvider'
import { deleteSelectedCustomers } from '../../../core/_requests'
import { InfoAlert } from '../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'

const CustomersListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedCustomers(selected), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.CUSTOMERS_LIST}-${query}`])
      clearSelected()
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
      await deleteSelectedItems.mutateAsync()
    }
  }

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Сонгогдсон
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={() => handleDelete()}
      >
        Устгах
      </button>
    </div>
  )
}

export {CustomersListGrouping}
