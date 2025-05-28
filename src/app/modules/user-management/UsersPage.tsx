import {Route, Routes, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { UsersList } from './users-list/UsersList'
import { UsersWrapper } from './UsersWrapper'
import AccountPage from './accounts/AccountPage'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Хэрэглэгч',
    path: '/user/list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes> 
        <Route element={<UsersWrapper />}>
          <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Хэрэглэгчийн жагсаалт</PageTitle>
                <UsersList />
              </>
            }
          />
          <Route 
            path='list/account/*'
            element={<AccountPage />}
          />
        </Route>
      <Route index element={<Navigate to='/user/list' />} />
      <Route element={<Navigate to='/user/list/account/overview' />} />
    </Routes>
  )
}

export default UsersPage
