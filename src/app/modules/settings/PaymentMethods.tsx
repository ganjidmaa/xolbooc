/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import { ID, paymentMethodColors, paymentMethodIcons } from '../../../_metronic/helpers'
import { PaymentMethod } from './core/_models'
import clsx from 'clsx'
import { useAuth } from '../auth'

type Props = {
    updatePaymentMethods: (methods: Array<PaymentMethod>) => void
}

const PaymentMethods: React.FC<Props> = ({updatePaymentMethods}) => {
    const {paymentMethods} = useAuth()
    const [paymentMethodsState, setPaymentMethodsState] = useState<Array<PaymentMethod>>([])
    const details = [
        {text: 'Нэг удаагийн хөнгөлөлтийн бичиг', method: 'coupon'},
        {text: 'Гэр бүлийн, албан газрын г.м гишүүнчлэл', method: 'membership'},
        {text: 'Гараас хөнгөлөлт оруулах', method: 'discount'},
    ]

    useEffect(() => {
        paymentMethods && setPaymentMethodsState(paymentMethods)
    }, [paymentMethods])

    const handleOnChange = (id: ID, checked: boolean) => {
        const updatedMethods: Array<PaymentMethod> = []
        paymentMethodsState && paymentMethodsState.map((customMethod) => {
            if(customMethod.id === id) {
                customMethod = {...customMethod, 'active': checked}
            }
            updatedMethods.push(customMethod)
            return true
        })
    
        setPaymentMethodsState(updatedMethods)
        updatePaymentMethods(updatedMethods)
    }

    return (
    <div className='card mb-5'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_connected_accounts'
        aria-expanded='true'
        aria-controls='kt_account_connected_accounts'
      >
        <div className='card-title'>
          <h3 className='fw-bolder'>Төлбөрийн хэлбэр</h3>
        </div>
      </div>

      <div id='kt_account_connected_accounts' className='collapse show'>
        <div className='card-body border-top p-9'>
            <div className='py-1'>
                {paymentMethodsState && paymentMethodsState.map((paymentMethod, index) => {
                    const isLastElement = index === paymentMethodsState.length - 1;
                    return (<div  key={index}>
                        <div className='d-flex flex-stack'>
                            <div className='d-flex'>
                                <i className={clsx('fas fa-solid fs-2 pt-2 w-30px me-4', 
                                    `${paymentMethodIcons.filter(iconM => iconM.method === paymentMethod.slug)[0]?.icon} text-${paymentMethodColors[index].color}`)} />

                                <div className='d-flex flex-column'>
                                    <span className='fs-5 text-dark fw-bolder'>
                                        {paymentMethod.name}
                                    </span>
                                    <div className='fs-6 fw-bold text-gray-400'>{details.filter(detail => detail.method === paymentMethod.slug)[0]?.text}</div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <div className='form-check form-check-solid form-switch'>
                                <input
                                    className='form-check-input w-45px h-25px'
                                    type='checkbox'
                                    name='active'
                                    onChange={() => {handleOnChange(paymentMethod.id, !paymentMethod.active)}}
                                    checked={paymentMethod.active}
                                />
                                </div>
                            </div>
                        </div>
                        {!isLastElement && <div className='separator separator-dashed mt-4 mb-2'></div>}
                    </div>)
                })}
            </div>
        </div>

      </div>
    </div>
  )
}

export {PaymentMethods}
