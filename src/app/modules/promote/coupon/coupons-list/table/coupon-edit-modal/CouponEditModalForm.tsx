import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Coupon, SelectedService } from '../../core/_models'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { ConvertFileToBase64, CRUD_RESPONSES, DropzoneComponent, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { createCoupon, updateCoupon } from '../../core/_requests'
import { CouponsListLoading } from '../../components/loading/CouponsListLoading'
import Datetime from 'react-datetime';
import Moment from 'moment';
import { ServicesModal } from '../service-selection-modal/ServicesModal'
import { NumericFormat as NumberFormat} from 'react-number-format';
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  coupon: Coupon
  isLoading: boolean
}

const editCouponSchema = Yup.object().shape({
    title: Yup.string().required('Нэр оруулна уу'),
    value: Yup.string()
        .required('Үнийн дүнгийн эрх оруулна уу')
        .test('min-value', 'Үнийн дүнгийн эрх оруулна уу', function(value) {
        return value && parseInt(value) < 1 ? false : true
        }),
    price: Yup.string()
    .required('Үнэ оруулна уу')
    .test('min-value', 'Дүн оруулна уу', function(value) {
      return value && parseInt(value) < 1 ? false : true
    })
    .test('compare-value2', 'Зарах үнэ купоны үнэлгээнээс өндөр байна', function(price, ctx) {
      let invalidResponse = true
      if(ctx.parent.value && price) {
        const value = ctx.parent.value.replaceAll(',', '')
        const replacedPrice = price.replaceAll(',', '')
        invalidResponse = replacedPrice && parseInt(replacedPrice) > parseInt(value) ? false : true
      }
      return invalidResponse
    }),
    start_date: Yup.string().required('Эхлэх огноо оруулна уу'),
    end_date: Yup.string()
      .required('Дуусах огноо оруулна уу')
      .test('is-valid-date', 'Эхлэх огноо нь дуусах огнооноос их байна.', function(end_date, ctx) {
          return Moment(end_date) >= Moment(ctx.parent.start_date) 
    }),
})

const CouponEditModalForm: FC<Props> = ({coupon, isLoading}) => {
    const {setItemIdForUpdate} = useListView()
    const {refetch} = useQueryResponse()
    const [countServices, setCountServices] = useState('Бүх үйлчилгээ')
    const [openServiceModal, setOpenServiceModal] = useState(false)

    const [couponForEdit] = useState<Coupon>({
        ...coupon,
        title: coupon.title || '',
        value: coupon.value,
        price: coupon.price,
        start_date:  Moment(coupon.start_date).format('YYYY/MM/DD') || Moment().format('YYYY/MM/DD'),
        end_date: Moment(coupon.end_date).format('YYYY/MM/DD') || Moment().format('YYYY/MM/DD'),
        selected_services: coupon.selected_services,
        is_all_services: coupon.is_all_services !== undefined ? coupon.is_all_services : true,
        sell_limit: coupon.sell_limit || 0,
        limit_number: coupon.limit_number || 0,
        type: coupon.type !== undefined ? coupon.type : false,
    })

    useEffect(() => {
        if(coupon.id) {
          if(!coupon.is_all_services) {
              let numberOfServices = 0
              coupon.selected_services.map(data => numberOfServices+= data.service_ids.length)
              setCountServices(numberOfServices + ' үйлчилгээ сонгогдлоо')
          }
        }
    }, [coupon])

    const formik = useFormik({
        initialValues: couponForEdit,
        validationSchema: editCouponSchema,
        onSubmit: async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
            var response: any = {};
            if(isNotEmpty(values.id))
            response = await updateCoupon(values)
            else
            response = await createCoupon(values)
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

    const handleOnChangeDate = (field: string, value: any) => {
        value = Moment(value).format('YYYY/MM/DD')
        formik.setFieldValue(field, value)
    }

    const toggleServiceModal = (selectedServices?: Array<SelectedService>, allServiceChecked?: boolean, numberOfServices?: number) => {
        setOpenServiceModal(!openServiceModal)
        if(selectedServices && allServiceChecked !== undefined && numberOfServices) {
        formik.setFieldValue('selected_services', selectedServices)
        formik.setFieldValue('is_all_services', allServiceChecked)
        setCountServices(numberOfServices + ' үйлчилгээ сонгогдлоо')
        }
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
          refetch()
        }
        setItemIdForUpdate(undefined)
    }

    const setFile = (field: string, value: any) => {
      ConvertFileToBase64(value[0]).then(response => {
        formik.setFieldValue(field, response)
      })
    }

  return (
    <>
      <form id='kt_modal_add_coupon_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_coupon_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_coupon_header'
          data-kt-scroll-wrappers='#kt_modal_add_coupon_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-6'>
            <label className='d-block fw-bold fs-6 mb-2'>Зураг</label>
            <DropzoneComponent setAcceptedImg={setFile} data={[]}/>
            <input {...formik.getFieldProps('file')} hidden/>
          </div>  

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

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fw-bold fs-6 mb-2 required">Ашиглах боломжит эрх</label>
              <div className='input-group '>
                <span className="input-group-text" id="basic-addon1">
                  <span>₮ </span>
                </span>

                <NumberFormat
                    className="form-control"
                    {...formik.getFieldProps('value')} 
                    thousandSeparator={true}
                    allowLeadingZeros={false}
                />
              </div>
             
              {formik.touched.value && formik.errors.value && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.value}</div>
                </div>
              )} 
            </div>

            <div className='fv-row col-lg-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">Зарах үнэ</label>
              <div className='input-group '>
                <span className="input-group-text" id="basic-addon1">
                  <span>₮ </span>
                </span>

                <NumberFormat
                    className="form-control"
                    {...formik.getFieldProps('price')} 
                    thousandSeparator={true}
                    allowLeadingZeros={false}
                />
              </div>
                
              {formik.touched.price && formik.errors.price && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.price}</div>
                </div>
              )} 
            </div>
          </div>
          
          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fw-bold fs-6 mb-2 required">Эхлэх огноо</label>
              <Datetime 
                  dateFormat='YYYY/MM/DD'
                  timeFormat={false}
                  {...formik.getFieldProps('start_date')}
                  onChange={(val) => {handleOnChangeDate('start_date', val)}}
              />
              {formik.errors.start_date && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.start_date}</div>
                </div>
              )} 
            </div>

            <div className='fv-row col-lg-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">Дуусах огноо</label>
              <Datetime 
                  dateFormat='YYYY/MM/DD'
                  timeFormat={false}
                  {...formik.getFieldProps('end_date')}
                  onChange={(val) => {handleOnChangeDate('end_date', val)}}
              />
              {formik.errors.end_date && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.end_date}</div>
                </div>
              )} 
            </div>
          </div>

          <div className='fv-row mb-6'>
            <label className='d-block fw-bold fs-6 mb-2'>Олон удаагийн хэрэглээ эсэх</label>
            <div className='form-check form-check-solid form-switch fv-row'>
              <input
                className='form-check-input w-45px h-30px'
                type='checkbox'
                name='type'
                value={formik.values.type?.toString()}
                checked={formik.values.type === true}
                onChange={(val) => {
                  formik.setFieldValue('type', val.target.checked)
                }}
              />
              <label className='form-check-label'></label>
            </div>
          </div>

          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-5 mb-lg-0'>
                <label className='d-block fw-bold fs-6 mb-2 required'>{formik.values.type ? 'Хэрэглэх тоо хязгаарлах' : 'Зарах тоо хязгаарлах'}</label>

                <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                        className='form-check-input w-45px h-30px'
                        type='checkbox'
                        name='sell_limit'
                        value={formik.values.sell_limit}
                        checked={formik.values.sell_limit === 1 ? true : false}
                        onChange={(val) => {
                            formik.setFieldValue('sell_limit', val.target.checked ? 1 : 0)
                        }}
                    />
                    <label className='form-check-label'></label>
                </div>
            </div>

            {formik.values.sell_limit === 1 && 
            <div className='fv-row col-lg-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">{formik.values.type ? 'Нийт хэрэглэх тоо' : 'Нийт үүсгэх тоо'}</label>
              <NumberFormat
                  className="form-control"
                  {...formik.getFieldProps('limit_number')} 
                  thousandSeparator={true}
                  allowLeadingZeros={false}
              />
              {formik.touched.limit_number && formik.errors.limit_number && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.limit_number}</div>
                </div>
              )} 
            </div>
            }
          </div>

          

          {/* <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2">Хамрах үйлчилгээ</label>
            <div className='input-group'>
              <input 
                type="text" 
                className="form-control" 
                aria-describedby="basic-addon2"
                placeholder={countServices}
                disabled={true}
              />
              <span className="input-group-text text-hover-primary" id="basic-addon2"
                  onClick={() => toggleServiceModal()}
              >сонгох</span>
            </div>
          </div> */}

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2">Анхааруулга</label>
            <textarea 
              className="form-control" 
              placeholder="Нэмэлт мэдээлэл..." 
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
      {(formik.isSubmitting || isLoading) && <CouponsListLoading />}
      {openServiceModal && 
        <ServicesModal toggleServiceModal={toggleServiceModal} selectedServices={formik.values.selected_services}
          allService={formik.values.is_all_services ? true : false}/>}
    </>
  )
}

export {CouponEditModalForm}
