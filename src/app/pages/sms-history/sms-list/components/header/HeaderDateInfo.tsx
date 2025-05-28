import {useEffect, useState} from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format'
import { DateRange } from '../../../../../../_metronic/helpers/components/DateRange';
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { useQueryResponseData } from '../../core/QueryResponseProvider';
import { initialQueryState } from '../../../../../../_metronic/helpers';

const HeaderDateInfo = () => {
  const {updateState} = useQueryRequest()
  const queryData = useQueryResponseData()
 
  const [smsLimit, setSmsLimit] = useState(0)
  const [smsCount, setSmsCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)

  useEffect(() => {
    queryData && queryData[0] && setSmsLimit(parseInt(queryData[0].sms_left as string))
    queryData && queryData[0] && setSmsCount(parseInt(queryData[0].sms_count as string))
    queryData && queryData[0] && setSuccessCount(parseInt(queryData[0].success_count as string))
    queryData && queryData[0] && setFailedCount(parseInt(queryData[0].failed_count as string))
  }, [queryData])

  const onDateRangeChanged = (startDate: string, endDate: string) => {
    updateState({dates: {start_date: startDate, end_date: endDate}, ...initialQueryState})
  }

  return (
    <div className='card-header border-0 pt-5'>
      <h3 className='card-title align-items-start flex-column'>
        <span className='text-muted mt-1 fw-bold fs-7'>Үлдсэн мессэж эрх: 
           {' '}
            <NumberFormat className="pt-1" value={smsLimit} displayType={'text'} thousandSeparator={true}/>
        </span>
        <span className='text-muted mt-1 fw-bold fs-7'>Хугацааны завсарт нийт: 
          {' '}
            <NumberFormat className="pt-1" value={smsCount} displayType={'text'} thousandSeparator={true}/>
        </span>
      </h3>
      <h3 className='card-title align-items-start flex-column'>
        <span className='text-muted mt-1 fw-bold fs-7'>Үүнээс амжилттай: 
           {' '}
            <NumberFormat className="pt-1" value={successCount} displayType={'text'} thousandSeparator={true}/>
        </span>
        <span className='text-muted mt-1 fw-bold fs-7'>Үүнээс амжилтгүй: 
          {' '}
            <NumberFormat className="pt-1" value={failedCount} displayType={'text'} thousandSeparator={true}/>
        </span>
      </h3>
      <DateRange onDateChanged={onDateRangeChanged} defaultTab='today'/>
    </div>
  )
}

export {HeaderDateInfo}
