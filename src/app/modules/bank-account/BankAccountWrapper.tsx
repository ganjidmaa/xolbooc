import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./account-list/core/ListViewProvider"
import { QueryRequestProvider } from "./account-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./account-list/core/QueryResponseProvider"

const BankAccountWrapper = () => {
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

export {BankAccountWrapper}