import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CRUD_RESPONSES, isNotEmpty } from "../../../../../_metronic/helpers"
import { ErrorAlert } from "../../../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../../../_metronic/helpers/alerts/Warning"
import { AppointmentHistory } from "../../core/_models"
import { getAppointmentHistory } from "../../core/_requests"
import { useListView } from "../../customers-list/provider/ListViewProvider"
import AppointmentList from "./AppointmentList"


const AppointmentHistoryIndex = () => {
    const {itemIdForUpdate} = useListView()
    const enabledQuery = isNotEmpty(itemIdForUpdate)
    const [appointments, setAppointments] = useState<Array<AppointmentHistory>>([])

    const {
        isLoading,
        data,
    } = useQuery(
        `customer-appointment-history-${itemIdForUpdate}`,
        () => {
            return getAppointmentHistory(itemIdForUpdate)
        },
        {
            cacheTime: 0,
            retryOnMount: false,
            retry: false,
            enabled: enabledQuery,
            onError: (err: any) => {
                console.error('getAppointmentHistory', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            }
        }
    )

    useEffect(() => {
        if(data && data.data) {
            const appHistory = data.data
            setAppointments(appHistory)
        }
    }, [data])

    if(!isLoading && appointments.length > 0) {
        return ( <AppointmentList appointments={appointments}/> )
    }

    if(!isLoading) {
        return (<>
            {appointments.length === 0 && <div>
                <div className="card-px text-center pt-0 pb-15">
                    <p className="text-gray-400 fs-4 fw-bold py-7">Цаг захиалгын түүх олдсонгүй.</p>
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

export {AppointmentHistoryIndex}