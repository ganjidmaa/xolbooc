import { Navigate, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { ResourceList } from "./resources-list/ResourceList"
import { ResourcesWrapper } from "./ResourcesWrapper"

const servicesBreadcrumbs: Array<PageLink> = [
    {
      title: 'Нөөц',
      path: '/resource/list',
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

const ResourcesPage = () => {
    return (
        <Routes>
            <Route element={<ResourcesWrapper />}>
                <Route path='list'
                    element={
                        <>
                            <PageTitle breadcrumbs={servicesBreadcrumbs}>Нөөцийн жагсаалт</PageTitle>
                            <ResourceList />
                        </>
                    }
                />
                
            </Route>
            <Route index element={<Navigate to='/resource/list'/>}/>
        </Routes>
    )
}

export default ResourcesPage