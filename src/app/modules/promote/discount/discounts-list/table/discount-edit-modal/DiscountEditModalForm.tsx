import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Discount, SelectedService } from '../../core/_models'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { createDiscount, updateDiscount } from '../../core/_requests'
import { DiscountsListLoading } from '../../components/loading/DiscountsListLoading'
import Datetime from 'react-datetime';
import Moment from 'moment';
import { ServicesModal } from '../service-selection-modal/ServicesModal'
import { NumericFormat as NumberFormat} from 'react-number-format';
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  discount: Discount
  isLoading: boolean
}

const editDiscountSchema = Yup.object().shape({
  title: Yup.string().required('Нэр оруулна уу'),
  value: Yup.string()
    .required('Дүн оруулна уу')
    .test('value-type', '100%-с илүү дүн оруулж болохгүй.', function(value, ctx) {
      let res = true
      if(ctx.parent.type === 'percent')
        res = value && parseInt(value) > 100 ? false : true
      return res  
    })
    .test('min-value', 'Дүн оруулна уу', function(value) {
      return value && parseInt(value) < 1 ? false : true
    }),
  type: Yup.string()
  .required('Төрөл сонгоно уу')
  .test('value-limit', '100%-с илүү дүн оруулж болохгүй.', function(type, ctx) {
    let res = true
    
    if(type === 'percent' && ctx.parent.value) {
      const value = ctx.parent.value.replaceAll(',', '')
      res = value && parseInt(value) > 100 ? false : true
    }
      
    return res  
  }),
  start_date: Yup.string().required('Эхлэх огноо оруулна уу'),
  end_date: Yup.string()
    .required('Дуусах огноо оруулна уу')
    .test('is-valid-date', 'Эхлэх огноо нь дуусах огнооноос их байна.', function(end_date, ctx) {
        return Moment(end_date) >= Moment(ctx.parent.start_date) 
    }),
})

const DiscountEditModalForm: FC<Props> = ({discount, isLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [countServices, setCountServices] = useState('Бүх эмчилгээ')
  const [type, setType] = useState(discount.type || 'percent')
  const [typeClassName] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-primary btn-outline btn-active-success')
  const [typeClassNameActive] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-primary btn-outline btn-active-success active')
  const [openServiceModal, setOpenServiceModal] = useState(false)

  const [discountForEdit] = useState<Discount>({
    ...discount,
    title: discount.title || '',
    desc: discount.desc || '',
    value: discount.value,
    type: discount.type || 'percent',
    start_date:  Moment(discount.start_date).format('YYYY/MM/DD') || Moment().format('YYYY/MM/DD'),
    end_date: Moment(discount.end_date).format('YYYY/MM/DD') || Moment().format('YYYY/MM/DD'),
    selected_services: discount.selected_services,
    is_all_services: discount.is_all_services !== undefined ? discount.is_all_services : true,
    limit_price: discount.limit_price || 0
  })

  useEffect(() => {
    if(discount.id) {
      if(!discount.is_all_services) {
        let numberOfServices = 0
        discount.selected_services.map(data => numberOfServices+= data.service_ids.length)
        setCountServices(numberOfServices + ' эмчилгээ сонгогдлоо')
      }
    }
  }, [discount])

  const formik = useFormik({
    initialValues: discountForEdit,
    validationSchema: editDiscountSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await updateDiscount(values)
        else
          response = await createDiscount(values)
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

  const handleOnChange = (field: string, selectedVal: any) => {
    formik.setFieldValue(field, selectedVal.target.value)
    setType(selectedVal.target.value)
  }

  const toggleServiceModal = (selectedServices?: Array<SelectedService>, allServiceChecked?: boolean, numberOfServices?: number) => {
    setOpenServiceModal(!openServiceModal)
    if(selectedServices && allServiceChecked !== undefined && numberOfServices) {
      formik.setFieldValue('selected_services', selectedServices)
      formik.setFieldValue('is_all_services', allServiceChecked)
      setCountServices(numberOfServices + ' эмчилгээ сонгогдлоо')
    }
  }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_discount_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_discount_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_discount_header'
          data-kt-scroll-wrappers='#kt_modal_add_discount_scroll'
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

          <div className='row mb-6'>
            <div className='fv-row col-4 col-lg-3'>
              <label className="d-block fw-bold fs-6 mb-2 required">Хөнгөлөх дүн</label>

              <div className="btn-group w-100 w-lg-50" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button]">
                <label className={type === 'percent' ? typeClassNameActive : typeClassName} data-kt-button="true">
                    <input className="btn-check text-active-primary" type="radio"
                      {...formik.getFieldProps('type')}  
                      value='percent'
                      checked={type === 'percent'}
                      onChange={(val) => {handleOnChange('type', val)}}
                    />
                    %
                </label>

                <label className={type === 'cash' ? typeClassNameActive : typeClassName} data-kt-button="true">
                    <input className="btn-check" type="radio" 
                      {...formik.getFieldProps('type')}
                      value='cash'
                      checked={type === 'cash'}
                      onChange={(val) => {handleOnChange('type', val)}}
                    />
                    ₮
                </label>
              </div>
            </div>

            <div className='fv-row col-8 col-lg-9'>
              <label className="d-block fw-bold fs-6 mb-2" style={{color: 'white'}}> .</label>
              <div className='input-group'>
                <span className="input-group-text" id="basic-addon1">
                  <span hidden={type === 'percent'}>₮ </span>
                  <span hidden={type === 'cash'}>%</span>
                </span>

                <NumberFormat
                    className="form-control"
                    {...formik.getFieldProps('value')} 
                    thousandSeparator={formik.values.type === 'percent' ? false : true}
                    allowLeadingZeros={false}
                />
              </div>
             
              {((formik.touched.type && formik.errors.type) || (formik.touched.value && formik.errors.value)) && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.value ? formik.errors.value : formik.errors.type}</div>
                </div>
              )} 
            </div>
          </div>
          
          <div className='row mb-6'>
            <div className='fv-row col-6'>
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
            <div className='fv-row col-6'>
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
            <label className="d-block fw-bold fs-6 mb-2">Хамрах эмчилгээ</label>
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
          </div>

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2">Үнийн хязгаар</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Үнийн хязгаар тавих" 
              {...formik.getFieldProps('limit_price')} 
            />
          </div>

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2">Нэмэлт мэдээлэл</label>
            <textarea 
              className="form-control" 
              placeholder="Нэмэлт мэдээлэл" 
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
      {(formik.isSubmitting || isLoading) && <DiscountsListLoading />}
      {openServiceModal && 
        <ServicesModal toggleServiceModal={toggleServiceModal} selectedServices={formik.values.selected_services}
          allService={formik.values.is_all_services ? true : false}/>}
    </>
  )
}

export {DiscountEditModalForm}
