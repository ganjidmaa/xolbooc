import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./coupons-list/core/ListViewProvider"
import { QueryRequestProvider } from "./coupons-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./coupons-list/core/QueryResponseProvider"

const CouponsWrapper = () => {
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

export {CouponsWrapper}