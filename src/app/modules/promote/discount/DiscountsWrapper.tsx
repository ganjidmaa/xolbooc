import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./discounts-list/core/ListViewProvider"
import { QueryRequestProvider } from "./discounts-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./discounts-list/core/QueryResponseProvider"

const DiscountsWrapper = () => {
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

export {DiscountsWrapper}