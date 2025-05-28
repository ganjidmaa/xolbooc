import {ID, Response} from '../../../../../../_metronic/helpers'
export type Coupon = {
  id?: ID
  title?: string
  value?: string
  price?: string
  start_date?: string
  end_date?: string
  sell_limit?: number
  limit_number?: number
  sold_number?: number
  is_all_services?: boolean
  type?: boolean | string
  selected_services: Array<SelectedService>
  desc?: string
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

export type ServiceCategory = {
  id?: ID
  name?: string
}

export type SelectedService = {
  category_id: ID
  group_selection: boolean
  service_ids: Array<ID>
}

export type CouponsQueryResponse = Response<Array<Coupon>>

export type MasterDataResponse = {
  services: Array<Service>
  service_categories: Array<ServiceCategory>
}
