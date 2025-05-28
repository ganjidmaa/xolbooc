import {useListView} from './provider/ListViewProvider'
import {ServicesListHeader} from './components/header/ServicesListHeader'
import {ServicesTable} from './table/ServicesTable'
import { KTCard } from '../../../../_metronic/helpers'
import { CategoryEditModal } from './category-edit-modal/CategoryEditModal'

const ServicesList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <ServicesListHeader />
        <ServicesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CategoryEditModal />}
    </>
  )
}

export {ServicesList}
