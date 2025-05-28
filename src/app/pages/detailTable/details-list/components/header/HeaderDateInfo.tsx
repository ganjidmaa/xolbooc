import {useEffect, useState} from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format'
import { DateRange } from '../../../../../../_metronic/helpers/components/DateRange';
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { useQueryResponseData } from '../../core/QueryResponseProvider';
import { initialQueryState } from '../../../../../../_metronic/helpers';

const HeaderDateInfo = () => {
  const {updateState} = useQueryRequest()
  const queryData = useQueryResponseData()
 
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)

  useEffect(() => {
    queryData && queryData[0] && setTotalPayment(parseInt(queryData[0].total_payment as string))
    queryData && queryData[0] && setTotalPaid(parseInt(queryData[0].total_paid as string))
  }, [queryData])


  const onDateRangeChanged = (startDate: string, endDate: string) => {
    updateState({dates: {start_date: startDate, end_date: endDate}, ...initialQueryState})
  }

  return (
    <div className='card-header border-0 pt-5'>
      <h3 className='card-title align-items-start flex-column'>
        <span className='text-muted mt-1 fw-bold fs-7'>Нийт төлбөр: 
           {' '}
            <NumberFormat className="pt-1" value={totalPayment} displayType={'text'} thousandSeparator={true}/>
            ₮
        </span>
        <span className='text-muted mt-1 fw-bold fs-7'>Нийт төлсөн: 
          {' '}
            <NumberFormat className="pt-1" value={totalPaid} displayType={'text'} thousandSeparator={true}/>
            ₮
        </span>
      </h3>
      <DateRange onDateChanged={onDateRangeChanged} defaultTab='today'/>
      
    </div>
  )
}

export {HeaderDateInfo}
