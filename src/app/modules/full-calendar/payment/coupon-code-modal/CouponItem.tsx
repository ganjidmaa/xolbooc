import { FC } from "react";
import { CouponCode } from "../../core/_models";
import { NumericFormat as NumberFormat}from "react-number-format";
import CouponDetail from "./CouponDetail";

type Props = {
    couponCode: CouponCode
    totalLeftPayment: number
    formik: any
    setRedeemAmount: (value: number) => void
}

const CouponItem:FC<Props> = ({couponCode, totalLeftPayment, formik, setRedeemAmount}) => { 
    const subLeftPayment = totalLeftPayment - parseInt((formik.values.redeem_amount || '0').toString().replaceAll(',', ''))

    return (
        <div>
            <div className="py-0">
                <CouponDetail couponCode={couponCode} usable_balance={formik.values.usable_balance}/>
                {couponCode.status === 'valid' && <>
                    <div className='fv-row mb-1 mt-6'>
                        <label className="fw-bold fs-6 mb-2 required">Ашиглах дүн</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">
                                <span>₮ </span>
                            </span>
                            <NumberFormat
                                className="form-control"
                                {...formik.getFieldProps.redeem_amount}
                                value={formik.values.redeem_amount}
                                onChange={(e: any) => setRedeemAmount(e.target.value)}
                                thousandSeparator={true}
                            />
                        </div>
                        {formik.errors.redeem_amount && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.redeem_amount}</div>
                            </div>
                        )} 
                    </div>  

                    <div className='d-flex align-items-center mb-4'>
                        <div className='flex-grow-1'>
                            <div className='text-muted fw-bold fs-5'>
                                Үлдэгдэл төлбөр:
                            </div>
                        </div>
                        
                        <NumberFormat
                            className="text-muted fw-bold align-self-start fs-6"
                            value={subLeftPayment}
                            displayType={'text'}
                            thousandSeparator={true}
                        />
                        <span className='text-muted fw-bold align-self-start fs-6'>{' ₮'} </span>
                    </div>

                </>}
                
            </div>
        </div>
    )
}

export default CouponItem