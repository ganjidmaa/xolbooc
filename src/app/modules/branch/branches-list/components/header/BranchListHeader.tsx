import {useListView} from '../../provider/ListViewProvider'
import {BranchListToolbar} from './BranchListToolbar'
import {BranchListGrouping} from './BranchListGrouping'
import {BranchListSearchComponent} from './BranchListSearchComponent'

const BranchListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <BranchListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <BranchListGrouping /> : <BranchListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {BranchListHeader}
