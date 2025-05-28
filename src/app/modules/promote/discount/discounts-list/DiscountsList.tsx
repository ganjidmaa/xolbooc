import { KTCard } from '../../../../../_metronic/helpers'
import { DiscountsListHeader } from './components/header/DiscountsListHeader'
import { useListView } from './core/ListViewProvider'
import { DiscountEditModal } from './table/discount-edit-modal/DiscountEditModal'
import { DiscountsTable } from './table/DiscountsTable'

const DiscountsList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <DiscountsListHeader />
        <DiscountsTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <DiscountEditModal />}
    </>
  )
}

export {DiscountsList}
