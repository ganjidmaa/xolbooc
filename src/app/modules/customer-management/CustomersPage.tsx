import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import CustomersList from "./customers-list/CustomersList"
import { CustomersWrapper } from "./CustomersWrapper"
import { PaymentPage } from "./profiles/payment-history/PaymentPage"
import ProfilePage from "./profiles/ProfilePage"

const customersBreadCrumbs: Array<PageLink> = [
    {
      title: 'Эмчлүүлэгч',
      path: '/customer/list',
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

const CustomersPage = () => {
    return (
        <Routes>
            <Route element={<CustomersWrapper/>}>
                <Route 
                    path='list/profile/*'
                    element={<ProfilePage />}
                />
                <Route 
                    path='list'
                    element={<>
                        <PageTitle breadcrumbs={customersBreadCrumbs}>Эмчлүүлэгчийн жагсаалт</PageTitle>
                        <CustomersList />
                    </>}
                />
                <Route 
                    path='list/payment_detail'
                    element={<>
                        <PageTitle breadcrumbs={customersBreadCrumbs}>Төлбөр</PageTitle>
                        <PaymentPage />
                    </>}
                />
            </Route>
            <Route element={<Navigate to='/customer/list/profile/overview'/>} />
            <Route index element={<Navigate to='/customer/list'/>} />
            <Route element={<Navigate to='/customer/list/payment_detail'/>} />
        </Routes>
    )
}

export default CustomersPage