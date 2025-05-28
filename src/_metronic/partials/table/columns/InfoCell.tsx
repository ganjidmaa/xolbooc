/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  data?: string
}

const InfoCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span>
        {data}
      </span>
    </div>
  </div>
)

export {InfoCell}
