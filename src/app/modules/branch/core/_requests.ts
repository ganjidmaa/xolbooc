import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import { Branch, BranchQueryResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const BRANCH_URL = `${APP_URL}/branch`
const GET_BRANCHES_URL = `${APP_URL}/branches/query`

const getBranches = (query: string): Promise<BranchQueryResponse> => {
  return axios
    .get(`${GET_BRANCHES_URL}?${query}`)
    .then((d: AxiosResponse<BranchQueryResponse>) => d.data)
}

const getBranchById = (id: ID): Promise<Response<Branch>> => {
  return axios
    .get(`${BRANCH_URL}/${id}`)
    .then((response: AxiosResponse<Response<Branch>>) => response.data)
}

const createBranch = (branch: Branch): Promise<Response<Branch>> => {
  return axios
    .put(BRANCH_URL, branch)
    .then((response: AxiosResponse<Response<Branch>>) => response.data)
}

const updateBranch = (branch: Branch): Promise<Response<Branch>> => {
    return axios
      .post(`${BRANCH_URL}/${branch.id}`, branch)
      .then((response: AxiosResponse<Response<Branch>>) => response.data)
}

const deleteBranch = (branchId: ID): Promise<ID> => {
  return axios
    .delete(`${BRANCH_URL}/${branchId}`)
    .then((response: AxiosResponse<ID>) => response.data)
}

const deleteSelectedBranches = (branchIds: Array<ID>): Promise<void> => {
  const requests = branchIds.map((id) => axios.delete(`${BRANCH_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  updateBranch,
  getBranches, 
  deleteBranch, 
  getBranchById, 
  createBranch,
  deleteSelectedBranches
}
