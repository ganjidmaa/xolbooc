import { Outlet } from "react-router-dom"
import { AccountDetailProvider } from "./core/AccountDetailProvider"
import { ListViewProvider } from "./users-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./users-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./users-list/provider/QueryResponseProvider"


const UsersWrapper = () => {
    return (
        <AccountDetailProvider>
            <QueryRequestProvider>
                <QueryResponseProvider>
                    <ListViewProvider>
                        <Outlet />
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </AccountDetailProvider>
    )
}


export {UsersWrapper}