import {FC, useState} from 'react'
import {objectHasAttr} from '../../../../_metronic/helpers'
import {CustomerToolbar} from '../customer/CustomerToolbar'
import {useCalendarQuery} from '../core/CalendarQueryProvider'
import CustomerDetail from '../customer/CustomerDetail'
import {CustomerList} from '../customer/CustomerList'
import {SearchCustomer} from '../customer/SearchCustomer'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {ItemDetail} from '../components/event-item/ItemDetail'
import {Event} from '../core/_models'
import {CustomerCreateForm} from '../customer/CustomerCreateForm'
import {popOverlay} from '../core/popOverlay'
import {OverlayTrigger} from 'react-bootstrap'

type Props = {
  isSubmitting: boolean
  validForm: boolean
  handleSubmit: (closing: boolean) => any
  event: Event
  viewType: string
  changeAsideType: (type: string, withRefresh: boolean) => void
}

const EventEditAside: FC<Props> = ({
  isSubmitting,
  validForm,
  handleSubmit,
  event,
  viewType,
  changeAsideType,
}) => {
  const {eventCustomer} = useCalendarQuery()
  const {itemDatas} = useCalendarItem()
  const [showTooltip, setShowTooltip] = useState(false)
  const [showTooltip1, setShowTooltip1] = useState(false)

  const saveAndPayment = () => {
    const isSubmitted = handleSubmit(false)
    isSubmitted.then((response: any) => {
      response && changeAsideType('payment', true)
    })
  }

  const popover = popOverlay('Үйлчлүүлэгч эсвэл Үйлчилгээ сонгоно уу.')
  const popover1 = popOverlay('Үйлчилгээ сонгоно уу.')

  return (
    <div className='flex-column flex-lg-row-auto gap-7 gap-lg-10 w-lg-450px w-xl-500px mb-7 me-lg-5'>
      <div className='card card-flush pb-4 pt-2 mh-lg-600px'>
        <div className='card-header'>
          <div className='card-title d-flex justify-content-between flex-wrap flex-stack w-100 me-0 border-bottom'>
            <CustomerToolbar />
            {!(eventCustomer && objectHasAttr(eventCustomer)) && eventCustomer !== undefined && (
              <SearchCustomer />
            )}
          </div>
        </div>

        <div className='card-body pt-3 border-bottom'>
          <div
            className='scroll-y me-n5 pe-5'
            style={{
              height:
                !objectHasAttr(eventCustomer) && eventCustomer !== undefined ? '360px' : '420px',
            }}
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: true, lg: true}'
            data-kt-scroll-max-height='420px'
            data-kt-scroll-offset='0px'
          >
            {eventCustomer && objectHasAttr(eventCustomer) ? (
              <CustomerDetail
                currentStatus={event.status}
                startDateTime={event?.start_datetime || ''}
                viewType={viewType}
              />
            ) : (
              <CustomerList />
            )}
            {eventCustomer === undefined && <CustomerCreateForm />}

            {eventCustomer !== undefined &&
              itemDatas &&
              itemDatas.map((item, index) => {
                return <ItemDetail key={index} item={item} index={index} viewType='edit' />
              })}
          </div>
        </div>

        <div className='card-footer d-flex justify-content-between py-6 px-9 border-top'>
          {
            <div
              className='justify-content-end'
              onClick={() => {
                ;((viewType === 'edit' && itemDatas.length === 0) || !validForm) &&
                  setShowTooltip(!showTooltip)
              }}
            >
              <OverlayTrigger show={showTooltip} placement='top' overlay={popover}>
                <button
                  style={{width: '120px'}}
                  type='button'
                  className='btn btn-sm btn-primary'
                  onClick={() => {
                    handleSubmit(true)
                  }}
                  disabled={
                    !validForm || isSubmitting || (viewType === 'edit' && itemDatas.length === 0)
                  }
                >
                  <span className='indicator-label'>
                    {viewType === 'create' ? 'Цаг захиалах' : 'Хадгалах'}
                  </span>
                  {isSubmitting && (
                    <span className='indicator-progress'>
                      Түр хүлээнэ үү...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </OverlayTrigger>
            </div>
          }

          <div></div>
          {event.status && event.status !== 'completed' && event.status !== 'no_show' && (
            <div
              className='justify-content-end'
              onClick={() => {
                ;((viewType === 'edit' && itemDatas.length === 0) || !validForm) &&
                  setShowTooltip1(!showTooltip1)
              }}
              style={{width: '120px'}}
            >
              <OverlayTrigger show={showTooltip1} placement='top' overlay={popover1}>
                <button
                  className='btn btn-sm btn-success'
                  onClick={() => {
                    saveAndPayment()
                  }}
                  disabled={
                    !validForm || isSubmitting || (viewType === 'edit' && itemDatas.length === 0)
                  }
                >
                  <span className='indicator-label'>Төлбөр төлөх</span>
                </button>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export {EventEditAside}
