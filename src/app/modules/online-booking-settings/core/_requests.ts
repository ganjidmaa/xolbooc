import axios, { AxiosResponse } from "axios"
import { Response } from "../../../../_metronic/helpers"
import { OnlineBookingSettings } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const SETTINGS_URL = `${APP_URL}/settings/online-booking`

const getBookingSettings = (): Promise<Response<OnlineBookingSettings>> => {
  return axios
    .get(SETTINGS_URL)
    .then((response: AxiosResponse<Response<OnlineBookingSettings>>) => response.data)
}

const updateBookingSettings = (settings: OnlineBookingSettings): Promise<Response<OnlineBookingSettings>> => {
    return axios
      .post(SETTINGS_URL, settings)
      .then((response: AxiosResponse<Response<OnlineBookingSettings>>) => response.data)
}

export {getBookingSettings, updateBookingSettings}