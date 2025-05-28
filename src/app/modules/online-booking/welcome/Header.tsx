import {useState} from 'react'
import {useAuth} from '../../auth'
import {Image} from 'react-bootstrap'

export const Header = () => {
  const {settings} = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
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

  return (
    <div>
      {mobileOpen && (
        <div
          style={{position: 'fixed', inset: 0, zIndex: 100, background: '#0004'}}
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      <nav
        className='shadow-sm'
        style={{
          position: 'relative',
          left: 0,
          right: 0,
          zIndex: 110,
          background: '#f8f8f8',
        }}
      >
        <div className='default-width'>
          <div className='d-flex align-items-center justify-content-between py-6'>
            <div className='d-flex align-items-center gap-2'>
              <Image
                src={settings?.logo_url}
                alt='logo'
                style={{
                  maxWidth: 80,
                  height: 30,
                  width: 'auto',
                }}
              ></Image>
              <a className='fw-bold text-dark fs-2' href='#'>
                {settings?.company_name}
              </a>
            </div>
            <div className='d-none d-md-flex gap-6'>
              <div className=''>
                <a
                  className='text-dark'
                  href='#home'
                  onClick={(e) => handleSmoothScroll(e, 'home')}
                >
                  Эхлэл
                </a>
              </div>
              <div className=''>
                <a
                  className='text-dark'
                  href='#services'
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                >
                  Үйлчилгээ
                </a>
              </div>
              <div className=''>
                <a
                  className='text-dark'
                  href='#locations'
                  onClick={(e) => handleSmoothScroll(e, 'locations')}
                >
                  Байршил
                </a>
              </div>
              <div className=''>
                <a
                  className='text-dark'
                  href='#reviews'
                  onClick={(e) => handleSmoothScroll(e, 'reviews')}
                >
                  Сэтгэгдлүүд
                </a>
              </div>
            </div>
            <div className='d-block d-md-none' onClick={() => setMobileOpen(!mobileOpen)}>
              <i className='bi bi-list text-dark fs-1'></i>
            </div>
          </div>
          <div className={mobileOpen ? 'fadeInWel' : 'fadeOutWel'}>
            <div style={{overflow: 'hidden'}}>
              <div className='d-grid d-md-none gap-4 pb-6'>
                <div className=''>
                  <a
                    className='text-dark'
                    href='#home'
                    onClick={(e) => handleSmoothScroll(e, 'home')}
                  >
                    Эхлэл
                  </a>
                </div>
                <div className=''>
                  <a
                    className='text-dark'
                    href='#services'
                    onClick={(e) => handleSmoothScroll(e, 'services')}
                  >
                    Үйлчилгээ
                  </a>
                </div>
                <div className=''>
                  <a
                    className='text-dark'
                    href='#locations'
                    onClick={(e) => handleSmoothScroll(e, 'locations')}
                  >
                    Байршил
                  </a>
                </div>
                <div className=''>
                  <a
                    className='text-dark'
                    href='#reviews'
                    onClick={(e) => handleSmoothScroll(e, 'reviews')}
                  >
                    Сэтгэгдлүүд
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
