import { ID } from "../../../../_metronic/helpers"

export type OnlineBookingSettings = {
    id?: ID
    image?: string | []
    image_url?: string
    choose_user?: boolean
    choose_qpay?: boolean
    choose_autoDiscard?: boolean
    validate_amount?: string | undefined
    about?: string
    important_info?: string
    location?: string
    file?: any
}