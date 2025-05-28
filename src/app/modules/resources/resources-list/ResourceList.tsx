import {useListView} from './provider/ListViewProvider'
import {ResourcesListHeader} from './components/header/ResourcesListHeader'
import {ResourcesTable} from './table/ResourceTable'
import { KTCard } from '../../../../_metronic/helpers'
import { ResourceEditModal } from './resource-edit-modal/ResourceEditModal'

const ResourceList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <ResourcesListHeader />
        <ResourcesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ResourceEditModal />}
    </>
  )
}

export {ResourceList}
