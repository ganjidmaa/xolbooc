import {useQueryClient, useMutation} from 'react-query'
import {CRUD_RESPONSES, QUERIES} from '../../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import { InfoAlert } from '../../../../../../../_metronic/helpers/alerts/Info'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedDiscounts} from '../../core/_requests'

const DiscountsListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedDiscounts(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.DISCOUNTS_LIST}-${query}`])
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

export {DiscountsListGrouping}
