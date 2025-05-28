import {Route, Routes, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { ShiftWrapper } from './ShiftWrapper'
import ScheduleForm from './ScheduleForm'
import ScheduleIndex from './ScheduleIndex'

const shiftBreadcrumbs: Array<PageLink> = [
  {
    title: 'Ажиллах хуваарь',
    path: '/shift/schedules',
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

const ShiftPage = () => {
  return (
    <Routes> 
        <Route element={<ShiftWrapper />}>
        <Route 
              path='schedules'
              element={
                  <>
                      <PageTitle breadcrumbs={shiftBreadcrumbs}>Ажиллах хуваарь</PageTitle>
                      <ScheduleIndex />
                  </>
              }
          />
          <Route 
              path='form'
              element={
                  <>
                      <PageTitle breadcrumbs={shiftBreadcrumbs}>Хуваарь үүсгэх</PageTitle>
                      <ScheduleForm />
                  </>
              }
          />
        </Route>
      <Route index element={<Navigate to='/shift/schedules' />} />
      <Route element={<Navigate to='/shift/form' />} />
    </Routes>
  )
}

export default ShiftPage
