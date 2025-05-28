import React from "react"
import { NumericFormat as NumberFormat } from "react-number-format"
import { Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../../../../_metronic/helpers"
import { useMasterData } from "../../customers-list/provider/MasterDataProvider"


const ProfileHeader: React.FC = () => {
    const {customer} = useMasterData()
    const blankImg = toAbsoluteUrl('/media/avatars/blank.svg')

    return (
        <div className="card mb-5 mb-xl-8">
            <div className="card-body pt-15">
                <div className="d-flex flex-center flex-column mb-5">
                    <div className="symbol symbol-100px symbol-circle mb-7">   
                        <img src={customer?.avatar_url ? customer?.avatar_url : blankImg} alt='Metronic' />
                        <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                    </div>

                    <Link to="#" className="fs-3 text-gray-800 text-hover-primary fw-bolder mb-6">{customer?.lastname} {customer?.firstname}</Link>
                    <div className="fs-5 fw-bold text-muted mb-1">Цаг захиалга</div>
                    <div className="d-flex flex-wrap flex-center">
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                            <div className="fs-4 fw-bolder text-gray-700">
                                <span className="w-75px">{customer?.total_appointments} </span>

                                <i className="fas fa-person-circle-check text-success fs-3"></i>
                                
                            </div>
                            <div className="fw-bold text-muted">Нийт</div>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                            <div className="fs-4 fw-bolder text-gray-700">
                                <span className="w-50px">{customer?.no_show_appointments} </span>
                                <i className="fas fa-person-circle-minus text-info fs-3"></i>
                            </div>
                            <div className="fw-bold text-muted">Ирээгүй</div>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                            <div className="fs-4 fw-bolder text-gray-700">
                                <span className="w-50px">{customer?.cancelled_appointments} </span>
                                <i className="fas fa-person-circle-xmark text-danger fs-3"></i>
                            </div>
                            <div className="fw-bold text-muted">Цуцалсан</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center flex-row-fluid pe-11 my-5">
                    {/* <div className="d-flex fs-6 fw-bold align-items-center mb-3">
                        <div className="bullet bg-primary me-3"></div>
                        <div className="text-gray-400">Нийт мөнгөн дүн</div>
                        <div className="ms-auto fw-bolder text-gray-700">30</div>
                    </div> */}
                    <div className="d-flex fs-6 fw-bold align-items-center mb-3">
                        <div className="bullet bg-success me-3"></div>
                        <div className="text-gray-400">Нийт төлсөн</div>
                        <NumberFormat
                            className="ms-auto fw-bolder text-gray-700 align-self-end"
                            value={customer?.total_paid || 0} 
                            displayType={'text'}
                            thousandSeparator={true}
                        />₮
                    </div>
                    <div className="d-flex fs-6 fw-bold align-items-center mb-3">
                        <div className="bullet bg-danger me-3"></div>
                        <div className="text-gray-400">Үлдэгдэл</div>
                        <NumberFormat
                            className="ms-auto fw-bolder text-gray-700 align-self-end"
                            value={customer?.left_payment || 0} 
                            displayType={'text'}
                            thousandSeparator={true}
                        />₮
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader