/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { useAccountDetail } from '../core/AccountDetailProvider'

const AccountHeader: React.FC = () => {
  const location = useLocation()
  const {response: user} = useAccountDetail()
  const [profileCompletion, setProfileCompletion] = useState(0)
  const blankImg = toAbsoluteUrl('/media/avatars/blank.svg')

  useEffect(() => {
    const totalField = 10
    var countedNum: number = 0

    const userArray = (user && Object.entries(user)) || []
    countingFields.map(fieldName => {
      var obj = userArray.filter(userDat => userDat[0] === fieldName)[0]
      obj && obj[1] && countedNum++
      return true
    })
    
    const countedPercent = countedNum * 100 / totalField
    setProfileCompletion(countedPercent)
  }, [user])

  const countingFields = ['avatar_url', 'lastname', 'firstname', 'email', 'registerno', 
    'phone', 'province_id', 'role_id', 'status', 'password']

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={user?.avatar_url ? user?.avatar_url : blankImg} alt='Metronic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {user?.lastname} {user?.firstname}
                  </a>
                  <a href='#'>
                    {user?.status === 'active' && (
                      <KTSVG
                        path='/media/icons/duotune/general/gen048.svg'
                        className='svg-icon-1 svg-icon-primary'
                      />
                    )}
                    {user?.status === 'deactive' && (
                      <KTSVG
                        path='/media/icons/duotune/general/gen050.svg'
                        className='svg-icon-1 svg-icon-danger'
                      />
                    )}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    { user?.role}
                  </a>

                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    { user?.email}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Профайл дүүргэлт</span>
                  <span className='fw-bolder fs-6'>{profileCompletion}%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: `${profileCompletion}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/user/list/account/overview' && 'active')
                }
                to='/user/list/account/overview'
              >
                Үндсэн
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/user/list/account/auth_settings' && 'active')
                }
                to='/user/list/account/auth_settings'
              >
                Тохиргоо
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export {AccountHeader}
