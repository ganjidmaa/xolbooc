import {FC, useEffect} from 'react'
import {HealthConditionModalHeader} from './HealthConditionModalHeader'
import {HealthConditionModalFormWrapper} from './HealthConditionModalFormWrapper'
import { ID } from '../../../../../_metronic/helpers'

type Props = {
  id: ID
  setFunction: any
}

const HealthConditionModal:FC<Props> = ({id, setFunction}) => {
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
        id='kt_modal_health_condition'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered' style={{maxWidth: 1200}}>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <HealthConditionModalHeader setFunction={setFunction} />
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <HealthConditionModalFormWrapper id={id} setFunction={setFunction} />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}

export {HealthConditionModal}
