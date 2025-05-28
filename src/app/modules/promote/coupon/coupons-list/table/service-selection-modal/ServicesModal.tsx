import {FC, useEffect} from 'react'
import { SelectedService } from '../../core/_models'
import { ServiceModalFormWrapper } from './ServiceModalFormWrapper'
import { ServiceModalHeader } from './ServiceModalHeader'

type Props = {
  toggleServiceModal: () => void
  allService: boolean
  selectedServices: Array<SelectedService>
}

const ServicesModal:FC<Props> = ({toggleServiceModal, allService, selectedServices}) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_discount'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <ServiceModalHeader toggleServiceModal={toggleServiceModal}/>
            <div className='modal-body scroll-y mx-5 mx-xl-15 mb-7'>
              <ServiceModalFormWrapper toggleServiceModal={toggleServiceModal} allService={allService} selectedServices={selectedServices}/>
            </div>
          </div>
        </div>

      </div>
      
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {ServicesModal}
