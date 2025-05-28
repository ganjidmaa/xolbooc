import React, { useState } from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Select from 'react-select';
import { Branch, CategoryOption, Resource, Service, ServiceType, User } from '../core/_models';
import { createService, updateService } from '../core/_requests';
import { useQueryResponse } from '../app-option-list/provider/QueryResponseProvider';
import { Navigate } from 'react-router-dom';
import { NumericFormat as NumberFormat} from 'react-number-format';
import { NotifySuccess } from '../../../../_metronic/helpers/notify/NotifySuccess';
import { CRUD_RESPONSES, durationOptions, ID } from '../../../../_metronic/helpers';
import { WarningAlert } from '../../../../_metronic/helpers/alerts/Warning';
import { ErrorAlert } from '../../../../_metronic/helpers/alerts/Error';

type Props = {
    service: Service
    categories: Array<CategoryOption>
    serviceTypes: Array<ServiceType>
    resources: Array<Resource>
    branches: Array<Branch>
    users: Array<User>
    selectedCategoryId: ID
}

const serviceDetailsSchema = Yup.object().shape({
    name: Yup.string().required('Нэр оруулна уу'),
    duration: Yup
        .number()
        .required('Хугацаа сонгоно уу'),    
    status: Yup.string().required('Төлөв оруулна уу'),  
})

export const AppOptionDetailEdit: React.FC<Props> =({service}) => {
    const {refetch} = useQueryResponse()
    const [data] = useState<Service>({
        ...service, 
        name: service.name || '',
        desc: service.desc || '',
        price: service.price || '0',
    })

    const [loading, setLoading] = useState(false)
    const [stepBack, setStepBack] = useState(false)

    const formik = useFormik({
        initialValues: data,
        validationSchema: serviceDetailsSchema,
        onSubmit: async(values, {setSubmitting}) => {
            setLoading(true)
            setSubmitting(false)
            try {
                var response: any = {};
                if(values.id)
                    response = await updateService(values)
                else
                    response = await createService(values)
                const status = response.payload?.status

                status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)    
            } catch (ex: any) {
                console.error(ex)
                ex.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            } finally {
                setLoading(false)
                setSubmitting(true)
                cancel(true)
            }
        },
    })
    
    const handleOnChange = (field: string, option: any) => {
        formik.setFieldValue(field, option.value)
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setStepBack(true)
    }

    return (
        <form id="kt_service_edit_form" className="form d-flex flex-column flex-lg-row w-100 ps-lg-20 pe-lg-20"  onSubmit={formik.handleSubmit} noValidate>
            {stepBack && <Navigate to='/app_options/list' />}
            
            {/* <ServiceDetailAside formik={formik}/> */}

            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10 w-md-100">
                <div className="card card-flush py-4">
                    <div className="card-header">
                        <div className="card-title">
                            <h2>Захиалгын онош</h2>
                        </div>
                    </div>
                    <div className="card-body pt-0">

                        <div className="row mb-6">
                            <div className="col-lg-6 fv-row mb-6 mb-lg-0">
                            <label className="fs-6 fw-bold mb-2 required">Нэр</label>
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                placeholder="Нэр"
                                {...formik.getFieldProps('name')} 
                            />
                            {formik.touched.name && formik.errors.name && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.name}</div>
                            </div>
                            )}
                            </div>   

                            <div className="col-lg-6 fv-row">
                                <label className="fs-6 fw-bold mb-2 required">Хугацаа</label>
                                <Select 
                                    options={durationOptions}
                                    {...formik.getFieldProps('duration')}
                                    value={durationOptions ? durationOptions.filter(durOpt => durOpt.value == formik.values.duration)[0] : []}
                                    onChange={(val) => {handleOnChange('duration', val)}}
                                />      
                                {formik.errors.duration && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>{formik.errors.duration}</div>
                                </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="row mb-6">
                            <div className="col-lg-6 fv-row mb-6 mb-lg-0">
                                <label className="fs-6 fw-bold mb-2">Төлбөр</label>
                                <NumberFormat
                                    className="form-control mb-2"
                                    {...formik.getFieldProps('price')} 
                                    thousandSeparator={true}
                                />
                                {formik.touched.price && formik.errors.price && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>{formik.errors.price}</div>
                                </div>
                                )}
                            </div>   

                            <div className='col-lg-6 fv-row'>
                                <label className="fw-bold fs-6 mb-2 required">Төлөв</label>
                                <select className="form-select mb-2" data-control="select2" 
                                    {...formik.getFieldProps('status')}
                                >
                                    <option></option>
                                    <option value="1">Идэвхтэй</option>
                                    <option value="0">Идэвхгүй</option>
                                </select>
                                {formik.touched.status && formik.errors.status && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>{formik.errors.status}</div>
                                </div>
                                )} 
                            </div>
                        </div>

                        <div className='mb-6 fv-row'>
                            <label className="fs-6 fw-bold mb-2">Тайлбар</label>
                            <textarea
                                className='form-control mb-2'
                                rows={3}
                                placeholder='Нэмэлт мэдээлэл'
                                {...formik.getFieldProps('desc')}
                            ></textarea>
                            {formik.touched.desc && formik.errors.desc && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.desc}</div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        type='reset'
                        onClick={() => cancel()}
                        className='btn btn-light me-5'
                        data-kt-users-modal-action='cancel'
                        disabled={loading || formik.isSubmitting}
                    >
                        Болих
                    </button>

                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={loading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Хадгалах</span>
                        {(formik.isSubmitting) && (
                        <span className='indicator-progress'>
                            Түр хүлээнэ үү...{' '}
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                        )}
                    </button>
                </div>
    
            </div>
            
        </form>
    )
}