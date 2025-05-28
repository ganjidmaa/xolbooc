import { ServicesListHeader } from './components/header/ServicesListHeader'
import {ServicesTable} from './table/ServicesTable'
import { KTCard } from '../../../../_metronic/helpers'
import { useListView } from './provider/ListViewProvider'
import { ServiceMethodModal } from '../service_method-modal/ServiceMethodModal'

const ServiceMethodList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ServicesListHeader />
        <ServicesTable />
      </KTCard>
    {itemIdForUpdate !== undefined && <ServiceMethodModal />}  
    </>
  )
}

export {ServiceMethodList}
