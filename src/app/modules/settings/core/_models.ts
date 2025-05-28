import { ID } from "../../../../_metronic/helpers"

export type Settings = {
    business_days: string
    id?: ID
    company_name?: string
    logo?: string | []
    logo_url?: string
    phone?: string
    limit_date_usage?: string
    slot_duration?: string
    start_time?: string
    end_time?: string
    lunch_start_time?: string
    lunch_end_time?: string
    file?: any
    has_branch?: boolean
    has_service_type?: boolean
    appointment_email_to_user?: boolean
    default_duration?: string 
    calendar_view_type?: string
    email?: string
    fb_url?: string
    insta_url?: string
    address?: string
    monthly_sms_reminder_txt?: string
    daily_sms_reminder_txt?: string
    monthly_sms_reminder_months?: number
    daily_sms_reminder_minutes?: number
    account_number?: number
    sms_send?: number
    use_qpay?: number
    online_booking_email_info?: string
}

export type PaymentMethod = {
    id: ID
    name: string
    slug: string
    active: boolean
    use_qpay?: number
}