import { KTSVG } from "../../../../_metronic/helpers"
import { useCalendarQuery } from "../core/CalendarQueryProvider"

const CustomerToolbar = () => {
    const {setEventCustomer} = useCalendarQuery()

    const removeSelectCustomer = () => {
        setEventCustomer({})
    }

    const addCustomerModal = () => {
        setEventCustomer(undefined)
    }

    return (
    <>
        <div className="d-flex align-items-center flex-shrink-0 me-5 py-3">
            {/* <span className="fs-7 fw-bolder text-gray-700 pe-4">Team:</span> */}
            
            {/* <div className="symbol-group symbol-hover flex-shrink-0 me-2">
                <div className="symbol symbol-circle symbol-35px">
                    <div className="symbol-label fw-bolder bg-warning text-inverse-warning">A</div>
                </div>             
                
                <div className="symbol symbol-circle symbol-35px">
                    <div className="symbol-label fw-bolder bg-primary text-inverse-primary">S</div>
                </div>

                <div className="symbol symbol-circle symbol-35px">
                    <div className="symbol-label fw-bolder bg-danger text-inverse-danger">P</div>
                </div> 
            </div> */}
            
            <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Эмчлүүлэгч нэмэх"
                onClick={() => {addCustomerModal()}}
            >
                <KTSVG 
                    path="/media/icons/duotune/general/gen035.svg"
                    className='svg-icon svg-icon-2hx svg-icon-success'
                />
                
            </div>
        </div>
        
        <div className="d-flex align-items-center overflow-auto">                  
            <div className="bullet bg-secondary h-35px w-1px mx-6"></div>
            
            <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Хайлт"
                onClick={() => {removeSelectCustomer()}}
            >
                <KTSVG 
                    path="/media/icons/duotune/general/gen021.svg"
                    className='svg-icon svg-icon-2hx svg-icon-success'
                />
                
            </div>
        </div>
    </>
    )
}

export {CustomerToolbar}