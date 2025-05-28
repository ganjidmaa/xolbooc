import { useAuth } from "../../../auth"
import { BookingCard } from "../../BookingCard"
import { useCalendarData } from "../../core/CalendarDataProvider"
import { useCalendarItem } from "../../core/CalendarItemProvider"
import { TypeItem } from "./TypeItem"

export const TypeIndex = () => {
    const {types} = useCalendarData()
    const {itemDatas} = useCalendarItem()
    const {settings} = useAuth()
    if(settings?.has_branch)
    return (
        <BookingCard title="Үйлчилгээний брэндээ сонгоно уу"
            body={<>
                    {types.filter(type => itemDatas.branch?.types.includes(type.id + '')).map(type => {
                        return (
                            <TypeItem type={type} key={type.id}/>
                        )
                    })}
                </>
            }
        />
    )
    else{
        return (
            <BookingCard title="Үйлчилгээний брэндээ сонгоно уу"
                body={<>
                        {types.map(type => {
                            return (
                                <TypeItem type={type} key={type.id}/>
                            )
                        })}
                    </>
                }
            />
        )
    }
}
