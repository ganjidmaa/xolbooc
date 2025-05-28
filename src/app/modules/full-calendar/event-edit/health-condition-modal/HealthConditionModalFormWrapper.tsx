import {useQuery} from 'react-query'
import {HealthConditionModalForm} from './HealthConditionModalForm'
import {CRUD_RESPONSES, ID, QUERIES} from '../../../../../_metronic/helpers'
import {FC, useEffect, useState} from 'react'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {useCalendarView} from '../../core/CalendarViewProvider'
import {HealthCondition} from '../../core/_models'
import {getHealthCondition} from '../../core/_requests'

type Props = {
  id: ID
  setFunction: any
}

const HealthConditionModalFormWrapper:FC<Props> = ({id , setFunction}) => {
  const {healthCondition, setHealthCondition} = useCalendarView()
  const [healthConditionData, setHealthConditionData] = useState<HealthCondition>({appointment_id: 0})
  var idToUse = id === undefined ? healthCondition: id
  const {isLoading, data} = useQuery(
    `${QUERIES.HEALTH_CONDITION}-${idToUse}`,
    () => {
      return getHealthCondition(idToUse)
    },
    {
      cacheTime: 0,
      onError: (err) => {
        setFunction === undefined ? setHealthCondition(undefined): setFunction()
        console.error(err)
        ErrorAlert(CRUD_RESPONSES.error)
      },
    }
  )

  useEffect(() => {
    if (data) {
      setHealthConditionData(data)
    }
  }, [data])

  if (healthConditionData.appointment_id !== 0) {
    return <HealthConditionModalForm healthConditionData={healthConditionData} setFunction={setFunction}/>
  }

  return (
  <>
  <div>
    Loading....
  </div>
  </>)
}

export {HealthConditionModalFormWrapper}
