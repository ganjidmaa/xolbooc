import { CalendarViewProvider } from "./core/CalendarViewProvider"
import { CalendarDataProvider } from "./core/CalendarDataProvider"
import { CalendarItemProvider } from "./core/CalendarItemProvider"
import { CalendarQueryProvider } from "./core/CalendarQueryProvider"
import { Outlet } from "react-router-dom"


export const CalendarWrapper = () => {
    return (
        <CalendarViewProvider>
            <CalendarDataProvider>
                <CalendarItemProvider>
                    <CalendarQueryProvider>
                        <Outlet />
                    </CalendarQueryProvider>
                </CalendarItemProvider>
            </CalendarDataProvider>
        </CalendarViewProvider>

    )
}