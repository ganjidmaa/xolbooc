import { KTCard } from '../../../../_metronic/helpers'
import { DetailListHeader } from './components/header/DetailListHeader'
import { DetailTable } from './table/DetailTable'

const DetailList = () => {
  
  return (
    <>
      <KTCard>
        <DetailListHeader />
        <DetailTable />
      </KTCard>
    </>
  )
}

export {DetailList}
