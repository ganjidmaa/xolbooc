import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../../_metronic/layout/core"
import { DiscountsList } from "./discounts-list/DiscountsList"
import { DiscountsWrapper } from "./DiscountsWrapper"

const DiscountsPage = () => {
    const servicesBreadcrumbs: Array<PageLink> = [
        {
          title: 'Урамшуулал',
          path: '/promote/discount/list',
          isSeparator: false,
          isActive: false,
        },
        // {
        //   title: '',
        //   path: '',
        //   isSeparator: true,
        //   isActive: false,
        // },
    ]

    return (
        <Routes>
            <Route element={<DiscountsWrapper />}>
                <Route path="list" 
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Хөнгөлөлтийн жагсаалт</PageTitle>
                            <DiscountsList />
                        </>
                    }
                />
        
            </Route>
            <Route index element={<Navigate to='/promote/discount/list' />} />
        </Routes>
    )
}

export default DiscountsPage