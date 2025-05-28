import { ID, Response } from "../../../../_metronic/helpers"

export type Resource = {
    id?: ID
    name?: string
    status?: number
    desc?: string
}

export type ResourcesQueryResponse = Response<Array<Resource>>