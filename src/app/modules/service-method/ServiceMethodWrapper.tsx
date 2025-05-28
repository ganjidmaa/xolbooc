import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./service-method-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./service-method-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./service-method-list/provider/QueryResponseProvider"

const ServiceMethodWrapper = () => {
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

export {ServiceMethodWrapper}