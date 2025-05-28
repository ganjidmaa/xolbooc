import { KTCard } from '../../../../../_metronic/helpers'
import { CouponCodesListHeader } from './components/header/CouponCodesListHeader'
import { useListView } from './core/ListViewProvider'
import { CouponCodesTable } from './table/CouponCodesTable'
import { CouponCodeEditModal } from './coupon-code-create-modal/CouponCodeEditModal'

const CouponCodesList = () => {  
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <CouponCodesListHeader />
        <CouponCodesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CouponCodeEditModal />}
    </>
  )
}

export {CouponCodesList}
