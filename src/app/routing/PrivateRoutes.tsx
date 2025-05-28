import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {ReportPage} from '../pages/report/ReportPage'
import {SmsPage} from '../pages/sms-history/SmsPage'
import {SettingsRouter} from '../modules/settings/SettingsPage'
import {BookingSettingsWrapper} from '../modules/online-booking-settings/BookingSettingsPage'
import BranchPage from '../modules/branch/BranchPage'
import BankAccountPage from '../modules/bank-account/BankAccountPage'
import {DetailPage} from '../pages/detailTable/DetailPage'
import axios from 'axios'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import MembershipTypesPage from '../modules/promote/membership-type/MembershipTypesPage'

window.Pusher = Pusher
window.Echo = new Echo({
  authorizer: (channel: any, options: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios
          .post(process.env.REACT_APP_API_URL + '/socket/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(null, response.data)
          })
          .catch((error) => {
            callback(error)
          })
      },
    }
  },
  broadcaster: 'pusher',
  key: process.env.REACT_APP_SOCKET_KEY,
  cluster: 'mt1',
  wsHost: 'socket.xolbooc.com',
  wsPort: 80,
  wssPort: 443,
  forceTLS: true,
  disableStatus: true,
})

const PrivateRoutes = () => {
  const CalendarPage = lazy(() => import('../modules/full-calendar/CalendarPage'))
  const UserPage = lazy(() => import('../modules/user-management/UsersPage'))
  const CustomerPage = lazy(() => import('../modules/customer-management/CustomersPage'))
  const ServicePage = lazy(() => import('../modules/service-management/ServicesPage'))
  const ServiceMethodPage = lazy(() => import('../modules/service-method/ServiceMethodPage'))
  const ResourcePage = lazy(() => import('../modules/resources/ResourcesPage'))
  const DiscountPage = lazy(() => import('../modules/promote/discount/DiscountsPage'))
  const CouponPage = lazy(() => import('../modules/promote/coupon/CouponsPage'))


  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/calendar/index' />} />
        <Route path='dashboard' element={<DashboardWrapper />} />

        <Route
          path='calendar/*'
          element={
            <SuspensedView>
              <CalendarPage />
            </SuspensedView>
          }
        />

        <Route
          path='customer/*'
          element={
            <SuspensedView>
              <CustomerPage />
            </SuspensedView>
          }
        />

        <Route
          path='user/*'
          element={
            <SuspensedView>
              <UserPage />
            </SuspensedView>
          }
        />

        <Route
          path='report'
          element={
            <SuspensedView>
              <ReportPage />
            </SuspensedView>
          }
        />

        <Route
          path='service/*'
          element={
            <SuspensedView>
              <ServicePage />
            </SuspensedView>
          }
        />

        <Route
          path='service_method/*'
          element={
            <SuspensedView>
              <ServiceMethodPage />
            </SuspensedView>
          }
        />

        <Route
          path='resource/*'
          element={
            <SuspensedView>
              <ResourcePage />
            </SuspensedView>
          }
        />

        <Route
          path='/promote/discount/*'
          element={
            <SuspensedView>
              <DiscountPage />
            </SuspensedView>
          }
        />

        <Route
          path='/promote/coupon/*'
          element={
            <SuspensedView>
              <CouponPage />
            </SuspensedView>
          }
        />

        <Route
          path='/promote/membership/*'
          element={
            <SuspensedView>
              <MembershipTypesPage />
            </SuspensedView>
          }
        />

        <Route
          path='branch/*'
          element={
            <SuspensedView>
              <BranchPage />
            </SuspensedView>
          }
        />

        <Route
          path='settings/*'
          element={
            <SuspensedView>
              <SettingsRouter />
            </SuspensedView>
          }
        />

        <Route
          path='settings/online-booking'
          element={
            <SuspensedView>
              <BookingSettingsWrapper />
            </SuspensedView>
          }
        />

        <Route
          path='bank_account/*'
          element={
            <SuspensedView>
              <BankAccountPage />
            </SuspensedView>
          }
        />

        <Route
          path='detail_table/*'
          element={
            <SuspensedView>
              <DetailPage />
            </SuspensedView>
          }
        />

        <Route
          path='sms_history/*'
          element={
            <SuspensedView>
              <SmsPage />
            </SuspensedView>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
