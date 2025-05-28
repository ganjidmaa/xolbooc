import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./resources-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./resources-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./resources-list/provider/QueryResponseProvider"

export const ResourcesWrapper = () => {
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