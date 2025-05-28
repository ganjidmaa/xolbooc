import { ID, Response } from "../../../../../_metronic/helpers"

export type Event = {
  id?: ID
  status?: string 
  start_time?: string
  end_time?: string
  username?: string
  customer_name?: string
  duration?: string
  service_name?: string
  service_code?: string
  payment?: string
  discount?: string
  paid?: string
  left_amount?: string
  event_number?: string
}

export type Service = {
  id?: ID
  name?: string
  category_id?: ID
  category_name?: string
  price?: string
  desc?: string
  status?: number
  duration?: number
  allow_resources?: boolean
  checked_resources?: Array<string>
}

export type Status = {
  name?: string
  value?: Array<string>
}

export type DetailDatas = {
  events?: Array<Event>
  total_payment?: string
  total_paid?: string
}

export type DetailsQueryResponse = Response<Array<DetailDatas>>