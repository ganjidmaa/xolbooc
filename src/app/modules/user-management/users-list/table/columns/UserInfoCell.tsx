/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../../core/_models'
import clsx from 'clsx'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {user.avatar_url ? (
          <div className='symbol-label'>
            <img src={user?.avatar_url} alt={user.firstname} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${user.initials?.state}`,
              `text-${user.initials?.state}`
            )}
          >
            {user.initials?.label}
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <span>{user.lastname}</span>
      <a href='#' className='text-gray-800 mb-1'>
        {user.firstname}
      </a>
    </div>
  </div>
)

export {UserInfoCell}
