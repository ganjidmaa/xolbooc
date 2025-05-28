import { KTCard } from '../../../../_metronic/helpers'
import { SmsListHeader } from './components/header/SmsListHeader'
import { SmsTable } from './table/SmsTable'

const SmsList = () => {
  
  return (
    <>
      <KTCard>
        <SmsListHeader />
        <SmsTable />
      </KTCard>
    </>
  )
}

export {SmsList}