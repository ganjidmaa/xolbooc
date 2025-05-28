import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik, Field} from 'formik'
import {
  CRUD_RESPONSES,
  GroupSoumDistrict,
  KTSVG,
  Province,
  SoumDistrict,
  DropzoneComponent,
  ConvertFileToBase64,
} from '../../../../../_metronic/helpers'
import {useListView} from '../provider/ListViewProvider'
import {useQueryResponse} from '../provider/QueryResponseProvider'
import Select from 'react-select'
import {Customer} from '../../core/_models'
import {createCustomer} from '../../core/_requests'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {NotifySuccess} from '../../../../../_metronic/helpers/notify/NotifySuccess'
import {WarningAlert} from '../../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'

type Props = {
  customer: Customer
  provinces: Array<Province>
  soumDistrictsData: Array<GroupSoumDistrict>
}
const genders: {[key: string]: any}[] = [
  {value: '1', label: 'Эрэгтэй'},
  {value: '2', label: 'Эмэгтэй'},
]

const editCustomerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нэр оруулна уу'),
  // lastname: Yup.string()
  //   .min(3, 'Багадаа 3 тэмдэгт байна')
  //   .max(50, 'Ихдээ 50 тэмдэгт байна')
  //   .required('Овог оруулна уу'),
  // registerno: Yup.string()
  //   .min(10, 'Minimum 10 symbols')
  //   .max(10, 'Maximum 10 symbols')
  //   .required('Регистр оруулна уу'),
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

const CustomerEditModalForm: FC<Props> = ({customer, soumDistrictsData, provinces}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [soumDistricts, setSoumDistricts] = useState(soumDistrictsData)
  const [loading, setLoading] = useState(false)
  const [customerForEdit] = useState<Customer>({
    ...customer,
    avatar: '',
    firstname: '',
    lastname: '',
    registerno: '',
    email: '',
    phone: '',
    phone2: '',
    province_id: 0,
    soum_district_id: 0,
    gender: '',
    street: '',
    street1: '',
    file: {},
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: customerForEdit,
    validationSchema: editCustomerSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      setLoading(true)
      try {
        const response = await createCustomer(values)
        const status = response.payload?.status

        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
      } catch (ex: any) {
        console.error(ex)
        ex.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setLoading(false)
        setSubmitting(true)
        cancel(true)
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

  const setFile = (field: string, value: any) => {
    ConvertFileToBase64(value[0]).then((response) => {
      formik.setFieldValue(field, response)
    })
  }

  const getSoumDistrictVal = () => {
    const provinceId = formik.values.province_id
    const soumId = formik.values.soum_district_id
    const selectedOptions =
      soumDistrictsData && provinceId ? soumDistrictsData[provinceId - 1].options : null
    const result = selectedOptions?.filter((option: SoumDistrict) => option.value === soumId)

    return result
  }

  return (
    <>
      <form
        id='kt_modal_add_customer_form'
        className='form'
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5 '
          id='kt_modal_add_customer_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_customer_header'
          data-kt-scroll-wrappers='#kt_modal_add_customer_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-6'>
            <label className='d-block fw-bold fs-6 mb-2'>Зураг</label>
            <DropzoneComponent setAcceptedImg={setFile} data={[]} />
            <input {...formik.getFieldProps('file')} hidden />
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className='d-block fw-bold fs-6 mb-2 required'>Овог</label>
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

            <div className='fv-row col-lg-6'>
              <label className='d-block fw-bold fs-6 mb-2 required'>Нэр</label>
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
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className='d-block fs-6 fw-bold mb-2'>Регистр</label>
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

            <div className='fv-row col-lg-6'>
              <label className='d-block fs-6 fw-bold mb-2'>Имэйл</label>
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
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className='d-block fs-6 fw-bold mb-2 required'>Утас</label>
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

            <div className='fv-row col-lg-6'>
              <label className='d-block fs-6 fw-bold mb-2'>Нэмэлт утас</label>
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
                <label style={{ marginRight: 50 }} className='form-check-label'>
                  <input className='form-check-input' type='radio' name='gender' onChange={formik.handleChange} value='er' style={{marginRight: 15}} />
                  Эрэгтэй
                </label>
                <label className='form-check-label'>
                  <input className='form-check-input' type='radio' name='gender' onChange={formik.handleChange} value='em' style={{marginRight: 15}} />
                  Эмэгтэй
                </label>
              </div>
            </div>
          </div>

          <div className='card'>
            <div
              className='fw-bolder fs-3 rotate collapsible mb-7'
              data-bs-toggle='collapse'
              role='button'
              data-bs-target='#kt_customer_address_details'
            >
              Хаяг
              <span className='ms-2 rotate-180'>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr072.svg'
                  className='svg-icon svg-icon-3'
                />
              </span>
            </div>
            <div id='kt_customer_address_details' className='collapse show'>
              <div className='row mb-6'>
                <div className='col-lg-6 fv-row mb-6 mb-lg-0'>
                  <label className='d-block fw-bold fs-6 mb-2'>Аймаг/хот </label>
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
                <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
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

                <div className='fv-row col-lg-6'>
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
            </div>
          </div>

          <div className='fv-row mb-4'>
            <label className='fs-6 fw-bold mb-2'>Нэмэлт тэмдэглэл</label>
            <textarea
              className='form-control'
              placeholder='Нэмэлт тэмдэглэл'
              {...formik.getFieldProps('desc')}
            />
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-customers-modal-action='cancel'
            disabled={formik.isSubmitting || loading}
          >
            Болих
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-customers-modal-action='submit'
            disabled={loading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {(formik.isSubmitting || loading) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {/* {(formik.isSubmitting || isUserLoading) && <UsersListLoading />} */}
    </>
  )
}

export {CustomerEditModalForm}
