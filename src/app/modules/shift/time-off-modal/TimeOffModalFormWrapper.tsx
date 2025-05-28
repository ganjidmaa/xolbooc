import {TimeOffModalForm} from './TimeOffModalForm'
import { useCalendarData } from '../core/ShiftMasterDataProvider'


const TimeOffModalFormWrapper = () => {
  const {branches, users} = useCalendarData()
  

  if (branches && users) {
    return <TimeOffModalForm  users={users} branches={branches}/>
  }

  return null
}

export {TimeOffModalFormWrapper}
