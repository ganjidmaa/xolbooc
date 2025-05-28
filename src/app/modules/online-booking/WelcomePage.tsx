import {FC, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../auth'
import {useCalendarData} from './core/CalendarDataProvider'
import ImageSwiper from './ImageSwiper'

export const WelcomePage: FC = () => {
  const {onlineBookingSettings, branches} = useCalendarData()
  const {settings, loading} = useAuth()
  const currentYear = new Date().getFullYear()
  const weekDays = [
    {
      name: 'Даваа',
      value: '1',
    },
    {
      name: 'Мягмар',
      value: '2',
    },
    {
      name: 'Лхагва',
      value: '3',
    },
    {
      name: 'Пүрэв',
      value: '4',
    },
    {
      name: 'Баасан',
      value: '5',
    },
    {
      name: 'Бямба',
      value: '6',
    },
    {
      name: 'Ням',
      value: '0',
    },
  ]
  const JumpToWeb = () => {
    window.open('http://xolbooc.com/')
  }
  var businesDaysNames = ''
  if (!loading) {
    var businesDays = settings?.business_days as string
    for (let i = 0; i < businesDays.length; i++) {
      for (let k = 0; k < 7; k++) {
        if (weekDays[k].value == businesDays[i]) {
          businesDaysNames = businesDaysNames + weekDays[k].name + ', '
        }
      }
    }
  }

  return (
    <div className='d-flex flex-column flex-root body-div'>
      <div className='header-div' onClick={JumpToWeb}>
        <div className='header_inside'>
          <div className='logo_wrapper'>
            <h3>ХОЛБООС</h3>
          </div>
          <span>Эрүүл мэнд - Эрхэм баян</span>
        </div>
      </div>
      <div id='mainContainer'>
        <div className='company_title'>
          <span id='company_name'>{settings?.company_name}</span>

          <Link
            to='/booking/service'
            className='welcome-booking-btn btn btn-primary mb-xl-0 welcome-btn-color'
            id='btn1'
          >
            Цаг авах
          </Link>
        </div>
        <div className='d-flex flex-column flex-md-row mb-6 gap-6'>
          <div className='welcome-swiper-container'>
            <ImageSwiper />
          </div>
          <div className='wrapper2'>
            <div id='branches-wrapper'>
              <img src={settings?.logo_url} alt='logo' className='logo_img' />
              {!settings?.has_branch && (
                <div className='branch'>
                  {/* <div className='mini' id='branchName'>
                    <span>{settings?.company_name}</span>
                  </div> */}
                  <div className='mini'>
                    <i className='bi bi-clock'></i>
                    <span id='time'>
                      Цагийн хуваарь: {settings?.start_time}-{settings?.end_time}
                    </span>
                  </div>
                  <div className='mini'>
                    <i className='bi bi-calendar-day'></i>
                    <span>Ажлын өдрүүд: {businesDaysNames}</span>
                  </div>
                  <div className='mini'>
                    <i className='bi bi-telephone'></i>
                    <a href={`tel:${settings?.phone}`} id='phone'>
                      Утас: {settings?.phone}
                    </a>
                  </div>

                  <div className='mini'>
                    <i className='bi bi-geo-alt'></i>
                    <span>Хаяг: {settings?.address}</span>
                  </div>
                </div>
              )}
              {settings?.has_branch &&
                branches.map((branch) => (
                  <div className='branch'>
                    <div className='mini' id='branchName'>
                      <span>{branch?.name}</span>
                    </div>
                    <div className='mini'>
                      <i className='fas fa-clock'> </i>
                      <span id='time'>
                        Цагийн хуваарь: {branch?.start_time}-{branch?.end_time}
                      </span>
                    </div>
                    <div className='mini'>
                      <i className='fas fa-phone'></i>
                      <a href='tel:{{$branch->tel_no}}' id='phone'>
                        Утас: {branch?.phone}
                      </a>
                    </div>
                    <div className='mini'>
                      <i className='fas fa-map-marked'></i>
                      <span id='location'>Хаяг: {branch?.address}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='wrapper1'>
            <h1 id='about_us_title'>Бидний тухай:</h1>
            <span id='about_us'>{onlineBookingSettings.about}</span>
          </div>
        </div>
      </div>
      <div></div>
      <div className='footer-div' onClick={JumpToWeb}>
        <div className='footer_inside-div'>
          <span id='about'>
            Холбоос эмнэлгийн цогц системийг ЮБИСОЛ ХХК нь 2021 оноос хойш хөгжүүлж байна.
          </span>
          <span id='copyRight'>Xolbooc © 2021-{currentYear} ЮБИСОЛ</span>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className='d-flex flex-column flex-root welcome'>
  //     <div className='d-flex flex-column flex-md-row flex-lg-row welcome-top'>
  //       <div
  //         className='d-lg-flex flex-lg-row-fluid bgi-size-cover bgi-no-repeat welcome-img'
  //         style={{
  //           backgroundImage: `url("${onlineBookingSettings.image_url}")`,
  //         }}
  //       ></div>

  //       <div className='d-flex flex-column w-lg-80 p-lg-13 px-18 py-8' style={{justifyContent: 'center'}}>
  //         <div><img style={{height: 200, width: 200}} src={settings?.logo_url} alt="" /></div>
  //         <div className='fs-2x fw-bolder text-gray-800'>{settings?.company_name}</div>
  //         <div className='fs-3 mt-2 mb-xl-18 mb-5'>
  //           <i className='fa fa-solid fa-location-dot text-primary fs-3'></i>
  //           {' '}{settings?.address}
  //         </div>
  //         <Link to='/booking/service' className='welcome-booking-btn btn btn-primary mb-xl-0 mb-12'>
  //           Захиалга өгөх
  //         </Link>
  //       </div>

  //       {/* ============= WAVE ============ */}
  //       <div className='wave'>
  //         <div className='box'></div>
  //         <div className='box'></div>
  //       </div>
  //     </div>

  //     <div className='d-md-flex welcome-about'>
  //       <div className='d-flex flex-lg-row py-10 py-md-20 px-xl-20'>
  //         <div className='w-lg-600px w-100 px-15'>
  //           <div className='d-inline-block'>
  //             <div className='welcome-about-us fw-bolder text-gray-800'>Бидний тухай</div>
  //             <div className='separator mx-1 mb-4 mt-1 border-primary '></div>
  //           </div>
  //           <div className='welcome-about-us-content'>
  //             {onlineBookingSettings.about}
  //           </div>

  //           <div className='fs-4 mt-10 text-gray-800'>
  //             <i className='fa fa-solid fa-clock text-primary fs-4'></i>
  //             <span className='fw-bold'>{' Цагийн хуваарь'}</span>

  //             <div className='welcome-about-us-content'>
  //                 Ажлын өдрүүд: {settings?.start_time} - {settings?.end_time} <br />
  //                 {/* Бямба, Ням: амарна */}
  //             </div>
  //           </div>

  //           <div className='fs-4 mt-5 text-gray-800'>

  //             <div className='welcome-about-us-content text-primary fs-5'>
  //                 {settings?.email &&
  //                   <div className='pb-1'>
  //                     <i className='fa fa-solid fa-envelope fs-5 pe-2 text-primary'></i>
  //                     <a href={'mailto:'+settings.email} className='text-primary'>
  //                       {settings.email}</a>
  //                   </div>
  //                 }

  //                 {settings?.phone &&
  //                   <div className='pb-1'>
  //                     <i className='fa fa-solid fa-phone fs-5 pe-2 text-primary'></i>
  //                     <span>{settings.phone}</span>
  //                   </div>
  //                 }
  //                 <div className='pb-1'>
  //                   <i className='fa fa-solid fa-globe fs-5 pe-2 text-primary'></i>
  //                   <a href='http://xolbooc.com' rel='nofollow' className='text-primary'> {' Холбоос'}</a>
  //                 </div>

  //                 {(settings?.fb_url || settings?.insta_url) &&
  //                 <div className='d-flex fb-1'>
  //                   <i className='fa fa-solid fa-share-alt fs-4 pe-2 text-primary pt-1'></i>
  //                   <div>
  //                     {settings?.fb_url &&
  //                       <Link
  //                         title='Go to facebook account. Open in new window'
  //                         to={settings.fb_url}
  //                         target='_blank'
  //                         className='fb'
  //                       >
  //                         <KTSVG
  //                           path='/media/icons/duotune/social/soc004.svg'
  //                           className='svg-icon-2 svg-icon-primary'
  //                         />
  //                       </Link>
  //                     }
  //                     {settings?.insta_url &&
  //                       <Link
  //                         title='Go to instagram account. Open in new window'
  //                         to='https://www.facebook.com/profile.php?id=100087372374741'
  //                         target='_blank'
  //                         className='ig'
  //                       >
  //                         <KTSVG
  //                           path='/media/icons/duotune/social/soc005.svg'
  //                           className='svg-icon-2 svg-icon-primary'
  //                         />
  //                       </Link>
  //                     }
  //                   </div>
  //                 </div>
  //                 }
  //             </div>
  //           </div>

  //         </div>
  //       </div>

  //       <div className='bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat welcome-company-img'
  //         style={{
  //           backgroundImage: `url("${'/media/mainImg.webp'}")`,
  //         }}
  //       >
  //       </div>
  //     </div>
  //     {/* =================================================== */}

  //   </div>
  // )
}
