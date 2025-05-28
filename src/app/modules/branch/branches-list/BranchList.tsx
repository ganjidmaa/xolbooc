import {useListView} from './provider/ListViewProvider'
import { KTCard } from '../../../../_metronic/helpers'
import { BranchListHeader } from './components/header/BranchListHeader'
import { BranchesTable } from './table/BranchesTable'

const BranchList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <BranchListHeader />
        <BranchesTable />
      </KTCard>
      {/* {itemIdForUpdate !== undefined && <UserEditModal />} */}
    </>
  )
}

export {BranchList}
