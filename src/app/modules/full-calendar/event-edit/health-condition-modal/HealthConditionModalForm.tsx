import {FC} from 'react'
import {useFormik} from 'formik'
import {
  CRUD_RESPONSES, toHealthConditionUrl,
} from '../../../../../_metronic/helpers'
import {HealthCondition} from '../../core/_models'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {NotifySuccess} from '../../../../../_metronic/helpers/notify/NotifySuccess'
import {printHealthCondition, updateHealthCondition} from '../../core/_requests'
import TreeInputComponent from './TreeInputComponent'
import TwoInputComponent from './TwoInputComponent'
import FourInputComponent from './FourInputConmponent'
import { useCalendarView } from '../../core/CalendarViewProvider'
import { saveAs } from 'file-saver'

type Props = {
  healthConditionData: HealthCondition
  setFunction: any
}

const HealthConditionModalForm: FC<Props> = ({healthConditionData, setFunction}) => {
  const {healthCondition, setHealthCondition} = useCalendarView()
  const formik = useFormik({
    initialValues: healthConditionData,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const response = await updateHealthCondition(values)
        response && response === formik.values.appointment_id && NotifySuccess(CRUD_RESPONSES.success)
      } catch (ex: any) {
        console.error(ex)
        ErrorAlert(CRUD_RESPONSES.error)
      } finally {
        setSubmitting(false)
        setFunction === undefined ? setHealthCondition(undefined): setFunction()
      }
    },
  })
  const print = async () =>{
    const filename = (await printHealthCondition(formik.values.appointment_id)).data
    const url = toHealthConditionUrl(filename)
    saveAs(url, filename);
  }

  return (
    <>
      <div className='row mb-6'>
        <TreeInputComponent label="Холын хараа" formik={formik} prop='farsightedness'/>
        <TreeInputComponent label="Ph" formik={formik} prop='Ph'/>
        <TreeInputComponent label="Шилтэй" formik={formik} prop='with_glasses'/>
        <TreeInputComponent label="Ойрын хараа" formik={formik} prop='nearsightedness'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} t='T' label='Нүдний даралт Air tonometer' prop='air_tonometer'/>
        <TwoInputComponent formik={formik} t='T' label='CCT' prop='CCT'/>
        <TwoInputComponent formik={formik} label='Гониоскопи' prop='go_scope'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Нүдний хөдөлгөөн' prop='eye_movement'/>
        <TwoInputComponent formik={formik} label='Рефракц' prop='refraction'/>
        <TwoInputComponent formik={formik} label='Хяларын өнцөг' prop='cranial_angle'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Өнгө' prop='color'/>
        <TwoInputComponent formik={formik} label='Эмгэг ялгадас' prop='pathological_discharge'/>
        <TwoInputComponent formik={formik} label='Нулимсны зам' prop='tear_path'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Ухархай' prop='eye_recesses'/>
        <TwoInputComponent formik={formik} label='Зовхи' prop='eyelids'/>
        <TwoInputComponent formik={formik} label='Салст' prop='mucus'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Склер' prop='sclera'/>
        <TwoInputComponent formik={formik} label='Эвэрлэг' prop='cornea'/>
        <TwoInputComponent formik={formik} label='Өмнөд камер' prop='sought_camera'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Солонгон бүрхэвч' prop='rainbow_cover'/>
        <TwoInputComponent formik={formik} label='Хүүхэн хараа' prop='pupil'/>
        <TwoInputComponent formik={formik} label='RAPD' prop='RAPD'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Болор' prop='crystal'/>
        <TwoInputComponent formik={formik} label='Шилэнцэр' prop='glass'/>
        <TwoInputComponent formik={formik} label='Харааны мэдрэлийн диск' prop='eye_disk'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='CDR' prop='CDR'/>
        <TwoInputComponent formik={formik} label='A:V' prop='A_V'/>
        <TwoInputComponent formik={formik} label='S-H' prop='S_H'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='K-W' prop='K_W'/>
        <TwoInputComponent formik={formik} label='S-S' prop='S_S'/>
        <TwoInputComponent formik={formik} label='Торлог' prop='reticulated'/>
      </div>
      <div className='row mb-6'>
        <TwoInputComponent formik={formik} label='Шар толбо' prop='yallow_dot'/>
        <TwoInputComponent formik={formik} label='Зах хэсэг' prop='outside'/>
      </div>
      <div className='row mb-6'>
        <FourInputComponent formik={formik} label='Distance (Хол) - R' prop='distance_R'/>
      </div>
      <div className='row mb-6'>
        <FourInputComponent formik={formik} label='Distance (Хол) - L' prop='distance_L'/>
      </div>
      <div className='row mb-6'>
        <FourInputComponent formik={formik} label='Near (Ойр) - R' prop='near_R'/>
      </div>
      <div className='row mb-6'>
        <FourInputComponent formik={formik} label='Near (Ойр) - L' prop='near_L'/>
      </div>
      
      <div className='text-center pt-10 d-flex justify-content-between'>
        <button type='submit' className='btn btn-primary' onClick={() => {setFunction === undefined ? setHealthCondition(undefined) : setFunction()}} disabled={formik.isSubmitting}> 
          <span className='indicator-label'>Хаах</span>
        </button>
        <button type='submit' className='btn btn-primary' onClick={()=>{print()}} disabled={formik.isSubmitting}> 
          <span className='indicator-label'>Хэвлэх</span>
        </button>
        <button type='submit' className='btn btn-primary' onClick={formik.submitForm} disabled={formik.isSubmitting}> 
          <span className='indicator-label'>Хадгалах</span>
        </button>
      </div>
    </>
  )
}

export {HealthConditionModalForm}
