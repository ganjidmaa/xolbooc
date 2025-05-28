import { KTCard } from "../../../../_metronic/helpers"
import { CustomersListHeader } from "./components/header/CustomersListHeader"
import { CustomerEditModal } from "./create-modal/CustomerEditModal"
import { useListView } from "./provider/ListViewProvider"
import { CustomersTable } from "./table/CustomersTable"

const CustomersList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <>
      <KTCard>
        <CustomersListHeader/>
        <CustomersTable />
      </KTCard>
      {itemIdForUpdate === null && <CustomerEditModal />}
    </>
  )
}

export default CustomersList