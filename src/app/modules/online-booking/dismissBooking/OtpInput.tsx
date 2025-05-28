import React, {useRef, useEffect, useState, Dispatch, SetStateAction} from 'react'

function OtpInputWithValidation({
  numberOfDigits,
  setOtp,
}: {
  numberOfDigits: number
  setOtp: Dispatch<SetStateAction<string>>
}) {
  const [otpNumber, setOtpNumber] = useState(new Array(numberOfDigits).fill(''))
  const otpBoxReference = useRef<any>([])

  useEffect(() => {
    if (otpNumber.length < numberOfDigits) return
    let otpString = ''
    otpNumber.map((digit: string) => {
      otpString = otpString + digit
    })

    setOtp(otpString)
  }, [otpNumber])

  function handleChange(value: any, index: number) {
    let newArr = [...otpNumber]
    newArr[index] = value
    setOtpNumber(newArr)

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  function handleBackspaceAndEnter(e: any, index: number) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
    if (e.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  return (
    <div className=''>
      <div className='d-inline-flex gap-4 mx-auto'>
        {otpNumber.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className='fs-2 text-center'
            placeholder='*'
            style={{width: 40, height: 50, borderRadius: 10, border: '1px solid #d9d9d9'}}
          />
        ))}
      </div>
    </div>
  )
}

export default OtpInputWithValidation
