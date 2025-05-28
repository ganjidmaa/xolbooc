/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react'
import { SelectedService, Service, ServiceCategory } from '../../core/_models'
import { ID, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { ServiceItem } from './ServiceItem'
import { SearchService } from './SearchService'
import { useQueryRequest, useQueryResponseData } from '../../core/QueryRequestProvider'

type Props = {
  services: Array<Service>
  serviceCategories: Array<ServiceCategory>
  toggleServiceModal: (selectedServices?: Array<SelectedService>, allServiceChecked?: boolean, numberOfServices?: number) => void
  selectedServices: Array<SelectedService>
  allService: boolean
}

const ServiceModalForm: FC<Props> = ({ services, serviceCategories, toggleServiceModal, allService, selectedServices}) => {
  const filteredData = useQueryResponseData(services)
  const {state} = useQueryRequest()
  const [allServiceChecked, setAllServiceChecked] = useState(allService)
  const [allServiceData, setAllServiceData] = useState<Array<SelectedService>>([])

  let computedServiceCategories = serviceCategories
  let computedServices = services

  useEffect(() => {
    toggleMainInput(allServiceChecked)
  }, [])

  useEffect(() => {
    if(selectedServices.length > 0) {setAllServiceData(selectedServices)}
  }, [selectedServices])

  useEffect(() => {
    let countTotalServices = 0
    allServiceData.map(data => countTotalServices+= data.service_ids.length)

    if(services.length === countTotalServices) 
      setAllServiceChecked(true)
    else 
      setAllServiceChecked(false)
  }, [allServiceData])

  
  useMemo(() => { 
    const updatedCategories = serviceCategories.filter(category => {
        const hasCategory = filteredData.filter(service => {return category?.id === service?.category_id})
        const hasCategoryId = hasCategory.length > 0 ? true : false
      return hasCategoryId
    })

    computedServiceCategories = updatedCategories
    computedServices = filteredData
  }, [filteredData])

  const toggleMainInput = (checkedValue: boolean) => {
    if(checkedValue) {
      let datas:Array<SelectedService> = []
      
      serviceCategories.map((category) => {
        let service_ids:Array<ID> = []
        const filteredServices = services.filter(service => service.category_id === category.id)
        filteredServices.map(service => service_ids.push(service.id))
        datas.push({'category_id': category.id, 'group_selection': true, 'service_ids': service_ids})
        return true
      })

      setAllServiceData(datas)
    }
    else {
      setAllServiceData([])
    }
  }

  const addServiceGroupItem = (categoryId: string) => {
    let service_ids:Array<ID> = []
    let newDatas = allServiceData
    newDatas = newDatas.filter(data => data.category_id !== parseInt(categoryId))

    const filteredServices = services.filter(service => service.category_id === parseInt(categoryId))
    filteredServices.map(service => service_ids.push(service.id))
    const serviceItemData = {'category_id': parseInt(categoryId), 'group_selection': true, 'service_ids': service_ids}
    setAllServiceData([...newDatas, serviceItemData])
  }

  const removeServiceGroupItem = (categoryId: string) => {
    const serviceItemData = allServiceData.filter(data => data.category_id !== parseInt(categoryId))
    setAllServiceData(serviceItemData)
  } 

  const addServiceItem = (categoryId: ID, serviceId: string) => {
    const checkedData = findServiceItemData(categoryId)
    let newDatas = allServiceData
    let serviceIds:Array<ID> = [parseInt(serviceId)]
    const filteredServices = services.filter(service => service.category_id === categoryId)

    if (checkedData) {
      serviceIds = [...checkedData.service_ids, parseInt(serviceId)]
    }
    const groupSelection = (filteredServices.length === serviceIds.length) ? true : false
    
    newDatas = newDatas.filter(data => data.category_id !== categoryId)
    setAllServiceData([...newDatas, {'category_id': categoryId, 'group_selection': groupSelection, 'service_ids': serviceIds}])
  }

  const removeServiceItem = (categoryId: ID, serviceId: string) => {
    const checkedData = findServiceItemData(categoryId)
    let newDatas = allServiceData
    const serviceIds = checkedData?.service_ids.filter(service_id => service_id !== parseInt(serviceId)) || []
    newDatas = newDatas.filter(data => data.category_id !== categoryId)
    if(serviceIds.length > 0) {
      setAllServiceData([...newDatas, {'category_id': categoryId, 'group_selection': false, 'service_ids': serviceIds}])
    }
    else {
      setAllServiceData([...newDatas])
    }
  }

  const findServiceItemData = (categoryId: ID) => {
    const serviceItemData = allServiceData.filter(data => data.category_id === categoryId)
    return serviceItemData.length > 0 ? serviceItemData[0] : undefined
  }

  return (
    <>
      <form id='kt_modal_select_services_form' className='form' noValidate>

        <div className='d-flex flex-column me-n7 pe-7'>

          {services && <SearchService services={services}/>}
          {/*end::Search Input */}
          <div
            className='scroll-y me-n5 pe-5 h-350px h-lg-550px'
            id='kt_modal_select_services_scroll'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='auto'
            data-kt-scroll-dependencies='#kt_modal_select_services_header'
            data-kt-scroll-wrappers='#kt_content, #kt_modal_select_services_scroll'
            data-kt-scroll-offset='300px'
          >
            <div className="menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary">
              <div className="menu-item" hidden={isNotEmpty(state.search) ? true : false}>
                <div className='d-flex flex-stack py-3 menu-link'>
                  <div className='d-flex align-items-center'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input 
                        className='form-check-input'
                        type='checkbox'
                        checked={allServiceChecked}
                        onChange={(val) => toggleMainInput(val.target.checked)}
                      />
                    </div>
                    <div className='ms-5'>
                      <div className='fs-5 fw-bolder text-hover-primary text-gray-800'>
                        Бүх үйлчилгээ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {computedServiceCategories.map((serviceCategory) => {
              const filteredServices = computedServices.filter(service => service.category_id === serviceCategory.id)
              const serviceItemData = findServiceItemData(serviceCategory.id)
              return (
                  <ServiceItem key={serviceCategory.id} 
                      serviceCategory={serviceCategory} 
                      services={filteredServices} 
                      allServiceChecked={allServiceChecked} 
                      serviceItemProp={serviceItemData}
                      removeServiceGroupItem={removeServiceGroupItem}
                      addServiceGroupItem={addServiceGroupItem}
                      addServiceItem={addServiceItem}
                      removeServiceItem={removeServiceItem}
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
            onClick={() => toggleServiceModal()}
            className='btn btn-light me-3'
          >
            Болих
          </button>

          <button
            className='btn btn-primary'
            onClick={() => {
              let numberOfServices = 0
              allServiceData.map(data => numberOfServices+= data.service_ids.length)
              toggleServiceModal(allServiceData, allServiceChecked, numberOfServices)}
            }
            disabled={allServiceData.length === 0 ? true : false}
          >
            <span className='indicator-label'>Сонгох</span>
          </button>
        </div>

      </form>
    </>
  )
}

export { ServiceModalForm }
