import axios, {AxiosResponse} from 'axios'
import { ID, Response } from '../../../../../_metronic/helpers'
import { BankAccount, AccountsQueryResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const ACOUNT_URL = `${APP_URL}/bank_account`
const GET_ACOUNTS_URL = `${APP_URL}/bank_accounts`

const getAccounts = (query: string): Promise<AccountsQueryResponse> => {
  return axios
    .get(`${GET_ACOUNTS_URL}/query?${query}`)
    .then((d: AxiosResponse<AccountsQueryResponse>) => d.data)
}

const getAccountById = (id: ID): Promise<Response<BankAccount>> => {
  return axios
    .get(`${ACOUNT_URL}/${id}`)
    .then((response: AxiosResponse<Response<BankAccount>>) => response.data)
}

const createAccount = (discount: BankAccount): Promise<Response<BankAccount>> => {
  return axios
    .put(ACOUNT_URL, discount)
    .then((response: AxiosResponse<Response<BankAccount>>) => response.data)
}

const updateAccount = (discount: BankAccount): Promise<Response<BankAccount>> => {
  return axios
    .post(`${ACOUNT_URL}/${discount.id}`, discount)
    .then((response: AxiosResponse<Response<BankAccount>>) => response.data)
}

const deleteAccount = (id: ID): Promise<void> => {
  return axios.delete(`${ACOUNT_URL}/${id}`).then(() => {})
}

const deleteSelectedAccounts = (dataIds: Array<ID>): Promise<void> => {
  const requests = dataIds.map((id) => axios.delete(`${ACOUNT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  deleteSelectedAccounts
}
