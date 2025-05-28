import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./membership-types-list/core/ListViewProvider"
import { QueryRequestProvider } from "./membership-types-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./membership-types-list/core/QueryResponseProvider"

const MembershipTypesWrapper = () => {
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

export {MembershipTypesWrapper}