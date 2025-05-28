import React, { FC } from 'react'

type Props = {
    label: string
    prop: string
    formik: any
}

const FourInputComponent: FC<Props> = ({prop, formik, label}) => {
  return (
    <div className='col-lg-12 fv-row mb-6 mb-lg-0'>
          <label className='fs-6 fw-bold mb-2'>{label}</label>
          <div className='d-flex'>
            <input
              type='text'
              style={{width: '25%', marginRight: 5}}
              className='form-control'
              placeholder='SPH'
              {...formik.getFieldProps(prop + '.SPH')}
            />
            <input
              type='text'
              style={{width: '25%', marginRight: 5}}
              className='form-control'
              placeholder='CYL'
              {...formik.getFieldProps(prop + '.CYL')}
            />
            <input
              type='text'
              style={{width: '25%', marginRight: 5}}
              className='form-control'
              placeholder='AXIS'
              {...formik.getFieldProps(prop + '.AXIS')}
            />
            <input
              type='text'
              style={{width: '25%'}}
              className='form-control'
              placeholder='VISION'
              {...formik.getFieldProps(prop + '.VISION')}
            />
          </div>
        </div>
  )
}

export default FourInputComponent