import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../../_metronic/layout/core"
import { CouponsList } from "./coupons-list/CouponsList"
import { CouponsWrapper } from "./CouponsWrapper"
import CouponCodesPage from "../coupon-code/CouponCodesPage"
import {Link, useLocation} from 'react-router-dom'

export const CouponNavigation = () => {
  const location = useLocation()
  
  const navItems = [
    {
      path: '/promote/coupon/type',
      label: 'Ангилал',
    },
    {
      path: '/promote/coupon/code/list',
      label: 'Купонууд',
    },
  ]

  return (
    <div className='d-flex flex-column flex-xl-row'>
        <div className='flex-lg-row-fluid ms-lg-15'>
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-4'>
                {navItems.map((item) => (
                    <li className='nav-item' key={item.path}>
                    <Link
                        className={`nav-link text-active-primary me-6 ${
                        location.pathname === item.path ? 'active' : ''
                        }`}
                        to={item.path}
                    >
                        {item.label}
                    </Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
      </div>
    
  )
}

const CouponsPage = () => {
    const servicesBreadcrumbs: Array<PageLink> = [
        {
          title: 'Урамшуулал',
          path: '/type',
          isSeparator: false,
          isActive: false,
        },
    ]

    return (
        <Routes>
            <Route element={<CouponNavigation />}>
                <Route element={<CouponsWrapper />}>
                    <Route path="type" 
                        element={<>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Купоны ангилал</PageTitle>
                            <CouponsList />
                        </>}
                    />
                </Route>
                <Route path="code/*" 
                    element={<>
                        <PageTitle breadcrumbs={servicesBreadcrumbs}>Купонууд</PageTitle>
                        <CouponCodesPage />
                    </>}
                />
            </Route>
            <Route index element={<Navigate to='/type' />} />
            <Route element={<Navigate to='/code/*' />} />
        </Routes>
    )
}

export default CouponsPage