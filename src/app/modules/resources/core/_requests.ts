import axios, { AxiosResponse } from "axios"
import { ID, Response } from "../../../../_metronic/helpers"
import { Resource, ResourcesQueryResponse } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const RESOURCE_URL = `${APP_URL}/resource`
const GET_RESOURCES_URL = `${APP_URL}/resources/query`

const getResources = (query: string): Promise<ResourcesQueryResponse> => {
    return axios
      .get(`${GET_RESOURCES_URL}?${query}`)
      .then((d: AxiosResponse<ResourcesQueryResponse>) => d.data)
}
  
const getResourceById = (id: ID): Promise<Response<Resource>> => {
    return axios
        .get(`${RESOURCE_URL}/${id}`)
        .then((response: AxiosResponse<Response<Resource>>) => response.data)
}

const createResource = (resource: Resource): Promise<Response<Resource>> => {
    return axios
        .put(RESOURCE_URL, resource)
        .then((response: AxiosResponse<Response<Resource>>) => response.data)
}

const updateResource = (resource: Resource): Promise<Response<Resource>> => {
    return axios
        .post(`${RESOURCE_URL}/${resource.id}`, resource)
        .then((response: AxiosResponse<Response<Resource>>) => response.data)
}

const deleteResource = (id: ID): Promise<void> => {
    return axios.delete(`${RESOURCE_URL}/${id}`).then(() => {})
}

const deleteSelectedResources = (dataIds: Array<ID>): Promise<void> => {
    const requests = dataIds.map((id) => axios.delete(`${RESOURCE_URL}/${id}`))
    return axios.all(requests).then(() => {})
}

export {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    deleteSelectedResources
}