import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import { Service, ServicesQueryResponse, Resource, MasterData} from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const SERVICE_URL = `${APP_URL}/service`
const GET_SERVICES_URL = `${APP_URL}/app_options/query`
const GET_RESOURCES_URL = `${APP_URL}/master_data/resources`

const getAppOptions = (query: string): Promise<ServicesQueryResponse> => {
  return axios
    .get(`${GET_SERVICES_URL}?${query}`)
    .then((d: AxiosResponse<ServicesQueryResponse>) => d.data)
}

const getServiceById = (id: ID): Promise<Response<MasterData>> => {
  return axios
    .get(`${SERVICE_URL}/${id}`)
    .then((response: AxiosResponse<Response<MasterData>>) => response.data)
}

const createService = (service: Service): Promise<Response<Service>> => {
  return axios
    .put(SERVICE_URL, service)
    .then((response: AxiosResponse<Response<Service>>) => response.data)
}

const updateService = (service: Service): Promise<Response<Service>> => {
  return axios
    .post(`${SERVICE_URL}/${service.id}`, service)
    .then((response: AxiosResponse<Response<Service>>) => response.data)
}

const deleteService = (id: ID): Promise<void> => {
  return axios.delete(`${SERVICE_URL}/${id}`).then(() => {})
}

const deleteSelectedServices = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${SERVICE_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const getResources = (): Promise<Response<Array<Resource>>> => {
  return axios 
  .get(`${GET_RESOURCES_URL}`)
  .then((response: AxiosResponse<Response<Array<Resource>>>) => response.data)
}

export {
  getAppOptions,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getResources,
  deleteSelectedServices
}
