import {Column} from 'react-table'
import {MembershipActionsCell} from './MembershipActionsCell'
import {MembershipSelectionCell} from './MembershipSelectionCell'
import {MembershipCustomHeader} from './MembershipCustomHeader'
import {MembershipSelectionHeader} from './MembershipSelectionHeader'
import { Membership } from '../../core/_models'
import { InfoCell } from '../../../../../../../_metronic/partials/table/columns/InfoCell'

const MembershipColumns: ReadonlyArray<Column<Membership>> = [
  {
    Header: (props) => <MembershipSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <MembershipSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <MembershipCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <MembershipCustomHeader tableProps={props} title='Код' className='min-w-125px' />,
    id: 'code',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => <MembershipCustomHeader tableProps={props} title='Гишүүдийн тоо' className='min-w-125px' />,
    id: 'customer_number',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].customer_number} />,
  },
  {
    Header: (props) => (
      <MembershipCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <MembershipActionsCell id={props.data[props.row.index].id} />,
  },
]

export {MembershipColumns}
