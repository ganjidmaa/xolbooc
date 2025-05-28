import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./comment-list/core/ListViewProvider"
import { QueryRequestProvider } from "./comment-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./comment-list/core/QueryResponseProvider"

const CommentWrapper = () => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider>
                <ListViewProvider>
                    <Outlet />
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

export {CommentWrapper}
