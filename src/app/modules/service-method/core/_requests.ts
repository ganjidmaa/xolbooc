import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import {ServiceMethodsQueryResponse, ServiceMethod} from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const SERVICE_URL = `${APP_URL}/service_method`
const GET_SERVICES_URL = `${APP_URL}/service_method/query`

const getServiceMethods = (query: string): Promise<ServiceMethodsQueryResponse> => {
  return axios
    .get(`${GET_SERVICES_URL}?${query}`)
    .then((d: AxiosResponse<ServiceMethodsQueryResponse>) => d.data)
}

const getServiceMethodById = (id: ID): Promise<Response<ServiceMethod>> => {
  return axios
    .get(`${SERVICE_URL}/${id}`)
    .then((response: AxiosResponse<Response<ServiceMethod>>) => response.data)
}

const updateOrCreateServiceMethod = (service: ServiceMethod): Promise<Response<ServiceMethod>> => {
  return axios
    .post(`${SERVICE_URL}`, service)
    .then((response: AxiosResponse<Response<ServiceMethod>>) => response.data)
}

const deleteServiceMethod = (id: ID): Promise<void> => {
  return axios.delete(`${SERVICE_URL}/${id}`).then(() => {})
}

export {
  getServiceMethods,
  getServiceMethodById,
  updateOrCreateServiceMethod,
  deleteServiceMethod
}
