/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NumericFormat as NumberFormat}from "react-number-format"
import Moment from 'moment';
import clsx from 'clsx';
import { CouponCode } from '../coupon-codes-list/core/_models';
import { couponClasses, couponStatusNames } from '../../../../../_metronic/helpers';

type Props = {
  className: string
  couponCode: CouponCode
}

const CouponCodeDetail: React.FC<Props> = ({className, couponCode}) => {
    const bulletColors = ['info', 'warning', 'success', 'danger', 'primary', 'info', 'warning', 'success', 'danger', 'primary'];

    return (
    <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start'>
                <span className='card-label fw-bold fs-3 mb-1'>Купон ашиглалтын түүх</span>
            </h3>
        </div>
        <div className='card-body'>
            <div className='d-flex col-12 col-xs-10 flex-column flex-md-row gap-10 gap-md-10'>
                <div className="bg-light p-3 col-md-5 col-sm-10">
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
                                        <td className="text-gray-700 w-250px">Төлөв</td>
                                        <td className="text-gray-700 fw-bold">
                                            <div className={couponClasses.filter(cl => cl.status === couponCode.status)[0]?.class }>
                                                {couponStatusNames.filter(name => name.status === couponCode.status)[0]?.name }
                                            </div>
                                        </td>
                                    </tr>
        
                                    <tr>
                                        <td className="text-gray-700 w-250px">Төрөл</td>
                                        <td className="text-gray-700 fw-bold">
                                            <div>
                                                {couponCode.type === 'mass' ? 'Олон удаагийн' : 'Нэг удаагийн'}
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td className="text-gray-700">{couponCode.type ? 'Ашиглах боломжит тоо' : 'Нийт үүсгэх тоо'}</td>
                                        <td className="text-gray-700 fw-bold">
                                        {couponCode.sell_limit ? (couponCode.limit_number) : 'Хязгаарлахгүй'}
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
                                                value={(Number(couponCode.value) ?? 0) - (Number(couponCode.redeemed) ?? 0)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                            <span>{'₮'} </span> 
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='table-responsive col-md-6 col-sm-10'>
                    <table className="table align-middle fw-semibold fs-6 w-100">
                        <thead>
                            <tr className='fw-bold text-muted bg-light'>
                                <th className='min-w-125px ps-4 rounded-start'>Хэн</th>
                                <th className='min-w-125px'>Хэдийг</th>
                                <th className='min-w-125px rounded-end'>Хэзээ</th>
                            </tr>
                        </thead>                         
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
        </div>

    </div>
    )
}

export {CouponCodeDetail}
