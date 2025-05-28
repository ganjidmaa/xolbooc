import { Navigate, Route, Routes } from "react-router-dom"
import { DetailWrapper } from "./DetailWrapper"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { DetailList } from "./details-list/DetailList"

export const DetailPage = () => {
    const detailBreadcrumbs: Array<PageLink> = [
        {
          title: 'Дэлгэрэнгүй',
          path: '/detail_table/list',
          isSeparator: false,
          isActive: false,
        }
    ]

    return (
        <Routes>
            <Route element={<DetailWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={detailBreadcrumbs}>Дэлгэрэнгүй жагсаалт</PageTitle>
                            <DetailList />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/detail_table/list' />} />
        </Routes>
    )
}