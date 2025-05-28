import axios, { AxiosResponse } from "axios"
import { Response } from "../../../../_metronic/helpers"
import { DashboardData } from "./_models"

const APP_URL = process.env.REACT_APP_API_URL
const DASHBOARD_URL = `${APP_URL}/dashboard`

const getDashboardDatas = (values: any): Promise<Response<DashboardData>> => {
    return axios
      .post(DASHBOARD_URL, values)
      .then((response: AxiosResponse<Response<DashboardData>>) => response.data)
}

export {getDashboardDatas}