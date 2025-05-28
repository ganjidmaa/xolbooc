import { Link } from 'react-router-dom'
import { useAccountDetail } from '../../core/AccountDetailProvider'

export function Overview() {
  const {response: user} = useAccountDetail()

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Хэрэглэгчийн мэдээлэл</h3>
          </div>

          <Link to='/user/list/account/auth_settings' className='btn btn-primary align-self-center'>
            Засах
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Овог нэр</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{user?.lastname } {user?.firstname}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Регистр</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user?.registerno}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Имэйл</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user?.email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Утас
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bold fs-6 me-2'>{user?.phone} {user?.phone2}</span>

              {/* <span className='badge badge-success'>Баталгаажсан</span> */}
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Хаяг
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{user?.address}</span>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
