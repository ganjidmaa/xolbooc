import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CRUD_RESPONSES, objectHasAttr, QUERIES } from "../../../_metronic/helpers"
import { ErrorAlert } from "../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../_metronic/helpers/alerts/Warning"
import { PageTitle } from "../../../_metronic/layout/core"
import { OnlineBookingSettings } from "./core/_models"
import { getBookingSettings } from "./core/_requests"
import { BookingSettingsDetail } from "./BookingSettingsDetail"
import { Navigate, Route, Routes, Link, Outlet, useLocation } from "react-router-dom"
import CommentPage from "../comments/CommentPage"


const BookingSettingsPage = () => {
    const [settings, setSettings] = useState<OnlineBookingSettings>({})
    const {
        isLoading,
        data,
        error
    } = useQuery(
        `${QUERIES.SETTINGS_DETAIL}-online-booking`,
        () => {
            return getBookingSettings()
        },
        {
            cacheTime: 0,
            retryOnMount: false,
            retry: false,
            onError: (err: any) => {
                console.error('getSettings error', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
        }
    )

    useEffect(() => {
        data?.data && setSettings(data.data)
    }, [data])
    
    if(!isLoading && !error && objectHasAttr(settings)) {
        return (
            <BookingSettingsDetail bookingSettings={settings}/>
        )
    }

    return null
}

export const BookingSettingsWrapper = () => {
    const location = useLocation()

    return (  
        <div className="d-flex flex-column flex-xl-row">
            <div className="flex-lg-row-fluid ms-lg-15">
                <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-4">
                    <li className="nav-item">
                        <Link
                            className={
                            `nav-link text-active-primary me-6 ` +
                            (location.pathname === '/booking-settings/online-booking' && 'active')
                            }
                            to='/booking-settings/online-booking'
                        >
                            Тохиргоо
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={
                            `nav-link text-active-primary me-6 ` +
                            (location.pathname === '/booking-settings/comments' && 'active')
                            }
                            to='/booking-settings/comments/list'
                        >
                            Сэтгэгдэл
                        </Link>
                    </li>
                </ul>    
    
                <Outlet />
            </div>
        </div>    
    )
}

export const BookingSettingsRouter = () => {
    return (
        <Routes>
            <Route element={<BookingSettingsWrapper/>}>
                <Route 
                    path='online-booking'
                    element={<>
                        <PageTitle breadcrumbs={[]}>Тохиргоо</PageTitle>
                        <BookingSettingsPage />
                    </>}
                />
                <Route 
                    path='comments/*'
                    element={<>
                        <PageTitle breadcrumbs={[]}>Сэтгэгдэл</PageTitle>
                        <CommentPage />
                    </>}
                />
            </Route>
            <Route element={<Navigate to='/comments/*'/>} />
            <Route index element={<Navigate to='/online-booking'/>} />
        </Routes>
    )
}