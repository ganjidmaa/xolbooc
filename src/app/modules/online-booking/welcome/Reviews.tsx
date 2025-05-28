import {Comment} from '../core/_models'
import {useCalendarData} from '../core/CalendarDataProvider'

const renderStars = (rating: number) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`bi ${index < rating ? 'bi-star-fill text-dark' : 'bi-star text-secondary'}`}
        ></i>
      ))}
    </div>
  )
}

export const Reviews = () => {
  const {comments} = useCalendarData()
  return (
    <div id='reviews'>
      <h2 className='mb-4'>Сэтгэгдлүүд</h2>
      <div className='d-flex gap-4' style={{flexWrap: 'wrap'}}>
        {comments?.map((review: Comment, index: number) => {
          if (index < 5)
            return (
              <div
                key={review.id}
                className='card h-100 fadeInUp mx-auto mx-md-0 w-100'
                style={{
                  animationDelay: `${0.1 * index + 1}s`,
                  maxWidth: 360,
                  backgroundColor: '#fff',
                }}
              >
                <div className='card-body'>
                  <h5 className='card-title'>
                    <i className='bi bi-person-circle me-2'></i>
                    {review.title}
                  </h5>
                  {renderStars(review.stars)}
                  <p className='card-text mt-2'>
                    <i className='bi bi-chat-left-quote me-2'></i>
                    {review.body}
                  </p>
                </div>
              </div>
            )
          else return null
        })}
      </div>
    </div>
  )
}

export default Reviews
