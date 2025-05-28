import { isNotEmpty } from "../../../../_metronic/helpers"
import { useCalendarQuery, useQueryResponseData } from "../core/CalendarQueryProvider"
import { CustomerItem } from "./CustomerItem"

export const CustomerList = () => {
    const customers = useQueryResponseData()
    const {state} = useCalendarQuery()
    const limitCustomers = customers.slice(0, 99)

    return (
        <div>
            {isNotEmpty(state.search) && limitCustomers.map((customer) => {
                return (
                    <CustomerItem key={customer.id} customer={customer}/>
                )
            })}
        </div>
    )
}

