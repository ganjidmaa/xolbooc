import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../../_metronic/layout/core"
import { CouponCodesList } from "./coupon-codes-list/CouponCodesList"
import { CouponCodesWrapper } from "./CouponCodesWrapper"
import { CouponCodeDetailPage } from "./coupon-code-detail/CouponCodeDetailPage"

const couponCodesBreadcrumbs: Array<PageLink> = [
    {
      title: 'Урамшуулал',
      path: '/promote/coupon/code/list',
      isSeparator: false,
      isActive: false,
    }
]

const CouponCodesPage = () => {
    return (
        <Routes> 
            <Route element={<CouponCodesWrapper />}>
                <Route path='list'
                    element={<>
                        <PageTitle breadcrumbs={couponCodesBreadcrumbs}>Купоны код</PageTitle>
                        <CouponCodesList />
                    </>}
                />
                <Route path='detail'
                    element={<>
                        <PageTitle breadcrumbs={couponCodesBreadcrumbs}>Купон ашиглалт</PageTitle>
                        <CouponCodeDetailPage />
                    </>}
                />
            </Route>
            <Route index element={<Navigate to='/list' />} />
            <Route element={<Navigate to='/detail' />} />
        </Routes>
    )
}

export default CouponCodesPage