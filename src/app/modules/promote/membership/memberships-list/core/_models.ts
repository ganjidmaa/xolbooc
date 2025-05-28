import {ID, Response} from '../../../../../../_metronic/helpers'
export type MembershipType = {
  id?: ID
  title?: string
  percent?: number
  prefix?: string
  limit_price?: string
  type?: string
  value?: ID
  label?: string
}

export type Membership = {
  id?: ID
  code?: string
  membership_type_id?: number
  selected_customers?: Array<ID>
  percent?: number
  password?: string
  activeDiscountCard?: boolean
  title?: string
  customer_number?: string
}

export type SelectedCustomers = {
  customer_ids: Array<ID>
}

export type Customer = {
  id?: ID
  firstname?: string
  lastname?: string
  registerno?: string
  phone?: string
  phone2?: string
  email?: string
}

export type MembershipData = {
  membership: Membership
  membership_types: Array<MembershipType>
}

export type MembershipsQueryResponse = Response<Array<Membership>>

export type CustomersQueryResponse = Response<Array<Customer>>


