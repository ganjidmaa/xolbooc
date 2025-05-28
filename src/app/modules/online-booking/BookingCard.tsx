/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  title: string
  subTitle?: string
  body: any
}

const BookingCard: FC<Props> = ({
  title, body, subTitle
}) => {
  return (
    <div className="d-flex flex-column flex-row-fluid">
      <div className='card card-flush'>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className="fw-bold mb-1">{title}</h3>
            <div className="fs-6 text-gray-400">{subTitle}</div> 
          </div>
        </div>

        <div className='card-body p-9 pt-2'>
          <div className='h-450px h-lg-500px hover-scroll-y text-gray-900 fs-lg-5 fs-6'>
              {body} 
          </div>
        </div>
      </div>
    </div>
  )
}

export {BookingCard}
