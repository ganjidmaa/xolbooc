import { FC } from "react"
import { ID, KTSVG } from "../../../../../_metronic/helpers"
import { Customer } from "../../core/_models"

type Props = {
    member: Customer
    removeMember: (memberId: ID) => void
}

export const MemberItem:FC<Props> = ({member, removeMember}) => {
    return (
        <>
            <div className='d-flex flex-stack py-2 pe-7 menu-link'>
                <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                        <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                        {member.firstname?.charAt(0)}
                        </span>
                    </div>

                    <div className='ms-5'>
                        <div className='fs-5 fw-bolder text-hover-primary text-gray-800 mb-2'>
                        {member.lastname?.charAt(0)}. { member.firstname} 
                        </div>
                        <div className='fw-bold text-gray-400'>{member.phone} {member.phone2}</div>
                    </div>
                </div>

                <div className='d-flex flex-column align-items-end ms-2'>
                    <span className='text-muted fs-7 mb-1' onClick={() => removeMember(member.id)}>
                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3 svg-icon-danger'/>
                    </span>
                </div>
            </div>
            <div className='separator separator-dashed d-none'></div>
        </>
    )
}