import axios, {AxiosResponse} from 'axios'
import {MasterData, ShiftHoursByUser} from './_models'
import { Response } from '../../../../_metronic/helpers'

const APP_URL = process.env.REACT_APP_API_URL
const MASTER_DATA_URL = `${APP_URL}/appointment/master_data`


const getMasterDatas = (): Promise<MasterData> => {
  return axios
  .get(`${MASTER_DATA_URL}`)
  .then((response: AxiosResponse<MasterData>) => response.data)
}

const storeShift = (data: any): Promise<any> => {
  return axios
    .put(`${APP_URL}/shift/store_data`, data)
    .then((response: AxiosResponse<any>) => response.data)
}

const getScheduleData = (date_range: any): Promise<Response<Array<ShiftHoursByUser>>> => {
  return axios
    .get(`${APP_URL}/shift/index?start_date=${date_range.startDate}&end_date=${date_range.endDate}`)
    .then((response: AxiosResponse<Response<Array<ShiftHoursByUser>>>) => response.data)
}

export {
  getMasterDatas,
  storeShift,
  getScheduleData
}
