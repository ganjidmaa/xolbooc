import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import {getOtpcode} from '../core/_requests'

const mobileNumTest = /^[0-9]{1,}$/

const ModalStep1 = ({
  setStep,
  mobileNum,
  setMobileNum,
}: {
  setStep: Dispatch<SetStateAction<number>>
  mobileNum: string
  setMobileNum: Dispatch<SetStateAction<string>>
}) => {
  const [mobile, setMobile] = useState(mobileNum)
  const [errorTxt, setErrorTxt] = useState('')

  useEffect(() => {
    if (mobile === '') return
    if (mobileNumTest.test(mobile)) {
      setErrorTxt('')
    } else {
      setErrorTxt('Тоо оруулна уу')
    }
  }, [mobile])

  const fetchData = async () => {
    const mobNumer = {
      mobile: mobile,
    }
    const result = await getOtpcode(mobNumer)
    if (result.statusCode === 200) {
      setStep(2)
    } else {
      WarningAlert(result.status)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (mobile === '') return
    fetchData()
    setMobileNum(mobile)
  }

  return (
    <div className='my-10'>
      <form className='form' onSubmit={onSubmit} noValidate>
        {' '}
        <label className='form-label mb-6 '>Захиалгад бүртгүүлсэн утасны дугаар</label>
        <input
          type='text'
          maxLength={8}
          className='form-control p-4 mw-250px mx-auto'
          value={mobile}
          placeholder='Утасны дугаараа оруулна уу'
          onChange={(e) => setMobile(e.target.value)}
        />
        <div className='text-danger mt-4'>{errorTxt && <p>{errorTxt}</p>}</div>
        <button type='submit' disabled={mobile.length !== 8} className='btn btn-primary mt-14'>
          Нэг удаагийн код авах
        </button>
      </form>
    </div>
  )
}

export default ModalStep1
