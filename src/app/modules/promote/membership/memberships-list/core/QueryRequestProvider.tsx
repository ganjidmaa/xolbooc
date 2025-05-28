import {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  isNotEmpty,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import { Customer } from './_models'

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

const useQueryResponseData = (customers: Array<Customer>) => {
  const {state} = useQueryRequest()

  if(!isNotEmpty(state.search)) {
      return customers
  }

  let searchTerm = state.search?.toString() || ''
  searchTerm = searchTerm.toLowerCase()
  const filteredData = customers.filter((customer) => {
      return customer.firstname?.toLowerCase().includes(searchTerm) ||
        customer.lastname?.toLowerCase().includes(searchTerm) ||
        customer.registerno?.toLowerCase().includes(searchTerm) || 
        customer.phone?.toLowerCase().includes(searchTerm) || 
        customer.phone2?.toLowerCase().includes(searchTerm)
  })
  
  return filteredData
}

export {QueryRequestProvider, useQueryRequest, useQueryResponseData}
