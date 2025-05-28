import { FC } from 'react';

type Props = {
    changeTreatmentStatus: (value: string) => void
    currentTreatmentStatus: string
}

export const TreatmentStatusSelection:FC<Props> = ({changeTreatmentStatus, currentTreatmentStatus}) => {

    const onClickChangeStatus = (value: string) => {
            changeTreatmentStatus(value)
    }

    return (
        <div className='menu menu-sub menu-sub-dropdown w-150px w-md-200px' data-kt-menu='true'>
            <div className='d-block menu-item'>
                <button 
                    className={`menu-link btn btn-white btn-active-light-info p-2 w-100`}
                    hidden={currentTreatmentStatus === '0'}
                    onClick={() => {onClickChangeStatus('0')}}
                    data-kt-menu-dismiss='true'
                >
                    Хүлээлгэд орсон 
                </button>
                <button className={`menu-link btn btn-white btn-active-light-info p-2 w-100`}
                    hidden={currentTreatmentStatus === '1'}
                    onClick={() => {onClickChangeStatus('1')}}
                    data-kt-menu-dismiss='true'
                >
                    Зөвлөгөө өгсөн
                </button> 
                <button className={`menu-link btn btn-white btn-active-light-info p-2 w-100`}
                    hidden={currentTreatmentStatus === '2'}
                    onClick={() => {onClickChangeStatus('2')}}
                    data-kt-menu-dismiss='true'
                >
                    Мэс засал товлосон
                </button>
            </div>
        </div>
    )
}