import React, { useEffect } from "react"
import { Branch } from "../core/_models"

type Props = {
    formik: any
    branches: Array<Branch>
}

const ServiceBranches: React.FC<Props> = ({formik, branches}) => {   
    useEffect(() => {
        if(formik.values.available_all_branch && formik.values.checked_branches.length === 0) {
            checkAllBranch()
        }
    }, [])

    const updateData = (field: string, value: any) => {
        formik.setFieldValue(field, value)
        value == true ? checkAllBranch() : unCheckAllBranch()
    }

    const checkAllBranch = () => {
        let newArrayBranches:Array<string> = []
        branches.map((branch) => {
            branch.id && newArrayBranches.push(branch.id.toString())
        })
        formik.setFieldValue('checked_branches', newArrayBranches)
    }

    const unCheckAllBranch = () => {
        formik.setFieldValue('checked_branches', [])
    }
 
    const handleCheck = (field: string, checked: boolean, value: string) => {
        const checkedBranches:Array<string> = formik.values.checked_branches
        let newArrayBranches = []
        if(checked) 
            newArrayBranches = [...checkedBranches, value]
        else 
            newArrayBranches = checkedBranches.filter(branch => branch !== value)
        
        formik.setFieldValue(field, newArrayBranches)
        
        if(newArrayBranches.length === branches.length && !formik.values.available_all_branch) {
            formik.setFieldValue('available_all_branch', true)
        } else if(newArrayBranches.length !== branches.length && formik.values.available_all_branch) {
            formik.setFieldValue('available_all_branch', false)
        }
    }

    return (
        <div className="card card-flush py-4">
            <div className="card-header">
                <div className="card-title">
                    <h2>Салбар</h2>
                </div>
            </div>
            <div className="card-body pt-0">
                <div className="mb-3">
                    
                    <label className='form-check form-check-inline form-check-success form-check pe-10 pb-3'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='available_all_branch'
                            value={formik.values.available_all_branch}
                            onChange={() => {
                                updateData('available_all_branch', !formik.values.available_all_branch)
                            }}
                            checked={formik.values.available_all_branch}
                        />
                        <span className='fw-bold ps-2 fs-6'>Бүх салбар</span>
                    </label>
                </div>

                <div className="mb-0 fv-row">
                    <div className='mt-3'>
                        {branches.map((branch, index) => 
                            <label className='form-check form-check-inline form-check-success form-check pe-15 pb-7' key={index}>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    value={branch.id?.toString()}
                                    checked={formik.values.checked_branches.includes(branch.id?.toString())}
                                    onChange={(e) => {
                                        handleCheck('checked_branches', e.target.checked, e.target.value)
                                    }}
                                />
                                <span className='fw-bold ps-2 fs-6'>{branch.name}</span>
                            </label>
                        )}
                        {(formik.errors.checked_branches) && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{formik.errors.checked_branches}</div>
                        </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
        
    )
}

export default ServiceBranches