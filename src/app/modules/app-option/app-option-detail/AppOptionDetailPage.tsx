import React, { useEffect, useState } from 'react'
import { AppOptionDetailEdit } from './AppOptionDetailEdit'
import { CRUD_RESPONSES, ID, objectHasAttr, QUERIES } from '../../../../_metronic/helpers'
import { useQuery } from 'react-query'
import { getServiceById } from '../core/_requests'
import { useLocation } from 'react-router-dom'
import { Branch, CategoryOption, Resource, Service, ServiceType, User } from '../core/_models'
import { WarningAlert } from '../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../_metronic/helpers/alerts/Error'

export const AppOptionDetailPage: React.FC = () => {
    const location: any = useLocation()
    const [itemIdForUpdate] = useState<ID>(location.state?.itemIdForUpdate || 0) 
    const [selectedCategoryId] = useState<ID>(location.state?.selectedCategoryId || 0) 
    const [categories, setCategories] = useState<Array<CategoryOption>>()
    const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>()
    const [resources, setResources] = useState<Array<Resource>>()
    const [branches, setBranches] = useState<Array<Branch>>()
    const [users, setUsers] = useState<Array<User>>()
    const [service, setService] = useState<Service>({
        status: 1,
        name: '',
        desc: '',
        type: 1, 
        code: '',
        allow_resources: false,
        available_all_branch: true,
        available_all_user: true,
    })

    const {
        isLoading,
        data,
        error,
    } = useQuery(
        `${QUERIES.SERVICE_DETAIL}-service-${itemIdForUpdate}`,
        () => {
            return getServiceById(itemIdForUpdate)
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
        if(data && data.data) {
            const masterData = data.data
            setCategories(masterData.categories)
            setResources(masterData.resources)
            setServiceTypes(masterData.serviceTypes)
            setBranches(masterData.branches)
            setUsers(masterData.users)
            if(objectHasAttr(masterData.service)) setService(masterData.service)
        }
    }, [data])

    if (!isLoading && !error && service && categories && resources && serviceTypes && branches && users) {
        return (<AppOptionDetailEdit 
            service={service} 
            categories={categories} 
            resources={resources} 
            selectedCategoryId={selectedCategoryId}
            serviceTypes={serviceTypes}
            branches={branches}
            users={users}
        />
        )
    }

    if(!isLoading && !data) {
        return (
            <div>
                <div className="card-px text-center pt-0 pb-15">
                    <p className="text-gray-400 fs-4 fw-bold py-7">Эмчилгээний мэдээлэл олдсонгүй.</p>
                </div>
                <div className="text-center pb-0 px-5">
                    <img src="/media/illustrations/sketchy-1/4.png" alt="" className="mw-100 h-200px h-sm-325px" />
                </div>
            </div>
        )
    }

    return null    
}
