import { KTCard } from '../../../../../_metronic/helpers'
import { MembershipsListHeader } from './components/header/MembershipsListHeader'
import { useListView } from './core/ListViewProvider'
import { MembershipEditModal } from './table/membership-edit-modal/MembershipEditModal'
import { MembershipsTable } from './table/MembershipsTable'

const MembershipsList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <MembershipsListHeader />
        <MembershipsTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <MembershipEditModal createType='membership' />}
    </>
  )
}

export {MembershipsList}
