import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {CRUD_RESPONSES, GroupSoumDistrict, KTSVG, Province, DropzoneComponent, ConvertFileToBase64} from '../../../../../_metronic/helpers'
import {initialUser, Role, User} from '../../core/_models'
import {useListView} from '../provider/ListViewProvider'
import {useQueryResponse} from '../provider/QueryResponseProvider'
import Select from 'react-select'
import { NumericFormat as NumberFormat } from 'react-number-format'
import { ErrorAlert } from '../../../../../_metronic/helpers/alerts/Error'
import { NotifySuccess } from '../../../../../_metronic/helpers/notify/NotifySuccess'
import { NotifyError } from '../../../../../_metronic/helpers/notify/NotifyError'
import { createUser } from '../../core/_requests'
import { WarningAlert } from '../../../../../_metronic/helpers/alerts/Warning'
import { Branch } from '../../../branch/core/_models'
import { useAuth } from '../../../auth'
import { Loading } from '../../../../../_metronic/partials/loading/Loading'

type Props = {
  isUserLoading: boolean
  roles: Array<Role> | undefined
  branches: Array<Branch> | undefined
  provinces: Array<Province> | undefined
  soumDistricts: Array<GroupSoumDistrict> | undefined
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Имэйлийн загвар буруу байна')
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Имэйл оруулна уу'),
  firstname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нэр оруулна уу'),
  lastname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Овог оруулна уу'),
  registerno: Yup.string()
    .min(10, '10 оронтой дугаар оруулна уу')
    .max(10, '10 оронтой дугаар оруулна уу')
    .required('Регистр оруулна уу'),
  phone: Yup.string()
    .min(8, '8 оронтой дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .required('Утас оруулна уу'),
  password: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нууц үг оруулна уу'),
  passwordConfirmation: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нууц үг давтан оруулна уу')
    .oneOf([Yup.ref('password'), null], 'Нууц үг таарахгүй байна'),
  role_id: Yup.number()
    .min(1, 'Эрх сонгоно уу')
    .required('Эрх сонгоно уу'),
  soum_district_id: Yup.number()
    .required('Сум, дүүрэг сонгоно уу')
    .test('dependOn', 'Сум, дүүрэг сонгоно уу', function(soum_district_id, ctx) {
      return ctx.parent.province_id > 0 && !soum_district_id ? false : true;
    }),  
})

const UserEditModalForm: FC<Props> = ({isUserLoading, provinces, soumDistricts: soumDistrictsData, roles, branches}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const {settings} = useAuth()

  const [soumDistricts, setSoumDistricts] = useState(soumDistrictsData)
  const [userForEdit] = useState<User>(initialUser)
  const [isMulti, setIsMulti] = useState(false);
  const statusOptions = [
    {'value': 'active', 'label': 'Идэвхтэй'},
    {'value': 'deactive', 'label': 'Идэвхгүй'}
  ]

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleBranchChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
  };

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        values.branch_id = selectedOptions;
        const response = await createUser(values)
        const status = response.payload?.status
        
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        status && status === 201 && NotifyError(CRUD_RESPONSES.role_limit)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 422 ?
          ErrorAlert('Имэйл хаяг бүртгэлтэй байна.')
        :
        ex.response?.status === 403 ?
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
          ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setSubmitting(false)
        cancel(true)
      } 
    },
  })
  useEffect(() => {
    setIsMulti(formik.values.role_id === 3);
    setSelectedOptions([])
  }, [formik.values.role_id]);
  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.value)
    if (field === 'province_id') {
      formik.setFieldValue('soum_district_id', undefined)
      setSoumDistricts(soumDistrictsData?.filter((soumDistrict) => soumDistrict.value === option.value))
    } 
  }

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then(response => {
      formik.setFieldValue(field, response)
    })
  }

  const getSoumDistrictVal = () => {
    const provinceId = formik.values.province_id
    const soumId = formik.values.soum_district_id
    const selectedOptions = soumDistrictsData && provinceId ? soumDistrictsData[provinceId-1].options : null
    const result = selectedOptions?.filter((option) => option.value === soumId)

    return result
  }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-6'>
            <label className='d-block fw-bold fs-6 mb-2'>Зураг</label>
            <DropzoneComponent setAcceptedImg={setFile} data={[]}/>
            <input {...formik.getFieldProps('file')} hidden/>
          </div>  

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fw-bold fs-6 mb-2 required">Овог</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Овог" 
                {...formik.getFieldProps('lastname')} 
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.lastname}</div>
                </div>
              )} 
            </div>

            <div className='fv-row col-lg-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">Нэр</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Нэр" 
                {...formik.getFieldProps('firstname')} 
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.firstname}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fs-6 fw-bold mb-2 required">Эрх</label>
              <Select 
                options={roles} 
                {...formik.getFieldProps('role_id')} 
                value={roles && formik.values.role_id ? roles[formik.values.role_id-1] : []}
                onChange={(opt) => {handleOnChange('role_id', opt)}}
              />
              {formik.touched.role_id && formik.errors.role_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.role_id}</div>
                </div>
              )}
            </div>
            
            <div className='fv-row col-lg-6'>
              <label className="d-block fs-6 fw-bold mb-2 required">Төлөв</label>
              <Select 
                options={statusOptions} 
                {...formik.getFieldProps('status')} 
                value={roles && formik.values.status ? statusOptions.filter(status => status.value === formik.values.status)[0] : []}
                onChange={(opt) => {handleOnChange('status', opt)}}
              />
              {formik.touched.status && formik.errors.status && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.status}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fs-6 fw-bold mb-2 required">Регистр</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Регистр" 
                {...formik.getFieldProps('registerno')} 
              />
              {formik.touched.registerno && formik.errors.registerno && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.registerno}</div>
                </div>
              )}
            </div>

            <div className='fv-row col-lg-6'>
              <label className="d-block fs-6 fw-bold mb-2 required">Имэйл</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Имэйл" 
                {...formik.getFieldProps('email')} 
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.email}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fs-6 fw-bold mb-2 required">Утас</label>
              <NumberFormat
                  className="form-control"
                  placeholder="Утас" 
                  {...formik.getFieldProps('phone')} 
                  thousandSeparator={false}
                  allowLeadingZeros={false}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.phone}</div>
                </div>
              )}
            </div>

            <div className='fv-row col-lg-6'>
              <label className="d-block fs-6 fw-bold mb-2">Нэмэлт утас</label>
              <NumberFormat
                  className="form-control"
                  placeholder="Нэмэлт утас" 
                  {...formik.getFieldProps('phone2')} 
                  thousandSeparator={false}
                  allowLeadingZeros={false}
              />
              {formik.touched.phone2 && formik.errors.phone2 && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.phone2}</div>
                </div>
              )}
            </div>
          </div>
          <div className='row mb-6'>
          {settings?.has_branch && 
            <div className='fv-row col-lg-6'>
                <label className="d-block fs-6 fw-bold mb-2 required">Салбар</label>
                <Select 
                    options={branches}
                    id='branch_id'
                    isMulti={isMulti}
                    {...formik.getFieldProps('branch_id')} 
                    value={branches && formik.values.branch_id ? branches.filter(branch => formik.values.branch_id?.includes(branch+''))[0] : []}
                    onChange={(opt) => {handleBranchChange(opt)}}
                />
                {formik.touched.branch_id && formik.errors.branch_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.branch_id}</div>
                  </div>
                )}
              </div>
            }
            <div className='fv-row col-lg-6'>
            <label className="fs-6 fw-bold mb-2">Онлайн захиалга авах</label>
                <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    {...formik.getFieldProps('show_in_online_booking')}
                    checked={formik.values.show_in_online_booking}
                  />
                  <label className='form-check-label'></label>
                </div>
              </div>
              </div>
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fs-6 fw-bold mb-2 required">Нууц үг</label>
              <input
                type='password'
                className='form-control form-control-lg form-control-solid '
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.password}</div>
                </div>
              )}
            </div>

            <div className='fv-row col-lg-6'>
              <label className='d-block fs-6 fw-bold mb-2 required'>
                Нууц үг давтах
              </label>
              <input
                type='password'
                className='form-control form-control-lg form-control-solid '
                id='confirmpassword'
                {...formik.getFieldProps('passwordConfirmation')}
              />
              {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.passwordConfirmation}</div>
                </div>
              )}
            </div>
          </div>

          <div className='card'> 
            <div className="fw-bolder fs-3 rotate collapsible mb-6" 
              data-bs-toggle="collapse" 
              role="button" 
              data-bs-target="#kt_user_address_details">
                Хаяг
                <span className="ms-2 rotate-180">
                  <KTSVG 
                    path='/media/icons/duotune/arrows/arr072.svg' 
                    className='svg-icon svg-icon-3'
                  />
              
                </span>
            </div>

            <div id='kt_user_address_details' className='collapse show'>
              <div className='row mb-6'>
                <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
                  <label className="d-block fw-bold fs-6 mb-2">Аймаг/хот </label>
                  <Select 
                    options={provinces} 
                    {...formik.getFieldProps('province_id')}
                    value={provinces && formik.values.province_id ? provinces[formik.values.province_id-1] : []}
                    onChange={(opt) => {handleOnChange('province_id', opt)}}
                  />
                  {formik.touched.province_id && formik.errors.province_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.province_id}</div>
                    </div>
                  )}
                </div>

                <div className='col-lg-6 fv-row'>
                  <label className="fs-6 fw-bold mb-2">Сум/дүүрэг </label>
                  <Select 
                    options={soumDistricts}
                    {...formik.getFieldProps('soum_district_id')}
                    onChange={(opt) => {handleOnChange('soum_district_id', opt)}}
                    value={getSoumDistrictVal()}
                  />
                  {formik.errors.soum_district_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.soum_district_id}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className='row mb-6'>
                <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
                  <label className="fs-6 fw-bold mb-2">Хаяг</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Хаяг" 
                    {...formik.getFieldProps('street')} 
                  />
                  {formik.touched.street && formik.errors.street && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.street}</div>
                    </div>
                  )}
                </div>

                <div className='fv-row col-lg-6'>
                  <label className="fs-6 fw-bold mb-2">Нэмэлт хаяг</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Нэмэлт хаяг" 
                    {...formik.getFieldProps('street1')} 
                  />
                  {formik.touched.street1 && formik.errors.street1 && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.street1}</div>
                    </div>
                  )}
                </div>
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
            disabled={formik.isSubmitting || isUserLoading}
          >
            Болих
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <Loading />}
    </>
  )
}

export {UserEditModalForm}
