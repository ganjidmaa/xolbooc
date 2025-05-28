import {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  isNotEmpty,
  WithChildren,
} from '../../../../../_metronic/helpers'
import { BankAccount } from './_models'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const QueryRequestProvider: FC<WithChildren> = ({children}) => {
  const [state, setState] = useState<QueryState>(initialQueryRequest.state)

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState
    setState(updatedState)
  }

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)

const useQueryResponseData = (accounts: Array<BankAccount>) => {
  const {state} = useQueryRequest()

  if(!isNotEmpty(state.search)) {
      return accounts
  }

  let searchTerm = state.search?.toString() || ''
  searchTerm = searchTerm.toLowerCase()
  const filteredData = accounts.filter((account) => {
      return account.name?.toLowerCase().includes(searchTerm) ||
      account.account_number?.toLowerCase().includes(searchTerm)
  })
  
  return filteredData
}

export {QueryRequestProvider, useQueryRequest, useQueryResponseData}
