import axios, { AxiosResponse } from "axios"
import { Response } from "../../../../_metronic/helpers"
import { PaymentMethod, Settings } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const SETTINGS_URL = `${APP_URL}/settings`

const updateSettings = (settings: Settings, paymentMethods: Array<PaymentMethod>): Promise<Response<Settings>> => {
    return axios
      .post(SETTINGS_URL, {settings: settings, paymentMethods: paymentMethods})
      .then((response: AxiosResponse<Response<Settings>>) => response.data)
}

export {updateSettings}