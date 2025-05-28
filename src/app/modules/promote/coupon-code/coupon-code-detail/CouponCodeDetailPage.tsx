import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { CRUD_RESPONSES, ID, QUERIES } from "../../../../../_metronic/helpers"
import { CouponCodeDetail } from "./CouponCodeDetail"
import { useQuery } from "react-query"
import { WarningAlert } from "../../../../../_metronic/helpers/alerts/Warning"
import { ErrorAlert } from "../../../../../_metronic/helpers/alerts/Error"
import { getCouponCodeDetail } from "../coupon-codes-list/core/_requests"
import { CouponCode } from "../../../full-calendar/core/_models"

export const CouponCodeDetailPage: React.FC = () => {

    const location: any = useLocation()
    const [couponCodeId] = useState<ID>(location.state?.couponCodeId || 0) 
    const [detailCoupon, setDetailCoupon] = useState<CouponCode>({})

    const {
        isLoading,
        data
    } = useQuery(
        `${QUERIES.COUPON_CODES_LIST}-detail-${couponCodeId}`,
        () => {
            return getCouponCodeDetail(couponCodeId)
        },
        {
            cacheTime: 0,
            onError: (err: any) => {
                console.error(err)
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
        if(data) {
            setDetailCoupon(data)
        }
    }, [data])

    if(data) {
        return (
            <CouponCodeDetail className='mb-5 mb-xl-8' couponCode={detailCoupon}/>
        )
    }

    if(!isLoading && !data) {
        return (
            <div>
                <div className="card-px text-center pt-0 pb-15">
                    <p className="text-gray-400 fs-4 fw-bold py-7">Купон ашигласан түүх олдсонгүй.</p>
                </div>
                <div className="text-center pb-0 px-5">
                    <img src="/media/illustrations/sketchy-1/4.png" alt="" className="mw-100 h-200px h-sm-325px" />
                </div>
            </div>
        )
    }

    return null

}
