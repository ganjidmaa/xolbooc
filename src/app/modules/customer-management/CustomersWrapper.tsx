import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./customers-list/provider/ListViewProvider"
import { MasterDataProvider } from "./customers-list/provider/MasterDataProvider"
import { QueryRequestProvider } from "./customers-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./customers-list/provider/QueryResponseProvider"

const CustomersWrapper = () => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider>
                <ListViewProvider>
                    <MasterDataProvider>
                        <Outlet />
                    </MasterDataProvider>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

export {CustomersWrapper}