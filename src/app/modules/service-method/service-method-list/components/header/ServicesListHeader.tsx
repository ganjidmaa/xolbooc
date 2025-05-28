import {ServicesListToolbar} from './ServicesListToolbar'
import {ServicesListSearchComponent} from './ServicesListSearchComponent'

const ServicesListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      <ServicesListSearchComponent />
      <div className='card-toolbar'>
        <ServicesListToolbar />
      </div>
    </div>
  )
}

export {ServicesListHeader}
