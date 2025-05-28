import {Link, useLocation} from 'react-router-dom'
import {MEMBERSHIP_ROUTES} from './constants'

export const MembershipNavigation = () => {
  const location = useLocation()
  
  const navItems = [
    {
      path: MEMBERSHIP_ROUTES.TYPE_LIST,
      label: 'Гишүүнчлэл',
    },
    {
      path: MEMBERSHIP_ROUTES.MEMBER_LIST,
      label: 'Гишүүд холбох',
    },
  ]

  return (
    <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-4'>
      {navItems.map((item) => (
        <li className='nav-item' key={item.path}>
          <Link
            className={`nav-link text-active-primary me-6 ${
              location.pathname === item.path ? 'active' : ''
            }`}
            to={item.path}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
