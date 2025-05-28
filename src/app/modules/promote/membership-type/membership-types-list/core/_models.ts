import {ID, Response} from '../../../../../../_metronic/helpers'
export type MembershipType = {
  id?: ID
  title?: string
  percent?: number
  prefix?: string
  limit_price?: string
  type?: string
  activeDiscountCard?: boolean
}

export type Membership = {
  id?: ID
  code?: string
  start_date?: string
  end_date?: string
  membership_type_id?: number
  customer_id?: number
  user_id?: number
  title?: string
  percent?: number
  prefix?: string
}


export type MembershipTypesQueryResponse = Response<Array<MembershipType>>

export type MembershipsQueryResponse = Response<Array<Membership>>


