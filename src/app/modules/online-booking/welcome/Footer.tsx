import React from 'react'
import {useAuth} from '../../auth'
import {useCalendarData} from '../core/CalendarDataProvider'
import {Link} from 'react-router-dom'

export const Footer = () => {
  const {settings} = useAuth()
  const {onlineBookingSettings} = useCalendarData()
  const handleSmoothScroll = (e: any, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: 'smooth',
      })
    }
  }
  const JumpToWeb = () => {
    window.open('http://xolbooc.com/')
  }
  return (
    <footer>
      <div className='bg-dark text-light py-8'>
        <div className='text-center text-md-start default-width'>
          <div className='row '>
            <div className='col-md-8 mb-8 mb-md-0'>
              <h3 className='mb-2 text-light'>{settings?.company_name}</h3>
              {onlineBookingSettings.about && (
                <div
                  dangerouslySetInnerHTML={{__html: onlineBookingSettings.about}}
                  className=' mx-auto mx-md-0 text-light'
                />
              )}
            </div>
            {/* <div className='col-md-5 mb-3'>
              <ul className='list-unstyled w-75 mx-auto'>
                <li className='mb-2'>
                  <a
                    className='text-light text-decoration-none'
                    href='#home'
                    onClick={(e) => handleSmoothScroll(e, 'home')}
                  >
                    Эхлэл
                  </a>
                </li>
                <li className='mb-2'>
                  <a
                    className='text-light text-decoration-none'
                    href='#services'
                    onClick={(e) => handleSmoothScroll(e, 'services')}
                  >
                    Үйлчилгээ
                  </a>
                </li>
                <li className='mb-2'>
                  <a
                    className='text-light text-decoration-none'
                    href='#locations'
                    onClick={(e) => handleSmoothScroll(e, 'locations')}
                  >
                    Байршил
                  </a>
                </li>
                <li className='mb-2'>
                  <a
                    className='text-light text-decoration-none'
                    href='#reviews'
                    onClick={(e) => handleSmoothScroll(e, 'reviews')}
                  >
                    Сэтгэгдлүүд
                  </a>
                </li>
              </ul>
            </div> */}
            <div className='col-md-4 mb-3 d-flex'>
              <div className='mx-auto d-flex d-md-grid gap-10'>
                {settings?.fb_url && (
                  <a href={settings?.fb_url} target='_blank' rel="noopener noreferrer" className='text-light'>
                    <i className='bi bi-facebook fs-1'></i>
                  </a>
                )}
                {settings?.insta_url && (
                  <a href={settings?.insta_url} target='_blank' rel="noopener noreferrer" className='text-light'>
                    <i className='bi bi-instagram fs-1'></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-light py-4' onClick={JumpToWeb}>
        <div className='d-flex justify-content-between default-width'>
          <span className=''>
            Холбоос цаг захиалгын цогц системийг ЮБИСОЛ ХХК нь 2021 оноос хойш хөгжүүлж байна.
          </span>
          <span className='fs-6'>Xolbooc © 2021-{new Date().getFullYear()} ЮБИСОЛ</span>
        </div>
      </div>
    </footer>
  )
}
