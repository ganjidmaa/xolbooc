/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {initialQueryState, KTSVG, useDebounce} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const CouponsListSearchComponent = () => {
  const {updateState} = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateState({search: debouncedSearchTerm, ...initialQueryState})
      }
    },
    [debouncedSearchTerm] 
  )

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Хайх'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {CouponsListSearchComponent}
