/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Membership } from '../../core/_models'

type Props = {
  membership: Membership
}

const MembershipInfoCell: FC<Props> = ({membership}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {membership.code}
      </a>
    </div>
  </div>
)

export {MembershipInfoCell}
