import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { ServiceDetailPage } from "./services-detail/ServiceDetailPage"
import { ServicesList } from "./services-list/ServiceList"
import { ServicesWrapper } from "./ServicesWrapper"

const servicesBreadcrumbs: Array<PageLink> = [
    {
      title: 'Онош',
      path: '/service/list',
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

const ServicesPage = () => {
    return (
        <Routes>
            <Route element={<ServicesWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Оношийн жагсаалт</PageTitle>
                            <ServicesList />
                        </>
                    }
                />

                <Route path='list/detail'
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Дэлгэрэнгүй</PageTitle>
                            <ServiceDetailPage />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/service/list' />} />
            <Route element={<Navigate to='/service/list/detail'/>} />
        </Routes>
    )
}

export default ServicesPage