import { FC } from 'react';
import { Item } from '../../core/_models';
import { KTSVG} from '../../../../../_metronic/helpers';
import { NumericFormat as NumberFormat}from 'react-number-format';
import { useCalendarItem } from '../../core/CalendarItemProvider';

type Props = {
    item: Item
    index?: number
    viewType: string
}

const labelStyle = {
    style: {
        flexShrink: 0,
        width: '50px'
    }
}

const ItemDetail: FC<Props> = ({item, index, viewType}) => {
    const {setItemDatas} = useCalendarItem()
    const data = {
        ...item,
        service_name: item.service_name || item.service_obj?.label,
        resource_name: item.resource_name || item.resource_obj?.label,
        price: item.price || item.service_obj?.price,
        user_name: item.user_obj?.title || item.user_name,
    }
    
    const removeItem = () => {
        setItemDatas(prevData => {return(prevData.filter((item, seq) => seq !== index))})
    }
 
    return (
        <div className='mb-4'>
            <div className='d-flex align-items-center'>
                <div className='text-gray-800 fs-6' style={labelStyle.style}>{item.start_time}</div>
                <span className='bullet bullet-vertical h-45px bg-info me-5'></span>

                <div className='flex-grow-1'>
                    <div className='text-gray-800 fw-bolder fs-6'>
                        {data.service_name}
                    </div>
                    <span className='text-muted fw-bold d-block'>
                        {data.user_name + ' дээр '} {data.duration + 'мин'} 
                        {data.resource_name ? ', ' + data.resource_name : ''}  
                        <br/>
                    </span>
                    
                    <NumberFormat
                        className="text-gray-800 fw-bold align-self-start fs-6 pt-1"
                        value={data.price} 
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                    <span className='text-gray-800 fw-bold align-self-start pt-0'>{' ₮'} </span>
                </div>

                {viewType === 'edit' && 
                    <div className='justify-content-between d-flex'>
                        <div
                            className='btn btn-icon btn-sm btn-icon-danger'
                            data-event-item-action='close'
                            onClick={() => removeItem()}
                            style={{cursor: 'pointer'}}
                        >
                            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                        </div>
                    </div>
                }
            </div>
            <div className="pt-3 notice d-flex bg-light-secondary rounded border-secondary border p-6">
                <div className="d-flex flex-stack flex-grow-1">
                    <div className="fs-6 text-gray-800"> {data.treatment} </div>
                </div>  
            </div>

        </div>
    )
}

export {ItemDetail}