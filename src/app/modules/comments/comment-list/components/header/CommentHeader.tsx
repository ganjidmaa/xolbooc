import {useListView} from '../../core/ListViewProvider'
import {CommentToolbar} from './CommentToolbar'
import {CommentGrouping} from './CommentGrouping'
import {CommentSearchComponent} from './CommentSearchComponent'

const CommentHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CommentSearchComponent />
      <div className='card-toolbar'>
        {selected.length > 0 ? <CommentGrouping /> : <CommentToolbar />}
      </div>
    </div>
  )
}

export {CommentHeader}
