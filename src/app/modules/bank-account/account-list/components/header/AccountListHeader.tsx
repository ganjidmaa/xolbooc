import {useListView} from '../../core/ListViewProvider'
import {AccountListToolbar} from './AccountListToolbar'
import {AccountListGrouping} from './AccountListGrouping'
import {AccountListSearchComponent} from './AccountListSearchComponent'

const AccountListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <AccountListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <AccountListGrouping /> : <AccountListToolbar />}
      </div>
    </div>
  )
}

export {AccountListHeader}
