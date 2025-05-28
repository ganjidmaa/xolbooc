import {useListView} from '../../core/ListViewProvider'
import {DiscountsListToolbar} from './DiscountsListToolbar'
import {DiscountsListGrouping} from './DiscountsListGrouping'
import {DiscountsListSearchComponent} from './DiscountsListSearchComponent'

const DiscountsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <DiscountsListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <DiscountsListGrouping /> : <DiscountsListToolbar />}
      </div>
    </div>
  )
}

export {DiscountsListHeader}
