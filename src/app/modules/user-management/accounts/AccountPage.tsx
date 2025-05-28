import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { Overview } from './components/Overview'
import { Settings } from './components/settings/Settings'
import { AccountProfileWrapper } from './AccountProfile'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Хэрэглэгч',
    path: '/account/overview',
    isSeparator: false,
    isActive: false,
  },
  // {
  //   title: '',
  //   path: '',
  //   isSeparator: true,
  //   isActive: false,
  // },
]

const AccountPage: React.FC = () => {
  return (
    <Routes>
      <Route element={<AccountProfileWrapper />}>
          <Route
            path='overview'

            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Үндсэн</PageTitle>
                <Overview />
              </>
            }
          />
          <Route
            path='auth_settings'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Тохиргоо</PageTitle>
                <Settings />
              </>
            }
          />
         
          <Route index element={<Navigate to='/account/overview' />} />
      </Route>
    </Routes>
  )
}

export default AccountPage
