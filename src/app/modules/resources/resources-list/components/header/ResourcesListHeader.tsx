import {useListView} from '../../provider/ListViewProvider'
import {ResourcesListToolbar} from './ResourcesListToolbar'
import {ResourcesListGrouping} from './ResourcesListGrouping'
import {ResourcesListSearchComponent} from './ResourcesListSearchComponent'

const ResourcesListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ResourcesListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ResourcesListGrouping /> : <ResourcesListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ResourcesListHeader}
