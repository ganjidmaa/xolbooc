import { Dispatch, SetStateAction } from "react"
import { ID, QueryState, initialQueryState } from "../../../../_metronic/helpers"
import { Branch } from "../../branch/core/_models"
import { Payment } from "../../promote/coupon-code/coupon-codes-list/core/_models"

export type Event = {
    id?: ID
    appointment_id?: ID
    start?: string
    end?: string
    event_date?: string
    start_datetime?: string
    title?: string
    desc?: string
    customer_id?: ID 
    resourceId?: ID 
    status?: string 
    item_values?: Array<Item>
    ref?: any
    is_serviceless?: boolean
    invoice?: Invoice
}

export type Invoice = {
    id?: ID
    payment?: string
    payable?: string
    paid?: string
    event_date?: string
    state?: string
    appointment_id?: ID
    left_payment?: string
    discount_amount?: string
    stored_left_payment?: string
}

export type Customer = {
    value?: ID
    label?: string
    id?: ID
    lastname?: string
    firstname?: string
    email?: string
    phone?: string
    phone2?: string
    registerno?: string
    avatar_url?: string
    total_appointments?: number
    no_show_appointments?: number
    cancelled_appointments?: number
    total_paid?: string
    left_payment?: string
    deleted_at?: string | null
}

export type Service = {
    value?: ID
    label?: string
    duration?: string
    price?: string
    type?: ID
    allow_resources?: boolean
    resources?: Array<ServiceResource>
}

export type ServiceType = {
    value?: ID
    label?: string
}

export type ServiceResource = {
    id?: ID
    resource_id?: ID
    service_id?: ID
}

export type Resource = {
    value?: ID
    label?: string
}

export type BankAccount = {
    value?: ID
    label?: string
}

export type ExtraCharge = {
    extra_payment: string
    note?: string
}

export type Discount = {
    amount: string
    type?: string
    percent?: string
}

export type User = {
    value?: ID
    label?: string
    id?: ID
    title?: string
    branch_id?: string
}

export type MasterData = {
    customers: Array<Customer>
    services: Array<Service>
    serviceTypes: Array<ServiceType>
    resources: Array<Resource>
    users: Array<User>
    settings: Settings
    branches: Array<Branch>
    bankAccounts: Array<BankAccount>
}

export type Shift = {
    value?: ID
    label?: string
    id?: ID
    title?: string
    branch_id?: string
    businessHours: {
        daysOfWeek: Array<number>
        startTime: string
        endTime: string
    }
}

export type EventShift = {
    events: Array<Event>
    shifts: Array<Shift>
}

export type EventDatas = {
    customer: Customer
    appointment: Event
}

export type Item = {
    id?: ID
    event_date?: string
    start_time?: string
    end_time?: string
    duration?: string
    service_id?: ID
    user_id?: ID
    resource_id?: ID
    allow_resources?: boolean
    last_item?: boolean
    service_name?: string
    service_type_name?: string
    price?: string
    user_name?: string
    resource_name?: string
    service_obj?: Service
    resource_obj?: Resource
    user_obj?: User
    frequency?: number
}

export type SplitPayment = {
    type?: string
    split_payment_amount: string
    left_payment?: number
    coupon_code_id?: ID
    bank_account_id?: ID
    payment_type?: string
    desc?: string
}

export type PaymentForm = {
    id?: ID
    split_payments?: Array<SplitPayment>
    payment?: number
    payable?: number
    paid_amount?: number
    left_payment?: number
    state?: string
    user_id?: ID
    invoice_id?: ID
    discounts: Array<Discount>
}

export type AllItemDatas = {
    item_values?: Array<Item>
    event_date?: string
    desc?: string
}

export type CouponCode = {
    id?: ID
    title?: string
    code?: string
    value?: string
    redeemed?: string
    status?: string
    type?: string
    start_date?: string
    end_date?: string
    payable_amount?: string
    usable_balance?: string
    redeem_amount?: string
    max_limit?: string
    is_all_services?: boolean
    services?: Array<Service>
    payments?: Array<Payment>
}

export type CalendarViewContextProps = {
    eventIdForUpdate?: ID
    setEventIdForUpdate: Dispatch<SetStateAction<ID>>
    eventStartDate?: string
    setEventStartDate: Dispatch<SetStateAction<string | undefined>>
    eventUserId?: ID
    setEventUserId: Dispatch<SetStateAction<ID>>
    activeTab?: ID
    setActiveTab: Dispatch<SetStateAction<ID>>
}

export type CalendarDataContextProps = {
    services: Array<Service>
    serviceTypes: Array<ServiceType>
    resources: Array<Resource>
    users: Array<User>
    branches: Array<Branch>
    bankAccounts: Array<BankAccount>
    refetch: () => void
}

export type CalendarItemContextProps = {
    initialValue: Item
    itemDatas: Array<Item>
    setItemDatas: Dispatch<SetStateAction<Array<Item>>>
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>
}

export type CalendarQueryContextProps = {
    eventCustomer: Customer | undefined
    setEventCustomer: Dispatch<SetStateAction<Customer | undefined>>
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
}

export const initialCalendarView: CalendarViewContextProps = {
    setEventIdForUpdate: () => {},
    setEventStartDate: () => {},
    setEventUserId: () => {},
    setActiveTab: () => {},
}

export const initialCalendarData: CalendarDataContextProps = {
    services: [],
    serviceTypes: [],
    resources: [],
    users: [],
    branches: [],
    bankAccounts: [],
    refetch: () => {}
}

export const initialCalendarItem: CalendarItemContextProps = {
    initialValue: {},
    itemDatas: [],
    setItemDatas: () => {},
    desc: '',
    setDesc: () => {},
}

export const initialCalendarQuery: CalendarQueryContextProps = {
    eventCustomer: {},
    setEventCustomer: () => {},
    state: initialQueryState,
    updateState: () => {}
}

export const initialCouponCode: CouponCode = {
    id: undefined,
    value: '0',
    redeem_amount: '0',
    status: 'invalid',
}

export type Settings = {
    id?: ID
    company_name?: string
    phone?: string
    slot_duration?: string
    start_time?: string
    end_time?: string
    business_days?: string
}