import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useAccountDetail } from '../../../../core/AccountDetailProvider'
import { updateUser } from '../../../../core/_requests'
import Select from 'react-select'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { useNavigate } from 'react-router-dom'
import { NumericFormat as NumberFormat } from 'react-number-format'
import { NotifyError } from '../../../../../../../_metronic/helpers/notify/NotifyError'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'
import { CRUD_RESPONSES, roleNames, DropzoneComponent, ConvertFileToBase64 } from '../../../../../../../_metronic/helpers'
import { Role, User } from '../../../../core/_models'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { useQueryResponse } from '../../../../users-list/provider/QueryResponseProvider'
import { useAuth } from '../../../../../auth'
import { Branch } from '../../../../../branch/core/_models'

const profileDetailsSchema = Yup.object().shape({
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
    .min(10, '10 оронтой регистр оруулна уу')
    .max(10, '10 оронтой регистр оруулна уу')
    .required('Регистр оруулна уу'),
  phone: Yup.string()
    .min(8, '8 оронтой дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .required('Утас оруулна уу'),
  role_id: Yup.number()
    .min(1, 'Эрх заавал сонгоно уу')
    .required('Эрх заавал сонгоно уу'),
  soum_district_id: Yup.number()
    .required('Сум, дүүрэг сонгоно уу')
    .test('dependOn', 'Сум, дүүрэг сонгоно уу', function(soum_district_id, ctx) {
      return ctx.parent.province_id && !soum_district_id ? false : true;
    }),  
})

const ProfileDetails: React.FC = () => {
  const navigate = useNavigate()
  const {settings} = useAuth()
  const {
    response: user, 
    provinces, 
    soumDistricts: soumDistrictsData, 
    roles, 
    refetch,
    branches
  } = useAccountDetail()
  const [data] = useState<User>({
    ...user,
    file: {},
    avatar: user?.avatar || [],
    street: user?.street || '',
    street1: user?.street1 || '',
    province_id: user?.province_id || 0,
    soum_district_id: user?.soum_district_id || 0,
  })
  const [loading, setLoading] = useState(false)
  const [soumDistricts, setSoumDistricts] = useState(soumDistrictsData)
  const [customRoles, setCustomRoles] = useState<Array<Role>>([])
  const {refetch: userListFetch} = useQueryResponse()

  useEffect(() => {
    const updatedRoles: Array<Role> = []
    roles && roles.map(
      role => { 
        updatedRoles.push({...role, label: roleNames.filter(roleName => roleName.value === role.label)[0]?.name})
        return true
      }
    )

    setCustomRoles(updatedRoles)
  }, [roles])


  const formik = useFormik({
    initialValues: data,
    validationSchema: profileDetailsSchema,
    onSubmit: async(values, {setSubmitting}) => {
      setLoading(true)
      setSubmitting(false)
      try {
        values.branch_id = selectedOptions;
        const response = await updateUser(values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success) 
        status && status === 201 && NotifyError(CRUD_RESPONSES.role_limit) 
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403 ? 
          WarningAlert(CRUD_RESPONSES.failed_authorization)
        : 
          ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setLoading(false)
        setSubmitting(true)
        userListFetch()
        refetch()
        navigate('/user/list/account/overview')
      }
    },
  })

  const [selectedOptions, setSelectedOptions] = useState<Array<Branch>>([]);
	useEffect(()=>{
	if(branches && branches.length !== 0 && data && data.branch_id){
		setSelectedOptions( branches.filter(branch => (data.branch_id as string).includes(branch.value + '')) )
		}
	},[branches, data.branch_id])
  const handleBranchChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
  };


  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.value)
    if (field === 'province_id') {
      formik.setFieldValue('soum_district_id', undefined)
      setSoumDistricts(soumDistrictsData?.filter((soumDistrict) => soumDistrict.value === option.value))
    } 
    if(field === 'role_id'){
      setSelectedOptions([])
    }
  }

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then(response => {
      formik.setFieldValue(field, response)
    })
  }

  const getSoumDistrictVal = () => {
    const provinceId = formik.values.province_id ? formik.values.province_id : undefined
    const soumId = formik.values.soum_district_id ? formik.values.soum_district_id : undefined
    const selectedOptions = soumDistrictsData && provinceId ? soumDistrictsData[provinceId-1].options : null
    const result = selectedOptions?.filter((option) => option.value === soumId)

    return result
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Хэрэглэгчийн дэлгэрэнгүй</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Зураг</label>
              <div className='col-lg-8'>
                <DropzoneComponent setAcceptedImg={setFile} data={formik.values.avatar}/>
                <input {...formik.getFieldProps('file')} hidden/>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                <label className="fs-6 fw-bold mb-2 required">Овог</label>
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

              <div className='col-lg-6 fv-row'>
                <label className="fs-6 fw-bold mb-2 required">Нэр</label>
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
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                <label className="fs-6 fw-bold mb-2 required">Регистр</label>
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

              <div className='col-lg-6 fv-row'>
                <label className="fs-6 fw-bold mb-2 required">Төлөв</label>
                <select className="form-select " data-control="select2" data-hide-search="true"
                      {...formik.getFieldProps('status')}>
                  <option value='active'>Идэвхтэй</option>
                  <option value='deactive'>Идэвхгүй</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.status}</div>
                  </div>
                )}
              </div>

            </div>

            <div className='row mb-6'>
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                <label className="fs-6 fw-bold mb-2 required">Утас</label>
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

              <div className='col-lg-6 fv-row'>
                <label className="fs-6 fw-bold mb-2">Нэмэлт утас</label>
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
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                <label className="fs-6 fw-bold mb-2">Аймаг/хот </label>
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
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
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

              <div className='col-lg-6 fv-row'>
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

            <div className='row mb-6'>
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                <label className="fs-6 fw-bold mb-2 required">Эрх</label>
                <Select 
                  options={customRoles} 
                  {...formik.getFieldProps('role_id')} 
                  value={customRoles && formik.values.role_id ? customRoles[formik.values.role_id-1] : []}
                  onChange={(opt) => {handleOnChange('role_id', opt)}}
                />
                {formik.touched.role_id && formik.errors.role_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.role_id}</div>
                  </div>
                )}
              </div>
              <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
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
            {settings?.has_branch && 
                <div className='fv-row col-lg-6'>
                  <label className="d-block fs-6 fw-bold mb-2 required">Салбар</label>
                  {formik.values.role_id === 3 ? <Select 
                      options={branches}
                      id='branch_id'
                      isMulti={true}
                      {...formik.getFieldProps('branch_id')} 
                      value={selectedOptions}
                      onChange={(opt) => {handleBranchChange(opt)}}
                  /> : <Select 
                  options={branches}
                  id='branch_id'
                  isMulti={false}
                  {...formik.getFieldProps('branch_id')} 
                  value={selectedOptions}
                  onChange={(opt) => {handleBranchChange(opt)}}
              />}
                  {formik.touched.branch_id && formik.errors.branch_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.branch_id}</div>
                    </div>
                  )}
                </div>
              }
            </div>

          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary'
              disabled={loading}>
              {!loading && 'Хадгалах'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Түр хүлээнэ үү...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
