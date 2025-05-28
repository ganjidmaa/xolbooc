import axios, { AxiosResponse } from "axios"
import { ID, Response } from "../../../../_metronic/helpers"
import { AvailableDays, AvailableHours, Item, MasterData, ServiceCategory, User, CouponCodeResponse } from "./_models"
import { QpayInvoiceRequest, QpayInvoiceResponse } from "../../customer-management/core/_models"

const APP_URL = process.env.REACT_APP_API_URL
const BOOKING_URL = `${APP_URL}/online_booking`
const MASTER_DATA_URL = `${BOOKING_URL}/master_data`
const AVAILABLE_HOURS_URL = `${BOOKING_URL}/available_hours`
const QPAY_URL = `${APP_URL}/qpay`

const getMasterDatas = (): Promise<MasterData> => {
    return axios
        .get(MASTER_DATA_URL)
        .then((response: AxiosResponse<MasterData>) => response.data)
}

const getAvailableHours = (data: any): Promise<AvailableHours> => {
    return axios
        .post(`${AVAILABLE_HOURS_URL}`, data)
        .then((response: AxiosResponse<AvailableHours>) => response.data)
}

const getAvailableDays = (data: any): Promise<AvailableDays> => {
    return axios
        .post(`${BOOKING_URL}/available_days`, data)
        .then((response: AxiosResponse<AvailableDays>) => response.data)
}

const bookingAppointment = (itemData: Item): Promise<Response<Item>> => {
    return axios
        .post(`${BOOKING_URL}/appointment`, itemData)
        .then((response: AxiosResponse<Response<Item>>) => response.data)
}

const getBranchServices = (branchId: ID): Promise<Array<ServiceCategory>> => {
    return axios
        .get(`${BOOKING_URL}/branch_services/${branchId}`)
        .then((response: AxiosResponse<Array<ServiceCategory>>) => response.data)
}

const getBranchUsers = (getUsersRequest: any): Promise<Array<User>> => {
    return axios
        .post(`${BOOKING_URL}/branch_users`, getUsersRequest)
        .then((response: AxiosResponse<Array<User>>) => response.data)
}

const getCouponCheck = (params: any): Promise<CouponCodeResponse> => {
    return axios
        .post(`${BOOKING_URL}/check_membership`, params)
        .then((response: AxiosResponse<CouponCodeResponse>) => response.data)
}

const createCouponPayment = (qpayInvoiceRequestData: QpayInvoiceRequest): Promise<Response<QpayInvoiceResponse>> => {
    return axios 
    .post(`${QPAY_URL}/coupon_payment`, qpayInvoiceRequestData)
    .then((response : AxiosResponse<Response<QpayInvoiceResponse>>) => response.data)
}

export {
    getMasterDatas,
    getAvailableHours,
    bookingAppointment,
    getBranchServices,
    getBranchUsers,
    getAvailableDays,
    getCouponCheck,
    createCouponPayment
}