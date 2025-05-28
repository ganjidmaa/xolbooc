import { FC, useState } from "react";
import { CouponCode } from "../../core/_models";
import Moment from 'moment';
import { NumericFormat as NumberFormat}from "react-number-format";
import clsx from "clsx";
import { couponClasses, couponStatusNames, KTSVG } from "../../../../../_metronic/helpers";


type Props = {
    couponCode: CouponCode
    usable_balance: number
}

const CouponDetail:FC<Props> = ({couponCode, usable_balance}) => { 
    const [navText, setNavText] = useState('general')
    const bulletColors = ['info', 'warning', 'success', 'danger', 'primary', 'info', 'warning', 'success', 'danger', 'primary'];
    
    return (
        <div>
            <div className="nav-group nav-group-outline mx-auto" data-kt-buttons="true">
                <div className={clsx(
                        'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2',
                        navText === 'general' && `active`
                    )}
                    onClick={() => {setNavText('general')}}
                >
                    Ерөнхий
                </div>
                <div className={clsx(
                        'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2',
                        navText === 'service' && `active`
                    )}
                    onClick={() => {setNavText('service')}}
                >
                    Үйлчилгээ
                </div>
                <div className={clsx(
                        'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2',
                        navText === 'history' && `active`
                    )} 
                    onClick={() => {setNavText('history')}}
                >
                    Ашиглалт
                </div>
            </div>

            <div className="py-0 w-100">          
                {navText === 'general' && <div className="bg-light p-3 mb-0 min-h-250px">
                    <div className="d-flex align-items-center mb-4">
                        <i className="bi bi-journal-medical text-info fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                            <div className="pb-2">
                                <h4 className="fw-bold text-dark">{couponCode.title}</h4>
                            </div>
                            <table className="fw-semibold fs-6">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-700 w-250px">Купоны код</td>
                                        <td className="text-gray-700 fw-bold">{couponCode.code}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-700">Купоны эрх</td>
                                        <td className="text-gray-700 fw-bold">
                                            <NumberFormat
                                                value={couponCode.value}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                            <span>{'₮'} </span>  
                                        </td>
                                    </tr>                                  
                                    <tr>
                                        <td className="text-gray-700 w-250px">Төлөв</td>
                                        <td className="text-gray-700 fw-bold">
                                            <div className={couponClasses.filter(cl => cl.status === couponCode.status)[0]?.class }>
                                                {couponStatusNames.filter(name => name.status === couponCode.status)[0]?.name }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-4">
                        <i className="bi bi-journal-text text-warning fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                            <table className="fw-semibold fs-6">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-700 w-250px">Эхлэх огноо</td>
                                        <td className="text-gray-700 fw-bold">{Moment(couponCode.start_date).format('YYYY/MM/DD')}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-700">Дуусах огноо</td>
                                        <td className="text-gray-700 fw-bold">{Moment(couponCode.end_date).format('YYYY/MM/DD')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-1">
                        <i className="bi bi-journal-bookmark text-primary fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                            {/* <h5 className="text-gray-800 fw-bold">Бусад</h5> */}
                            <table className="fw-semibold fs-6">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-700">Ашигласан дүн</td>
                                        <td className="text-gray-700 fw-bold">
                                            <NumberFormat
                                                value={couponCode.redeemed}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                            <span>{'₮'} </span>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-700 w-250px">Боломжит үлдэгдэл</td>
                                        <td className="text-gray-700 fw-bold">
                                            <NumberFormat
                                                value={usable_balance}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                            <span>{'₮'} </span> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-700"> 1 удаа ашиглах хэмжээ </td>
                                        <td className="text-gray-700 fw-bold">
                                        {couponCode.max_limit ? 
                                            <>
                                                <NumberFormat
                                                    value={couponCode.max_limit}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />
                                                <span>{'₮'} </span>
                                            </>
                                            : 'Хязгаарлахгүй'
                                        }  
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                }
                {navText === 'service' && <div className="bg-light px-10 py-5 min-h-250px">
                    <table className="fw-semibold fs-6 w-100">
                        <tbody>
                            {couponCode.is_all_services === true && 
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <span className="fw-semibold fs-5 text-gray-700">Бүх үйлчилгээ</span>
                                    </td>
                                    <td>
                                        <KTSVG path='/media/icons/duotune/general/gen043.svg' className='svg-icon-1 svg-icon-success' />
                                    </td>
                                </tr>
                            }
                            {!couponCode.is_all_services && couponCode.services && couponCode.services.map((service) => {
                                return (
                                    <tr className="pt-2" key={service.value}>
                                        <td className="d-flex align-items-center">
                                            <span className="fw-semibold text-gray-700 flex-grow-1">{service.label}</span>
                                            <KTSVG path='/media/icons/duotune/general/gen043.svg' className='svg-icon-1 svg-icon-success' />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                }
                {navText === 'history' && <div className="bg-light px-10 py-5 min-h-250px">
                    <div className='table-responsive'>
                        <table className="fw-semibold fs-6 w-100">                         
                            <tbody>
                                {couponCode.payments && couponCode.payments.map((detail, index) => {
                                    return (
                                        <tr key={detail.id} className="mt-2 text-gray-700">
                                            <td className="d-flex align-items-center">
                                                <span className={clsx('bullet bullet-vertical h-15px',
                                                    bulletColors && `bg-${bulletColors[index]}`
                                                    )}></span>
                                                <div className='ms-4'> {detail.customer_name}  </div>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    className="ms-auto align-self-end"
                                                    value={detail?.amount || 0} 
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />₮
                                            </td>
                                            <td>
                                                {Moment(detail.created_at).format('YYYY/MM/DD')} {Moment(detail.created_at).format('HH:MM')}
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                }

            </div>
        </div>
    )
}

export default CouponDetail