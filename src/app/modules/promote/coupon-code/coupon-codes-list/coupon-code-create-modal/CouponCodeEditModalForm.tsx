import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../../_metronic/helpers'
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { CouponCodesListLoading } from '../components/loading/CouponCodesListLoading'
import { Coupon, CouponCode } from '../core/_models'
import { CouponItem } from './CouponItem'
import { NumericFormat as NumberFormat} from 'react-number-format';
import Moment from 'moment';
import { useListView } from '../core/ListViewProvider'
import { createCouponCode } from '../core/_requests'
import { NotifyWarning } from '../../../../../../_metronic/helpers/notify/NotifyWarning'


type Props = {
  isLoading: boolean
  coupons: Array<Coupon>
}

const editCouponCodeSchema = Yup.object().shape({
  id: Yup.number()
    .min(1, 'Купоны төрөл сонгоно уу')
    .required('Купоны төрөл сонгоно уу'),
  create_number: Yup.number()
    .when('selectedCoupon.type', {
      is: false,
      then: Yup.number()
        .min(1, 'Үүсгэх тоо оруулна уу')
        .required('Үүсгэх тоо оруулна уу'),
      otherwise: Yup.number().notRequired(),
    }),
  code: Yup.string()
    .when('selectedCoupon.type', {
      is: true,
      then: Yup.string()
        .min(3, 'Багадаа 3 тэмдэгт байна')
        .max(50, 'Ихдээ 50 тэмдэгт байна')
        .required('Ашиглах код оруулна уу'),
      otherwise: Yup.string().notRequired(),
    }),
})

const CouponCodeEditModalForm: FC<Props> = ({isLoading, coupons}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>()
  const [couponForEdit] = useState<CouponCode>({
    id: 0,
  })
  const [availableCoupons, setAvailableCoupons] = useState<boolean>(false)
  // const labelStyle = {
  //   width: '160px',
  //   color: '#A1A5B7'
  // } 

  const formik = useFormik({
    initialValues: couponForEdit,
    validationSchema: editCouponCodeSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await createCouponCode({'id': values.id ?? 0, 'create_number': values.create_number ?? 1, 'code': values.code ?? ''})
        const status = response.payload?.status
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)  
        status && status === 201 && NotifyWarning(response.data)  
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

  const handleOnChange = (value: any) => {
    setSelectedCoupon(value)
    if(value?.sell_limit === 0 || 
        (!value.type && value?.sell_limit && (value.limit_number - value.code_count) > 0) || 
        (value.type && value?.sell_limit && value.code_count == 0)) {
        setAvailableCoupons(true) 
    }
    else {
        setAvailableCoupons(false)
    }
    formik.setFieldValue('id', value.id)
  }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_coupon_form' className='form' onSubmit={formik.handleSubmit} noValidate>
    
        <div className='d-flex flex-column me-n5 pe-2'>
          <div className='row'>
            <div className="col-lg-4 fv-row p-8 p-md-0 pe-md-3">
              <div className='row'>
                  <div className="fw-bold">
                      <div className="text-gray-800 fw-bolder fs-6 mb-2">АНГИЛАЛ СОНГОНО УУ</div>
                      <div className="separator border border-primary my-1"></div>
                  </div>
              </div>
              <div
                  className='scroll-y h-300px'
                  id='kt_modal_add_coupon_scroll'
                  data-kt-scroll='true'
                  data-kt-scroll-activate='{default: false, lg: true}'
                  data-kt-scroll-max-height='150px'
                  data-kt-scroll-dependencies='#kt_modal_add_coupon_header'
                  data-kt-scroll-wrappers='#kt_modal_add_coupon_scroll'
                  data-kt-scroll-offset='0px'
              >
                  {coupons.map((coupon) => {
                      return (
                          <CouponItem key={coupon.id} coupon={coupon} handleOnChange={handleOnChange}/>
                      )
                  })
                  }
              </div>
            </div>

            <div className="col-lg-8 fv-row mb-lg-0 p-sm-7 p-md-0">

            {selectedCoupon && 
              <div className="notice d-flex rounded border-primary border p-2 mt-1">
                <div className='w-100'>
                
                    <div className="card-rounded bg-primary bg-opacity-5 p-1 mb-0">
                      {/* <h2 className="text-dark fw-bold mb-11">More Channels</h2> */}
                      <div className="d-flex align-items-center mb-6">
                        <i className="bi bi-journal-medical text-primary fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                          <h5 className="text-gray-800 fw-bold">{selectedCoupon.title}</h5>
                          <div className="fw-semibold">
                           
                            <tr>
                                <td  className="text-gray-700 w-150px">Купоны эрх</td>
                                <td className="text-gray-700 fw-bold">
                                    <NumberFormat
                                        value={selectedCoupon.value}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />
                                    <span>{'₮'} </span>  
                                </td>
                            </tr>
                           
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-6">
                        <i className="bi bi-journal-text text-primary fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                          <h5 className="text-gray-800 fw-bold">Хугацаа</h5>
                          <div className="fw-semibold">
                            <tr>
                                <td className="text-gray-700 w-150px">Эхлэх огноо</td>
                                <td className="text-gray-700 fw-bold">{Moment(selectedCoupon.start_date).format('YYYY/MM/DD')}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-700">Дуусах огноо</td>
                                <td className="text-gray-700 fw-bold">{Moment(selectedCoupon.end_date).format('YYYY/MM/DD')}</td>
                            </tr>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-5">
                        <i className="bi bi-journal-bookmark text-primary fs-1 me-5"></i>
                        <div className="d-flex flex-column">
                          <h5 className="text-gray-800 fw-bold">Бусад</h5>
                          <div className="fw-semibold">
                            {/* <tr>
                                <td className="text-gray-700 w-150px">Хамрах үйлчилгээ</td>
                                <td className="text-gray-700 fw-bold">{selectedCoupon.services}</td>
                            </tr> */}
                            <tr>
                                <td className="text-gray-700 w-150px">Төрөл</td>
                                <td className="text-gray-700 fw-bold">{selectedCoupon.type ? 'Олон удаагийн' : 'Нэг удаагийн'}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-700">{selectedCoupon.type ? 'Ашиглах боломжит тоо' : 'Нийт үүсгэх тоо'}</td>
                                <td className="text-gray-700 fw-bold">
                                  {selectedCoupon.sell_limit ? (selectedCoupon.limit_number) : 'Хязгаарлахгүй'}
                                </td>
                            </tr>
                            {!selectedCoupon.type && selectedCoupon.sell_limit === 1 &&
                              <tr>
                                  <td className="text-gray-700">Үлдсэн тоо</td>
                                  <td className="text-gray-700 fw-bold">
                                    {(selectedCoupon.limit_number ?? 0) - (selectedCoupon.code_count ?? 0)}
                                  </td>
                              </tr>
                            }
                          </div>
                        </div>
                      </div>

                      {selectedCoupon.type && availableCoupons && 
                        <div className='fv-row col-lg-11'>
                          <label className="d-block fw-bold fs-6 mb-2 required">Ашиглах купон код үүсгэнэ үү</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Код" 
                            {...formik.getFieldProps('code')} 
                          />
                          {(formik.touched.code || formik.errors.code) && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{formik.errors.code}</div>
                            </div>
                          )}
                        </div>
                      }

                      {!selectedCoupon.type && availableCoupons && 
                        <div className='fv-row col-lg-6'>
                          <label className="d-block fw-bold fs-6 mb-2 required">Нийт үүсгэх тоо</label>
                          <NumberFormat
                              className="form-control"
                              {...formik.getFieldProps('create_number')} 
                              thousandSeparator={true}
                              allowLeadingZeros={false}
                          />
                          {(formik.touched.create_number || formik.errors.create_number) && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{formik.errors.create_number}</div>
                            </div>
                          )} 
                        </div>
                      }
                    </div>
                 
                </div>
              </div>
            }
            </div>
          </div>
        </div>

        <div className='text-center pt-10'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting}
          >
            Болих
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={formik.isSubmitting || !formik.touched || !availableCoupons}
          >
            <span className='indicator-label'>Үүсгэх</span>
            {(formik.isSubmitting) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

      </form>
      {(formik.isSubmitting) && <CouponCodesListLoading />}
    </>
  )
}

export {CouponCodeEditModalForm}
