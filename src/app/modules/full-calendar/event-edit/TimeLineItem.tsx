/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useMemo, useState} from 'react'
import Datetime from 'react-datetime'
import Moment from 'moment'
import Select from 'react-select'
import {useCalendarData} from '../core/CalendarDataProvider'
import {useCalendarView} from '../core/CalendarViewProvider'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Item, Resource, Service, ServiceResource, User} from '../core/_models'
import {durationOptions, ID, objectHasAttr, STATES} from '../../../../_metronic/helpers'
import {NumericFormat as NumberFormat} from 'react-number-format'
import {userCanViewAllEvents} from '../core/consts'
import {useAuth} from '../../auth'

type Props = {
  userId: ID
  item: Item
  readyNextButton: (value: boolean) => void
  getTimeLineData: (formValue: Item) => void
}

const itemDetailsSchema = Yup.object().shape({
  service_id: Yup.number().required('Үйлчилгээ сонгоно уу'),
  duration: Yup.number().min(1, 'Хугацаа сонгоно уу').required('Хугацаа сонгоно уу'),
  frequency: Yup.number()
    .min(1, 'Хамгийн багадаа 1 байна')
    .max(10, '10с дээш давтахгүй байна уу')
    .required('Хамгийн багадаа 1 байна'),
})

const TimeLineItem: FC<Props> = ({userId, item, readyNextButton, getTimeLineData}) => {
  const {currentUser, settings} = useAuth()
  const userRole: string = currentUser?.role || ''
  const loginUserId: number = currentUser?.id || 0

  const {eventStartDate, activeTab} = useCalendarView()
  const {resources, services, users} = useCalendarData()
  const [duration, setDuration] = useState<string>(item.duration as string)
  const [relatedResources, setRelatedResources] = useState<Array<Resource>>([])
  const [userLists, setUserLists] = useState<Array<User>>([])

  const data: Item = {
    ...item,
    user_id: item.user_id || userId,
    service_obj: {},
    resource_obj: resources.filter((resource) => resource.value === item.resource_id)[0],
    user_obj: users.filter((user) => user.value === (item.user_id || userId))[0],
    service_id: item.service_id || 0,
    frequency: 1,
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: itemDetailsSchema,
    onSubmit: async (values, {setSubmitting}) => {},
  })

  useMemo(() => formik.values, [formik.values])

  useEffect(() => {
    objectHasAttr(formik.values.service_obj) &&
      handleRelatedResources(formik.values.service_obj?.resources)
  }, [])

  useEffect(() => {
    if (duration) {
      const itemStartDateTime =
        Moment(eventStartDate).format('YYYY/MM/DD') + ' ' + formik.values.start_time
      const endTime = Moment(itemStartDateTime).add(duration, 'minutes').format('HH:mm')

      formik.setFieldValue('duration', duration.toString())
      formik.setFieldValue('end_time', endTime)
    }
  }, [duration])

  useEffect(() => {
    if (users.length > 0) {
      const newUsers = userCanViewAllEvents(userRole)
        ? settings?.has_branch
          ? users.filter((user) => (user.branch_id as string).includes(activeTab + ''))
          : users
        : users.filter((user) => user.id === loginUserId)
      setUserLists(newUsers)
    }
  }, [users, activeTab])

  useEffect(() => {
    let isDisabled = false
    if (objectHasAttr(formik.values.service_obj) && !objectHasAttr(formik.errors)) isDisabled = true

    readyNextButton(isDisabled)
  }, [formik])

  getTimeLineData(formik.values)

  const handleRelatedResources = (relatedResourceDatas: Array<ServiceResource> | undefined) => {
    let resource_id: ID = 0
    let resource_obj = null

    if (relatedResourceDatas && objectHasAttr(relatedResourceDatas)) {
      let filteredData: Array<Resource> = []
      let relatedResourceIds: Array<ID> = []

      relatedResourceDatas.map((relatedResource) => {
        return relatedResourceIds.push(relatedResource.resource_id)
      })
      filteredData = resources.filter((resource) => {
        if (relatedResourceIds.find((el) => el === resource.value)) {
          return resource
        }
        return false
      })
      resource_id = filteredData.length > 0 ? filteredData[0].value : 0
      resource_obj = filteredData[0]
      setRelatedResources(filteredData)
    }
    formik.setFieldValue('resource_obj', resource_obj)
    formik.setFieldValue('resource_id', resource_id)

    return true
  }

  const handleChangeService = (selectedService: Service) => {
    if (selectedService && objectHasAttr(selectedService)) {
      const duration = selectedService.duration
        ? selectedService.duration
        : STATES.eventDefaultDuration

      formik.setFieldValue('price', selectedService.price)
      formik.setFieldValue('allow_resources', selectedService.allow_resources ? true : false)
      const isSuccess = selectedService.allow_resources
        ? handleRelatedResources(selectedService.resources)
        : true
      isSuccess && setDuration(duration)
    }
  }

  const handleOnChange = (field: string, option: any) => {
    if (field === 'duration') {
      setDuration(option.value)
      return true
    }

    formik.setFieldValue(field, option.value)

    if (field === 'user_id') {
      const newUser = users.filter((user) => user.value === option.value)[0]
      formik.setFieldValue('user_obj', newUser)
    }

    if (field === 'service_id') {
      const newService = services.filter((service) => service.value === option.value)[0]
      formik.setFieldValue('service_obj', newService)
      handleChangeService(newService)
    }

    if (field === 'resource_id') {
      const newResource = resources.filter((resource) => resource.value === option.value)[0]
      formik.setFieldValue('resource_obj', newResource)
    }
  }

  const handleOnChangeTime = (field: string, value: any) => {
    value = Moment(value).format('HH:mm')
    formik.setFieldValue(field, value)
  }

  return (
    <div className='timeline-item'>
      <div className='timeline-line w-40px'></div>
      <div className='timeline-icon symbol symbol-circle symbol-40px me-4 d-none d-lg-block'>
        <div className='symbol-label bg-light'>
          <i className='bi bi-clock-fill fs-3 text-success'></i>
        </div>
      </div>
      <div className='w-100 mt-n1'>
        <div className='pb-5'>
          <div className='align-items-center border border-gray-300 bg-gray-100 rounded min-w-390px px-7 pt-3'>
            <div className='row mb-6'>
              <div className='col-5 fv-row'>
                <label className='fs-6 fw-bold mb-2 required'>Цаг</label>
                <Datetime
                  className='timePicker'
                  dateFormat={false}
                  timeFormat='HH:mm'
                  {...formik.getFieldProps('start_time')}
                  onChange={(val) => {
                    handleOnChangeTime('start_time', val)
                  }}
                />
              </div>

              <div className='col-7 fv-row'>
                <label className='fs-6 fw-bold mb-2'>Үйлчилгээ</label>
                <Select
                  options={services}
                  id='service_id'
                  value={formik.values.service_obj}
                  onChange={(opt) => {
                    handleOnChange('service_id', opt)
                  }}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <div className='fv-row col-5'>
                <label className='fs-6 fw-bold mb-2 required'>Хугацаа</label>
                <Select
                  options={durationOptions}
                  id='duration'
                  value={
                    durationOptions
                      ? durationOptions.filter(
                          (durOpt) => durOpt.value === formik.values.duration
                        )[0]
                      : []
                  }
                  onChange={(val) => {
                    handleOnChange('duration', val)
                  }}
                />
              </div>

              <div className='fv-row col-7'>
                <label className='fs-6 fw-bold mb-2 required'>Ажилтан</label>

                <Select
                  options={userLists}
                  id='user_id'
                  value={
                    userLists && formik.values.user_id
                      ? userLists.filter((user) => user.value === formik.values.user_id)[0]
                      : []
                  }
                  onChange={(opt) => {
                    handleOnChange('user_id', opt)
                  }}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <div className='fv-row col-5'>
                <label className='fs-6 fw-bold mb-2'>Үнэ</label>

                <NumberFormat
                  className='form-control'
                  {...formik.getFieldProps('price')}
                  thousandSeparator={true}
                  onChange={(event) => {
                    formik.setFieldValue('price', event.target.value)
                  }}
                />
              </div>

              <div className='fv-row col-7'>
                <label className='fs-6 fw-bold mb-2'>Давтамж</label>

                <NumberFormat
                  className='form-control'
                  {...formik.getFieldProps('frequency')}
                  onChange={(e) => {
                    handleOnChange('frequency', e.target)
                  }}
                />
                {formik.touched.frequency && formik.errors.frequency && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.frequency}</div>
                  </div>
                )}
              </div>
            </div>

            {/* {formik.values.allow_resources ?
                            <div className="row mb-6">
                                
                                    <div className="fv-row col-7">
                                        <label className="fs-6 fw-bold mb-2 required">Нөөц</label>

                                        <Select
                                            options={relatedResources}
                                            id='resource_id'
                                            value={formik.values.resource_obj}
                                            onChange={(opt) => {handleOnChange('resource_id', opt)}}
                                        />
                                    </div> 
                            </div>
                        : 
                            <></>
                        } */}
          </div>
        </div>
      </div>
    </div>
  )
}

export {TimeLineItem}
