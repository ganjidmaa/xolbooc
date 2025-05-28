import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import {IUpdateEmail, IUpdatePassword, MasterDataResponse, User, UsersQueryResponse} from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const USER_URL = `${APP_URL}/user`
const GET_USERS_URL = `${APP_URL}/users/query`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<MasterDataResponse> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<MasterDataResponse>) => response.data)
}

const createUser = (user: User): Promise<Response<User>> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
}

const deleteUser = (userId: ID): Promise<ID> => {
  return axios
    .delete(`${USER_URL}/${userId}`)
    .then((response: AxiosResponse<ID>) => response.data)
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const updateUser = (user: User): Promise<Response<User>> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
}

const updateEmail = (id: ID, data: IUpdateEmail): Promise<Response<User>> => {
  return axios
    .post(`${USER_URL}/${id}/update_email`, data)
    .then((response: AxiosResponse<Response<User>>) => response.data)
}

const resetPassword = (id: ID, data: IUpdatePassword): Promise<Response<User>> => {
  return axios
    .post(`${USER_URL}/${id}/update_password`, data)
    .then((response: AxiosResponse<Response<User>>) => response.data)
}

export {
  getUsers, 
  deleteUser, 
  deleteSelectedUsers, 
  getUserById, 
  createUser,
  updateUser,
  updateEmail,
  resetPassword,
}
