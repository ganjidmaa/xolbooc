import {Route, Routes, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { BranchDetailPage } from './branch-edit/BranchDetailPage'
import { BranchList } from './branches-list/BranchList'
import { BranchWrapper } from './BranchWrapper'

const branchBreadcrumbs: Array<PageLink> = [
  {
    title: 'Салбар',
    path: '/branch/list',
    isSeparator: false,
    isActive: false,
  },
]

const BranchPage = () => {
  return (
    <Routes> 
        <Route element={<BranchWrapper />}>
          <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={branchBreadcrumbs}>Салбарын жагсаалт</PageTitle>
                <BranchList />
              </>
            }
          />
          <Route path='detail'
            element={
              <>
                <PageTitle breadcrumbs={branchBreadcrumbs}>Дэлгэрэнгүй</PageTitle>
                <BranchDetailPage />
              </>
            }
          />
        
        </Route>
      <Route index element={<Navigate to='/branch/list' />} />
      <Route element={<Navigate to='/branch/detail' />} />
    </Routes>
  )
}

export default BranchPage
