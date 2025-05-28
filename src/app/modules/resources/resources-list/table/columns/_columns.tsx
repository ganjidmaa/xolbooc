import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import { SelectionCell } from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Resource} from '../../../core/_models'
import { StatusCell } from '../../../../../../_metronic/partials/table/columns/StatusCell'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'

const columnsForm: ReadonlyArray<Column<Resource>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Төлөв' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {columnsForm}
