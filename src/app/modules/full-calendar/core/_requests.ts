import axios, { AxiosResponse } from "axios"
import { ID, Response } from "../../../../_metronic/helpers"
import { AllItemDatas, CouponCode, Customer, Event, EventDatas, MasterData, PaymentForm, User, HealthCondition, EventShift } from "./_models"
import { PaymentMethod } from "../../auth"
import { Invoice, Payment, QpayInvoiceRequest, QpayInvoiceRequestCheck, QpayInvoiceResponse, QpayInvoiceResponseCheck } from "../../customer-management/core/_models"

const APP_URL = process.env.REACT_APP_API_URL
const APPOINTMENT_URL = `${APP_URL}/appointment`
const MASTER_DATA_URL = `${APPOINTMENT_URL}/master_data`
const GET_EVENTS_URL = `${APPOINTMENT_URL}/events`
const GET_USERS_URL = `${APPOINTMENT_URL}/users`
const EVENT_URL = `${APPOINTMENT_URL}/event`
const ITEM_URL = `${APPOINTMENT_URL}/item`
const CUSTOMER_URL = `${APP_URL}/customer`
const HEALTH_CONDITION = `${APP_URL}/health_condition`
const QPAY_URL = `${APP_URL}/qpay`

const getMasterDatas = (): Promise<MasterData> => {
    return axios
    .get(`${MASTER_DATA_URL}`)
    .then((response: AxiosResponse<MasterData>) => response.data)
}

const getEvents = (dates: object): Promise<Response<EventShift>> => {
    return axios
    .post(GET_EVENTS_URL, dates)
    .then((response: AxiosResponse<Response<EventShift>>) => response.data)
}

const getEventById = (id: ID): Promise<EventDatas | undefined> => {
    return axios
    .get(`${EVENT_URL}/${id}`)
    .then((response: AxiosResponse<Response<EventDatas>>) => response.data)
    .then((response: Response<EventDatas>) => response.data)
}

const createEvent = (datas: AllItemDatas): Promise<Event | undefined> => {
    return axios
    .put(EVENT_URL, datas)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
    .then((response: Response<Event>) => response.data)
}

const changeEvent = (event: Event): Promise<Event | undefined> => {
    return axios
    .post(`${EVENT_URL}/${event.id}`, event)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
    .then((response: Response<Event>) => response.data)
}

const getHealthCondition = (id: ID): Promise<HealthCondition | undefined> => {
    return axios
    .get(`${HEALTH_CONDITION}/${id}`)
    .then((response: AxiosResponse<Response<HealthCondition>>) => response.data)
    .then((response: Response<HealthCondition>) => response.data)
}

const updateHealthCondition = (health_condition: HealthCondition): Promise<ID | undefined> => {
    return axios
    .post(HEALTH_CONDITION, health_condition)
    .then((response: AxiosResponse<Response<ID>>) => response.data)
    .then((response: Response<ID>) => response.data)
}

const updateEvent = (event: AllItemDatas): Promise<Event | undefined> => {
    return axios
    .post(ITEM_URL, event)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
    .then((response: Response<Event>) => response.data)
}

const getUsers = (): Promise<Array<User> | undefined> => {
    return axios
    .get(GET_USERS_URL)
    .then((response: AxiosResponse<Response<Array<User>>>) => response.data)
    .then((response: Response<Array<User>>) => response.data)
}

const createCustomer = (customer: Customer): Promise<Customer | undefined> => {
    return axios
        .put(CUSTOMER_URL, customer)
        .then((response: AxiosResponse<Response<Customer>>) => response.data)
        .then((response: Response<Customer>) => response.data)
}

const updateStatus = (id: ID, request:{status: string}): Promise<Response<Event>> => {
    return axios
    .post(`${APPOINTMENT_URL}/change_status/${id}`, request)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
}

const updateTreatmentStatus = (id: ID, request:{status: string}): Promise<Response<Event>> => {
    return axios
    .post(`${APPOINTMENT_URL}/change_treatment_status/${id}`, request)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
}

const updateDescription = (id: ID, request:{desc: string}): Promise<Event | undefined> => {
    return axios
    .post(`${APPOINTMENT_URL}/change_desc/${id}`, request)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
    .then((response: Response<Event>) => response.data)
}

const cancelEvent = (id: ID, request:{cancel_type: string, status: string}): Promise<Response<Event>> => {
    return axios
    .post(`${APPOINTMENT_URL}/cancel/${id}`, request)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
}

const createPayment = (payment: PaymentForm): Promise<Response<Event>> => {
    return axios
    .post(`${APPOINTMENT_URL}/payment/${payment.id}`, payment)
    .then((response: AxiosResponse<Response<Event>>) => response.data)
}   

const getCouponCodes = (request: {search: string}): Promise<CouponCode> => {
    return axios
    .post(`${APPOINTMENT_URL}/coupon_codes/detail`, request)
    .then((response: AxiosResponse<CouponCode>) => response.data)
}

const updatePaymentMethods = (paymentMethods: Array<PaymentMethod>): Promise<Response<Array<PaymentMethod>>> => {
    return axios
    .put(`${APPOINTMENT_URL}/update_payment_methods`, {'payment_methods': paymentMethods})
    .then((response: AxiosResponse<Response<Array<PaymentMethod>>>) => response.data)
}  

const getPaymentDetails = (eventId: ID): Promise<Response<Array<Payment>>> => {
    return axios
    .get(`${APPOINTMENT_URL}/get_payment_details/${eventId}`)
    .then((response: AxiosResponse<Response<Array<Payment>>>) => response.data)
}

const voidPayment = (eventId: ID): Promise<Response<Invoice>> => {
    return axios
    .post(`${APPOINTMENT_URL}/void_payment/${eventId}`)
    .then((response: AxiosResponse<Response<Invoice>>) => response.data)
}

const printHealthCondition = (id: ID):  Promise<Response<any>> => {
    return axios
        .get(`${HEALTH_CONDITION}/print/${id}`)
        .then((response: AxiosResponse<Response<any>>) => response.data)
}
const qpayInvoice = (qpayInvoiceRequestData: QpayInvoiceRequest): Promise<Response<QpayInvoiceResponse>> => {
    return axios 
    .post(`${QPAY_URL}/invoice`, qpayInvoiceRequestData)
    .then((response : AxiosResponse<Response<QpayInvoiceResponse>>) => response.data)
}
const qpayInvoiceCheck = (qpayResponseData: QpayInvoiceRequestCheck): Promise<Response<QpayInvoiceResponseCheck>> => {
    return axios 
    .post(`${QPAY_URL}/check`, qpayResponseData)
    .then((response : AxiosResponse<Response<QpayInvoiceResponseCheck>>) => response.data)
}

export {
    getMasterDatas,
    getEvents,
    getUsers,
    createEvent,
    getEventById,
    changeEvent,
    createCustomer,
    updateEvent,
    updateStatus,
    updateTreatmentStatus,
    updateDescription,
    cancelEvent,
    createPayment,
    getCouponCodes,
    updatePaymentMethods,
    getPaymentDetails,
    voidPayment,
    getHealthCondition,
    updateHealthCondition,
    printHealthCondition,
    qpayInvoice,
    qpayInvoiceCheck
}