import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import { Branch } from '../../branch/core/_models'
import { User } from '../core/_models'
import { useTimeOffData } from '../core/TimeOffProvider'
import Datetime from 'react-datetime'
import Select from 'react-select'
import { CRUD_RESPONSES, KTSVG } from '../../../../_metronic/helpers'
import Moment from 'moment'
import { useAuth } from '../../auth'
import { NotifySuccess } from '../../../../_metronic/helpers/notify/NotifySuccess'
import { NotifyError } from '../../../../_metronic/helpers/notify/NotifyError'
import { ErrorAlert } from '../../../../_metronic/helpers/alerts/Error'
import { WarningAlert } from '../../../../_metronic/helpers/alerts/Warning'
import { useFormik } from 'formik'
import { Loading } from '../../../../_metronic/partials/loading/Loading'

type Props = {
  users: Array<User> 
  branches: Array<Branch> 
}

const datePickerProps = {
  className: 'form-control bg-body'
}

const editUserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Багадаа 3 тэмдэгт байна')
    .max(50, 'Ихдээ 50 тэмдэгт байна')
    .required('Нэр оруулна уу'),
})

const TimeOffModalForm: FC<Props> = ({users, branches}) => {
  const {setTimeOffIdForUpdate} = useTimeOffData()
  const [selectedReasonId, setSelectedReasonId] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(0)
  const [selectedBranchId, setSelectedBranchId] = useState(0)
  const [startDate, setStartDate] = useState(Moment().format('YYYY/MM/DD'))
  const [endDate, setEndDate] = useState(Moment().format('YYYY/MM/DD'))
  const [startTime, setStartTime] = useState(Moment().format('YYYY/MM/DD'))
  const [endTime, setEndTime] = useState(Moment().format('YYYY/MM/DD'))
  const {settings} = useAuth()
  const [reasons] = useState([
    {'label': 'Ээлжийн чөлөө', 'value': 'annual_leave'},
    {'label': 'Өвчтэй чөлөө', 'value': 'sick_leave'},
    {'label': 'Бусад чөлөө', 'value': 'other_leave'},
  ])


  useEffect(() => {
    if (settings?.has_branch && selectedBranchId) {
      let branch = branches.find(branch => branch.id === selectedBranchId)
      setStartTime(branch?.start_time || '00:00')
      setEndTime(branch?.end_time || '23:59')
    } else {
      settings && settings.start_time && setStartTime(settings.start_time)
      settings && settings.end_time && setEndTime(settings.end_time)
    }
  }, [selectedBranchId, branches, settings])

  const handleUserBranch = (value: any) => { 
    if (settings?.has_branch) {
      const userBranches = value;
      const selectedBranch = branches.filter((branch) => (userBranches).includes(branch.value+''))
      if(selectedBranch) {
        setSelectedBranchId(selectedBranch[0].value as number)
      }
    }
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        // values.branch_id = selectedOptions;
        // const response = await createUser(values)
        // const status = response.payload?.status
        
        // status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
        // status && status === 201 && NotifyError(CRUD_RESPONSES.role_limit)
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
      } 
    },
  })

  const cancel = () => {
    setTimeOffIdForUpdate(undefined)
  }

  return (
    <>
      <form id='kt_modal_add_timeoff_form' className='form' onSubmit={formik.handleSubmit} noValidate>      
        <div  className='d-flex flex-column scroll-y me-n5 h-500px'>
          <div className='row mb-6'>
            
            <div className='col-6 fv-row mb-6'>
              <label className='fs-6 fw-bold mb-2 required'>User</label>

              <Select options={users} id='user_id'
                value={ users && selectedUserId ? users.filter((user) => user.value === selectedUserId)[0] : []}
                onChange={(opt) => { setSelectedUserId(opt?.value as number); handleUserBranch(opt?.branch_id); }}
              />
            </div>

            {/* {settings?.has_branch && (
              <div className='col-6 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2'>Салбар</label>

                <Select options={branches} id='branch_id'
                  value={ branches && selectedBranchId ? branches.filter((branch) => branch.value === selectedBranchId)[0] : []}
                  onChange={(opt) => { setSelectedBranchId(opt?.value as number)}}
                />
              </div>
            )} */}
            <div className='col-6 fv-row mb-6'>
              <label className='fs-6 fw-bold mb-2 required'>Time off reason</label>

              <Select options={reasons} id='reason_id'
                value={ reasons && selectedReasonId ? reasons.filter((reason) => reason.value === selectedReasonId)[0] : []}
                // onChange={(opt) => {console.log('opt', opt)}}
                onChange={(opt) => { setSelectedReasonId(opt?.value as string) }}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <div className="col-6 fv-row mb-6">
              <label className='fs-6 fw-bold mb-2 required'>start date</label>

              <div className="d-flex align-items-center position-relative">
                  <Datetime
                      className='col-12'
                      timeFormat={false}
                      dateFormat='YYYY/MM/DD'
                      initialValue={startDate}
                      inputProps={datePickerProps}
                      onChange={(val) => {setStartDate(Moment(val).format('YYYY/MM/DD'))}}
                  />
              </div>
            </div>
          
            <div className="col-6 fv-row mb-6">
              <label className='fs-6 fw-bold mb-2 required'>end date</label>

              <div className="d-flex align-items-center position-relative">
                  <Datetime
                      className='col-12'
                      timeFormat={false}
                      dateFormat='YYYY/MM/DD'
                      initialValue={endDate}
                      inputProps={datePickerProps}
                      onChange={(val) => {setEndDate(Moment(val).format('YYYY/MM/DD'))}}
                  />
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <div className='col-6 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2 required'>start time</label>
                <Datetime
                    className='timePicker'
                    dateFormat={false}
                    timeFormat='HH:mm'
                    value={startTime}
                    onChange={(e) => setStartTime(e as string)}
                />
            </div>
            <div className='col-6 fv-row mb-6'>
                <label className='fs-6 fw-bold mb-2 required'>end time</label>
                <Datetime
                    className='timePicker'
                    dateFormat={false}
                    timeFormat='HH:mm'
                    value={endTime}
                    onChange={(e) => setEndTime(e as string)}
                />
            </div>
          </div>
                
        </div>

        {/* begin::Actions */}
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
            disabled={ formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Хадгалах</span>
            {(formik.isSubmitting) && (
              <span className='indicator-progress'>
                Түр хүлээнэ үү...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting) && <Loading />}
    </>
  )
}

export {TimeOffModalForm}
