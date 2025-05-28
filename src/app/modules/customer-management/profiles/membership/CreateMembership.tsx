import { FC, useState } from "react"
import { MembershipEditModal } from "../../../promote/membership/memberships-list/table/membership-edit-modal/MembershipEditModal"
import { useListView } from "../../customers-list/provider/ListViewProvider"

type Props = {
    refetch: () => void
}

export const CreateMembership:FC<Props> = ({ refetch }) => {
    const [openModal, setOpenModal] = useState(false)
    const {itemIdForUpdate} = useListView()
    const closeModal = () => {
        setOpenModal(false);
        refetch();
    }

    return (
        <div>
        {/* <div className="card"> */}
            {/* <div className="card-body"> */}
                <div className="card-px text-center pt-0 pb-15">
                    
                    <p className="text-gray-400 fs-4 fw-bold py-7">Гишүүнчлэлийн код үүсгэж гэр бүлийн 
                    <br />гишүүд холбоно.</p>
                    
                    <div
                        className="btn btn-primary er fs-6 px-8 py-4" 
                        onClick={() => setOpenModal(true)}>
                        Үүсгэх
                    </div>
                    
                </div>
                <div className="text-center pb-0 px-5">
                    <img src="/media/illustrations/sketchy-1/6.png" alt="" className="mw-100 h-200px h-sm-325px" />
                </div>
            {/* </div> */}

            {openModal && <MembershipEditModal closeModal={closeModal} createType='customer' customerId={itemIdForUpdate}/>}
        </div>
    )
}