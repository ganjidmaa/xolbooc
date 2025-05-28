import axios, {AxiosResponse} from 'axios'
import { DetailsQueryResponse, Status } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const GET_DETAILS_URL = `${APP_URL}/details`

const getDetails = (query: string): Promise<DetailsQueryResponse> => {
  return axios
    .post(`${GET_DETAILS_URL}/events/query?${query}`)
    .then((d: AxiosResponse<DetailsQueryResponse>) => d.data)
}

const getStatuses = (): Promise<Array<Status>> => {
  return axios
  .get(`${GET_DETAILS_URL}/statuses`)
  .then((response: AxiosResponse<Array<Status>>) => response.data)
}

export {
  getDetails,
  getStatuses
}
