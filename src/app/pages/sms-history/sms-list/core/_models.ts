import { ID, Response } from "../../../../../_metronic/helpers"

export type Sms = {
  id?: ID
  tel?: string
  msg?: string
  status?: number
  result?: string
  type?: string
  created_at?: string
}
export type SmsDatas = {
  sms_history?: Array<Sms>
  sms_count?: string
  sms_left?: string
  success_count?: string
  failed_count?: string
}

export type SmsQueryResponse = Response<Array<SmsDatas>>