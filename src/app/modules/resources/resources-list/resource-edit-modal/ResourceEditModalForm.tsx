import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useListView} from '../provider/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {useQueryResponse} from '../provider/QueryResponseProvider'
import { Resource } from '../../core/_models'
import { createResource, updateResource } from '../../core/_requests'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../_metronic/helpers'
import { NotifySuccess } from '../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'

type Props = {
  isLoading: boolean
  resource: Resource
}

const editResourceSchema = Yup.object().shape({
  name: Yup.string()
    .required('Нэр оруулна уу')
})

const ResourceEditModalForm: FC<Props> = ({resource, isLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [resourceForEdit] = useState<Resource>({
    ...resource,
    name: resource.name || '',
    status: resource.status,
    desc: resource.desc || ''
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: resourceForEdit,
    validationSchema: editResourceSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(resource.id))
          response = await updateResource(values)
        else
          response = await createResource(values)

        const status = response.payload?.status  
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_resource_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_resource_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_resource_header'
          data-kt-scroll-wrappers='#kt_modal_add_resource_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-6'>
            <label className="fw-bold fs-6 mb-2 required">Нэр</label>
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

          <div className='fv-row mb-6'>
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

        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isLoading}
          >
            Болих
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {(formik.isSubmitting || isLoading) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        
      </form>
      {(formik.isSubmitting || isLoading) && <ListLoading />}
    </>
  )
}

export {ResourceEditModalForm}
