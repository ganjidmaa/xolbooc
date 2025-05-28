import {ID, Response} from '../../../../../_metronic/helpers'
export type BankAccount = {
  id?: ID
  name?: string
  account_number?: string
}


export type AccountsQueryResponse = Response<Array<BankAccount>>

