import clsx from 'clsx'
import {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useCalendarItem} from '../../core/CalendarItemProvider'

type Props = {
  hour: string
  handleTime: (hour: string) => void
}

export const TimeItem: FC<Props> = ({hour, handleTime}) => {
  const {itemDatas} = useCalendarItem()

  return (
    <div
      onClick={() => handleTime(hour)}
      className={clsx(
        'btn btn-sm btn-active-light-dark py-2 px-2 border border-dark mx-3 my-1 w-80px fs-lg-5 fs-6',
        {active: hour === itemDatas.start_time}
      )}
    >
      <KTSVG
        path='/media/icons/duotune/general/gen013.svg'
        className='svg-icon-1 svg-icon-dark ms-3 me-2'
      />
      <span className='ps-3 pe-2 px-lg-0'> {hour} </span>
    </div>
  )
}
