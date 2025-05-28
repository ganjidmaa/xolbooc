import ProfileHeader from "./header/ProfileHeader"
import { ProfileBody } from "./ProfileBody"
import { useLocation } from "react-router-dom"
import { ID } from "../../../../_metronic/helpers"
import { useListView } from "../customers-list/provider/ListViewProvider"

const ProfileWrapper = () => {
    const location: any = useLocation()
    const customerId: ID = location.state?.customerId
    const {setItemIdForUpdate} = useListView()

    customerId && setItemIdForUpdate(customerId)

    return (  
        <div className="d-flex flex-column flex-xl-row">
            <ProfileHeader />
            <ProfileBody />
        </div>    
    )
}

export {ProfileWrapper}