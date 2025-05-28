import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  page: number
  current_page?: number
  items_per_page: 10 | 30 | 50 | 100
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
  from?: number
  to?: number
  total?: number
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type SearchDateState = {
  dates?: {
    start_date?: string
    end_date?: string
  }
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
    status?: number
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState & SearchDateState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  items_per_page: 10,
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}

export type Province = {
  value: ID,
  label: string
}

export type SoumDistrict = {
  value: ID,
  label: string
}

export type GroupSoumDistrict = {
  label: string,
  value: ID,
  options: Array<SoumDistrict>
}

export type Address = {
  province_id: ID,
  soum_district_id: ID,
  street?: string,
  street1?: string
}
export type Notifi = {
  context?: string
}