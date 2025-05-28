import {FC, useState} from 'react'

import {
  CRUD_RESPONSES,
  DropzoneComponent,
  ConvertFileToBase64
} from '../../../../../_metronic/helpers'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {WarningAlert} from '../../../../../_metronic/helpers/alerts/Warning'
import {Customer} from '../../core/_models'
import {addImage,} from '../../core/_requests'
import {useFormik} from 'formik'
import { NotifySuccess } from '../../../../../_metronic/helpers/notify/NotifySuccess'
import { NotifyError } from '../../../../../_metronic/helpers/notify/NotifyError'
type Props = {
  customer: Customer
  refetch: any
}
const ImagesIndex: FC<Props> = ({customer, refetch}) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      caption: '',
      data: [],
      id: customer.id
    },
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      setLoading(true)
      try {
        const response = await addImage(values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        status && status === 201 && NotifyError(CRUD_RESPONSES.warning)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setSubmitting(true)
        refetch()
        setLoading(false)
      }
    },
  })

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then((response) => {
      formik.setFieldValue(field, response)
    })
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <DropzoneComponent setAcceptedImg={setFile} data={formik.values.data} />
        <input type='text' name='data' onChange={formik.handleChange} value={formik.values.data} hidden/>
        <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
              <label style={{marginTop: 10}} className='fs-6 fw-bold mb-2 required'>Тайлбар</label>
              <input
                type='text'
                className='form-control'
                placeholder='Тайлбар'
                {...formik.getFieldProps('caption')}
              />
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {!loading && 'Зураг оруулах'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export {ImagesIndex}


