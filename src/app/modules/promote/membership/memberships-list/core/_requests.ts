import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { CustomersQueryResponse, Membership, MembershipData, MembershipsQueryResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const MEMBERSHIP_URL = `${APP_URL}/membership`
const GET_MEMBERSHIPS_URL = `${APP_URL}/memberships`

const getMemberships = (query: string): Promise<MembershipsQueryResponse> => {
  return axios
    .get(`${GET_MEMBERSHIPS_URL}/query?${query}`)
    .then((d: AxiosResponse<MembershipsQueryResponse>) => d.data)
}

const getMembershipById = (id: ID, type: string): Promise<Response<MembershipData>> => {
  return axios
    .get(`${MEMBERSHIP_URL}/${id}/${type}`)
    .then((response: AxiosResponse<Response<MembershipData>>) => response.data)
}

const getDatas = (): Promise<CustomersQueryResponse> => {
  return axios
    .get(`${GET_MEMBERSHIPS_URL}/master_data`)
    .then((d: AxiosResponse<CustomersQueryResponse>) => d.data)
}

const createMembership = (membership: Membership): Promise<Response<Membership>> => {
  return axios
    .put(MEMBERSHIP_URL, membership)
    .then((response: AxiosResponse<Response<Membership>>) => response.data)
}

const updateMembership = (membership: Membership): Promise<Response<Membership>> => {
  return axios
    .post(`${MEMBERSHIP_URL}/${membership.id}`, membership)
    .then((response: AxiosResponse<Response<Membership>>) => response.data)
}

const deleteMembership = (id: ID): Promise<void> => {
  return axios.delete(`${MEMBERSHIP_URL}/${id}`).then(() => {})
}

const deleteSelectedMemberships = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${MEMBERSHIP_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getMemberships,
  getMembershipById,
  getDatas,
  createMembership,
  updateMembership,
  deleteMembership,
  deleteSelectedMemberships
}
