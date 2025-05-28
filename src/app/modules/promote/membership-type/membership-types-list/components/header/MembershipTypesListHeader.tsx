import {useListView} from '../../core/ListViewProvider'
import {MembershipTypesListToolbar} from './MembershipTypesListToolbar'
import {MembershipTypesListGrouping} from './MembershipTypesListGrouping'
import {MembershipTypesListSearchComponent} from './MembershipTypesListSearchComponent'

const MembershipTypesListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <MembershipTypesListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <MembershipTypesListGrouping /> : <MembershipTypesListToolbar />}
      </div>
    </div>
  )
}

export {MembershipTypesListHeader}
