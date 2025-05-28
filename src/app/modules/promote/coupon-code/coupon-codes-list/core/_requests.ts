import axios, {AxiosResponse} from 'axios'
import { Coupon, CouponCode, CouponCodesQueryResponse } from './_models'
import { ID, Response } from '../../../../../../_metronic/helpers'

const APP_URL = process.env.REACT_APP_API_URL
const GET_COUPONS_URL = `${APP_URL}/coupon_codes`
const GET_COUPONS_DATA = `${GET_COUPONS_URL}/master_data`


const getCouponCodes = (query: string): Promise<CouponCodesQueryResponse> => {
  return axios
    .get(`${GET_COUPONS_URL}/query?${query}`)
    .then((d: AxiosResponse<CouponCodesQueryResponse>) => d.data)
}

const getCoupons = (): Promise<Response<Array<Coupon>>> => {
  return axios
    .get(`${GET_COUPONS_DATA}`)
    .then((response: AxiosResponse<Response<Array<Coupon>>>) => response.data)
}

const createCouponCode = ({id, create_number, code}: {id: ID, create_number: number, code: string}): Promise<Response<CouponCode>> => {
  return axios
    .put(GET_COUPONS_URL, {coupon_id: id, create_number: create_number, code: code})
    .then((response: AxiosResponse<Response<CouponCode>>) => response.data)
}

const getCouponCodeDetail = (id: ID): Promise<CouponCode> => {
  return axios
    .post(`${GET_COUPONS_URL}/detail`, {id: id})
    .then((response: AxiosResponse<CouponCode>) => response.data)
}

const deleteSelectedCodes = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${GET_COUPONS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const inactiveCouponCode = (id: ID): Promise<CouponCode> => {
  return axios
    .post(`${GET_COUPONS_URL}`, {id: id})
    .then((response: AxiosResponse<CouponCode>) => response.data)
}

const downloadCouponCodes = ():  Promise<Response<string>> => {
  return axios
      .post(`${APP_URL}/report/get_coupon_codes`)
      .then((response: AxiosResponse<Response<string>>) => response.data)
}

export {
  getCouponCodes,
  getCoupons,
  createCouponCode,
  getCouponCodeDetail,
  deleteSelectedCodes,
  inactiveCouponCode,
  downloadCouponCodes
}
