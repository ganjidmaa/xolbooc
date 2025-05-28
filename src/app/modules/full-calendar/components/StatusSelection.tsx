import { FC } from 'react';
import { CRUD_RESPONSES, LightColor } from '../../../../_metronic/helpers';
import { InfoAlert } from '../../../../_metronic/helpers/alerts/Info';
import { FormAlert } from '../../../../_metronic/helpers/alerts/FormAlert';
import { cancelEvent } from '../core/_requests';
import { NotifySuccess } from '../../../../_metronic/helpers/notify/NotifySuccess';
import { useCalendarView } from '../core/CalendarViewProvider';
import { useNavigate } from 'react-router-dom';

type Props = {
    changeStatus: (value: string) => void
    currentStatus: string
}

export const StatusSelection:FC<Props> = ({changeStatus, currentStatus}) => {
    const {eventIdForUpdate} = useCalendarView()
    const navigate = useNavigate()

    const onClickChangeStatus = (value: string) => {
        let warning = false
        if(!warning) {
            changeStatus(value)
        }
    }

    const cancel = async () => {
        let warning = false
        if(!warning) {
            const {value: buttonType} = await InfoAlert('Та цуцлахдаа итгэлтэй байна уу?', true)
            if(buttonType) {
                const {value: cancellationType} = await FormAlert()
                if(cancellationType) {
                    try {
                        const response = await cancelEvent(eventIdForUpdate, {cancel_type: cancellationType, status: 'cancelled'})
                        const status = response.payload?.status
                        status && status === 200 && NotifySuccess(CRUD_RESPONSES.success_cancel)
                    } 
                    catch(err: any) {
                        console.log('err', err)
                    } 
                    finally {
                        navigate('/calendar/index')
                    }
                }
            }
        }
    }

    return (
        <div className='menu menu-sub menu-sub-dropdown w-150px w-md-200px' data-kt-menu='true'>
            <div className='d-block menu-item'>
                <button 
                    className={`menu-link btn btn-white ${LightColor.filter(lc => lc.value === 'confirmed')[0]?.name} p-2 w-100`}
                    hidden={currentStatus === 'confirmed'}
                    onClick={() => {onClickChangeStatus('confirmed')}}
                    data-kt-menu-dismiss='true'
                >
                    Баталгаажсан
                </button>
                <button className={`menu-link btn btn-white ${LightColor.filter(lc => lc.value === 'showed')[0]?.name} p-2 w-100`}
                    hidden={currentStatus === 'showed'}
                    onClick={() => {onClickChangeStatus('showed')}}
                    data-kt-menu-dismiss='true'
                >
                    Ирсэн
                </button> 
                {/* <button className={`btn btn-white ${LightColor.filter(lc => lc.value === 'started')[0]?.name} p-2 w-100`}
                    hidden={currentStatus === 'started'}
                    onClick={() => {onClickChangeStatus('started')}}
                    data-kt-menu-dismiss='true'
                >
                    Эхлэсэн
                </button> */}
                <button className={`menu-link btn btn-white ${LightColor.filter(lc => lc.value === 'no_show')[0]?.name} p-2 w-100`}
                    hidden={currentStatus === 'no_show'}
                    onClick={() => {onClickChangeStatus('no_show')}}
                    data-kt-menu-dismiss='true'
                >
                    Ирээгүй
                </button>
                <button className={`menu-link btn btn-white ${LightColor.filter(lc => lc.value === 'no_show')[0]?.name} p-2 w-100`}
                    onClick={() => cancel()}
                    hidden={['no_show', 'completed', 'part_paid'].includes(currentStatus)}
                    data-kt-menu-dismiss='true'
                >
                    Цуцалсан
                </button>
            </div>
        </div>
    )
}