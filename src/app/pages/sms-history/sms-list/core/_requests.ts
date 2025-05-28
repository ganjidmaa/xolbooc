import axios, {AxiosResponse} from 'axios'
import { SmsQueryResponse, } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const GET_SMS_URL = `${APP_URL}/sms-history`

const getSms = (query: string): Promise<SmsQueryResponse> => {
  return axios
    .post(`${GET_SMS_URL}/query?${query}`)
    .then((d: AxiosResponse<SmsQueryResponse>) => d.data)
}

export {
  getSms
}
