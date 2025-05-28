/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useQueryResponseLoading, useQueryResponsePagination } from '../../provider/QueryResponseProvider'
import { useQueryRequest } from '../../provider/QueryRequestProvider'
import { useState, useMemo } from 'react'

const mappedLabel = (label: string): string => {
  return label === '&laquo; Previous' ? 'Previous' : label === 'Next &raquo;' ? 'Next' : label
}

const ItemsPerPageSelect = ({ itemsPerPage, onChange }: { itemsPerPage: number, onChange: (value: number) => void }) => (
  <div className='d-flex align-items-center'>
    <span className="text-gray-600 d-block fs-6">нэг хуудсанд</span>
    <select
      className='form-select form-select-sm ms-5'
      data-control="select2"
      data-hide-search="true"
      style={{ width: '70px' }}
      onChange={(e) => onChange(parseInt(e.target.value))}
      value={itemsPerPage}
    >
      {[10, 30, 50, 100].map((size) => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  </div>
)

const PaginationControls = ({
  pagination,
  currentPage,
  isLoading,
  updatePage
}: {
  pagination: any,
  currentPage: number,
  isLoading: boolean,
  updatePage: (page: number | null) => void
}) => (
  <ul className='pagination'>
    {pagination.links?.map((link: any, index: number) => {
      const label = mappedLabel(link.label)
      const isEdge = index === 0 || index + 1 === pagination.links?.length
      const isVisible = isEdge || index === currentPage - 1 || (index >= currentPage && index <= currentPage + 1)

      return isVisible ? (
        <li
          key={label}
          className={clsx('page-item', {
            active: link.active,
            disabled: isLoading,
            previous: label === 'Previous',
            next: label === 'Next',
          })}
        >
          <a
            className={clsx('page-link', { 'page-text': label === 'Previous' || label === 'Next', 'me-5': label === 'Previous' })}
            onClick={() => {
              let newPage: number | null = index
              const current = pagination.current_page ?? pagination.page

              if (label === 'Previous') newPage = current - 1 >= 0 ? current - 1 : null
              if (label === 'Next') newPage = current + 1 <= (pagination.links?.length ?? 0) - 2 ? current + 1 : null

              updatePage(newPage)
            }}
            style={{ cursor: 'pointer' }}
          >
            {label === 'Previous' ? 'Өмнөх' : label === 'Next' ? 'Дараах' : label}
          </a>
        </li>
      ) : (
        <span key={label} style={{ alignSelf: "self-end" }}>
          {(index === 1 || index + 2 === pagination.links?.length) && <i className='bi bi-three-dots'></i>}
        </span>
      )
    })}
  </ul>
)

const CustomersListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const { updateState } = useQueryRequest()
  const [currentPage, setCurrentPage] = useState(1)

  const paginationInfo = useMemo(
    () => `нийт ${pagination.total ? pagination.total : 0} бичлэгнээс ${pagination.from ? pagination.from : 0} - ${pagination.to ? pagination.to : 0} `,
    [pagination]
  )

  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) return
    setCurrentPage(page)
    updateState({ page })
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        <ItemsPerPageSelect itemsPerPage={pagination.items_per_page} onChange={(value) => updateState({items_per_page: value as 10 | 30 | 50 | 100 })} />
      </div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
      <div className="text-gray-600 d-block fs-6 me-4">{paginationInfo}</div>
      <div id='kt_table_customers_paginate'>
          <PaginationControls pagination={pagination} currentPage={currentPage} isLoading={isLoading} updatePage={updatePage} />
        </div>
      </div>
    </div>
  )
}

export { CustomersListPagination }
