import { FC, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { WithChildren } from "../../../_metronic/helpers"
import BookingHeader from "./BookingHeader"
import { BookingAside } from "./components/BookingAside"
import { useCalendarItem } from "./core/CalendarItemProvider"

const BookingBody: FC<WithChildren> = ({children}) => {
    const {setActiveTab} = useCalendarItem();

    useEffect(() => {
        setActiveTab(1)
    }, [])

    return (
        <div className='d-flex flex-column flex-center flex-column-fluid'>
            <BookingHeader />

            <div className="scroll-y flex-column-fluid px-10 py-10 w-100" 
                data-kt-scroll="true" 
                data-kt-scroll-activate="true" 
                data-kt-scroll-height="500px" 
                data-kt-scroll-offset="5px" 
                data-kt-scroll-save-state="true"
                style={{backgroundColor: '#D5D9E2'}}>
                <div style={{ 
                    fontFamily: 'Arial,Helvetica,sans-serif', 
                    lineHeight: '1.5', 
                    minHeight: '100%', 
                    fontWeight: 'normal', 
                    fontSize: '15px', 
                    width: '100%'
                }}>
                    <div className="d-flex flex-column flex-lg-row px-0 px-md-20 mx-md-20 mx-lg-0 mx-xxl-20">
                        <BookingAside />
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {BookingBody}