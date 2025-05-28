import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { ServiceMethodList } from "./service-method-list/ServiceMethodList"
import { ServiceMethodWrapper } from "./ServiceMethodWrapper"

const servicesBreadcrumbs: Array<PageLink> = [
    {
      title: 'Эмчилгээний арга',
      path: '/service_method/list',
      isSeparator: false,
      isActive: false,
    },
]

const AppOptionPage = () => {
    return (
        <Routes>
            <Route element={<ServiceMethodWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Эмчилгээний аргууд</PageTitle>
                            <ServiceMethodList />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/app_options/list' />} />
        </Routes>
    )
}

export default AppOptionPage