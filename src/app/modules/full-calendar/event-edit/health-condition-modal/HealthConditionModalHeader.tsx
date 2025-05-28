import { FC } from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import { useCalendarView } from '../../core/CalendarViewProvider'

type Props = {
  setFunction: any
}

const HealthConditionModalHeader:FC<Props> = ({setFunction}) => {
  const {setHealthCondition} = useCalendarView()
  const closeModal = () => {
    setFunction === undefined ? setHealthCondition(undefined) : setFunction()
  }
  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>Эрүүл мэндийн асуумж</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => closeModal()}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {HealthConditionModalHeader}
