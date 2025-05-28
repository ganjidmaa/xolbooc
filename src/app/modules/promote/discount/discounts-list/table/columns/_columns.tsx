import {Column} from 'react-table'
import {DiscountActionsCell} from './DiscountActionsCell'
import {DiscountSelectionCell} from './DiscountSelectionCell'
import {DiscountCustomHeader} from './DiscountCustomHeader'
import {DiscountSelectionHeader} from './DiscountSelectionHeader'
import { Discount } from '../../core/_models'
import { InfoCell } from '../../../../../../../_metronic/partials/table/columns/InfoCell'
import { discountTypes } from '../../core/const'
import { DateCell } from '../../../../../../../_metronic/partials/table/columns/DateCell'
import { PriceCell } from '../../../../../../../_metronic/partials/table/columns/PriceCell'

const discountsColumns: ReadonlyArray<Column<Discount>> = [
  {
    Header: (props) => <DiscountSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <DiscountSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Дүн' className='min-w-125px' />,
    id: 'value',
    Cell: ({...props}) => 
      props.data[props.row.index].type === 'percent' ? 
        <InfoCell data={props.data[props.row.index].value} />
        :
        <PriceCell price={props.data[props.row.index].limit_price} />
        ,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Төрөл' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => <InfoCell data={discountTypes.filter(type => type.status === props.data[props.row.index].type)[0].name} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Эхлэх огноо' className='min-w-125px' />,
    id: 'start_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].start_date} />,
  },
  {
    Header: (props) => <DiscountCustomHeader tableProps={props} title='Дуусах огноо' className='min-w-125px' />,
    id: 'end_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].end_date} />,
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
