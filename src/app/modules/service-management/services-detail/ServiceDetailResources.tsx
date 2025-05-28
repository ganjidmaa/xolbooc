import React from "react"
import { Resource } from "../core/_models"

type Props = {
    formik: any
    resources: Array<Resource>
}

const ServiceDetailResources: React.FC<Props> = ({formik, resources}) => {    
    const updateData = (field: string, value: any) => {
        formik.setFieldValue(field, value)
    }

    const handleCheck = (field: string, checked: boolean, value: string) => {
        const checkedResources:Array<string> = formik.values.checked_resources
        let newArrayResources = []
        if(checked) 
            newArrayResources = [...checkedResources, value]
        else 
            newArrayResources = checkedResources.filter(resource => resource !== value)
        
        formik.setFieldValue(field, newArrayResources)
    }

    return (
            <div className="card card-flush py-4">
                <div className="card-header">
                    <div className="card-title">
                        <h2>Нөөц</h2>
                    </div>
                </div>
                <div className="card-body pt-0">
                    <div className="mb-10 row">
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Нөөц хуваарилах эсэх</label>

                        <div className='col-lg-8 d-flex align-items-center'>
                            <div className='form-check form-check-solid form-switch fv-row'>
                                <input
                                    className='form-check-input w-45px h-30px'
                                    type='checkbox'
                                    name='allow_resources'
                                    value={formik.values.allow_resources}
                                    onChange={() => {
                                        updateData('allow_resources', !formik.values.allow_resources)
                                    }}
                                    checked={formik.values.allow_resources}
                                />
                                <label className='form-check-label'></label>
                            </div>
                        </div>
                    </div>

                    {formik.values.allow_resources && 
                    <div className="mb-0 fv-row">
                        <div className='mt-3'>
                            {resources.map((resource, index) => 
                                <label className='form-check form-check-inline form-check-success form-check pe-15 pb-7' key={index}>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        value={resource.id?.toString()}
                                        checked={formik.values.checked_resources.includes(resource.id?.toString())}
                                        onChange={(e) => {
                                            handleCheck('checked_resources', e.target.checked, e.target.value)
                                        }}
                                    />
                                    <span className='fw-bold ps-2 fs-6'>{resource.name}</span>
                                </label>
                            )}
                            {(formik.errors.allow_resources || formik.errors.checked_resources) && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.allow_resources ? formik.errors.allow_resources : formik.errors.checked_resources}</div>
                            </div>
                            )}
                        </div>
                    </div>
                    }

                </div>
            </div>
        
    )
}

export default ServiceDetailResources