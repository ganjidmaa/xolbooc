import { ID } from "../../../../_metronic/helpers"

export type OnlineBookingSettings = {
    id?: ID
    image?: string | []
    image_url?: string[]
    choose_user?: boolean
    choose_qpay?: boolean
    choose_autoDiscard?: boolean
    validate_amount?: string | undefined
    about?: string
    important_info?: string
    location?: string
    file?: any
    group_booking_limit?: number
    group_booking?: boolean
    theme_color?:string
    theme_selection?:number
}