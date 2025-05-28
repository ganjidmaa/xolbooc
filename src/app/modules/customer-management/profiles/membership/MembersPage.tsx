/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CRUD_RESPONSES, ID, isNotEmpty } from "../../../../../_metronic/helpers"
import { NotifySuccess } from "../../../../../_metronic/helpers/notify/NotifySuccess"
import { Customer, Membership } from "../../core/_models"
import { addMembers, getMembershipInfo, removeMemberRequest } from "../../core/_requests"
import { useQueryResponseData } from "../../customers-list/provider/QueryResponseProvider"
import { MemberItem } from "./MemberItem"
import { CreateMembership } from "./CreateMembership"
import { CustomersModal } from "../../../promote/membership/memberships-list/table/customer-selection-modal/CustomersModal"
import { WarningAlert } from "../../../../../_metronic/helpers/alerts/Warning"
import { ErrorAlert } from "../../../../../_metronic/helpers/alerts/Error"
import { userCanUpdateCustomers } from "../../core/consts"
import { useListView } from "../../customers-list/provider/ListViewProvider"
import { useAuth } from "../../../auth"
import { useMasterData } from "../../customers-list/provider/MasterDataProvider"
import { MembershipEditModal } from "../../../promote/membership/memberships-list/table/membership-edit-modal/MembershipEditModal"
import { MembershipInfo } from "./MembershipInfo"

export const MembersPage = () => {
    const { itemIdForUpdate } = useListView()
    const { currentUser, paymentMethods } = useAuth()
    const { customer } = useMasterData()
    const userRole: string = currentUser?.role || ''

    const enabledQuery = isNotEmpty(itemIdForUpdate)
    const customers = useQueryResponseData()
    const [members, setMembers] = useState<Array<Customer>>([])
    const [membership, setMembership] = useState<Membership>()
    const [openCustomerModal, setOpenCustomerModal] = useState(false)
    const [openEditMembershipModal, setOpenEditMembershipModal] = useState(false)
    const activeDiscountCard = paymentMethods && paymentMethods.filter((paymentMethod) => {return (paymentMethod.slug === 'discount_card' && paymentMethod.active)})[0]?.active

    const {
        refetch,
        data,
    } = useQuery(
        `members-${itemIdForUpdate}`,
        () => {
            return getMembershipInfo(itemIdForUpdate)
        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err: any) => {
                console.error('getMembers error', err)
                err.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            },
            retryOnMount: false,
            retry: false,
        }
    )

    useEffect(() => {
        if(data && data.data) {
            const memberIds: Array<ID> = data.data.members
            const members = customers.filter(customer => {
                const memberId = memberIds.filter(memberId => {return customer.id === memberId});
                return customer.id === memberId[0] && customer.id !== itemIdForUpdate
            })
            setMembers(members)
            setMembership(data.data.membership_data)
        }
    }, [data])

    const removeMember = async (memberId: ID) => {
        try {
            const response = await removeMemberRequest(memberId);
            const status = response.payload?.status
            status && status === 200 && NotifySuccess('Амжилттай хаслаа')
        }
        catch (ex: any) {
            console.error(ex)
            ex.response?.status === 403 ?
                WarningAlert(CRUD_RESPONSES.failed_authorization)
            :
                ErrorAlert(CRUD_RESPONSES.error)
        } finally {
            refetch();
        }
    }

    const closeAddCustomerModal = async (selectedCustomers?: Array<ID>) => {
        if(selectedCustomers) {
            try {
                const customSelectedCustomers = selectedCustomers ? selectedCustomers : []
                const addedMemberIds = [...customSelectedCustomers];
                const params = {
                    'selected_customers': addedMemberIds,
                    'code': customer.membership_code
                };
        
                const response = await addMembers(params);
                const status = response.payload?.status
                status && status === 200 && NotifySuccess(CRUD_RESPONSES.success)
            } catch (ex: any) {
                console.error(ex)
                ex.response?.status === 403 ?
                    WarningAlert(CRUD_RESPONSES.failed_authorization)
                :
                    ErrorAlert(CRUD_RESPONSES.error)
            } finally {
                selectedCustomers && refetch();
            }
        }
        setOpenCustomerModal(false);
    }

    const closeEditMembershipModal = () => {
        setOpenEditMembershipModal(false)
        refetch();
    }

    return (
        <>
        {userCanUpdateCustomers(userRole) && members.length > 0 && membership && !activeDiscountCard &&
            <div className="card mb-5 mb-xl-8">
                <div className="card-body p-15">
                    <div className="row">
                        <div className="bg-light p-3 pb-0 mb-0 col-md-8">
                            {members.map((member, index) => {
                                return (
                                    <MemberItem key={index} member={member} removeMember={removeMember}/>
                                )
                            })}

                            <div className="separator border-gray-300 pt-1 mb-4"></div>
                            <MembershipInfo membership={membership}/>
                         
                        </div>
                        <div className="col-4 border-start border-gray-300 d-flex flex-column align-items-center">
                            <button className="btn btn-sm btn-primary w-150px w-md-200px py-1 " onClick={() => setOpenEditMembershipModal(true)}>
                                <span className='indicator-label fs-5'> Засах</span>                            
                            </button>
                            <button className="btn btn-sm btn-primary w-150px w-md-200px py-1 mt-3" onClick={() => setOpenCustomerModal(true)}>
                                <span className='indicator-label fs-5'>Гишүүн нэмэх</span>                            
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
        {(membership && activeDiscountCard) && 
        <div className="card mb-5 mb-xl-8">
            <div className="card-body p-15">
                <div className="row">
                    <div className="bg-light p-3 pb-0 mb-0 min-h-100px col-md-8">
                        <MembershipInfo membership={membership}/>
                    </div>
                    <div className="col-md-4 border-start border-gray-300 d-flex flex-column align-items-center mt-5 mt-md-0">
                        <button className="btn btn-sm btn-primary w-150px w-md-200px py-1 " onClick={() => setOpenEditMembershipModal(true)}>
                            <span className='indicator-label fs-5'>Засах</span>                            
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
        }

        {!customer.membership_code && <CreateMembership refetch={refetch}/>}
        {openCustomerModal && 
            <CustomersModal
                toggleCustomerModal={closeAddCustomerModal} 
                selectedCustomersProp={data && data.data ? data.data.members : []} />}

        {openEditMembershipModal && <MembershipEditModal closeModal={closeEditMembershipModal} createType='customer' customerId={itemIdForUpdate}/>}
        </>

    )
}