import {useEffect, useState} from 'react'
import { KTSVG } from '..'
import Datetime from 'react-datetime';
import Moment from 'moment';
import clsx from 'clsx';
import {WithChildren} from '../react18MigrationHelpers';

const datePickerProps = {
  style: {
      width: '165px',
      padding: '8px 11px'
  },
  className: 'form-control bg-body ps-12'
}
type DateRangeProps = {
  onDateChanged: (startDate: string, endDate: string) => void;
  defaultTab: string
}

const DateRange: React.FC<DateRangeProps & WithChildren>= ({onDateChanged, defaultTab, children}) => {
  const [startDate, setStartDate] = useState(Moment().format('YYYY/MM/DD'))
  const [endDate, setEndDate] = useState(Moment().format('YYYY/MM/DD'))
  const [activeTab, setAcitveTab] = useState('')

  useEffect(() => {
    if(activeTab === 'today') {
      setStartDate(Moment().format('YYYY/MM/DD'))
      setEndDate(Moment().format('YYYY/MM/DD'))
    }
    else if(activeTab === 'week') {
      setStartDate(Moment().startOf('week').format('YYYY/MM/DD'))
      setEndDate(Moment().endOf('week').format('YYYY/MM/DD'))
    }
    else if(activeTab === 'month') {
      setStartDate(Moment().format('YYYY/MM/01'))
      setEndDate(Moment().format('YYYY/MM/DD'))
    }
    else if(activeTab === 'year') {
      setStartDate(Moment().format('YYYY/01/01'))
      setEndDate(Moment().format('YYYY/12/31'))
    }
  }, [activeTab])

  useEffect(() => {
    onDateChanged(startDate, endDate)
  }, [startDate, endDate])

  useEffect(() => {
    setAcitveTab(defaultTab)
  }, [defaultTab])

  return (
    <div className='card-header border-0 pt-1 align-items-center'>
      {children}

      <div className='card-toolbar'>
        <ul className='nav'>
          <li className='nav-item'>
            <a
              className={clsx('nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success fw-bold px-4 me-1', {active: activeTab === 'year'})}
              data-bs-toggle='tab'
              href='#kt_table_widget_4_tab_1'
              onClick={() => setAcitveTab('year')}
            >
              Жил
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={clsx('nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success fw-bold px-4 me-1', {active: activeTab === 'month'})}
              data-bs-toggle='tab'
              href='#kt_table_widget_4_tab_2'
              onClick={() => setAcitveTab('month')}
            >
              Сар
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={clsx('nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success fw-bold px-4 me-1', {active: activeTab === 'week'})}
              data-bs-toggle='tab'
              href='#kt_table_widget_4_tab_3'
              onClick={() => setAcitveTab('week')}
            >
              7 хоног
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={clsx('nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success fw-bold px-4 me-1', {active: activeTab === 'today'})}
              data-bs-toggle='tab'
              href='#kt_table_widget_4_tab_4'
              onClick={() => setAcitveTab('today')}
            >
              Өдөр
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={clsx('nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success fw-bold px-4 me-1', {active: activeTab === 'custom'})}
              data-bs-toggle='tab'
              href='#kt_table_widget_4_tab_5'
              onClick={() => setAcitveTab('custom')}
            >
              Бусад
            </a>
          </li>
        </ul>
        
        {activeTab === 'custom' && 
        <div className='d-flex align-items-center ps-6'>
          <div className="d-flex align-items-center position-relative">
              <KTSVG
                  path='/media/icons/duotune/general/gen014.svg'
                  className='svg-icon-1 svg-icon-success position-absolute translate-middle-y top-50 ps-3 z-index-1'
              />
              <Datetime
                  timeFormat={false}
                  dateFormat='YYYY/MM/DD'
                  initialValue={startDate}
                  inputProps={datePickerProps}
                  onChange={(val) => {setStartDate(Moment(val).format('YYYY/MM/DD'))}}
              />
          </div>

          <div className="d-flex align-items-center position-relative">
              <KTSVG
                  path='/media/icons/duotune/general/gen014.svg'
                  className='svg-icon-1 svg-icon-success position-absolute translate-middle-y top-50 ps-3 z-index-1'
              />
              <Datetime
                  timeFormat={false}
                  dateFormat='YYYY/MM/DD'
                  initialValue={endDate}
                  inputProps={datePickerProps}
                  onChange={(val) => {setEndDate(Moment(val).format('YYYY/MM/DD'))}}
              />
          </div>
          {/* <button
            type='button'
            className='btn btn-sm btn-icon btn-light-success btn-active-success me-5'
            onClick={() => handleDateRange()}
          >
            <KTSVG path='/media/icons/duotune/abstract/abs013.svg' className='svg-icon-2' />
          </button> */}
        </div>
        }
        
      </div>
      
    </div>
  )
}

export {DateRange}
