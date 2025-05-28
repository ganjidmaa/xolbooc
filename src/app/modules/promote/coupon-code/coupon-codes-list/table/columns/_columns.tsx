import {Column} from 'react-table'
import {CouponCodeCustomHeader} from './CouponCodeCustomHeader'
import { CouponCode } from '../../core/_models'
import { InfoCell } from '../../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../../_metronic/partials/table/columns/PriceCell'
import { DateCell } from '../../../../../../../_metronic/partials/table/columns/DateCell'
import { StatusCell } from '../../../../../../../_metronic/partials/table/columns/StatusCell'
import { DateTimeCell } from '../../../../../../../_metronic/partials/table/columns/DateTimeCell'
import { CouponCodeActionsCell } from './CouponActionsCell'
import { CouponCodeSelectionHeader } from './CouponCodeSelectionHeader'
import { CouponCodeSelectionCell } from './CouponCodeSelectionCell'

const couponsColumns: ReadonlyArray<Column<CouponCode>> = [
  {
    Header: (props) => <CouponCodeSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CouponCodeSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Код' className='min-w-100px' />,
    id: 'code',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Төрөл' className='min-w-100px' />,
    id: 'type',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].type === 'mass' ? 'Олон удаагийн' : 'Нэг удаагийн'} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Эрх' className='min-w-125px' />,
    id: 'value',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].value} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Ашигласан тоо' className='min-w-100px' />,
    id: 'usage_count',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].usage_count} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Ашигласан дүн' className='min-w-100px' />,
    id: 'redeemed',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].redeemed} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Эхлэх ' className='min-w-100px' />,
    id: 'start_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].start_date} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Дуусах ' className='min-w-100px' />,
    id: 'end_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].end_date} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Төлөв' className='min-w-100px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Үүсгэсэн' className='min-w-100px' />,
    id: 'created_at',
    Cell: ({...props}) => <DateTimeCell data={props.data[props.row.index].created_at as string} />,
  },
  {
    Header: (props) => <CouponCodeCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />,
    id: 'actions',
    Cell: ({...props}) => <CouponCodeActionsCell id={props.data[props.row.index].id} />,
  },
]

export {couponsColumns}
