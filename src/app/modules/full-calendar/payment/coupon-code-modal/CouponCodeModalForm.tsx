/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useMemo, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { CouponCode, initialCouponCode } from '../../core/_models'
import { NumericFormat as NumberFormat}from 'react-number-format'
import { useCalendarQuery } from '../../core/CalendarQueryProvider'
import { SearchCouponCode } from './SearchCouponCode'
import CouponItem from './CouponItem'
import { ID, objectHasAttr, QUERIES, stringifyRequestQuery } from '../../../../../_metronic/helpers'
import { useQuery } from 'react-query'
import { getCouponCodes } from '../../core/_requests'

type Props = {
  toggleCouponModal: () => void
  totalLeftPayment: number
  addSplitPayment: (split_amount: string, coupon_code_id?: ID, bank_account_id?: ID, desc?: string) => void
}

const couponCodeSchema = Yup.object().shape({
  id: Yup.number()
    .required('Купон сонгоно уу'),
  redeem_amount: Yup.string()
    .required('Ашиглах дүн оруулна уу')
    .test('min-value', 'Ашиглах дүн оруулна уу', function(redeem_amount, ctx) {
      const intRedeemValue = (redeem_amount && redeem_amount.replaceAll(',', '')) || '0';
      return parseInt(intRedeemValue) > 0;
    })
    .test('max-value', '"Ашиглах боломжит дүн"гээс илүү дүн оруулах боломжгүй', function(redeem_amount, ctx) {
      const intRedeemValue = (redeem_amount && redeem_amount.replaceAll(',', '')) || '0';
      return parseInt(intRedeemValue) <= parseInt(ctx.parent.payable_amount);
    })
})

const CouponCodeModalForm: FC<Props> = ({toggleCouponModal, addSplitPayment, totalLeftPayment}) => {
  const {state} = useCalendarQuery();
  const [filteredCoupon, setFilteredCoupon] = useState<CouponCode>(initialCouponCode);
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const [enabledQuery, setEnabledQuery] = useState<boolean>(false)
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
      setEnabledQuery(true)
    }
  }, [updatedQuery])

  const {
    data: couponCode,
  } = useQuery(
    `${QUERIES.COUPONS_LIST}-${query}`,
    () => {
      return getCouponCodes({search: state.search || ''})
    },
    {
      cacheTime: 0, 
      keepPreviousData: false,           
      enabled: enabledQuery,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    if(objectHasAttr(couponCode)) {
        let code = couponCode as CouponCode
          setFilteredCoupon(code);
          let redeemAmount = totalLeftPayment > parseInt(code.usable_balance || '0') ? code.usable_balance+'' : totalLeftPayment+''
          const payableAmount = redeemAmount;
          
          formik.setValues({
            'id': code.id,
            'payable_amount': payableAmount,
            'usable_balance': code.usable_balance,
            'redeem_amount': redeemAmount,
            'status': code.status
          });
      }
      else 
        setFilteredCoupon({});
  }, [couponCode])


  const formik = useFormik({
    initialValues: filteredCoupon,
    validationSchema: couponCodeSchema,
    onSubmit: async (values, {resetForm}) => {
      if(values.status === 'valid') {
        const integerValue = values.redeem_amount ? values.redeem_amount.replaceAll(',', '') : '0';
        addSplitPayment(integerValue, values.id);
      }

      resetForm();
      cancel();
    },
  });

  const setRedeemAmount = (value: number) => {
    formik.setFieldValue('redeem_amount', value)
  }

  const cancel = () => {
    toggleCouponModal();
  };

  return (
    <>
      <form id='kt_modal_coupon_code_form' className='form' onSubmit={formik.handleSubmit} noValidate>      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-offset='300px'
        >
            <div className='d-flex align-items-center mb-4'>
                <div className='flex-grow-1'>
                    <div className='text-gray-800 fw-bolder fs-5'>
                        ТӨЛБӨР
                    </div>
                </div>
                
                <NumberFormat
                    className="text-gray-800 fw-bolder align-self-start fs-5"
                    value={totalLeftPayment} 
                    displayType={'text'}
                    thousandSeparator={true}
                />
                <span className='text-gray-800 fw-bold align-self-start fs-5'>{' ₮'} </span>
            </div>

            <SearchCouponCode />

            {objectHasAttr(filteredCoupon) && formik.values.id && 
              <CouponItem couponCode={filteredCoupon} totalLeftPayment={totalLeftPayment} formik={formik} setRedeemAmount={setRedeemAmount}/>
            }

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
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {formik.isSubmitting && (
              <span className='indicator-progress'>
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

export {CouponCodeModalForm}
