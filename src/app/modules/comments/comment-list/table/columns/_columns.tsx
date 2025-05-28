import {Column} from 'react-table'
import {CommentActionsCell} from './CommentActionsCell'
import {CommentSelectionCell} from './CommentSelectionCell'
import {CommentCustomHeader} from './CommentCustomHeader'
import {CommentSelectionHeader} from './CommentSelectionHeader'
import { Comment } from '../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'

const commentsColumns: ReadonlyArray<Column<Comment>> = [
  {
    Header: (props) => <CommentSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CommentSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CommentCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <CommentCustomHeader tableProps={props} title='Текст' className='min-w-125px' />,
    id: 'body',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].body} />,
  },
  {
    Header: (props) => <CommentCustomHeader tableProps={props} title='Од' className='min-w-125px' />,
    id: 'stars',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].stars} />,
  },
  {
    Header: (props) => (
      <CommentCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CommentActionsCell id={props.data[props.row.index].id} />,
  },
]

export {commentsColumns}
