import {Column} from 'react-table'
import {CustomerInfoCell} from './CustomerInfoCell'
import {CustomerActionsCell} from './CustomerActionsCell'
import {CustomerSelectionCell} from './CustomerSelectionCell'
import {CustomerCustomHeader} from './CustomerCustomHeader'
import {CustomerSelectionHeader} from './CustomerSelectionHeader'
import { Customer } from '../../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../_metronic/partials/table/columns/PriceCell'
import { LeftPriceCell } from './LeftPriceCell'


const customersColumns: ReadonlyArray<Column<Customer>> = [
  {
    Header: (props) => <CustomerSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CustomerSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Овог нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <CustomerInfoCell customer={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Регистр' className='min-w-125px' />
    ),
    id: 'registerno',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].registerno} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Утас' className='min-w-125px' />
    ),
    id: 'phone',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].phone + ', ' + props.data[props.row.index].phone2} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Нийт дүн' className='min-w-125px' />
    ),
    id: 'total_payment',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].total_paid} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Үлдэгдэл дүн' className='min-w-125px' />
    ),
    id: 'left_payment',
    Cell: ({...props}) => <LeftPriceCell price={props.data[props.row.index].left_payment} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CustomerActionsCell id={props.data[props.row.index].id} />,
  },
]

export {customersColumns}
