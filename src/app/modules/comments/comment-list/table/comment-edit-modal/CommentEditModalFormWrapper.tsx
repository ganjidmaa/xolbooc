import {useQuery} from 'react-query'
import { CommentEditModalForm } from './CommentEditModalForm'
import {CRUD_RESPONSES, isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { getCommentById } from '../../core/_requests'
import { useEffect, useState } from 'react'
import { Comment } from '../../core/_models'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'

const CommentEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const [comment, setComment] = useState<Comment>()

  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.COMMENTS_LIST}-comment-${itemIdForUpdate}`,
    () => {
      return getCommentById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err: any) => {
        setItemIdForUpdate(undefined)
        console.error(err)
        err.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      },
      retryOnMount: false,
      retry: false,
    }
  )

  useEffect(() => {
    if(data) {
      setComment(data.data)
    }
  }, [data])

  if (!itemIdForUpdate) {
    return <CommentEditModalForm comment={{id: undefined}} isLoading={isLoading}/>
  }

  if (!isLoading && !error && comment) {
    return <CommentEditModalForm isLoading={isLoading} comment={comment} />
  }

  return null
}

export {CommentEditModalFormWrapper}
