import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3, 
  StatsWidget1,
} from '../../../_metronic/partials/widgets'
import Moment from 'moment';
import { MonthIncome, UserAppointment, UserIncome,BranchAppointments } from './core/_models';
import { useQuery } from 'react-query';
import { getDashboardDatas } from './core/_requests';
import { KTCard, objectHasAttr } from '../../../_metronic/helpers';
import { DateRange } from '../../../_metronic/helpers/components/DateRange';
import { ChartsWidget10 } from '../../../_metronic/partials/widgets/charts/ChartsWidget10';
import { ChartsWidget11 } from '../../../_metronic/partials/widgets/charts/ChartsWidget11';

const DashboardPage = () => {
  const [totalIncomeData, setTotalIncomeData] = useState<Array<MonthIncome>>([])
  const [appointmentStatusData, setAppointmentStatusData] = useState<any>([])
  const [userIncome, setUserIncome] = useState<Array<UserIncome>>([])
  const [userAppointment, setUserAppointment] = useState<UserAppointment>()
  const [branchAppointments, setBranchAppointments] = useState<Array<BranchAppointments>>([])
  const [branchIncomes, setBranchIncomes] = useState<Array<BranchAppointments>>([])

  const [interval, setInterval] = useState([Moment().format('YYYY/01/01'), Moment().format('YYYY/12/31')])
 
  const {
    refetch,
    data: response,
  } = useQuery(
      `dashboard-data`,
      () => {
        const values = {
          interval,
        }
        
        return getDashboardDatas(values)
      },
      {
        cacheTime: 0,
        onError: (err) => {
            console.error('getDashboardDatas error', err)
        }
      }
  )

  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  useEffect(() => {
    if(response && response.data) {
      setTotalIncomeData(response.data.totalIncome)
      setAppointmentStatusData(response.data.appointmentStatusData)
      setUserIncome(response.data.userIncome)
      setUserAppointment(response.data.userAppointment)
      setBranchAppointments(response.data.branchAppointments)
      setBranchIncomes(response.data.branchIncomes)
    }
  }, [response])

  useEffect(() => {
    refetch()
  }, [interval])

  const onDateRangeChanged = (startDate: string, endDate: string) =>{
    setInterval([startDate, endDate])
  }

  return (
      <>
        <KTCard>
          <DateRange onDateChanged={onDateRangeChanged} defaultTab='year'>
            <h3 className='card-title fw-bold my-2'>График, чарт </h3>
          </DateRange>
        </KTCard>
      
        <div className='row g-5 g-xl-6 my-3'>    
          <div className='col-xxl-6'>
            {totalIncomeData.length > 0 && 
              <ChartsWidget3 className='card-xl-stretch mb-xl-8'
                dataProp={totalIncomeData}
              />
            }
          </div>

          <div className='col-xxl-6'>
            {objectHasAttr(appointmentStatusData) && 
              <StatsWidget1 className='card-xl-stretch mb-xl-8'
                dataProp={appointmentStatusData}
              />
            }
          </div>

          <div className='col-xxl-6'>
            {branchAppointments.length > 0 && 
              <ChartsWidget10 className='card-xl-stretch gy-xl-0'
                dataProp={branchAppointments}
              />
            }
          </div>
          <div className='col-xxl-6'>
            {branchIncomes.length > 0 && 
              <ChartsWidget11 className='card-xl-stretch gy-xl-0'
                dataProp={branchIncomes}
              />
            }
          </div>
          <div className='col-xxl-6'>
            {userIncome.length > 0 && 
              <ChartsWidget1 className='card-xl-stretch gy-xl-0'
                dataProp={userIncome}
              />
            }
          </div>
          <div className='col-xxl-6'>
            {userAppointment && 
              <ChartsWidget2 className='card-xl-stretch gy-xl-0'
                dataProp={userAppointment}
              />
            }
          </div>
         
        </div>
      </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
