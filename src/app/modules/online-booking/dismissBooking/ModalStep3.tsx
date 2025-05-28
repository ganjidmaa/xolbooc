import React, {Dispatch, SetStateAction, useState} from 'react'
import {WarningAlert} from '../../../../_metronic/helpers/alerts/Warning'
import {checkOtpCode, deleteBooking} from '../core/_requests'
import {InfoAlert} from '../../../../_metronic/helpers/alerts/Info'

const ModalStep3 = ({
  setStep,
  bookingData,
  mobileNum,
  otp,
  setBookingData,
}: {
  setStep: Dispatch<SetStateAction<number>>
  bookingData: any
  mobileNum: string
  otp: string
  setBookingData: Dispatch<SetStateAction<any>>
}) => {
  const handleDelete = async (app_id: number) => {
    const {value: buttonType} = await InfoAlert('Та устгахдаа итгэлтэй байна уу?', true)
    if (buttonType) {
      const delData = {
        id: app_id,
      }
      const delResult = await deleteBooking(delData)
      if (delResult.statusCode === 200) {
        const mobileVal = {
          mobile: mobileNum,
          code: otp,
        }
        const result = await checkOtpCode(mobileVal)
        if (result.statusCode === 200) {
          setBookingData(result.appointments)
        } else {
          WarningAlert(result.status)
        }
      } else {
        WarningAlert(delResult.status)
      }
    }
  }

  return (
    <div className=''>
      <h4>Таны захиалсан цаг</h4>
      <div className='d-grid gap-4 mt-4 text-start text-black'>
        {bookingData && Object.keys(bookingData).length > 0 ? (
          bookingData.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className='border border-secondary rounded-3 p-3 d-sm-flex gap-4 justify-content-between'
              >
                <div className='container' style={{lineHeight: 1.2}}>
                  <div className='row'>
                    <p className='text-primary fs-6 fs-sm-5 col-6 col-sm-4'>Овог нэр</p>
                    <p className='col-6 col-sm-8 fs-6 fs-sm-5'>{item.customer_name}</p>
                  </div>
                  <div className='row'>
                    <p className='text-primary fs-6 fs-sm-5 col-6 col-sm-4'>Утасны дугаар</p>
                    <p className='col-6 col-sm-8 fs-6 fs-sm-5'>{item.phone}</p>
                  </div>
                  <div className='row'>
                    <p className='text-primary fs-6 fs-sm-5 col-6 col-sm-4'>Огноо</p>
                    <p className='col-6 col-sm-8 fs-6 fs-sm-5'>{item.event_date}</p>
                  </div>
                  <div className='row'>
                    <p className='text-primary fs-6 fs-sm-5 col-6 col-sm-4'>Захиалсан цаг</p>
                    <p className='col-6 col-sm-8 fs-6 fs-sm-5'>
                      {item.start_date} - {item.end_date}
                    </p>
                  </div>
                  <div className='row'>
                    <p className='text-primary fs-6 fs-sm-5 col-6 col-sm-4 text-start'>
                      Захиалсан
                      <br /> үйлчилгээнүүд
                    </p>
                    <div className='col-6 col-sm-8 fs-6 fs-sm-5 d-flex gap-2 flex-wrap'>
                      {item.events &&
                        item.events.map((service: any, ind: number) => {
                          return (
                            <span
                              key={ind}
                              className='d-inline-block border border-dashed rounded-2 bg-light border-info p-1 '
                              style={{fontSize: 11, height: 'fit-content'}}
                            >
                              {service.service_name}
                            </span>
                          )
                        })}
                    </div>
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <button
                    onClick={() => handleDelete(item.appointment_id)}
                    type='button'
                    className='btn btn-danger btn-sm'
                  >
                    Цуцлах
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-center mt-10 text-danger'>
            <p>Танд идэвхтэй захиалсан цаг алга байна</p>
          </div>
        )}
      </div>
      <button
        onClick={() => setStep(1)}
        type='button'
        data-bs-dismiss='modal'
        aria-label='Close'
        className='btn btn-secondary mt-20 mx-2'
      >
        Хаах
      </button>
    </div>
  )
}

export default ModalStep3
