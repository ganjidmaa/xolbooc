import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { CommentList } from "./comment-list/CommentList"
import { CommentWrapper } from "./CommentWrapper"

const CommentPage = () => {
    const servicesBreadcrumbs: Array<PageLink> = [
        {
          title: 'Сэтгэгдлийн мэдээлэл',
          path: '/comments/list',
          isSeparator: false,
          isActive: false,
        },
    ]

    return (
        <Routes>
            <Route element={<CommentWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Сэтгэгдлийн жагсаалт</PageTitle>
                            <CommentList />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='list' />} />
        </Routes>
    )
}

export default CommentPage
