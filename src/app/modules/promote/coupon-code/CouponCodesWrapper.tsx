import { Outlet } from "react-router-dom"
import { ListViewProvider } from "./coupon-codes-list/core/ListViewProvider"
import { QueryRequestProvider } from "./coupon-codes-list/core/QueryRequestProvider"
import { QueryResponseProvider } from "./coupon-codes-list/core/QueryResponseProvider"


const CouponCodesWrapper = () => {
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


export {CouponCodesWrapper}