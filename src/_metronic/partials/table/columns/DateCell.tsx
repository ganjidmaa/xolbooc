/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import Moment from 'moment';

type Props = {
  data?: string
}

const DateCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span>
        {Moment(data).format('YYYY/MM/DD')}
      </span>
    </div>
  </div>
)

export {DateCell}
