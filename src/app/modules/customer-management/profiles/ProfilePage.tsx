/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation} from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { useListView } from '../customers-list/provider/ListViewProvider'
import { AppointmentHistoryIndex } from './appointment-history/AppointmentHistoryIndex'
import { ProfileDetailIndex } from './detail/ProfileDetailIndex'
import { MembersPage } from './membership/MembersPage'
import { InvoicesIndex } from './payment-history/InvoicesIndex'
import { ProfileWrapper } from './ProfileWrapper'
import { ImagesWrapper } from './images/ImagesWrapper'

const customersBreadcrumbs: Array<PageLink> = [
    {
      title: 'Эмчлүүлэгч',
      path: '/profile/overview',
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

const ProfilePage: React.FC = () => {
    const location: any = useLocation()
    const {setItemIdForUpdate} = useListView()

    useEffect(() => {
        location.state?.customerId && setItemIdForUpdate(location.state.customerId)
    }, [])

    return (
        <Routes>
            <Route element={<ProfileWrapper/>}>
                <Route
                    path='overview'
                    element={
                    <>
                        <PageTitle breadcrumbs={customersBreadcrumbs}>Дэлгэрэнгүй</PageTitle>
                        <ProfileDetailIndex/>
                    </>
                    }
                />
                <Route
                    path='appointment'
                    element={
                    <>
                        <PageTitle breadcrumbs={customersBreadcrumbs}>Цаг захиалга</PageTitle>
                        <AppointmentHistoryIndex/>
                    </>
                    }
                />
                <Route
                    path='payment'
                    element={
                    <>
                        <PageTitle breadcrumbs={customersBreadcrumbs}>Төлбөр</PageTitle>
                        <InvoicesIndex/>
                    </>
                    }
                />
                <Route
                    path='membership'
                    element={
                    <>
                        <PageTitle breadcrumbs={customersBreadcrumbs}>Гишүүнчлэл</PageTitle>
                        <MembersPage/>
                    </>
                    }
                />
                <Route
                    path='images'
                    element={
                    <>
                        <PageTitle breadcrumbs={customersBreadcrumbs}>Зураг</PageTitle>
                        <ImagesWrapper/>
                    </>
                    }
                />

                <Route index element={<Navigate to='/profile/overview' />} />
                <Route element={<Navigate to='/profile/appointment' />} />
            </Route>
        </Routes>
    )
}

export default ProfilePage
