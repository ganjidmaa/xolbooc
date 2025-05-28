import {ID, Response} from '../../../../../../_metronic/helpers'
export type Discount = {
  id?: ID
  title?: string
  value?: number
  type?: string
  start_date?: string
  end_date?: string
  limit_price?: number
  is_all_services?: boolean
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

export type DiscountsQueryResponse = Response<Array<Discount>>

export type MasterDataResponse = {
  services: Array<Service>
  service_categories: Array<ServiceCategory>
}
