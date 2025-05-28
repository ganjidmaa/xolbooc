import React, { FC } from 'react'

type Props = {
    prop: string
    label: string
    t?: string
    formik: any
}

const TwoInputComponent: FC<Props> = ({prop, formik, label, t = ''}) => {
  return (
    <div className='col-lg-4 fv-row mb-3 mb-lg-0'>
          <label className='fs-6 fw-bold mb-1'>{label}</label>
          <div className='d-flex'>
            <input
              type='text'
              style={{width: "50%", marginRight: 5}}
              className='form-control'
              placeholder={t+'OD'}
              {...formik.getFieldProps(prop+'.'+t+'OD')}
            />
            <input
              type='text'
              style={{width: "50%"}}
              className='form-control'
              placeholder={t +'OS'}
              {...formik.getFieldProps(prop+'.'+ t + 'OS')}
            />
          </div>
        </div>
  )
}

export default TwoInputComponent