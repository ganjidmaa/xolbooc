/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { KTSVG, useDebounce } from '../../../../_metronic/helpers';
import { useCalendarQuery } from '../core/CalendarQueryProvider';

const SearchCustomer = () => {
    const {updateState} = useCalendarQuery()
    const [searchTerm, setSearchTerm] = useState<string>('')
    // Debounce search term so that it only gives us latest value ...
    // ... if searchTerm has not been updated within last 500ms.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 150)
    
    useEffect(
        () => {
            if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
                updateState({search: debouncedSearchTerm})
            }
        },
        [debouncedSearchTerm] 
    )

    return (
        <div className="mb-5 w-100">
            <div className="input-group input-group-solid">
                <span className="input-group-text" id="basic-addon1">
                    <KTSVG
                        path='/media/icons/duotune/communication/com006.svg'
                        className='svg-icon-1 svg-icon-lg-1 svg-icon-primary'
                    />
                </span>
                <input type="text" 
                    className="form-control" 
                    placeholder="Утас, Нэр, Регистрээр хайна уу" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               
            </div>
            
        </div> 
    )
}

export {SearchCustomer}