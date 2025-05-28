import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./app-option-list/provider/ListViewProvider"
import { QueryRequestProvider } from "./app-option-list/provider/QueryRequestProvider"
import { QueryResponseProvider } from "./app-option-list/provider/QueryResponseProvider"

const AppOptionWrapper = () => {
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

export {AppOptionWrapper}