import React, { useEffect, useState } from 'react'
import { CRUD_RESPONSES, QUERIES } from '../../../../_metronic/helpers'
import { useQuery } from 'react-query'
import { WarningAlert } from '../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../_metronic/helpers/alerts/Error'
import { Branch } from '../core/_models'
import { getBranchById } from '../core/_requests'
import { useListView } from '../branches-list/provider/ListViewProvider'
import { BranchDetail } from './BranchDetail'

export const BranchDetailPage: React.FC = () => {
    const [branch, setBranch] = useState<Branch>()
    const {itemIdForUpdate} = useListView()

    const {
        isLoading,
        data,
        error,
    } = useQuery(
        `${QUERIES.BRANCH_LIST}-branch-${itemIdForUpdate}`,
        () => {
            return getBranchById(itemIdForUpdate)
        },
        {
            cacheTime: 0,
            onError: (err: any) => {
                console.error(err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
            retryOnMount: false,
            retry: false,
        }
    )

    useEffect(() => {
        if(data && data.data)
            setBranch(data.data)
    }, [data])

    if (!isLoading && !error && branch) {
        return (
            <BranchDetail branch={branch}/>
        )
    }

    return null    
}
