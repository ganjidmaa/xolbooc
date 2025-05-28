/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import { CRUD_RESPONSES, ID, QUERIES } from '../../../../../_metronic/helpers'
import { updatePaymentMethods } from '../../core/_requests'
import { NotifySuccess } from '../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'
import { useQuery } from 'react-query'
import { PaymentMethod } from '../../../auth'

type Props = {
  toggleMethodSelectionModal: () => void
  methods: Array<PaymentMethod>
  refetch: () => void
}

const PaymentMethodModalForm: FC<Props> = ({toggleMethodSelectionModal, methods, refetch}) => {
  const [customMethods, setCustomMethods] = useState<Array<PaymentMethod>>(methods)
  const [enabledQuery, setEnabledQuery] = useState(false)

  const {
      isLoading,
      data,
      error,
  } = useQuery(
      `${QUERIES.PAYMENT_METHOD_LIST}-details`,
      () => {
          return updatePaymentMethods(customMethods)
      },
      {
          cacheTime: 0,
          enabled: enabledQuery,
          onError: (err: any) => {
              console.error(err)
              err.response?.status === 403 ?
                  WarningAlert(CRUD_RESPONSES.failed_authorization)
              :
                  ErrorAlert(CRUD_RESPONSES.error)
          },
          retryOnMount: false,
          retry: false,
      }
  )

  useEffect(() => {
    if(data) {
      const status = data.payload?.status

      status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      toggleMethodSelectionModal()
      refetch()
    }
  }, [data])

  const handleOnChange = (id: ID, checked: boolean) => {
    const updatedMethods: Array<PaymentMethod> = []
    customMethods.map((customMethod) => {
      if(customMethod.id === id) {
        customMethod = {...customMethod, 'active': checked}
      }
      
      updatedMethods.push(customMethod)
    })

    setCustomMethods(updatedMethods)
  }

  const cancel = () => {
    toggleMethodSelectionModal()
  }

  return (
    <>      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_method_selection_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_method_selection_header'
          data-kt-scroll-wrappers='#kt_modal_method_selection_scroll'
          data-kt-scroll-offset='300px'
        >
          {customMethods.map((method, index) => {
            return (
              <div className="mt-1 mb-2 ms-4 row" key={index}>
                  <label className='col-lg-4 fw-bold fs-6'>{method.name}</label>
                  <div className='col-lg-8 d-flex align-items-center'>
                      <div className='form-check form-check-solid form-switch fv-row'>
                          <input
                              className='form-check-input w-45px h-25px'
                              type='checkbox'
                              name='active'
                              onChange={() => {handleOnChange(method.id, !method.active)}}
                              checked={method.active}
                          />
                          <label className='form-check-label'></label>
                      </div>
                  </div>
              </div>
            )
          })}
        </div>

        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={isLoading}
          >
            Болих
          </button>

          <button
            type='button'
            onClick={() => {setEnabledQuery(true)}}
            className='btn btn-primary'
            disabled={isLoading}
          >
            <span className='indicator-label'>Хадгалах</span>
          </button>
        </div>
        
    </>
  )
}

export {PaymentMethodModalForm}
