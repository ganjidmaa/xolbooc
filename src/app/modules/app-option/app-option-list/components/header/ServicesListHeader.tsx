import {useListView} from '../../provider/ListViewProvider'
import {ServicesListToolbar} from './ServicesListToolbar'
import {ServicesListGrouping} from './ServicesListGrouping'
import {ServicesListSearchComponent} from './ServicesListSearchComponent'

const ServicesListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ServicesListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ServicesListGrouping /> : <ServicesListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ServicesListHeader}
