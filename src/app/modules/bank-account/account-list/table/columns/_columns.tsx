import {Column} from 'react-table'
import {DiscountActionsCell} from './DiscountActionsCell'
import {DiscountSelectionCell} from './DiscountSelectionCell'
import {DiscountCustomHeader} from './DiscountCustomHeader'
import {DiscountSelectionHeader} from './DiscountSelectionHeader'
import { BankAccount } from '../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
const discountsColumns: ReadonlyArray<Column<BankAccount>> = [
  {
    Header: (props) => <DiscountSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <DiscountSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Данс' className='min-w-125px' />,
    id: 'account_number',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].account_number} />,
  },
  {
    Header: (props) => (
      <DiscountCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <DiscountActionsCell id={props.data[props.row.index].id} />,
  },
]

export {discountsColumns}
