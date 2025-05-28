import { Outlet } from "react-router-dom"
import { CalendarDataProvider } from "./core/CalendarDataProvider"
import { CalendarItemProvider } from "./core/CalendarItemProvider"

const BookingLayoutProvider = () => {
  return (
      <CalendarDataProvider>
          <CalendarItemProvider>
              <Outlet/>
          </CalendarItemProvider>
      </CalendarDataProvider>
  )
}

export {BookingLayoutProvider}