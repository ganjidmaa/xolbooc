import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { AppOptionDetailPage } from "./app-option-detail/AppOptionDetailPage"
import { AppOptionList } from "./app-option-list/AppOptionList"
import { AppOptionWrapper } from "./AppOptionWrapper"

const servicesBreadcrumbs: Array<PageLink> = [
    {
      title: 'Захиалгын онош',
      path: '/app_options/list',
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

const AppOptionPage = () => {
    return (
        <Routes>
            <Route element={<AppOptionWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Захиалгын оношууд</PageTitle>
                            <AppOptionList />
                        </>
                    }
                />

                <Route path='list/detail'
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Дэлгэрэнгүй</PageTitle>
                            <AppOptionDetailPage />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/app_options/list' />} />
            <Route element={<Navigate to='/app_options/list/detail'/>} />
        </Routes>
    )
}

export default AppOptionPage