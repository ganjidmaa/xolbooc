/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { Customer } from '../../../core/_models'

type Props = {
  customer: Customer
}

const CustomerInfoCell: FC<Props> = ({customer}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {customer.avatar_url ? (
          <div className='symbol-label'>
            <img src={customer?.avatar_url} alt={customer.firstname} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${customer.initials?.state}`,
              `text-${customer.initials?.state}`
            )}
          >
            {customer.initials?.label}
          </div>  
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <span>{customer.lastname}</span>
      <a href='#' className='text-gray-800 mb-1'>
        {customer.firstname}
      </a>
    </div>
  </div>
)

export {CustomerInfoCell}
