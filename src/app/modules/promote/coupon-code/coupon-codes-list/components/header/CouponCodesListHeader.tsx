import {useListView} from '../../core/ListViewProvider'
import {CouponCodesListToolbar} from './CouponCodesListToolbar'
import {CouponCodesListGrouping} from './CouponCodesListGrouping'
import {CouponCodesListSearchComponent} from './CouponCodesListSearchComponent'

const CouponCodesListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CouponCodesListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <CouponCodesListGrouping /> : <CouponCodesListToolbar />}
      </div>
    </div>
  )
}

export {CouponCodesListHeader}
