import { Outlet, Route, Routes } from "react-router-dom"
import { WelcomePage } from "./WelcomePage"
import {BookingBody} from "./BookingBody"
import { BookingLayoutProvider } from "./BookingLayoutProvider"
import { CustomerIndex } from "./components/customer-step/CustomerIndex"
import { DateIndex } from "./components/date-step/DateIndex"
import { ServiceIndex } from "./components/service-step/ServiceIndex"
import { NotePage } from "./components/NotePage"
import { UserIndex } from "./components/user-step/UserIndex"
import { BranchIndex } from "./components/branch-step/BranchIndex"
import { TypeIndex } from "./components/service-type-step/TypeIndex"
import { PaymentIndex } from "./components/payment-step/PaymentIndex"

const BookingLayout = () => {
  return (
    <BookingBody>
        <Outlet/>
    </BookingBody>
  )
}
  
const BookingPage = () => (
  <Routes>
    <Route element={<BookingLayoutProvider />}>
      <Route path='index' element={<WelcomePage />} />
      <Route index element={<WelcomePage />} />

      <Route element={<BookingLayout />}>
        <Route path='branch' element={<BranchIndex />} />
        <Route path='type' element={<TypeIndex />} />
        <Route path='service' element={<ServiceIndex />} />
        <Route path='user' element={<UserIndex />} />
        <Route path='date' element={<DateIndex />} />
        <Route path='customer' element={<CustomerIndex />} />
        <Route path='note' element={<NotePage />} />
        <Route path='payment' element={<PaymentIndex />} />
      </Route>
    </Route>
  </Routes>
)
  

export {BookingPage}