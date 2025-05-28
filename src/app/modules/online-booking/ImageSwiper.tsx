import {useCalendarData} from './core/CalendarDataProvider'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function ImageSwiper() {
  const {onlineBookingSettings} = useCalendarData()
  return (
    <Carousel
      autoPlay
      key={onlineBookingSettings?.image_url?.join(',')}
      infiniteLoop
      interval={4000}
      transitionTime={600} // Animation duration (1 second)
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      dynamicHeight={true}
    >
      {onlineBookingSettings?.image_url?.map((image, index) => (
        <div key={index}>
          <img src={image} alt='image' className='welcome-img' />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageSwiper
