import {FC} from 'react'
import {useFormik} from 'formik'
import { ServiceMethod } from '../core/_models'
import { updateOrCreateServiceMethod } from '../core/_requests'
import { useListView } from '../service-method-list/provider/ListViewProvider'
import * as Yup from 'yup'
import { useQueryResponse } from '../service-method-list/provider/QueryResponseProvider'
import { NotifySuccess } from '../../../../_metronic/helpers/notify/NotifySuccess' 
import {CRUD_RESPONSES} from '../../../../_metronic/helpers' 


type Props = {
  serviceMethod: ServiceMethod
}

const editServiceMethodSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .required('Нэр оруулна уу'),
  content: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .required('Агуулга оруулна уу'),  
})

const ServiceMethodModalForm: FC<Props> = ({serviceMethod}) => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView();
  const {refetch} = useQueryResponse();
  const formik = useFormik({
    initialValues: {...serviceMethod},
    validationSchema: editServiceMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const response = await updateOrCreateServiceMethod(values)
        response && refetch()
        response && NotifySuccess(CRUD_RESPONSES.success)
      } catch (ex: any) {
        console.error(ex)
      } finally {
        setSubmitting(false)
        setItemIdForUpdate(undefined)
      }
    },
  })
  console.log(formik)

  return (
    <>
      <div className='row mb-6'>
            <div className='fv-row col-lg-12 mb-6 mb-lg-0'>
              <label className="d-block fw-bold fs-6 mb-2 required">Нэр (Түлхүүр үг)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Нэр (Түлхүүр үг)" 
                {...formik.getFieldProps('name')} 
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.name}</div>
                </div>
              )} 
            </div>
      </div>
      <div className='row mb-6'>
            <div className='fv-row col-lg-12'>
              <label className="d-block fw-bold fs-6 mb-2 required">Агуулга</label>
              <textarea
                  className='form-control mb-2'
                  rows={3}
                  placeholder='Эмчилгээ, зөвлөгөө'
                  {...formik.getFieldProps('content')}
                ></textarea>
              {formik.touched.content && formik.errors.content && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.content}</div>
                </div>
              )}
            </div>
          </div>
      
      <div className='text-center pt-10 d-flex justify-content-between'>
        <button type='submit' className='btn btn-primary' onClick={() => {setItemIdForUpdate(undefined)}} disabled={formik.isSubmitting}> 
          <span className='indicator-label'>Хаах</span>
        </button>
        <button type='submit' className='btn btn-primary' onClick={formik.submitForm} disabled={formik.isSubmitting}> 
          <span className='indicator-label'>Хадгалах</span>
        </button>
      </div>
    </>
  )
}

export {ServiceMethodModalForm}
