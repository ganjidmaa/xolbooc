import {Column} from 'react-table'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { Branch } from '../../../core/_models'
import { SelectionHeader } from './SelectionHeader'
import { SelectionCell } from './SelectionCell'
import { CustomHeader } from './CustomHeader'
import { UserActionsCell } from './ActionsCell'

const branchesColumns: ReadonlyArray<Column<Branch>> = [
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
    Header: (props) => <CustomHeader tableProps={props} title='Утас' className='min-w-125px' />,
    id: 'phone',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].phone} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Эхлэх цаг' className='min-w-100px' />
    ),
    id: 'start_time',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].start_time} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Дуусах цаг' className='min-w-100px' />
    ),
    id: 'end_time',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].end_time} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Календарын давтамж' className='min-w-100px' />
    ),
    id: 'slot_duration',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].slot_duration} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {branchesColumns}
