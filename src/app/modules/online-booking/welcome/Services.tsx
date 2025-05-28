import React from 'react'
import {ServiceCard} from '../core/_models'
import {useCalendarData} from '../core/CalendarDataProvider'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {Link, useNavigate} from 'react-router-dom'
import {getBranchServices} from '../core/_requests'

export function Services() {
  const navigate = useNavigate()
  const {branches, serviceCard, setServiceCategories} = useCalendarData()
  const {itemDatas, setItemDatas} = useCalendarItem()
  const handleSelectService = async (serviceId: number, branchId: number) => {
    setItemDatas({
      ...itemDatas,
      branch: branches.find((branch) => branch.id === branchId),
      service_ids: [serviceId],
    })
    fetchServicesApi(branchId)
    navigate('service')
  }

  const fetchServicesApi = async (branchId: number) => {
    const response = await getBranchServices(branchId)
    response && setServiceCategories(response)
  }

  return (
    <div id='services'>
      <div className='d-flex mb-4 align-items-center gap-4'>
        <h2>Үйлчилгээ</h2>
        <Link to='/booking/service' className='d-flex gap-2 align-items-center'>
          <span style={{color: '#999'}}>Бүх үйлчилгээ</span>
          <i className='bi bi-arrow-right fw-bold' style={{color: '#999'}}></i>
        </Link>
      </div>
      <div
        className='d-grid gap-4 w-100'
        style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}
      >
        {serviceCard.map((service: ServiceCard, index: number) => (
          <div
            key={index}
            className='card h-100 fadeInUp mx-auto mx-md-0 w-100'
            style={{animationDelay: `${0.1 * index}s`, maxWidth: 420}}
          >
            <div className='card-body d-flex flex-column gap-2 position-relative'>
              <h3
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {service.name || 'Үйлчилгээний нэр'}
              </h3>
              <h6 className='card-subtitle mb-2 text-muted'> {service.duration || '0'} мин</h6>
              <div className='mb-2'>
                {service?.branch_names?.map((branch, index) => (
                  <span
                    key={index}
                    className='badge me-1 py-1 px-2'
                    style={{backgroundColor: '#eee', color: '#444'}}
                  >
                    {branch.name}
                  </span>
                ))}
              </div>
              <h4 className='card-text'>
                <strong>Үнэ:</strong>{' '}
                {service.price
                  ? `${Number(service.price).toLocaleString('en').replace(/,/g, "'")}`
                  : '0'}{' '}
                ₮
              </h4>

              <div
                className='position-absolute'
                style={{width: 'fit-content', right: 20, bottom: 20}}
              >
                <button
                  className='btn btn-dark btn-sm fw-bold'
                  onClick={() =>
                    handleSelectService(service?.id ?? 0, service?.branch_names?.[0]?.id ?? 0)
                  }
                >
                  Цаг авах
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
