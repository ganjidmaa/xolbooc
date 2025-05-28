import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {MembershipTypesList} from './membership-types-list/MembershipTypesList'
import {MembershipTypesWrapper} from './MembershipTypesWrapper'
import MembershipsPage from '../membership/MembershipsPage'
import {MembershipNavigation} from '../membership/MembershipNavigation'
import {MEMBERSHIP_ROUTES, MEMBERSHIP_PATHS} from '../membership/constants'

const MembershipTabs = () => (
  <div className='d-flex flex-column flex-xl-row'>
    <div className='flex-lg-row-fluid ms-lg-15'>
      <MembershipNavigation />
      <Outlet />
    </div>
  </div>
)

const MembershipTypesPage = () => {
  const membershipsBreadcrumbs: Array<PageLink> = [
    {
      title: 'Урамшуулал',
      path: MEMBERSHIP_ROUTES.TYPE_LIST,
      isSeparator: false,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route element={<MembershipTabs />}>
        <Route element={<MembershipTypesWrapper />}>
          <Route
            path={MEMBERSHIP_PATHS.TYPE_LIST}
            element={
              <>
                <PageTitle breadcrumbs={membershipsBreadcrumbs}>Гишүүнчлэл</PageTitle>
                <MembershipTypesList />
              </>
            }
          />
        </Route>
        <Route
            path={MEMBERSHIP_PATHS.MEMBER_LIST}
            element={
              <>
                <PageTitle breadcrumbs={membershipsBreadcrumbs}>Гишүүд холбох</PageTitle>
                <MembershipsPage />
              </>
            }
          />
      </Route>
      <Route index element={<Navigate to={MEMBERSHIP_PATHS.TYPE_LIST} />} />
      <Route element={<Navigate to={MEMBERSHIP_PATHS.MEMBER_LIST} />} />
    </Routes>
  )
}

export default MembershipTypesPage