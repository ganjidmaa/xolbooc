import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../../_metronic/helpers'
import { createComment, updateComment } from '../../core/_requests'
import { CommentLoading } from '../../components/loading/CommentLoading'

import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { Comment } from '../../core/_models'

type Props = {
  comment: Comment
  isLoading: boolean
}

const editCommentSchema = Yup.object().shape({
  title: Yup.string().required('Нэр оруулна уу'),
  body: Yup.string().required('Текст оруулна уу'),
})

const CommentEditModalForm: FC<Props> = ({comment, isLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [commentForEdit] = useState<Comment>({
    ...comment,
  })

  const formik = useFormik({
    initialValues: commentForEdit,
    validationSchema: editCommentSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await updateComment(values)
        else
          response = await createComment(values)
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

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_comment_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_comment_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_comment_header'
          data-kt-scroll-wrappers='#kt_modal_add_comment_scroll'
          data-kt-scroll-offset='300px'
        >

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2 required">Нэр</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Нэр" 
              {...formik.getFieldProps('title')} 
            />
            {formik.touched.title && formik.errors.title && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.title}</div>
              </div>
            )} 
          </div>
          
          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2 required">Текст</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Текст" 
              {...formik.getFieldProps('body')} 
            />
            {formik.touched.body && formik.errors.body && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.body}</div>
              </div>
            )} 
          </div>

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2 required">Од</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Од" 
              {...formik.getFieldProps('stars')} 
            />
            {formik.touched.stars && formik.errors.stars && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.stars}</div>
              </div>
            )} 
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
      {(formik.isSubmitting || isLoading) && <CommentLoading />}
    </>
  )
}

export {CommentEditModalForm}
