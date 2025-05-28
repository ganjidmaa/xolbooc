import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { MembershipTypesListLoading } from '../../components/loading/MembershipTypesListLoading'
import { NumericFormat as NumberFormat} from 'react-number-format';
import { MembershipType } from '../../core/_models'
import { createMembershipType, updateMembershipType } from '../../core/_requests'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import clsx from 'clsx'

type Props = {
  membershipType: MembershipType
  isLoading: boolean
}

const editMembershipTypeSchema = Yup.object().shape({
  title: Yup.string().required('Нэр оруулна уу'),
  percent: Yup.number()
    .min(0, 'Хувь оруулна уу')
    .max(100, '100% хүртэл дүн оруулна уу')
    .required('Хувь оруулна уу'),
  prefix: Yup.string().required('Кодын товчлол оруулна уу'),  
  type: Yup.string().required('Төрөл сонгоно уу'),    
  limit_price: Yup.string()  
    .test('limit_price', 'Үнийн хязгаар оруулна уу', function(limit_price, ctx) {
      const type: any = ctx.parent.type || ''
      return type === 'limited' && !limit_price ? false : true
    }),  
})

const MembershipTypeEditModalForm: FC<Props> = ({membershipType, isLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [membershipTypeForEdit] = useState<MembershipType>({
    ...membershipType,
    title: membershipType.title || '',
    percent: membershipType.percent,
    prefix: membershipType.prefix || '',
    limit_price: membershipType.limit_price || '',
    type: membershipType.type || '',
  })

  const formik = useFormik({
    initialValues: membershipTypeForEdit,
    validationSchema: editMembershipTypeSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await updateMembershipType(values)
        else
          response = await createMembershipType(values)

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

  const generateRandomCode = (length: number = 3): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from(
      { length }, 
      () => chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  };

  const getRandomCode2 = () => {
    let prefix = generateRandomCode()
    let randomNumber = Math.floor(Math.random() * (999999-100000)) + 100000
    let code = prefix.toString()+randomNumber.toString()
    formik.setFieldValue('prefix', code)
  }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_membership_type_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_membership_type_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_membership_type_header'
          data-kt-scroll-wrappers='#kt_modal_add_membership_type_scroll'
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
              <label className="d-block fw-bold fs-6 mb-2 required">Хөнгөлөх хувь</label>
              <div className='input-group '>
                <span className="input-group-text" id="basic-addon1">
                  <span>% </span>
                </span>

                <NumberFormat
                    className="form-control"
                    {...formik.getFieldProps('percent')} 
                    thousandSeparator={true}
                    allowLeadingZeros={false}
                />
              </div>
              
              {formik.touched.percent && formik.errors.percent && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.percent}</div>
                </div>
              )} 
          </div>

          <div className='row mb-6'>
              <label className={clsx("d-block fw-bold fs-6 mb-2")}>Код</label>
              <div className='input-group'>
                  <input
                      type="text" 
                      className="form-control"
                      {...formik.getFieldProps('prefix')} 
                      placeholder="Код үүсгэх эхний 3 үсэг"
                  />
                  <span className="input-group-text" id="basic-addon1" onClick={(e) => getRandomCode2()}> <span>Random код үүсгэх </span> </span>
              </div>
      
                {formik.touched.prefix && formik.errors.prefix && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.prefix}</div>
                  </div>
                )}
          </div>
          
          {<>
            <div className='row mb-6'>
              <div className='fv-row mb-6 mb-lg-0 col-lg-6'>
                  <label className="d-block fw-bold fs-6 mb-2 required">Төрөл</label>
                  <select className='form-select' data-control="select2" data-hide-search="true"
                    {...formik.getFieldProps('type')}
                  >
                        <option value="" disabled={true}>Төрөл сонгоно уу</option>
                        <option value="limited">Үнийн хязгаартай</option>
                        <option value="free">Шууд</option>
                  </select>
        
                  {formik.touched.type && formik.errors.type && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.type}</div>
                    </div>
                  )} 
              </div>

              <div className='fv-row col-lg-6'>
                  <label className="d-block fw-bold fs-6 mb-2">Үнийн дүнгийн хязгаар</label>
                  <NumberFormat
                      className="form-control"
                      {...formik.getFieldProps('limit_price')} 
                      thousandSeparator={true}
                  />
        
                  {formik.errors.limit_price && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.limit_price}</div>
                    </div>
                  )} 
              </div>
            </div>
          </>}

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
      {(formik.isSubmitting || isLoading) && <MembershipTypesListLoading />}
    </>
  )
}

export {MembershipTypeEditModalForm}
