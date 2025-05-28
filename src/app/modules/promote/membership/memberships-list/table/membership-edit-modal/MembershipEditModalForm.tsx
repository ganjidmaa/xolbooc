/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Membership, MembershipType } from '../../core/_models'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import Select from 'react-select'
import { MembershipsListLoading } from '../../components/loading/MembershipsListLoading'
import { CustomersModal } from '../customer-selection-modal/CustomersModal'
import { CRUD_RESPONSES, ID, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { createMembership, updateMembership } from '../../core/_requests'
import { NotifySuccess } from '../../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../../_metronic/helpers/alerts/Error'

type Props = {
  membership: Membership
  isLoading: boolean
  membershipTypes: Array<MembershipType>
  createType?: string
  closeModal?: () => void
  customerId?: ID
}

const editMembershipSchema = Yup.object().shape({
  membership_type_id: Yup.number().required('Хөнгөлөлт сонгоно уу'),
  code: Yup.string().required('Картын дугаар оруулна уу'),
  selected_customers: Yup.array()
    .min(1, 'Гишүүн сонгоно уу')
    .required('Гишүүн сонгоно уу')
})

const MembershipEditModalForm: FC<Props> = ({membershipTypes, membership, isLoading, createType='membership', closeModal=()=>{}, customerId=0 }) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [countCustomers, setCountCustomers] = useState('')
  const [openCustomerModal, setOpenCustomerModal] = useState(false)
  const [selectedMembershipType, setSelectedMembershipType] = useState<MembershipType>()

  const [membershipForEdit] = useState<Membership>({
    ...membership,
    code: membership?.code || '',
    percent: membership?.percent || 0,
    password: membership?.password || '',
  })

  useEffect(() => {
    if(membership.id) {
        let numberOfCustomers = membership.selected_customers?.length
        setCountCustomers(numberOfCustomers + ' гишүүн сонгогдлоо')
    }
  }, [membership])

  const formik = useFormik({
    initialValues: membershipForEdit,
    validationSchema: editMembershipSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(!isNotEmpty(values.id))
          values = {...values, selected_customers: [...values.selected_customers as Array<ID>, customerId]}

        if(isNotEmpty(values.id))
          response = await updateMembership(values)
        else 
          response = await createMembership(values)
        
        const status = response.payload?.status
        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)  
        status && status === 401 && WarningAlert('Картын дугаар давхцсан тул өөр дугаар оруулна уу.')
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

  useEffect(() => {
    if(membershipTypes && formik.values.membership_type_id) {
      const selectedMType = membershipTypes.filter(membershipType => membershipType.value === formik.values.membership_type_id)[0]
      setSelectedMembershipType(selectedMType)
    }
  }, [formik.values.membership_type_id])

  const getRandomCode = (prefix: string) => {
    let randomNumber = Math.floor(Math.random() * (9999-1000)) + 1000
    return prefix.toString()+randomNumber.toString()
  }


  const handleOnChange = (field: string, option: any) => {
    formik.setFieldValue(field, option.value)
    formik.setFieldValue('percent', option.percent)
    
    const code = getRandomCode(option.prefix)
    formik.setFieldValue('code', code)
    
  }

  const toggleCustomerModal = (selectedCustomers?: Array<ID>) => {
    setOpenCustomerModal(!openCustomerModal)
    if(selectedCustomers) {
      formik.setFieldValue('selected_customers', selectedCustomers)
      setCountCustomers(selectedCustomers.length + ' гишүүн сонгогдлоо')
    }
  }

  const cancel = (withRefresh?: boolean) => {
    if(createType === 'customer') {
      closeModal()
    }
    else {
      if (withRefresh) {
        refetch()
      }
      setItemIdForUpdate(undefined)
    }
  }

  return (
    <>
      <form id='kt_modal_add_membership_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_membership_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_membership_header'
          data-kt-scroll-wrappers='#kt_modal_add_membership_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='row mb-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">Хөнгөлөлтийн төрөл</label>
              <Select 
                  options={membershipTypes}
                  id='membership_type_id'
                  {...formik.getFieldProps('membership_type_id')} 
                  value={membershipTypes && formik.values.membership_type_id ? selectedMembershipType : []}
                  onChange={(opt) => {handleOnChange('membership_type_id', opt)}}
              />
              {Object.keys(formik.touched).find((key) => {return key === 'react-select-2-input'}) 
                  && formik.errors.membership_type_id && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.membership_type_id}</div>
                </div>
              )}
          </div>
          
          <div className='row mb-6'>
            <div className='fv-row col-lg-6 mb-6 mb-lg-0'>
              <label className="d-block fw-bold fs-6 mb-2">Хөнгөлөлт</label>
              <div className='input-group '>
                <span className="input-group-text" id="basic-addon1">
                  <span>% </span>
                </span>

                <input 
                  type="text" 
                  className="form-control" 
                  aria-describedby="basic-addon2"
                  disabled={true}
                  {...formik.getFieldProps('percent')}
                />
              </div>
            </div>
            
            <div className='fv-row col-lg-6'>
              <label className="d-block fw-bold fs-6 mb-2">{'Код'}</label>
              <input 
                type="text" 
                className="form-control" 
                disabled={true}
                {...formik.getFieldProps('code')}
              />
              {formik.touched.code && formik.errors.code && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{'Гишүүнчлэлийн код оруулна уу'}</div>
                </div>
              )} 
            </div>
          </div>

            <div className='fv-row mb-6'>
              <label className="d-block fw-bold fs-6 mb-2 required">Гишүүн нэмэх</label>
              <div className='input-group' onClick={() => toggleCustomerModal()}>
                <input 
                  type="text" 
                  className="form-control" 
                  aria-describedby="basic-addon2"
                  placeholder={countCustomers}
                />
                <span className="input-group-text text-hover-primary" id="basic-addon2">сонгох</span>
              </div>
              {formik.touched.selected_customers && formik.errors.selected_customers && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{'Үйлчлүүлэгчдээс сонгон энэ гишүүнчлэлд бүртгэнэ үү'}</div>
                </div>
              )} 
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
            disabled={isLoading || formik.isSubmitting}
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
      {(formik.isSubmitting || isLoading) && <MembershipsListLoading />}
      {openCustomerModal && 
        <CustomersModal toggleCustomerModal={toggleCustomerModal} selectedCustomersProp={formik.values.selected_customers || []} />}
    </>
  )
}

export {MembershipEditModalForm}
