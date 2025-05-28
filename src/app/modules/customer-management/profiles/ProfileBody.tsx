import { Link, Outlet, useLocation } from "react-router-dom"

export const ProfileBody = () => {
    const location = useLocation()

    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
                <li className="nav-item">
                    <Link
                        className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/customer/list/profile/overview' && 'active')
                        }
                        to='/customer/list/profile/overview'
                    >
                        Ерөнхий
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/customer/list/profile/appointment' && 'active')
                        }
                        to='/customer/list/profile/appointment'
                    >
                        Захиалгын түүх
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/customer/list/profile/payment' && 'active')
                        }
                        to='/customer/list/profile/payment'
                    >
                        Төлбөрийн түүх
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/customer/list/profile/membership' && 'active')
                        }
                        to='/customer/list/profile/membership'
                    >
                        Гишүүнчлэл
                    </Link>
                </li>
            </ul>    

            <Outlet />
        </div>
    )
}