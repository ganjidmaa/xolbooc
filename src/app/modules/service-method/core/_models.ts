import {ID, Response} from '../../../../_metronic/helpers'
export type ServiceMethod = {
  id: ID
  name: string
  content: string
}

export type MasterData = Array<ServiceMethod>

export type ServiceMethodsQueryResponse = Response<MasterData>

export const initialServiceMethod: ServiceMethod = {
  id: 0,
  name: '',
  content: ''
}
