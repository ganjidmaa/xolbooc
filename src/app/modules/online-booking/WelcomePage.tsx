import {FC} from 'react'
import {Header} from './welcome/Header'
import {Hero} from './welcome/Hero'
import {Services} from './welcome/Services'
import {Locations} from './welcome/Locations'
import {Reviews} from './welcome/Reviews'
import {Footer} from './welcome/Footer'

export const WelcomePage: FC = () => {
  return (
    <div className='welcome'>
      <Header />
      <div className='welcome-body default-width'>
        <Hero />
        <Services />
        <Locations />
        <Reviews />
      </div>
      <Footer />
    </div>
  )
}
