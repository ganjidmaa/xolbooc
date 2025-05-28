import {FC} from 'react'
import CustomerDetail from '../customer/CustomerDetail'
import {PaymentDetail} from '../payment/PaymentDetail'
import {Event, Invoice} from '../core/_models'

type Props = {
  asideType: string
  changeAsideType: (type: string) => void
  event: Event
}

export const EventViewAside: FC<Props> = ({changeAsideType, event, asideType}) => {
  return (
    <div className='card-body pt-10 pb-1'>
      <div
        className='scroll-y me-n5 pe-5'
        // style={{height: '564px'}}
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: true, lg: true}'
        // data-kt-scroll-max-height='560px'
        data-kt-scroll-offset='0px'
      >
        <CustomerDetail
          currentStatus={event?.status}
          startDateTime={event?.start_datetime || ''}
          viewType={asideType}
        />

        <div className='card mt-4' style={{boxShadow: 'none', backgroundColor: 'aliceblue'}}>
          <div className='card-body py-8'>
            <PaymentDetail
              invoiceState={event?.invoice as Invoice}
              changeAsideType={changeAsideType}
              viewType={asideType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
