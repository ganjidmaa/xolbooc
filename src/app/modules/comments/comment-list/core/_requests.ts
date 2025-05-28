import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../_metronic/helpers'
import { Comment, CommentsQueryResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const COMMENTS_URL = `${APP_URL}/comments`
const GET_COMMENTS_URL = `${APP_URL}/comments`

const getComments = (query: string): Promise<CommentsQueryResponse> => {
  return axios
    .get(`${GET_COMMENTS_URL}/query?${query}`)
    .then((d: AxiosResponse<CommentsQueryResponse>) => d.data)
}

const getCommentById = (id: ID): Promise<Response<Comment>> => {
  return axios
    .get(`${COMMENTS_URL}/${id}`)
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
}

const createComment = (comment: Comment): Promise<Response<Comment>> => {
  return axios
    .put(COMMENTS_URL, comment)
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
}

const updateComment = (comment: Comment): Promise<Response<Comment>> => {
  return axios
    .post(`${COMMENTS_URL}/${comment.id}`, comment)
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
}

const deleteComment = (id: ID): Promise<void> => {
  return axios.delete(`${COMMENTS_URL}/${id}`).then(() => {})
}

const deleteSelectedComments = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${COMMENTS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  deleteSelectedComments
}
