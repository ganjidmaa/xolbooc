import axios, { AxiosResponse } from "axios"
import { ID, Response } from "../../../../_metronic/helpers"
import { AppointmentHistory, Customer, CustomersQueryResponse, Invoice, MasterData, MembershipData, Payment } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const CUSTOMER_URL = `${APP_URL}/customer`
const GET_CUSTOMERS_URL = `${APP_URL}/customers/query`

const getCustomers = (query: string): Promise<CustomersQueryResponse> => {
    return axios
        .get(`${GET_CUSTOMERS_URL}?${query}`)
        .then((d: AxiosResponse<CustomersQueryResponse>) => d.data)
}

const getCustomerById = (id: ID): Promise<Response<MasterData>> => {
    return axios
    .get(`${CUSTOMER_URL}/${id}`)
    .then((response: AxiosResponse<Response<MasterData>>) => response.data)
}

const createCustomer = (customer: Customer): Promise<Response<Customer>> => {
    return axios
      .put(CUSTOMER_URL, customer)
      .then((response: AxiosResponse<Response<Customer>>) => response.data)
}

const updateCustomer = (customer: Customer): Promise<Response<Customer>> => {
    return axios
      .post(`${CUSTOMER_URL}/${customer.id}`, customer)
      .then((response: AxiosResponse<Response<Customer>>) => response.data)
}

const deleteCustomer = (id: ID): Promise<void> => {
    return axios.delete(`${CUSTOMER_URL}/${id}`).then(() => {})
}

const deleteSelectedCustomers = (customerIds: Array<ID>): Promise<void> => {
    const requests = customerIds.map((id) => axios.delete(`${CUSTOMER_URL}/${id}`))
    return axios.all(requests).then(() => {})
}

const getAppointmentHistory = (id: ID): Promise<Response<Array<AppointmentHistory>>> => {
    return axios
    .get(`${CUSTOMER_URL}/get_appointments_data/${id}`)
    .then((response: AxiosResponse<Response<Array<AppointmentHistory>>>) => response.data)
}

const getInvoicesHistory = (id: ID): Promise<Response<Array<Invoice>>> => {
    return axios
    .get(`${CUSTOMER_URL}/get_payments_data/${id}`)
    .then((response: AxiosResponse<Response<Array<Invoice>>>) => response.data)
}

const getPaymentDetails = (eventId: ID): Promise<Response<Array<Payment>>> => {
    return axios
    .get(`${CUSTOMER_URL}/get_payment_details/${eventId}`)
    .then((response: AxiosResponse<Response<Array<Payment>>>) => response.data)
}

const voidPayment = (eventId: ID): Promise<Response<Invoice>> => {
    return axios
    .post(`${CUSTOMER_URL}/void_payment/${eventId}`)
    .then((response: AxiosResponse<Response<Invoice>>) => response.data)
}

const getMembershipInfo = (customerId: ID): Promise<Response<MembershipData>> => {
    return axios
    .get(`${CUSTOMER_URL}/get_membership_data/${customerId}`)
    .then((response: AxiosResponse<Response<MembershipData>>) => response.data)
}

const removeMemberRequest = (customerId: ID): Promise<Response<Customer>> => {
    return axios
    .post(`${CUSTOMER_URL}/remove_member/${customerId}`)
    .then((response: AxiosResponse<Response<Customer>>) => response.data)
}

const addMembers = (data: any): Promise<Response<Customer>> => {
    return axios
    .post(`${CUSTOMER_URL}/member/add_customer`, data)
    .then((response: AxiosResponse<Response<Customer>>) => response.data)
}

export {
    getCustomers,
    getCustomerById, 
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteSelectedCustomers,
    getAppointmentHistory,
    getInvoicesHistory,
    getPaymentDetails,
    voidPayment,
    getMembershipInfo,
    removeMemberRequest,
    addMembers,
}