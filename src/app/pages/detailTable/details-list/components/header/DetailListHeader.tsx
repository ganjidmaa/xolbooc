import { DetailListSearchComponent } from './DetailListSearchComponent'
import { DetailListToolbar } from './DetailListToolbar'
import { HeaderDateInfo } from './HeaderDateInfo'

const DetailListHeader = () => {
  return (
    <>
    <HeaderDateInfo />
    <div className='card-header border-0 pt-1'>
      <DetailListSearchComponent />
      <div className='card-toolbar'>
        <DetailListToolbar />
      </div>
    </div>
    </>
  )
}

export {DetailListHeader}
