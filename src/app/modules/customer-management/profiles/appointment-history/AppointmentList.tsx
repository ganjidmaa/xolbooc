import { FC } from "react"
import { AppointmentHistory } from "../../core/_models"
import AppointmentItem from "./AppointmentItem"

type Props = {
    appointments: Array<AppointmentHistory>
}

const AppointmentList:FC<Props> = ({appointments}) => {

    return (
        <div className="card mb-5 mb-xl-8" id="kt_customer_view_appointment_tab">
            <div className="card-body p-9">
                {appointments && appointments.map((appointment, index) => {
                    return (
                        <AppointmentItem key={index} appointment={appointment}/>
                    )
                })}
            </div>
        </div>
    )
}

export default AppointmentList