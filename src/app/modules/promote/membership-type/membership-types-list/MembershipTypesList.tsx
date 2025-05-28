import { KTCard } from '../../../../../_metronic/helpers'
import { MembershipTypesListHeader } from './components/header/MembershipTypesListHeader'
import { useListView } from './core/ListViewProvider'
import { MembershipTypeEditModal } from './table/edit-modal/MembershipTypeEditModal'
import { MembershipTypesTable } from './table/MembershipTypesTable'

const MembershipTypesList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <MembershipTypesListHeader />
        <MembershipTypesTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <MembershipTypeEditModal />}
    </>
  )
}

export {MembershipTypesList}
