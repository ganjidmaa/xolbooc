import { Dispatch, SetStateAction } from "react"
import { ID } from "../../../../_metronic/helpers"
import { OnlineBookingSettings } from "../../online-booking-settings/core/_models"

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
    total_payment?: string
    total_paid?: string
}

export type BusinessDays = {
    business_days: string
}

export type OnlineCustomer = {
    lastname?: string
    firstname?: string
    email?: string
    phone?: string
    phone2?: string
    desc?: string
}

export type Service = {
    id?: ID
    value?: ID
    label?: string
    name?: string
    duration?: string
    price?: string
    allow_resources?: boolean
    type?: ID
    resources?: Array<ServiceResource>
}

export type BranchForService = {
    id?: ID,
    name?: string
}

export type ServiceCard = {
    id?: ID
    name?: string
    duration?: string
    price?: string
    branch_names?: Array<BranchForService>
}

export type ServiceResource = {
    id?: ID
    resource_id?: ID
    service_id?: ID
}

export type ServiceCategory = {
    id: ID
    name: string
    services: Array<Service>
}

export type Resource = {
    value?: ID
    label?: string
}

export type User = {
    value?: ID
    label?: string
    id?: ID
    lastname?: string
    firstname?: string
}

export type Type = {
    name?: string
    id?: ID
}

export type CouponCodeResponse = {
    data: number
    statusCode: number
}

export type MasterData = {
    serviceCategories: Array<ServiceCategory>
    users: Array<User>
    branches: Array<Branch>
    bookingSettings: OnlineBookingSettings
    types: Array<Type>
    popularServices: Array<ServiceCard>
    comments: Array<Comment>
}

export type Item = {
    id?: ID
    event_date?: string
    start_time?: string
    service_ids: Array<ID>
    user?: User
    type?:Type
    branch?: Branch
    customer?: OnlineCustomer
    total_duration?: ID
}

export type AvailableHours = Array<Hour>

export type AvailableDays = Array<Day>

export type AvailableHoursByUsers = {
    event_date: string
    user_id: ID
    branch_id: ID
}

export type Step = {
    title: string
    icon: string 
    path: string
    errorMessage: string
}

export type QueryState = {
    search: string
}

export type Comment = {
    id: ID
    title: string
    body: string
    stars: number
}


export type CalendarDataContextProps = {
    serviceCategories: Array<ServiceCategory>
    serviceCard: Array<ServiceCard>
    comments: Array<Comment>
    setServiceCategories: Dispatch<SetStateAction<Array<ServiceCategory>>>
    setBusinessDays: Dispatch<SetStateAction<string>>
    users: Array<User>
    setUsers: Dispatch<SetStateAction<Array<User>>>
    branches: Array<Branch>
    businessDays: string,
    types: Array<Type>
    setTypes: Dispatch<SetStateAction<Array<Type>>>
    onlineBookingSettings: OnlineBookingSettings
    refetch: () => void   
}

export type CalendarItemContextProps = {
    itemDatas: Item
    setItemDatas: Dispatch<SetStateAction<Item>>
    activeTab: number
    setActiveTab: Dispatch<SetStateAction<number>>
    readyNextStep: () => boolean
    bookingSteps: Array<Step>
    fetchUsersApi: () => any
}

export const initialCalendarData: CalendarDataContextProps = {
    serviceCategories: [],
    setServiceCategories: () => {},
    users: [],
    setUsers: () => {},
    onlineBookingSettings: {},
    refetch: () => {},
    branches: [],
    businessDays: '',
    types: [],
    setTypes: () => {},
    setBusinessDays: () => {},
    serviceCard: [],
    comments: []
}

export const initialCalendarItem: CalendarItemContextProps = {
    itemDatas: {
        service_ids: []
    },
    setItemDatas: () => {},
    activeTab: 0,
    setActiveTab: () => {},
    readyNextStep: () => false,
    bookingSteps: [],
    fetchUsersApi: () => false
}

export type Settings = {
    id?: ID
    company_name?: string
    phone?: string
    slot_duration?: string
    start_time?: string
    end_time?: string
    address?: string
}

export type Branch = {
    id: ID
    name: string
    start_time: string
    end_time: string
    slot_duration?: string
    phone?: string
    address?: string
    business_days?: string
    types: string
}
export type Hour = {
    head_time: string
}

export type Day = {
    date: string
    enabled: boolean
}