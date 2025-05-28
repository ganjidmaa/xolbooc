import {useListView} from './provider/ListViewProvider'
import { ServicesListHeader } from './components/header/ServicesListHeader'
import {ServicesTable} from './table/ServicesTable'
import { KTCard } from '../../../../_metronic/helpers'

const AppOptionList = () => {
  
  return (
    <>
      <KTCard>
        <ServicesListHeader />
        <ServicesTable />
      </KTCard>
    </>
  )
}

export {AppOptionList}
