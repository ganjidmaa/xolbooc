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
  is_all_services?: boolean
  type?: boolean
  desc?: string
  services?: string
  code_count?: number
}

export type CouponCode = {
  id?: ID
  title?: string
  code?: string
  value?: string
  redeemed?: string
  status?: string
  start_date?: string
  end_date?: string
  payable_amount?: string
  usage_count?: string
  redeem_amount?: string
  is_all_services?: boolean
  payments?: Array<Payment>
  created_at?: string
  create_number?: number
  type?: string
  sell_limit?: number
  limit_number?: number
}

export type Payment = {
  id?: ID
  amount?: string
  customer_name?: string
  user_name?: string
  created_at?: string
}


export type CouponCodesQueryResponse = Response<Array<CouponCode>>
