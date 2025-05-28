import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./memberships-list/core/ListViewProvider"
import { QueryRequestProvider } from "./memberships-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./memberships-list/core/QueryResponseProvider"

const MembershipsWrapper = () => {
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

export {MembershipsWrapper}