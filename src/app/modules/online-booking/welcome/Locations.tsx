import {useNavigate} from 'react-router-dom'
import {useCalendarData} from '../core/CalendarDataProvider'
import {useCalendarItem} from '../core/CalendarItemProvider'
import {Branch} from '../core/_models'
import {useAuth} from '../../auth'

function getBusinessDaysName(days: string) {
  const daysArray = []
  if (days.includes('1') === true) daysArray.push('Даваа')
  if (days.includes('2') === true) daysArray.push('Мягмар')
  if (days.includes('3') === true) daysArray.push('Лхагва')
  if (days.includes('4') === true) daysArray.push('Пүрэв')
  if (days.includes('5') === true) daysArray.push('Баасан')
  if (days.includes('6') === true) daysArray.push('Бямба')
  if (days.includes('0') === true) daysArray.push('Ням')
  return daysArray
}

export function Locations() {
  const navigate = useNavigate()
  const {settings} = useAuth()
  const {branches} = useCalendarData()
  const {itemDatas, setItemDatas} = useCalendarItem()

  const handleSelectBranch = (branchId: number) => {
    setItemDatas({...itemDatas, branch: branches.find((branch) => branch.id === branchId)})
    navigate('service')
  }

  return (
    <div id='locations'>
      <h2 className='mb-4'>{settings?.has_branch ? 'Салбарууд' : 'Хаяг байршил'}</h2>
      {settings?.has_branch ? (
        <div
          className='d-grid gap-4 w-100'
          style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}
        >
          {branches.map((branch: Branch, index: number) => (
            <div
              key={branch.id}
              className='card h-100 fadeInUp mx-auto mx-md-0 w-100'
              style={{
                animationDelay: `${0.1 * index + 0.5}s`,
                maxWidth: 420,
                overflow: 'hidden',
              }}
            >
              <div
                className='card-body d-flex flex-column gap-2 position-relative'
                style={{backgroundColor: '#fff'}}
              >
                <h5 className='card-title'>
                  <i className='text-dark bi bi-building me-2'></i>
                  {branch.name}
                </h5>
                {branch.address && <p style={{color: '#888', fontSize: 12}}>{branch.address}</p>}
                <div className='d-flex gap-2 align-items-center'>
                  <p style={{fontSize: 14}}>
                    <i className='text-dark bi bi-clock me-2'></i>
                    {branch?.start_time} - {branch?.end_time}
                  </p>
                  {branch?.business_days && (
                    <p style={{fontSize: 12, color: '#999'}}>
                      {getBusinessDaysName(branch?.business_days).map((day) => day.slice(0, 2)) +
                        ','}
                    </p>
                  )}
                </div>
                {branch.phone && (
                  <p style={{fontSize: 14}}>
                    <i className='text-dark bi bi-telephone me-2'></i>
                    {branch.phone}
                  </p>
                )}

                <div
                  className='position-absolute'
                  style={{width: 'fit-content', right: 20, bottom: 14}}
                >
                  <button
                    className='btn btn-dark btn-sm fw-bold py-2'
                    onClick={() => handleSelectBranch(branch?.id ?? 0)}
                  >
                    Цаг авах
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='card h-100 fadeInUp'>
          <div className='card-body d-flex flex-column gap-2 position-relative'>
            {settings?.address && (
              <p
                style={{
                  fontSize: 14,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <i className='text-dark bi bi-geo-alt me-2'></i>
                {settings?.address}
              </p>
            )}
            <div className='d-flex gap-2 align-items-center'>
              <p style={{fontSize: 14}}>
                <i className='text-dark bi bi-clock me-2'></i>
                {settings?.start_time} - {settings?.end_time}
              </p>
              {settings?.business_days && (
                <p style={{fontSize: 12, color: '#999'}}>
                  {getBusinessDaysName(settings?.business_days).map((day) => day.slice(0, 2)) + ','}
                </p>
              )}
            </div>
            {settings?.phone && (
              <p style={{fontSize: 14}}>
                <i className='text-dark bi bi-telephone me-2'></i>
                {settings?.phone}
              </p>
            )}
            <div
              className='position-absolute'
              style={{width: 'fit-content', right: 20, bottom: 20}}
            >
              <button
                className='btn btn-dark btn-sm fw-bold py-2'
                onClick={() => handleSelectBranch(settings?.id ?? 0)}
              >
                Цаг авах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
