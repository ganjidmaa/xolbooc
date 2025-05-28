import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { CRUD_RESPONSES, isNotEmpty } from '../../../../../../_metronic/helpers'
import { createAccount, updateAccount } from '../../core/_requests'
import { AccountListLoading } from '../../components/loading/AccountListLoading'
import Datetime from 'react-datetime';
import Moment from 'moment';
import { NumericFormat as NumberFormat} from 'react-number-format';
import { NotifySuccess } from '../../../../../../_metronic/helpers/notify/NotifySuccess'
import { WarningAlert } from '../../../../../../_metronic/helpers/alerts/Warning'
import { ErrorAlert } from '../../../../../../_metronic/helpers/alerts/Error'
import { BankAccount } from '../../core/_models'

type Props = {
  account: BankAccount
  isLoading: boolean
}

const editAccountSchema = Yup.object().shape({
  name: Yup.string().required('Нэр оруулна уу'),
  account_number: Yup.string().required('Нэр оруулна уу'),
})

const AccountEditModalForm: FC<Props> = ({account, isLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [typeClassName] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-success')
  const [typeClassNameActive] = useState('btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-success active')
  const [openServiceModal, setOpenServiceModal] = useState(false)

  const [accountForEdit] = useState<BankAccount>({
    ...account,
    name: account.name || '',
    account_number: account.account_number || ''
  })

  const formik = useFormik({
    initialValues: accountForEdit,
    validationSchema: editAccountSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        var response: any = {};
        if(isNotEmpty(values.id))
          response = await updateAccount(values)
        else
          response = await createAccount(values)
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

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_account_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      
        <div
          className='d-flex flex-column scroll-y me-n5 pe-5'
          id='kt_modal_add_account_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_account_header'
          data-kt-scroll-wrappers='#kt_modal_add_account_scroll'
          data-kt-scroll-offset='300px'
        >

          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2 required">Нэр</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Нэр" 
              {...formik.getFieldProps('name')} 
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.name}</div>
              </div>
            )} 
          </div>
          
          <div className='fv-row mb-6'>
            <label className="d-block fw-bold fs-6 mb-2 required">Данс</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Данс" 
              {...formik.getFieldProps('account_number')} 
            />
            {formik.touched.account_number && formik.errors.account_number && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.account_number}</div>
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
      {(formik.isSubmitting || isLoading) && <AccountListLoading />}
    </>
  )
}

export {AccountEditModalForm}
