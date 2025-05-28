import React, { FC } from 'react'

type Props = {
    label: string
    prop: string
    formik: any
}

const TreeInputComponent: FC<Props> = ({prop, formik, label}) => {
  return (
    <div className='col-lg-3 fv-row mb-6 mb-lg-0'>
          <label className='fs-6 fw-bold mb-2'>{label}</label>
          <div className='d-flex'>
            <input
              type='text'
              style={{width: '33%', marginRight: 5}}
              className='form-control'
              placeholder='VOD'
              {...formik.getFieldProps(prop + '.VOD')}
            />
            <input
              type='text'
              style={{width: '33%', marginRight: 5}}
              className='form-control'
              placeholder='VOS'
              {...formik.getFieldProps(prop + '.VOS')}
            />
            <input
              type='text'
              style={{width: '33%'}}
              className='form-control'
              placeholder='VOU'
              {...formik.getFieldProps(prop + '.VOU')}
            />
          </div>
        </div>
  )
}

export default TreeInputComponent