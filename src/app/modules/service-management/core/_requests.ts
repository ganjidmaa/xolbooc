import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import {Category, Service, ServicesQueryResponse, CategoryOption, Resource, MasterData} from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const SERVICE_URL = `${APP_URL}/service`
const CATEGORY_URL = `${SERVICE_URL}/category`
const GET_SERVICES_URL = `${APP_URL}/services/query`
const GET_CATEGORIES_URL = `${APP_URL}/master_data/categories`
const GET_RESOURCES_URL = `${APP_URL}/master_data/resources`

const getServices = (query: string): Promise<ServicesQueryResponse> => {
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

const createCategory = (category: Category): Promise<Response<Category>> => {
  return axios
    .put(CATEGORY_URL, category)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
}

const getCategoryById = (id: ID): Promise<Response<Category>> => {
  return axios
    .get(`${CATEGORY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
}

const updateCategory = (category: Category): Promise<Response<Category>> => {
  return axios
    .post(`${CATEGORY_URL}/${category.id}`, category)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
}

const deleteCategory = (id: ID): Promise<void> => {
  return axios.delete(`${CATEGORY_URL}/${id}`).then(() => {})
}

const getCategories = (): Promise<Response<Array<CategoryOption>>> => {
  return axios 
  .get(`${GET_CATEGORIES_URL}`)
  .then((response: AxiosResponse<Response<Array<CategoryOption>>>) => response.data)
}

const getResources = (): Promise<Response<Array<Resource>>> => {
  return axios 
  .get(`${GET_RESOURCES_URL}`)
  .then((response: AxiosResponse<Response<Array<Resource>>>) => response.data)
}

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createCategory,
  getCategoryById,
  updateCategory,
  getCategories,
  getResources,
  deleteCategory,
  deleteSelectedServices
}
