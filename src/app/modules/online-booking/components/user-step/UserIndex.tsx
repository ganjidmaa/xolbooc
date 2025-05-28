import { BookingCard } from "../../BookingCard"
import { useCalendarData } from "../../core/CalendarDataProvider"
import { UserItem } from "./UserItem"

export const UserIndex = () => {
    const {users} = useCalendarData()
    const anyUser = {
        value: 0,
        label: '',
        id: 0,
        lastname:'',
        firstname: 'Боломжит хэрэглэгчид'
    }
    return (
        <BookingCard title="Үйлчилгээ хийх ажилтан сонгоно уу"
            body={<>
                    <UserItem user={anyUser} key={0}/>
                    {users.map(user => {
                        return (
                            <UserItem user={user} key={user.id}/>
                        )
                    })}
                </>
            }
        />
    )
}
