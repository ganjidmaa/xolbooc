import { objectHasAttr } from "../../../../../_metronic/helpers"
import { useMasterData } from "../../customers-list/provider/MasterDataProvider"
import { ProfileDetail } from "./ProfileDetail"

export const ProfileDetailIndex = () => {
    const {customer, provinces, soumDistricts: soumDistrictsData} = useMasterData()

    if(objectHasAttr(customer)) {
        return (
            <ProfileDetail 
                customer={customer}
                provinces={provinces}
                soumDistrictsData={soumDistrictsData}
            />
        )
    }

    return (
        <>
            {!objectHasAttr(customer) && <div>
                <div className="card-px text-center pt-0 pb-15">
                    <p className="text-gray-400 fs-4 fw-bold py-7">Эмчлүүлэгч ийн мэдээлэл олдсонгүй.</p>
                </div>
                <div className="text-center pb-0 px-5">
                    <img src="/media/illustrations/sketchy-1/4.png" alt="" className="mw-100 h-200px h-sm-325px" />
                </div>
            </div>}
        </>
    )
}