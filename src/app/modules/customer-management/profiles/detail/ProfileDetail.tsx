import * as Yup from 'yup'
import {useFormik} from 'formik'
import React, {ChangeEventHandler, FC, useState} from 'react'
import {Customer} from '../../core/_models'
import Select from 'react-select'
import {
  CRUD_RESPONSES,
  GroupSoumDistrict,
  Province,
  SoumDistrict,
  DropzoneComponent,
  ConvertFileToBase64,
} from '../../../../../_metronic/helpers'
import {updateCustomer} from '../../core/_requests'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {WarningAlert} from '../../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {NotifySuccess} from '../../../../../_metronic/helpers/notify/NotifySuccess'
import {NotifyError} from '../../../../../_metronic/helpers/notify/NotifyError'
import {useQueryResponse} from '../../customers-list/provider/QueryResponseProvider'
import {useMasterData} from '../../customers-list/provider/MasterDataProvider'

type Props = {
  customer: Customer
  provinces: Array<Province>
  soumDistrictsData: Array<GroupSoumDistrict>
}

const customerDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('Нэр оруулна уу'),
  phone: Yup.string()
    .min(8, '8 оронтой дугаар оруулна уу')
    .max(8, '8 оронтой дугаар оруулна уу')
    .required('Утас оруулна уу'),
  soum_district_id: Yup.number()
    .required('Сум, дүүрэг сонгоно уу')
    .test('dependOn', 'Сум, дүүрэг сонгоно уу', function (soum_district_id, ctx) {
      return ctx.parent.province_id && !soum_district_id ? false : true
    }),
})

const ProfileDetail: FC<Props> = ({customer, provinces, soumDistrictsData}) => {
  const [data] = useState<Customer>({
    ...customer,
    file: customer.file || {},
    avatar: customer.avatar || [],
    street: customer.street || '',
    street1: customer.street1 || '',
    phone2: customer.phone2 || '',
    desc: customer.desc || '',
    card_number: customer.card_number || '',
    gender: customer.gender || '',
    province_id: customer.province_id || 0,
    soum_district_id: customer.soum_district_id || 0,
    surgery_card_number: customer.surgery_card_number || ''
  })
  const [soumDistricts, setSoumDistricts] = useState(soumDistrictsData)
  const [loading, setLoading] = useState(false)
  const {refetch} = useMasterData()
  const {refetch: customerListRefetch} = useQueryResponse()
  const [gender, setGender] = useState(data['gender'])

  const formik = useFormik({
    initialValues: data,
    validationSchema: customerDetailsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setLoading(true)
      setSubmitting(false)
      values.gender = gender
      try {
        const response = await updateCustomer(values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        status && status === 201 && NotifyError(CRUD_RESPONSES.warning)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        refetch()
        customerListRefetch()
        setLoading(false)
        setSubmitting(true)
      }
    },
  })

  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.value)
    if (field === 'province_id') {
      formik.setFieldValue('soum_district_id', undefined)
      setSoumDistricts(
        soumDistrictsData?.filter(
          (soumDistrict: GroupSoumDistrict) => soumDistrict.value === option.value
        )
      )
    }
  }

  const getSoumDistrictVal = () => {
    const provinceId = formik.values.province_id ? formik.values.province_id : undefined
    const soumId = formik.values.soum_district_id ? formik.values.soum_district_id : undefined
    const selectedOptions =
      soumDistrictsData && provinceId ? soumDistrictsData[provinceId - 1].options : null
    const result = selectedOptions?.filter((option: SoumDistrict) => option.value === soumId)

    return result
  }

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then((response) => {
      formik.setFieldValue(field, response)
    })
  }

  return (
    <div className='card mb-5 mb-xl-8' id='kt_customer_view_overview_tab'>
      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        <div className='card-body p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Зураг</label>
            <div className='col-lg-8'>
              <DropzoneComponent setAcceptedImg={setFile} data={formik.values.avatar} />
              <input {...formik.getFieldProps('file')} hidden />
            </div>
          </div>

          <div className='row mb-6'>
            <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
              <label className='fs-6 fw-bold mb-2 required'>Овог</label>
              <input
                type='text'
                className='form-control'
                placeholder='Овог'
                {...formik.getFieldProps('lastname')}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.lastname}</div>
                </div>
              )}
            </div>

            <div className='col-lg-6 fv-row'>
              <label className='fs-6 fw-bold mb-2 required'>Нэр</label>
              <input
                type='text'
                className='form-control'
                placeholder='Нэр'
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
              <label className='fs-6 fw-bold mb-2'>Регистр</label>
              <input
                type='text'
                className='form-control'
                placeholder='Регистр'
                {...formik.getFieldProps('registerno')}
              />
              {formik.touched.registerno && formik.errors.registerno && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.registerno}</div>
                </div>
              )}
            </div>

            <div className='col-lg-6 fv-row'>
              <label className='fs-6 fw-bold mb-2'>Имэйл</label>
              <input
                type='email'
                className='form-control'
                placeholder='Имэйл'
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
            <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
              <label className='fs-6 fw-bold mb-2 required'>Утас</label>
              <NumberFormat
                className='form-control'
                placeholder='Утас'
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
              <label className='fs-6 fw-bold mb-2'>Нэмэлт утас</label>
              <NumberFormat
                className='form-control'
                placeholder='Нэмэлт утас'
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
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className='d-block fs-6 fw-bold mb-2'>Картын дугаар</label>
              <input
                type='text'
                className='form-control'
                placeholder='Картын дугаар'
                {...formik.getFieldProps('card_number')}
              />
            </div>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className='d-block fs-6 fw-bold mb-2'>Мэс заслын картын дугаар</label>
              <input
                type='text'
                className='form-control'
                placeholder='Мэс заслын картын дугаар'
                {...formik.getFieldProps('surgery_card_number')}
              />
            </div>
          </div>
          <div className='row mb-12'>
          <div className='col-lg-6 fv-row'>
              <label className='fs-6 fw-bold mb-2'>Хүйс </label>
              <div style={{ marginTop: 11 }} role='group' aria-labelledby='my-radio-group'>
                <label className='form-check-label' style={{ marginRight: 50 }}>
                  <input
                    className='form-check-input'
                    type='radio'
                    {...formik.getFieldProps('gender')}
                    value='er'
                    checked={'er' === gender}
                    onChange={() => setGender('er')}
                    style={{marginRight: 15}}
                  />
                  Эрэгтэй
                </label>
                <label className='form-check-label'>
                  <input
                    className='form-check-input'
                    type='radio'
                    {...formik.getFieldProps('gender')}
                    value='em'
                    checked={'em' === gender}
                    onChange={() => setGender('em')}
                    style={{marginRight: 15}}
                  />
                  Эмэгтэй
                </label>
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
              <label className='fs-6 fw-bold mb-2'>Аймаг/хот </label>
              <Select
                options={provinces}
                {...formik.getFieldProps('province_id')}
                value={
                  provinces && formik.values.province_id
                    ? provinces[formik.values.province_id - 1]
                    : []
                }
                onChange={(opt) => {
                  handleOnChange('province_id', opt)
                }}
              />
              {formik.touched.province_id && formik.errors.province_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.province_id}</div>
                </div>
              )}
            </div>

            <div className='col-lg-6 fv-row'>
              <label className='fs-6 fw-bold mb-2'>Сум/дүүрэг </label>
              <Select
                options={soumDistricts}
                {...formik.getFieldProps('soum_district_id')}
                onChange={(opt) => {
                  handleOnChange('soum_district_id', opt)
                }}
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
              <label className='fs-6 fw-bold mb-2'>Хаяг</label>
              <input
                type='text'
                className='form-control'
                placeholder='Хаяг'
                {...formik.getFieldProps('street')}
              />
              {formik.touched.street && formik.errors.street && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.street}</div>
                </div>
              )}
            </div>

            <div className='col-lg-6 fv-row'>
              <label className='fs-6 fw-bold mb-2'>Нэмэлт хаяг</label>
              <input
                type='text'
                className='form-control'
                placeholder='Нэмэлт хаяг'
                {...formik.getFieldProps('street1')}
              />
              {formik.touched.street1 && formik.errors.street1 && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.street1}</div>
                </div>
              )}
            </div>
          </div>

          <div className='fv-row mb-6'>
            <label className='fs-6 fw-bold mb-2'>Нэмэлт тэмдэглэл</label>
            <textarea
              className='form-control'
              placeholder='Нэмэлт тэмдэглэл'
              {...formik.getFieldProps('desc')}
            />
          </div>
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
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
  )
}

export {ProfileDetail}
