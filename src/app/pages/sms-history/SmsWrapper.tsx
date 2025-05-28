import { Outlet } from "react-router-dom"
import { QueryRequestProvider } from "./sms-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./sms-list/core/QueryResponseProvider"
import { ListViewProvider } from "./sms-list/core/ListViewProvider"

const SmsWrapper = () => {
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

export {SmsWrapper}