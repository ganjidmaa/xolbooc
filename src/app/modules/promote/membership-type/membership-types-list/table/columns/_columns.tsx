import {Column} from 'react-table'
import {MembershipTypeActionsCell} from './MembershipTypeActionsCell'
import {MembershipTypeSelectionCell} from './MembershipTypeSelectionCell'
import {MembershipTypeCustomHeader} from './MembershipTypeCustomHeader'
import {MembershipTypeSelectionHeader} from './MembershipTypeSelectionHeader'
import { MembershipType } from '../../core/_models'
import { InfoCell } from '../../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../../_metronic/partials/table/columns/PriceCell'

const MemberShipTypeColumns: ReadonlyArray<Column<MembershipType>> = [
  {
    Header: (props) => <MembershipTypeSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <MembershipTypeSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <MembershipTypeCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <MembershipTypeCustomHeader tableProps={props} title='Дүн' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].percent} />,
  },
  {
    Header: (props) => <MembershipTypeCustomHeader tableProps={props} title='Доод хязгаар' className='min-w-125px' />,
    id: 'limit_price',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].limit_price} />,
  },
  {
    Header: (props) => (
      <MembershipTypeCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <MembershipTypeActionsCell id={props.data[props.row.index].id} />,
  },
]

export {MemberShipTypeColumns}
