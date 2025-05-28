import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { Coupon, CouponsQueryResponse, MasterDataResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const COUPON_URL = `${APP_URL}/coupon`
const GET_COUPONS_URL = `${APP_URL}/coupons`
const GET_COUPONS_DATA = `${GET_COUPONS_URL}/master_data`

const getCoupons = (query: string): Promise<CouponsQueryResponse> => {
  return axios
    .get(`${GET_COUPONS_URL}/query?${query}`)
    .then((d: AxiosResponse<CouponsQueryResponse>) => d.data)
}

const getCouponById = (id: ID): Promise<Response<Coupon>> => {
  return axios
    .get(`${COUPON_URL}/${id}`)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
}

const createCoupon = (coupon: Coupon): Promise<Response<Coupon>> => {
  return axios
    .put(COUPON_URL, coupon)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
}

const updateCoupon = (coupon: Coupon): Promise<Response<Coupon>> => {
  return axios
    .post(`${COUPON_URL}/${coupon.id}`, coupon)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
}

const deleteCoupon = (id: ID): Promise<void> => {
  return axios.delete(`${COUPON_URL}/${id}`).then(() => {})
}

const deleteSelectedCoupons = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${COUPON_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const getDatas = (): Promise<Response<MasterDataResponse>> => {
  return axios
    .get(GET_COUPONS_DATA)
    .then((response: AxiosResponse<Response<MasterDataResponse>>) => response.data)
}

export {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getDatas,
  deleteSelectedCoupons
}
