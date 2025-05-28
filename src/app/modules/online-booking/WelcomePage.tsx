import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import {useAuth} from '../auth'
import {useCalendarData} from './core/CalendarDataProvider'
import DismissBookingModalBody from './DismissBookingModalBody'

export const WelcomePage: FC = () => {
  const {onlineBookingSettings, branches} = useCalendarData()
  const [step, setStep] = useState(1)
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
          <div className='d-flex gap-4'>
            <Link
              to='/booking/service'
              className='px-2 py-sm-2 py-lg-4 bg-primary text-white rounded-4 mb-xl-0 fs-5 text-center'
              style={{
                lineHeight: 1.2,
                flex: 1,
                display: 'grid',
                placeContent: 'center',
                width: 148,
                maxWidth: '20vw',
              }}
            >
              Цаг авах
            </Link>
            <button
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_dismissBooking'
              className='px-2 py-4 bg-danger text-white rounded-4 border-0 mb-xl-0 fs-5 '
              style={{
                lineHeight: 1.2,
                flex: 1,
                display: 'grid',
                placeContent: 'center',
                width: 148,
                maxWidth: '20vw',
              }}
            >
              Цаг цуцлах
            </button>
          </div>
          <div
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            className='modal px-4'
            tabIndex={-1}
            id='kt_modal_dismissBooking'
          >
            <div className='modal-dialog modal-dialog-centered mw-600px mx-auto'>
              <div className='modal-content'>
                <div className='modal-header p-8'>
                  <h5 className='modal-title fs-2'>Онлайн цаг захиалгаа цуцлах</h5>
                  <div
                    className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    onClick={() => setStep(1)}
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr061.svg'
                      className='svg-icon svg-icon-2x'
                    />
                  </div>
                </div>
                <div className='modal-body mx-4 my-10'>
                  <DismissBookingModalBody step={step} setStep={setStep} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='topSide'>
          {/* <div className='top' style={{ backgroundImage: `url("${onlineBookingSettings.image_url}")`,}}></div> */}
          <img className='top' src={onlineBookingSettings.image_url} alt='pic' />
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
