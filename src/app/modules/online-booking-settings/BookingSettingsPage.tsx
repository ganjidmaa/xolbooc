import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CRUD_RESPONSES, objectHasAttr, QUERIES } from "../../../_metronic/helpers"
import { ErrorAlert } from "../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../_metronic/helpers/alerts/Warning"
import { PageTitle } from "../../../_metronic/layout/core"
import { OnlineBookingSettings } from "./core/_models"
import { getBookingSettings } from "./core/_requests"
import { BookingSettingsDetail } from "./BookingSettingsDetail"

const BookingSettingsPage = () => {
    const [settings, setSettings] = useState<OnlineBookingSettings>({})
    const {
        isLoading,
        data,
        error
    } = useQuery(
        `${QUERIES.SETTINGS_DETAIL}-online-booking`,
        () => {
            return getBookingSettings()
        },
        {
            cacheTime: 0,
            retryOnMount: false,
            retry: false,
            onError: (err: any) => {
                console.error('getSettings error', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
        }
    )

    useEffect(() => {
        data?.data && setSettings(data.data)
    }, [data])
    
    if(!isLoading && !error && objectHasAttr(settings)) {
        return (
            <BookingSettingsDetail bookingSettings={settings}/>
        )
    }

    return null
}

export const BookingSettingsWrapper = () => {
    return (
    <>
        <PageTitle breadcrumbs={[]}>{'Тохиргоо'}</PageTitle>
        <BookingSettingsPage />
    </>
    )
}