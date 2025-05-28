import {useListView} from '../../core/ListViewProvider'
import {CouponsListToolbar} from './CouponsListToolbar'
import {CouponsListGrouping} from './CouponsListGrouping'
import {CouponsListSearchComponent} from './CouponsListSearchComponent'

const CouponsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CouponsListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <CouponsListGrouping /> : <CouponsListToolbar />}
      </div>
    </div>
  )
}

export {CouponsListHeader}
