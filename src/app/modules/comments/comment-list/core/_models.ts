import {ID, Response} from '../../../../../_metronic/helpers'

export type Comment = {
  id?: ID
  title?: string
  body?: string
  stars?: number
}

export type CommentsQueryResponse = Response<Array<Comment>>

