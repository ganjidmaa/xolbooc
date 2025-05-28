import { FC } from "react"
import { Membership } from "../../core/_models"

type Props = {
    membership: Membership
}

export const MembershipInfo : FC<Props> = ({membership}) => {
    return (
        <div className="d-flex align-items-center mb-4">
            <i className="bi bi-journal-medical text-info fs-1 me-7 ms-5"></i>
            <div className="d-flex flex-column">
                <table className="fw-semibold fs-6">
                    <tbody>
                        <tr>
                            <td className="text-gray-700 w-200px">Төрөл</td>
                            <td className="text-gray-700 fw-bold ps-2">{membership.title}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-700 w-200px">Код</td>
                            <td className="text-gray-700 fw-bold">
                                <div className="badge badge-light-info d-inline">
                                    {membership.code}
                                </div>
                            </td>
                        </tr>              
                        <tr>
                            <td className="text-gray-700 w-200px">Хувь</td>
                            <td className="text-gray-700 fw-bold ps-2">
                                {membership.percent} %
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
