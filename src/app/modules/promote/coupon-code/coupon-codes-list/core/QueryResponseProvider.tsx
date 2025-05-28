/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  CRUD_RESPONSES,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'

import {useQueryRequest} from './QueryRequestProvider'
import { CouponCode } from './_models'
import { getCouponCodes } from './_requests'

const QueryResponseContext = createResponseContext<CouponCode>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
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
    `${QUERIES.COUPON_CODES_LIST}-${query}`,
    () => {
      return getCouponCodes(query)
    },
    {
      cacheTime: 0, 
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        console.error(err)
        err.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      },
    }
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)
const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
