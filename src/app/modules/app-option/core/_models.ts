import {ID, Response} from '../../../../_metronic/helpers'
export type Service = {
  id?: ID
  name?: string
  category_id?: ID
  type?: ID
  price?: string
  desc?: string
  status?: number
  duration?: string
  type_name?: string
  code?: string
  allow_resources?: boolean
  checked_resources?: Array<string>
  available_all_user?: boolean
  checked_users?: Array<string>
  available_all_branch?: boolean
  checked_branches?: Array<string>
}

export type MasterData = {
  categories: Array<CategoryOption>
  serviceTypes: Array<ServiceType>
  resources: Array<Resource>
  service: Service
  branches: Array<Branch>
  users: Array<User>
}

export type CategoryOption = {
  value: ID,
  label: string
}

export type ServiceType = {
  value: ID,
  label: string
}

export type Resource = {
  id: ID,
  name: string
}

export type Branch = {
  id: ID,
  name: string
}

export type User = {
  id: ID,
  firstname: string
}

export type ServicesQueryResponse = Response<Array<Service>>

export const initialService: Service = {
  name: ''
}
