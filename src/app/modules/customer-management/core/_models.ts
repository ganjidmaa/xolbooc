import { Dispatch, SetStateAction } from "react"
import { GroupSoumDistrict, ID, Province, Response } from "../../../../_metronic/helpers"

export type Customer = {
    id?: ID
    lastname?: string
    firstname?: string
    avatar?: string | []
    registerno?: string
    email?: string
    phone?: string
    phone2?: string
    address_id?: string
    desc?: string
    avatar_url?: string
    created_date?: string
    province_id?: ID
    soum_district_id?: ID
    street?: string
    street1?: string
    file?: any
    total_appointments?: number
    no_show_appointments?: number
    cancelled_appointments?: number
    total_paid?: string
    left_payment?: string
    membership_code?: string
    initials?: {
        label: string
        state: string
    }
    view_public?: boolean
}

export type AppointmentHistory = {
    id?: ID
    event_date?: string
    status?: string
    cancellation_type?: string
    events: Array<Event>
}

export type Event = {
    id?: ID
    service_name?: string
    service_price?: string
    user_name?: string
    start_time?: string
    end_time?: string
    duration?: string
    resource_name?: string
}

export type CustomersQueryResponse = Response<Array<Customer>>

export type MasterData = {
    provinces: Array<Province>
    soumDistricts: Array<GroupSoumDistrict>
    customer: Customer
}

export type Invoice = {
    id?: ID
    payment?: string
    payable?: string
    paid?: string
    event_date?: string
    state?: string
    appointment_id?: ID
    stored_left_payment?: string
    discount_amount?: string
}

export type Payment = {
    paid?: string
    payment_date?: string
    type?: string
    invoice_id?: ID
    user_id?: ID
    coupon_id?: ID
    coupon_code?: string
    bank_account_id?: ID
    bank_account?: string
    desc?: ID
}

export type Membership = {
    title?: string
    percent?: string
    limit_price?: string
    code?: string
    password?: string
}

export type MembershipData = {
    members: Array<ID>
    membership_data: Membership
}

export type QpayInvoiceRequest = {
    amount: string | number
    desc: string
    appointment_id: string
    coupon_id?: ID
    branch_id: ID
    code?: string
    coupon_amount?: number
}

export type QpayInvoiceResponse = {
    qr_image: string
    invoice_id: string
}

export type QpayInvoiceRequestCheck = {
    invoice_id: string
}

export type QpayInvoiceResponseCheck = {
    success: boolean
}

export type MasterDataProps = {
    refetch: () => void
    customer: Customer
    setCustomer: Dispatch<SetStateAction<Customer>>
    provinces: Array<Province>
    setProvinces: Dispatch<SetStateAction<Array<Province>>>
    soumDistricts: Array<GroupSoumDistrict>
    setSoumDistricts: Dispatch<SetStateAction<Array<GroupSoumDistrict>>>
}

export const initialMasterData: MasterDataProps = {
    refetch: () => {},
    customer: {},
    setCustomer: () => {},
    provinces: [],
    setProvinces: () => {},
    soumDistricts: [],
    setSoumDistricts: () => {},
}