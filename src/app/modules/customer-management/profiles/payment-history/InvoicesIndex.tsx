import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CRUD_RESPONSES, isNotEmpty } from "../../../../../_metronic/helpers"
import { ErrorAlert } from "../../../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../../../_metronic/helpers/alerts/Warning"
import { Invoice } from "../../core/_models"
import { getInvoicesHistory } from "../../core/_requests"
import { useListView } from "../../customers-list/provider/ListViewProvider"
import { InvoiceItem } from "./InvoiceItem"

const InvoicesIndex = () => {
    const {itemIdForUpdate} = useListView()
    const enabledQuery = isNotEmpty(itemIdForUpdate)
    const [invoices, setInvoices] = useState<Array<Invoice>>([])

    const {
        isLoading,
        data,
    } = useQuery(
        `customer-invoices-${itemIdForUpdate}`,
        () => {
            return getInvoicesHistory(itemIdForUpdate)
        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err: any) => {
                console.error('getInvoicesHistory error', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
            retryOnMount: false,
            retry: false,
        }
    )

    useEffect(() => {
        if(data && data.data) {
            const response = data.data
            setInvoices(response)
        }
    }, [data])

    if(!isLoading && invoices.length > 0) {
        return ( 
            <div className="card mb-5 mb-xl-8" id="kt_customer_view_payment_tab">
                <div className="card-body p-9">
                    {invoices.map((invoice, index) => {
                        return (
                            <InvoiceItem key={index} invoice={invoice}/>
                        )
                    })}
                </div>
            </div>
        )
    }

    if(!isLoading) {
        return (
            <>
                {invoices.length === 0 && <div>
                    <div className="card-px text-center pt-0 pb-15">
                        <p className="text-gray-400 fs-4 fw-bold py-7">Төлбөрийн түүх олдсонгүй.</p>
                    </div>
                    <div className="text-center pb-0 px-5">
                        <img src="/media/illustrations/sketchy-1/4.png" alt="" className="mw-100 h-200px h-sm-325px" />
                    </div>
                </div>}
            </>
        )
    }

    return null
}

export {InvoicesIndex}