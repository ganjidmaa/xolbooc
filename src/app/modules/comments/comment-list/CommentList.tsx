import { KTCard } from '../../../../_metronic/helpers'
import { CommentHeader } from './components/header/CommentHeader'
import { useListView } from './core/ListViewProvider'
import { CommentEditModal } from './table/comment-edit-modal/CommentEditModal'
import { CommentsTable } from './table/CommentsTable'

const CommentList = () => {
  const {itemIdForUpdate} = useListView()
  
  return (
    <>
      <KTCard>
        <CommentHeader />
        <CommentsTable />
      </KTCard>

      {itemIdForUpdate !== undefined && <CommentEditModal />}
    </>
  )
}

export {CommentList}
