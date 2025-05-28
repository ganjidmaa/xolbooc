/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react'
import { Customer } from '../../core/_models'
import { ID } from '../../../../../../../_metronic/helpers'
import { SearchCustomer } from './SearchCustomer'
import { useQueryResponseData } from '../../core/QueryRequestProvider'
import { CustomerItem } from './CustomerItem'

type Props = {
  customers: Array<Customer>
  toggleCustomerModal: (selectedCustomers?: Array<ID>) => void
  selectedCustomersProp: Array<ID>
}

const CustomersModalForm: FC<Props> = ({ customers, toggleCustomerModal, selectedCustomersProp}) => {
  const filteredCustomers = useQueryResponseData(customers)
  const [selectedCustomers, setSelectedCustomers] = useState<Array<ID>>([])

  let customerDatas = customers.slice(0, 99)

  useEffect(() => {
    if(selectedCustomersProp.length > 0) {setSelectedCustomers(selectedCustomersProp)}
  }, [selectedCustomersProp])
  
  useMemo(() => { 
    customerDatas = filteredCustomers
  }, [filteredCustomers])

  const addCustomerItem = (customerId: string) => {
    setSelectedCustomers(prevState => {return [...prevState, parseInt(customerId)]})
  }

  const removeCustomerItem = (customerId: string) => {
    const customerIds = selectedCustomers.filter(selectedCustomerId => selectedCustomerId !== parseInt(customerId)) || []
    setSelectedCustomers([...customerIds])
  }

  return (
    <>
        <div className='d-flex flex-column me-n7 pe-7'>
          {customerDatas && <SearchCustomer customers={customerDatas}/>}
          {/*end::Search Input */}
          <div
            className='scroll-y me-n5 pe-5 h-350px h-lg-550px'
            id='kt_modal_select_customers_scroll'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='auto'
            data-kt-scroll-dependencies='#kt_modal_select_customers_header'
            data-kt-scroll-wrappers='#kt_content, #kt_modal_select_customers_scroll'
            data-kt-scroll-offset='300px'
          >
            {customerDatas.map((customer) => {
                const isCheckedItem = selectedCustomers.find((selectedCustomerId) => selectedCustomerId === customer.id) ? true : false
                return (
                    <CustomerItem key={customer.id} 
                        customer={customer}
                        addCustomerItem={addCustomerItem}
                        removeCustomerItem={removeCustomerItem}
                        checked={isCheckedItem}
                    /> 
                )
              })
            }

          </div>

        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => toggleCustomerModal()}
            className='btn btn-light me-3'
          >
            Болих
          </button>

          <button
            type='reset'
            className='btn btn-primary'
            onClick={() => {toggleCustomerModal(selectedCustomers)}}
            disabled={selectedCustomers.length === 0 ? true : false}
          >
            <span className='indicator-label'>Сонгох</span>
          </button>
        </div>
    </>
  )
}

export { CustomersModalForm }
