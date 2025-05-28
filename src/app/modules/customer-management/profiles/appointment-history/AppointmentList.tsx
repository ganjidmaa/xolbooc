import { FC, useState } from "react"
import { AppointmentHistory } from "../../core/_models"
import AppointmentItem from "./AppointmentItem"
import { HealthConditionModal } from "../../../full-calendar/event-edit/health-condition-modal/HealthConditionModal"
import { ID } from "../../../../../_metronic/helpers"

type Props = {
    appointments: Array<AppointmentHistory>
}

const AppointmentList:FC<Props> = ({appointments}) => {
    const [openModalId, setOpenModalId] = useState <ID>(undefined)
    const closeModal = () => {
        setOpenModalId(undefined)
    }
    const openModal = (id: ID) =>{
        setOpenModalId(id)
    }
    console.log(openModalId)
    return (
        <>
                {appointments && appointments.map((appointment, index) => {
                    return (
                        <div className="card mb-5 mb-xl-8" id="kt_customer_view_appointment_tab">
                            <div className="card-body p-9">
                                <AppointmentItem key={index} appointment={appointment} openModal={ () => {openModal(appointment.id)}}/>
                            </div>
                        </div>
                    )
                })}
                {openModalId !== undefined && <HealthConditionModal id={openModalId} setFunction={closeModal}/>}
        </>
    )
}

export default AppointmentList