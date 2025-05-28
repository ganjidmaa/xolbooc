import { Navigate, Route, Routes } from "react-router-dom"
import { SmsWrapper } from "./SmsWrapper"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { SmsList } from "./sms-list/SmsList"

export const SmsPage = () => {
    const detailBreadcrumbs: Array<PageLink> = [
        {
          title: 'Мессэж',
          path: '/sms_history/list',
          isSeparator: false,
          isActive: false,
        }
    ]

    return (
        <Routes>
            <Route element={<SmsWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={detailBreadcrumbs}>Мессэж</PageTitle>
                            <SmsList />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/sms_history/list' />} />
        </Routes>
    )
}