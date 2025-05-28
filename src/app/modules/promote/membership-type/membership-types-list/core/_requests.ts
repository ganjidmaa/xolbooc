import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { MembershipsQueryResponse, MembershipType } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const MEMBERSHIP_TYPE_URL = `${APP_URL}/membership_type`
const GET_MEMBERSHIP_TYPES_URL = `${APP_URL}/membership_types`

const getMembershipTypes = (query: string): Promise<MembershipsQueryResponse> => {
  return axios
    .get(`${GET_MEMBERSHIP_TYPES_URL}/query?${query}`)
    .then((d: AxiosResponse<MembershipsQueryResponse>) => d.data)
}

const getMembershipTypeById = (id: ID): Promise<Response<MembershipType>> => {
  return axios
    .get(`${MEMBERSHIP_TYPE_URL}/${id}`)
    .then((response: AxiosResponse<Response<MembershipType>>) => response.data)
}

const createMembershipType = (membership_type: MembershipType): Promise<Response<MembershipType>> => {
  return axios
    .put(MEMBERSHIP_TYPE_URL, membership_type)
    .then((response: AxiosResponse<Response<MembershipType>>) => response.data)
}

const updateMembershipType = (membership_type: MembershipType): Promise<Response<MembershipType>> => {
  return axios
    .post(`${MEMBERSHIP_TYPE_URL}/${membership_type.id}`, membership_type)
    .then((response: AxiosResponse<Response<MembershipType>>) => response.data)
}

const deleteMembershipType = (id: ID): Promise<void> => {
  return axios.delete(`${MEMBERSHIP_TYPE_URL}/${id}`).then(() => {})
}

const deleteSelectedMembershipTypes = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${MEMBERSHIP_TYPE_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getMembershipTypes,
  getMembershipTypeById,
  createMembershipType,
  updateMembershipType,
  deleteMembershipType,
  deleteSelectedMembershipTypes
}
