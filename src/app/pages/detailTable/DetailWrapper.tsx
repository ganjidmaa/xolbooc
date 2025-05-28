import { Outlet } from "react-router-dom"
import { QueryRequestProvider } from "./details-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./details-list/core/QueryResponseProvider"
import { ListViewProvider } from "./details-list/core/ListViewProvider"

const DetailWrapper = () => {
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

export {DetailWrapper}