import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./services-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./services-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./services-list/provider/QueryResponseProvider"

const ServicesWrapper = () => {
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

export {ServicesWrapper}