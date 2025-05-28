import { ID, Response} from '../../../../_metronic/helpers'
export type Branch = {
  id?: ID
  name?: string
  start_time?: string
  end_time?: string
  phone?: string
  slot_duration?: string
  value?: ID
  label?: string
  address?: string
  business_days?: string
}
export type BranchQueryResponse = Response<Array<Branch>>

export type Role = {
  id?: ID
  name?: string
  value?: ID
  label?: string
}
