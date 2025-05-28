import {useListView} from '../../core/ListViewProvider'
import {MembershipsListToolbar} from './MembershipsListToolbar'
import {MembershipsListGrouping} from './MembershipsListGrouping'
import {MembershipsListSearchComponent} from './MembershipsListSearchComponent'

const MembershipsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <MembershipsListSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <MembershipsListGrouping /> : <MembershipsListToolbar />}
      </div>
    </div>
  )
}

export {MembershipsListHeader}
