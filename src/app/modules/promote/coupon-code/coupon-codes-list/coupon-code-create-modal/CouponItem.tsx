import { FC } from "react"
import { Coupon } from "../core/_models"

type Props = {
    coupon: Coupon
    handleOnChange: (coupon: Coupon) => void
}

export const CouponItem:FC<Props> = ({coupon, handleOnChange}) => {
    // const {setEventCustomer} = useCalendarQuery()

    // const setSelectedCustomer = () => {
    //     setEventCustomer(coupon)
    // }

    return (
        <div className="menu menu-column menu-rounded menu-state-bg menu-state-icon-primary menu-state-bullet-primary">
            <div className="menu-item" onClick={() => {handleOnChange(coupon)}}>
                <div className='d-flex flex-stack py-1 menu-link'>
                    <div className='d-flex align-items-center'>
                        <div className='ms-5'>
                            <div className='fs-7 fw-bolder mb-2'>
                                {coupon.title}
                            </div>
                            {/* <div className='fw-bold text-gray-400'>
                                {Moment(coupon.start_date).format('YYYY/MM/DD')} - {Moment(coupon.end_date).format('YYYY/MM/DD')}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className='separator separator-dashed border-primary'></div>
        </div>
    )
}