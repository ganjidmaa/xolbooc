/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../provider/QueryResponseProvider'
import {useQueryRequest} from '../../provider/QueryRequestProvider'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const BranchListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page, items_per_page: pagination.items_per_page || 10})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links
              ?.map((link) => {
                return {...link, label: mappedLabel(link.label)}
              })
              .map((link, index) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: link.active,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    className={clsx('page-link', {
                      'page-text': link.label === 'Previous' || link.label === 'Next',
                      'me-5': link.label === 'Previous',
                    })}
                    onClick={() => {
                      var link_page: number | null = index
                      const current_page = pagination.current_page ? pagination.current_page : pagination.page
                      if(link.label === 'Previous') {
                        link_page = current_page - 1 >= 0 ? current_page - 1 : null
                      }
                      
                      if(link.label === 'Next') {
                        link_page = pagination.links && current_page + 1 <= pagination.links.length-2 ? current_page + 1 : null 
                      }
                      updatePage(link_page)
                    }}
                    style={{cursor: 'pointer'}}
                  >
                    {link.label === 'Previous' ? 'Өмнөх' : link.label === 'Next' ? 'Дараах' : link.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {BranchListPagination}
