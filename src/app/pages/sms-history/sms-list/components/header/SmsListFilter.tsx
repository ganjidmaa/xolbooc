import { useState} from 'react'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { KTSVG, initialQueryState } from '../../../../../../_metronic/helpers'

const SmsListFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [residue, setResidue] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {residue, status},
      ...initialQueryState
    })
  }

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Шүүлтүүр
      </button> 

      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Сонголт</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Төлөв:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='role'
              data-hide-search='true'
              onChange={(e) => setResidue(e.target.value)}
              value={residue}
            >
              <option value=''>Бүх</option>
              <option value='successful'>Амжилттай</option>
              <option value='failed'>Амжилтгүй</option>
            </select>
          </div>

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Цэвэрлэх
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Шүүх
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {SmsListFilter}
