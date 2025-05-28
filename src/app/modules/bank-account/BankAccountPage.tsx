import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { AccountList } from "./account-list/BankAccountList"
import { BankAccountWrapper } from "./BankAccountWrapper"

const BankAccountPage = () => {
    const servicesBreadcrumbs: Array<PageLink> = [
        {
          title: 'Дансны мэдээлэл',
          path: '/bank_account/list',
          isSeparator: false,
          isActive: false,
        }
    ]

    return (
        <Routes>
            <Route element={<BankAccountWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Дансны жагсаалт</PageTitle>
                            <AccountList />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/bank_account/list' />} />
        </Routes>
    )
}

export default BankAccountPage