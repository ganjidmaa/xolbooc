import { BookingCard } from "../../BookingCard"
import { useCalendarData } from "../../core/CalendarDataProvider"
import { BranchItem } from "./BranchItem"

export const BranchIndex = () => {
    const {branches} = useCalendarData()

    return (
       <BookingCard title="Салбар сонгоно уу" body={
            <>
                {branches.map(branch => {
                    return (
                        <BranchItem branch={branch} key={branch.id}/>
                    )
                })}
            </>
        } /> 
                
    )
}
