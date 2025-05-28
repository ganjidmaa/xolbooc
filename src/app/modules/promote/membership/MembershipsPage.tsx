import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {MembershipsList} from './memberships-list/MembershipsList'
import {MembershipsWrapper} from './MembershipsWrapper'
import {MEMBERSHIP_ROUTES} from './constants'

const MembershipsPage = () => {
  const membershipsBreadcrumbs: Array<PageLink> = [
    {
      title: 'Урамшуулал',
      path: MEMBERSHIP_ROUTES.MEMBER_LIST,
      isSeparator: false,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route element={<MembershipsWrapper />}>
        <Route
          path={'/list'}
          element={
            <>
              <PageTitle breadcrumbs={membershipsBreadcrumbs}>Гишүүд холбох</PageTitle>
              <MembershipsList />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default MembershipsPage