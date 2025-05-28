import { KTCard } from '../../../../../_metronic/helpers'
import { CouponsListHeader } from './components/header/CouponsListHeader'
import { useListView } from './core/ListViewProvider'
import { CouponEditModal } from './table/coupon-edit-modal/CouponEditModal'
import { CouponsTable } from './table/CouponsTable'

const CouponsList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <CouponsListHeader />
        <CouponsTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <CouponEditModal />}
    </>
  )
}

export {CouponsList}
