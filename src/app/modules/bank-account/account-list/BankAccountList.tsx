import { KTCard } from '../../../../_metronic/helpers'
import { AccountListHeader } from './components/header/AccountListHeader'
import { useListView } from './core/ListViewProvider'
import { AccountEditModal } from './table/account-edit-modal/AccountEditModal'
import { AccountsTable } from './table/AccountsTable'

const AccountList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <AccountListHeader />
        <AccountsTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <AccountEditModal />}
    </>
  )
}

export {AccountList}
