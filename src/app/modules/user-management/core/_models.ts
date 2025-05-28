import { Dispatch, SetStateAction } from 'react'
import {GroupSoumDistrict, ID, Province, Response} from '../../../../_metronic/helpers'
import { Branch } from '../../branch/core/_models'

export type User = {
  id?: ID
  firstname?: string
  lastname?: string
  avatar?: any
  email?: string
  password?: string
  passwordConfirmation?: string
  registerno?: string
  avatar_url? : string
  phone?: string
  phone2?: string
  province_id?: ID
  soum_district_id?: ID
  street?: string
  street1?: string
  address?: string
  file?: any
  status?: string
  role_id?: ID
  role?: string
  branch_id?: Array<Branch> | string
  branch_name?: string
  show_in_online_booking?: boolean
  initials?: {
    label: string
    state: string
  }
}
export type UsersQueryResponse = Response<Array<User>>
export type MasterDataResponse = Response<MasterData>

export type MasterData = {
  provinces: Array<Province>
  soumDistricts: Array<GroupSoumDistrict>
  user: User
  roles: Array<Role>
  branches: Array<Branch>
}

export const initialUser: User = {
  avatar: '',
  firstname: '',
  lastname: '',
  registerno: '',
  email: '',
  phone: '',
  phone2: '',
  province_id: 0,
  soum_district_id: 0,
  street: '',
  street1: '',
  file: {},
  status: 'active',
  password: '',
  passwordConfirmation: '',
  branch_id: [],
  role_id: 0
}

export type Role = {
  id?: ID
  name?: string
  value?: ID
  label?: string
}

export interface IUpdateEmail {
  email: string
  confirmPassword: string
}

export interface IUpdatePassword {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

export const updatePassword: IUpdatePassword = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
}

export type DetailViewContextProps<T> = {
  itemIdForDetail?: ID,
  setItemIdForDetail: Dispatch<SetStateAction<ID>>,
  response?: T,
  provinces?: Array<Province>,
  soumDistricts?: Array<GroupSoumDistrict>,
  refetch: () => void
  roles?: Array<Role>
  branches?: Array<Branch>
}

export const initialDetailView = {
  setItemIdForDetail: () => {},
  refetch: () => {}
}


export type Shift = {
  start: string
  end: string
};

export type DaySchedule = {
  enabled: boolean
  shifts: Shift[]
  name: string
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