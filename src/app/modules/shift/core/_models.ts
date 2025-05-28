import { Dispatch, SetStateAction } from 'react'
import { ID,  Response} from '../../../../_metronic/helpers'
import { Branch } from '../../branch/core/_models'

export type User = {
    value?: ID
    label?: string
    id?: ID
    title?: string
    branch_id?: string
}

export type UsersQueryResponse = Response<Array<User>>
export type MasterDataResponse = Response<MasterData>

export type MasterData = {
  users: Array<User>
  branches: Array<Branch>
}

export type CalendarDataContextProps = {
  users: Array<User>
  branches: Array<Branch>
  refetch: () => void
}

export type TimeOffContextProps = {
  timeOffIdForUpdate: ID
  setTimeOffIdForUpdate: Dispatch<SetStateAction<ID>>
}

export const initialCalendarData: CalendarDataContextProps = {
  users: [],
  branches: [],
  refetch: () => {}
}

export type ScheduleContextProps = {
  startDate: string
  endDate: string
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
}

export const initialScheduleData: ScheduleContextProps = {
  startDate: '',  
  endDate: '',
  setStartDate: () => {},
  setEndDate: () => {},
}


export type DaySchedule = {
  enabled: boolean
  start: string
  end: string
  name: string
  dayIndex: number
};

export type Schedule = {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
};

export type ScheduleData = {
  schedule: Schedule
  start_date: string
  end_date: string
  user_id: ID
  branch_id: ID
};

export type ShiftHoursByUser = {
  id?: ID
  name?: string
  branch_id?: string
  businessHours: Array<string>
  color:string
};

