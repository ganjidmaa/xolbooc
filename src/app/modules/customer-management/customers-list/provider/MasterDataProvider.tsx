/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, FC, useContext, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { 
    CRUD_RESPONSES, 
    GroupSoumDistrict, 
    ID, 
    isNotEmpty, 
    Province, 
    QUERIES,
    WithChildren
} from "../../../../../_metronic/helpers"
import { ErrorAlert } from "../../../../../_metronic/helpers/alerts/Error"
import { WarningAlert } from "../../../../../_metronic/helpers/alerts/Warning"
import { Customer, initialMasterData, MasterDataProps } from "../../core/_models"
import { getCustomerById } from "../../core/_requests"
import { useListView } from "./ListViewProvider"

const MasterDataContext = createContext<MasterDataProps>(initialMasterData)

const MasterDataProvider: FC<WithChildren> = ({children}) => { 
    const {itemIdForUpdate} = useListView()
    const [customer, setCustomer] = useState<Customer>({})
    const [provinces, setProvinces] = useState<Array<Province>>([])
    const [soumDistricts, setSoumDistricts] = useState<Array<GroupSoumDistrict>>([])
    
    const [customerId, setCustomerId] = useState<ID>()
    const updatedCustomerId = useMemo(() => itemIdForUpdate, [itemIdForUpdate])
    const enabledQuery = isNotEmpty(customerId)

    const {
        data,
        refetch
    } = useQuery(
        `${QUERIES.CUSTOMERS_LIST}-customer-${customerId}`,
        () => {
            return getCustomerById(customerId)
        },
        {
            cacheTime: 0,
            // enabled: enabledQuery,
            onError: (err: any) => {
                console.error('getCustomerById', err)
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
        setCustomer({})
        if (customerId !== updatedCustomerId) {
            setCustomerId(updatedCustomerId)
        }
    }, [updatedCustomerId])

    useEffect(() => {
        if(data && data.data) {
            const response = data.data
            setCustomer(response.customer)
            setProvinces(response.provinces)
            setSoumDistricts(response.soumDistricts)
        }
    }, [data])

    return (
      <MasterDataContext.Provider
        value={{
            refetch,
            customer,
            setCustomer,
            provinces,
            setProvinces,
            soumDistricts, 
            setSoumDistricts
        }}
      >
        {children}
      </MasterDataContext.Provider>
    )
}


const useMasterData = () => useContext(MasterDataContext)

export {MasterDataProvider, useMasterData}