import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { Discount, DiscountsQueryResponse, MasterDataResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const DISCOUNT_URL = `${APP_URL}/discount`
const GET_DISCOUNTS_URL = `${APP_URL}/discounts`
const GET_DISCOUNTS_DATA = `${GET_DISCOUNTS_URL}/master_data`

const getDiscounts = (query: string): Promise<DiscountsQueryResponse> => {
  return axios
    .get(`${GET_DISCOUNTS_URL}/query?${query}`)
    .then((d: AxiosResponse<DiscountsQueryResponse>) => d.data)
}

const getDiscountById = (id: ID): Promise<Response<Discount>> => {
  return axios
    .get(`${DISCOUNT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Discount>>) => response.data)
}

const createDiscount = (discount: Discount): Promise<Response<Discount>> => {
  return axios
    .put(DISCOUNT_URL, discount)
    .then((response: AxiosResponse<Response<Discount>>) => response.data)
}

const updateDiscount = (discount: Discount): Promise<Response<Discount>> => {
  return axios
    .post(`${DISCOUNT_URL}/${discount.id}`, discount)
    .then((response: AxiosResponse<Response<Discount>>) => response.data)
}

const getDatas = (): Promise<Response<MasterDataResponse>> => {
  return axios
    .get(GET_DISCOUNTS_DATA)
    .then((response: AxiosResponse<Response<MasterDataResponse>>) => response.data)
}

const deleteDiscount = (id: ID): Promise<void> => {
  return axios.delete(`${DISCOUNT_URL}/${id}`).then(() => {})
}

const deleteSelectedDiscounts = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${DISCOUNT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  getDatas,
  deleteDiscount,
  deleteSelectedDiscounts
}
