import axios, { AxiosResponse } from "axios"
import { ID, Response } from "../../../../_metronic/helpers"
import { AvailableDays, AvailableHours, Item, MasterData, ServiceCategory, User } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const BOOKING_URL = `${APP_URL}/online_booking`
const MOBILE_URL = `${APP_URL}/mobile`
const MASTER_DATA_URL = `${BOOKING_URL}/master_data`
const AVAILABLE_HOURS_URL = `${BOOKING_URL}/available_hours`


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

const getOtpcode = (mobile: any): Promise<any> => {
    return axios
        .post(`${MOBILE_URL}/get_code`, mobile)
        .then((response: AxiosResponse<any>) => response.data)
}

const checkOtpCode = (otpCode: any): Promise<any> => {
    return axios
        .post(`${MOBILE_URL}/confirm_code`, otpCode)
        .then((response: AxiosResponse<any>) => response.data)
}

const deleteBooking = (app_id: any): Promise<any> => {
    return axios
        .post(`${MOBILE_URL}/cancel_event`, app_id)
        .then((response: AxiosResponse<any>) => response.data)
}

export {
    getMasterDatas,
    getAvailableHours,
    bookingAppointment,
    getBranchServices,
    getBranchUsers,
    getOtpcode,
    checkOtpCode,
    deleteBooking,
    getAvailableDays
}