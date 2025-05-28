import React, { useEffect } from "react"
import { User } from "../core/_models"

type Props = {
    formik: any
    users: Array<User>
}

const ServiceUsers: React.FC<Props> = ({formik, users}) => {   
    useEffect(() => {
        if(formik.values.available_all_user && formik.values.checked_users.length === 0) {
            checkAllUser()
        }
    }, [])

    const updateData = (field: string, value: any) => {
        formik.setFieldValue(field, value)
        value == true ? checkAllUser() : unCheckAllUser()
    }

    const checkAllUser = () => {
        let newArrayUsers:Array<string> = []
        users.map((user) => {
            user.id && newArrayUsers.push(user.id.toString())
        })
        formik.setFieldValue('checked_users', newArrayUsers)
    }

    const unCheckAllUser = () => {
        formik.setFieldValue('checked_users', [])
    }
 
    const handleCheck = (field: string, checked: boolean, value: string) => {
        const checkedUsers:Array<string> = formik.values.checked_users
        let newArrayUsers = []
        if(checked) 
            newArrayUsers = [...checkedUsers, value]
        else 
            newArrayUsers = checkedUsers.filter(user => user !== value)
        
        formik.setFieldValue(field, newArrayUsers)
        
        if(newArrayUsers.length === users.length && !formik.values.available_all_user) {
            formik.setFieldValue('available_all_user', true)
        } else if(newArrayUsers.length !== users.length && formik.values.available_all_user) {
            formik.setFieldValue('available_all_user', false)
        }
    }

    return (
        <div className="card card-flush py-4">
            <div className="card-header">
                <div className="card-title">
                    <h2>Багийн гишүүд</h2>
                </div>
            </div>
            <div className="card-body pt-0">
                <div className="mb-3">
                    
                    <label className='form-check form-check-inline form-check-success form-check pe-10 pb-3'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='available_all_user'
                            value={formik.values.available_all_user}
                            onChange={() => {
                                updateData('available_all_user', !formik.values.available_all_user)
                            }}
                            checked={formik.values.available_all_user}
                        />
                        <span className='fw-bold ps-2 fs-6'>Бүх гишүүд</span>
                    </label>
                </div>

                <div className="mb-0 fv-row">
                    <div className='mt-3'>
                        {users.map((user, index) => 
                            <label className='form-check form-check-inline form-check-success form-check pe-15 pb-7' key={index}>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    value={user.id?.toString()}
                                    checked={formik.values.checked_users.includes(user.id?.toString())}
                                    onChange={(e) => {
                                        handleCheck('checked_users', e.target.checked, e.target.value)
                                    }}
                                />
                                <span className='fw-bold ps-2 fs-6'>{user.firstname}</span>
                            </label>
                        )}
                        {(formik.errors.checked_users) && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{formik.errors.checked_users}</div>
                        </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
        
    )
}

export default ServiceUsers