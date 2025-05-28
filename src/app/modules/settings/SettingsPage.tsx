import { objectHasAttr, ROLES } from "../../../_metronic/helpers"
import { PageTitle } from "../../../_metronic/layout/core"
import { Settings } from "./core/_models"
import { SettingsDetail } from "./SettingsDetail"
import { useAuth } from "../auth"
import { Navigate, Route, Routes, Link, Outlet, useLocation } from "react-router-dom"
import { SmsOptions } from "./SmsOptions"

const SettingsPage = () => {
    const {settings, currentUser} = useAuth()
    const userRole = currentUser?.role as string
    
    if(userRole === ROLES.ADMIN && objectHasAttr(settings)) {
        return (
            <SettingsDetail settings={settings as Settings}/>
        )
    }

    return null
}

// const SettingsWrapper = () => {
//     return (
//     <>
//         <PageTitle breadcrumbs={[]}>{'Тохиргоо'}</PageTitle>
//         <SettingsPage />
//     </>
//     )
// }

const SettingsWrapper = () => {
    const location = useLocation()

    return (  
        <div className="d-flex flex-column flex-xl-row">
            <div className="flex-lg-row-fluid ms-lg-15">
                <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-4">
                    <li className="nav-item">
                        <Link
                            className={
                            `nav-link text-active-primary me-6 ` +
                            (location.pathname === '/settings/master' && 'active')
                            }
                            to='/settings/master'
                        >
                            Тохиргоо
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={
                            `nav-link text-active-primary me-6 ` +
                            (location.pathname === '/settings/sms' && 'active')
                            }
                            to='/settings/sms'
                        >
                            Мэссэж
                        </Link>
                    </li>
                </ul>    
    
                <Outlet />
            </div>
        </div>    
    )
}


export const SettingsRouter = () => {
    return (
        <Routes>
            <Route element={<SettingsWrapper/>}>
                <Route 
                    path='master'
                    element={<>
                        <PageTitle breadcrumbs={[]}>Тохиргоо</PageTitle>
                        <SettingsPage />
                    </>}
                />
                <Route 
                    path='sms'
                    element={<>
                        <PageTitle breadcrumbs={[]}>Мэссэж</PageTitle>
                        <SmsOptions />
                    </>}
                />
            </Route>
            <Route element={<Navigate to='/settings/sms'/>} />
            <Route index element={<Navigate to='/settings/master'/>} />
        </Routes>
    )
}