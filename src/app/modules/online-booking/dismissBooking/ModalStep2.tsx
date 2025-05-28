import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import OtpInputWithValidation from './OtpInput'
import {checkOtpCode, getOtpcode} from '../core/_requests'

const COUNT_TIME = 300

const ModalStep2 = ({
  setStep,
  otp,
  setOtp,
  mobileNum,
  setBookingData,
}: {
  setStep: Dispatch<SetStateAction<number>>
  otp: string
  setOtp: Dispatch<SetStateAction<string>>
  mobileNum: string
  setBookingData: Dispatch<SetStateAction<any>>
}) => {
  const [timerString, setTimerString] = useState('')
  const [canRefetch, setCanRefetch] = useState(true)

  useEffect(() => {
    if (canRefetch) return
    let timer = COUNT_TIME,
      minutes,
      seconds
    const interval = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10)
      seconds = parseInt((timer % 60).toString(), 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      const display = minutes + ':' + seconds
      setTimerString(display)

      if (--timer < 0) {
        timer = COUNT_TIME
        clearInterval(interval)
        setCanRefetch(true)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [canRefetch])

  const reSendOtp = async () => {
    const resendData = {
      mobile: mobileNum,
    }
    const result = await getOtpcode(resendData)
    if (result.statusCode === 200) {
      setStep(2)
    } else {
      WarningAlert(result.status)
    }
  }

  const fetchData = async () => {
    const mobileVal = {
      mobile: mobileNum,
      code: otp,
    }
    const result = await checkOtpCode(mobileVal)
    if (result.statusCode === 200) {
      setBookingData(result.appointments)
      setStep(3)
    } else {
      WarningAlert(result.status)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (otp.length === 4) {
      fetchData()
    } else {
      WarningAlert('step2 Failed')
    }
  }
  return (
    <div className='my-10'>
      <form className='form' onSubmit={onSubmit} noValidate>
        {' '}
        <label className='form-label mb-5 '>
          <span className='fw-bold'>"{mobileNum}"</span> дугаарт илгээсэн кодыг оруулна уу
        </label>
        <OtpInputWithValidation numberOfDigits={4} setOtp={setOtp} />
        <div
          className='mt-4 d-flex align-items-center justify-content-center gap-3'
          style={{color: '#999'}}
        >
          <button
            type='button'
            disabled={!canRefetch}
            onClick={() => {
              setCanRefetch(false)
              reSendOtp()
            }}
            style={{
              border: 'none',
              backgroundColor: 'white',
              color: canRefetch ? 'teal' : '#999',
            }}
          >
            Дахин код авах{' '}
          </button>
          <span>{timerString}</span>
        </div>
        <button onClick={() => setStep(1)} type='button' className='btn btn-secondary mt-14 mx-2'>
          Буцах
        </button>
        <button type='submit' className='btn btn-primary mt-14 mx-2'>
          Үргэлжлүүлэх
        </button>
      </form>
    </div>
  )
}

export default ModalStep2
