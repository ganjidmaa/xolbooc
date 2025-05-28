import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import ModalStep1 from './dismissBooking/ModalStep1'
import ModalStep2 from './dismissBooking/ModalStep2'
import ModalStep3 from './dismissBooking/ModalStep3'

const DismissBookingModalBody = ({
  step,
  setStep,
}: {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}) => {
  const [mobileNum, setMobileNum] = useState('')
  const [otp, setOtp] = useState('')
  const [bookingData, setBookingData] = useState()

  useEffect(() => {
    if (mobileNum === '') return
    setOtp('')
  }, [mobileNum])

  return (
    <div className='text-center'>
      {step === 1 ? (
        <ModalStep1 setStep={setStep} mobileNum={mobileNum} setMobileNum={setMobileNum} />
      ) : step === 2 ? (
        <ModalStep2
          setStep={setStep}
          mobileNum={mobileNum}
          otp={otp}
          setOtp={setOtp}
          setBookingData={setBookingData}
        />
      ) : (
        <ModalStep3
          setStep={setStep}
          bookingData={bookingData}
          mobileNum={mobileNum}
          otp={otp}
          setBookingData={setBookingData}
        />
      )}
    </div>
  )
}

export default DismissBookingModalBody
