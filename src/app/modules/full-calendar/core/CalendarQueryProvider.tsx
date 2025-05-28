import { createContext, FC, useContext, useEffect, useMemo, useState } from "react"
import { WithChildren, stringifyRequestQuery, QUERIES, QueryState } from "../../../../_metronic/helpers"
import { CalendarQueryContextProps, initialCalendarQuery } from "./_models"
import { useQuery } from "react-query"
import { getCustomers } from "../../customer-management/core/_requests"

const CalendarQueryContext = createContext<CalendarQueryContextProps>(initialCalendarQuery)

const CalendarQueryProvider:FC<WithChildren> = ({children}) => {
    const [eventCustomer, setEventCustomer] = useState<CalendarQueryContextProps["eventCustomer"]>({})
    const [state, setState] = useState<QueryState>(initialCalendarQuery.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <CalendarQueryContext.Provider
            value={{
                eventCustomer,
                setEventCustomer, 
                state,
                updateState
            }}
        >
            {children}
        </CalendarQueryContext.Provider>
    )
}

const useCalendarQuery = () => useContext(CalendarQueryContext)

const useQueryResponseData = () => {
    const {state} = useCalendarQuery()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])
  
    useEffect(() => {
      if (query !== updatedQuery) {
        setQuery(updatedQuery)
      }
    }, [updatedQuery])
  
    const {
      isFetching,
      refetch,
      data: response,
    } = useQuery(
      `${QUERIES.CUSTOMERS_LIST}-${query}`,
      () => {
        return getCustomers(query)
      },
      {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    if (!response) {
        return []
    }
    
    return response?.data || []
}

export {CalendarQueryProvider, useCalendarQuery, useQueryResponseData}