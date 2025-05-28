/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Datetime from 'react-datetime'
import Moment from 'moment'


type Props = {
    formik: any,
    checkedDays: string,
    setCheckedDays: (value: string) => void
}

const TimeCalendar: React.FC<Props> = ({formik, checkedDays, setCheckedDays}) => {
    
    const weekDays = [
        {
          name: 'Даваа',
          value: '1',
        },
        {
          name: 'Мягмар',
          value: '2',
        },
        {
          name: 'Лхагва',
          value: '3',
        },
        {
          name: 'Пүрэв',
          value: '4',
        },
        {
          name: 'Баасан',
          value: '5',
        },
        {
          name: 'Бямба',
          value: '6',
        },
        {
          name: 'Ням',
          value: '0',
        },
      ]
    
    const handleOnChangeTime = (field: string, value: any) => {
        value = Moment(value).format('HH:mm')
        formik.setFieldValue(field, value)
    }

    const handleWeekdayChange = (value: string) => {
        var updatedWeekdayState = ''
        if (checkedDays.includes(value)) {
          updatedWeekdayState = checkedDays.replace(value, '')
        } else {
          updatedWeekdayState = checkedDays + value
        }
        setCheckedDays(updatedWeekdayState)
    }

    return (
    <div className='card mb-5 mb-xl-5'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_time_and_calendar'
        aria-expanded='true'
        aria-controls='kt_time_and_calendar'
      >
        <div className='card-title'>
          <h3 className='fw-bolder'>Ажиллах цаг</h3>
        </div>
      </div>

      <div id='kt_time_and_calendar' className='collapse show'>
        <div className='card-body border-top p-9'>
            <div className='py-1'>
                <div className='row mb-6'>
                    <div className='col-xl-3'>
                        <div className='fs-6 fw-bold mt-2 mb-3 required'>Ажлын цаг</div>
                    </div>
                    <div className='col-6 col-xl-4 fv-row'>
                        <Datetime
                            className='timePicker'
                            dateFormat={false}
                            timeFormat='HH:mm'
                            {...formik.getFieldProps('start_time')}
                            onChange={(val) => {
                            handleOnChangeTime('start_time', val)
                            }}
                        />
                    </div>
                    <div className='col-6 col-xl-4 fv-row'>
                        <Datetime
                            className='timePicker'
                            dateFormat={false}
                            timeFormat='HH:mm'
                            {...formik.getFieldProps('end_time')}
                            onChange={(val) => {
                            handleOnChangeTime('end_time', val)
                            }}
                        />
                    </div>
                </div>
                

                {!formik.values.has_branch && (
                  <div className='row mb-6'>
                    <div className='col-xl-3'>
                        <div className='fs-6 fw-bold mt-2 mb-3 required'>Ажиллах өдрүүд</div>
                    </div>
                    <div className='col-xl-8 fv-row'>
                        {weekDays.map(({name, value}, index) => {
                        return (
                            <div className='form-check form-check-inline mb-5' key={index} >
                            <input
                                className='form-check-input'
                                type='checkbox'
                                id={`business-days-${index}`}
                                checked={checkedDays.includes(value)}
                                onChange={() => handleWeekdayChange(value)}
                                value={value}
                            />
                            <label className='form-check-label' htmlFor='business_days'>
                                {name}
                            </label>
                            </div>
                        )
                        })}
                    </div>
                  </div>
                )}

                <div className='row'>
                    <div className='col-xl-3'>
                        <div className='fs-6 fw-bold mt-2 mb-3'>Цайны цаг</div>
                    </div>
                    <div className='col-6 col-xl-4 fv-row'>
                        <Datetime
                            className='timePicker'
                            dateFormat={false}
                            timeFormat='HH:mm'
                            {...formik.getFieldProps('lunch_start_time')}
                            onChange={(val) => {
                            handleOnChangeTime('lunch_start_time', val)
                            }}
                        />
                    </div>
                    <div className='col-6 col-xl-4 fv-row'>
                        <Datetime
                            className='timePicker'
                            dateFormat={false}
                            timeFormat='HH:mm'
                            {...formik.getFieldProps('lunch_end_time')}
                            onChange={(val) => {
                            handleOnChangeTime('lunch_end_time', val)
                            }}
                        />
                    </div>
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                              {"Цайны цагаар захиалга авдаг бол хоосон орхиж болно."}
                      </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export {TimeCalendar}
