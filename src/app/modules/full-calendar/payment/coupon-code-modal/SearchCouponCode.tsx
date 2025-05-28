/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { KTSVG } from '../../../../../_metronic/helpers';
import { useCalendarQuery } from '../../core/CalendarQueryProvider';

const SearchCouponCode = () => {
    const {updateState} = useCalendarQuery()
    const [searchTerm, setSearchTerm] = useState<string>('')

    return (
        <div className="mb-5 w-100">
            <div className="input-group">
                <input type="text" 
                    className="form-control" 
                    placeholder="Купон код хайх" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text" id="basic-addon1" onClick={() => updateState({search: searchTerm})}>
                    <KTSVG
                        path='/media/icons/duotune/general/gen021.svg'
                        className='svg-icon-2 svg-icon-lg-1 svg-icon-primary'
                    />
                </span>
            </div>
            
        </div> 
    )
}

export {SearchCouponCode}