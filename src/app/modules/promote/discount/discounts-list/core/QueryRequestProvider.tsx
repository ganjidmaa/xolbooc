import {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  isNotEmpty,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import { Service } from './_models'

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

const useQueryResponseData = (services: Array<Service>) => {
  const {state} = useQueryRequest()

  if(!isNotEmpty(state.search)) {
      return services
  }

  let searchTerm = state.search?.toString() || ''
  searchTerm = searchTerm.toLowerCase()
  const filteredData = services.filter((service) => {
      return service.name?.toLowerCase().includes(searchTerm) ||
        service.category_name?.toLowerCase().includes(searchTerm) ||
        service.price?.toLowerCase().includes(searchTerm)
  })
  
  return filteredData
}

export {QueryRequestProvider, useQueryRequest, useQueryResponseData}
