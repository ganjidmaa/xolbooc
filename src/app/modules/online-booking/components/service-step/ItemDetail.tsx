import { FC } from 'react';
import { NumericFormat as NumberFormat}from 'react-number-format';
import { Service } from '../../core/_models';

type Props = {
    item: Service
}

const ItemDetailOnlineBooking: FC<Props> = ({item}) => {
    const service = {
        ...item,
    }
 
    return (
        <div className='d-flex align-items-center mb-4'>
            
            <div className='text-gray-800 fs-6'></div>
            <span className='bullet bullet-vertical h-45px bg-warning me-5'></span>
            <div className='flex-grow-1'>
                <div className='text-hover-primary fw-bolder text-gray-800'>
                    {service.name}
                </div>
                <span className='text-muted fw-semibold d-block'>{service.duration + 'мин'}</span>
            </div>
            
            <NumberFormat
                className="align-self-start pt-1"
                value={service.price} 
                displayType={'text'}
                thousandSeparator={true}
            />
            <span className='align-self-start pt-1'>{' ₮'} </span>
        </div>
    )
}

export {ItemDetailOnlineBooking}