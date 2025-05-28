import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useListView} from '../provider/ListViewProvider'
import {ServicesListLoading} from '../components/loading/ServicesListLoading'
import {useQueryResponse} from '../provider/QueryResponseProvider'
import { Category } from '../../core/_models'
import { createCategory, updateCategory } from '../../core/_requests'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../_metronic/helpers'
import { NotifySuccess } from '../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'

type Props = {
  isServiceLoading: boolean
  category: Category
}

const editServiceSchema = Yup.object().shape({
  name: Yup.string()
    .required('Нэр оруулна уу')
})

const CategoryEditModalForm: FC<Props> = ({category, isServiceLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [serviceForEdit] = useState<Category>({
    ...category,
    name: category.name || '',
    is_app_option: category.is_app_option
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: serviceForEdit,
    validationSchema: editServiceSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await updateCategory(values)
        else
          response = await createCategory(values)

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
      <form id='kt_modal_add_category_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_service_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_service_header'
          data-kt-scroll-wrappers='#kt_modal_add_service_scroll'
          data-kt-scroll-offset='300px'
        >

          <div className='fv-row mb-7'>
            <label className="d-block fw-bold fs-6 mb-2 required">Нэр</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Нэр" 
              {...formik.getFieldProps('name')} 
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.name}</div>
              </div>
            )} 
          </div>
          <div className='fv-row mb-7'>
          <label className='col-lg-4 col-xl-3 col-form-label fw-bold fs-6'>
                Онлайнаар захиалах
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    {...formik.getFieldProps('is_app_option')}
                    checked={formik.values.is_app_option}
                  />
                  <label className='form-check-label'></label>
                </div>
              </div>
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isServiceLoading}
          >
            Болих
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isServiceLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {(formik.isSubmitting || isServiceLoading) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

      </form>
      {(formik.isSubmitting || isServiceLoading) && <ServicesListLoading />}
    </>
  )
}

export {CategoryEditModalForm}
