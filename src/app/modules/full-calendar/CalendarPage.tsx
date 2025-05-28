import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { FullCalendarCard } from "./calendar-view/FullCalendarCard"
import {CalendarWrapper} from "./CalendarWrapper"
import { EventPage } from "./event-view/EventPage"
import { EventEditDetail } from "./event-edit/EventEditDetail"

const CalendarPage = () => {
    const calendarBreadcrumbs: Array<PageLink> = [
        {
          title: 'Календар',
          path: '/calendar/index',
          isSeparator: false,
          isActive: false,
        },

    ]

    return (      
        <Routes>
            <Route element={<CalendarWrapper />}>
                <Route 
                    path='index'
                    element={
                        <>
                            <PageTitle breadcrumbs={calendarBreadcrumbs}>Календар</PageTitle>
                            <FullCalendarCard />
                        </>
                    }
                />
                <Route 
                    path='index/event/view'
                    element={
                        <>
                            <PageTitle breadcrumbs={calendarBreadcrumbs}>Цаг захиалга </PageTitle>
                            <EventPage />
                        </>
                    }
                />
                <Route 
                    path='index/event/edit'
                    element={
                        <>
                            <PageTitle breadcrumbs={calendarBreadcrumbs}>Цаг захиалга засах</PageTitle>
                            <EventEditDetail />
                        </>
                    }
                />
                
            </Route>
            <Route index element={<Navigate to='calendar/index'/>}/>
            <Route element={<Navigate to='calendar/index/event/view'/>}/>
            <Route element={<Navigate to='calendar/index/event/edit'/>}/>
            <Route element={<Navigate to='calendar/index/payment'/>}/>
        </Routes>
    )
}

export default CalendarPage