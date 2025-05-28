import { SmsListSearchComponent } from './SmsListSearchComponent'
import { SmsListToolbar } from './SmsListToolbar'
import { HeaderDateInfo } from './HeaderDateInfo'

const SmsListHeader = () => {
  return (
    <>
    <HeaderDateInfo />
    <div className='card-header border-0 pt-1'>
      <SmsListSearchComponent />
      <div className='card-toolbar'>
        <SmsListToolbar />
      </div>
    </div>
    </>
  )
}

export {SmsListHeader}
