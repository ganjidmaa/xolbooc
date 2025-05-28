import {CustomerEditModalForm} from './CustomerEditModalForm'
import {useListView} from '../provider/ListViewProvider'
import { useMasterData } from '../provider/MasterDataProvider'

const CustomerEditModalFormWrapper = () => {
  const {customer, provinces, soumDistricts} = useMasterData()
  const {itemIdForUpdate} = useListView()

  if (!itemIdForUpdate && provinces && soumDistricts) {
    return <CustomerEditModalForm customer={{id: undefined}} 
      provinces={provinces} soumDistrictsData={soumDistricts}
    />
  }

  if (customer && provinces && soumDistricts) {
    return <CustomerEditModalForm customer={customer} 
      provinces={provinces} soumDistrictsData={soumDistricts}
    />
  }

  return null
}

export {CustomerEditModalFormWrapper}
