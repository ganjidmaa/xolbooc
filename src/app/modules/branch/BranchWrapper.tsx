import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./branches-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./branches-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./branches-list/provider/QueryResponseProvider"

const BranchWrapper = () => {
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


export {BranchWrapper}