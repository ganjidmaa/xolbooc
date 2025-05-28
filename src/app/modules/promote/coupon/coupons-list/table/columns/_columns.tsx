import {Column} from 'react-table'
import {CouponActionsCell} from './CouponActionsCell'
import {CouponSelectionCell} from './CouponSelectionCell'
import {CouponCustomHeader} from './CouponCustomHeader'
import {CouponSelectionHeader} from './CouponSelectionHeader'
import { Coupon } from '../../core/_models'
import { InfoCell } from '../../../../../../../_metronic/partials/table/columns/InfoCell'
import { DateCell } from '../../../../../../../_metronic/partials/table/columns/DateCell'
import { PriceCell } from '../../../../../../../_metronic/partials/table/columns/PriceCell'

const couponsColumns: ReadonlyArray<Column<Coupon>> = [
  {
    Header: (props) => <CouponSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CouponSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  // {
  //   Header: (props) => <CouponCustomHeader tableProps={props} title='Үнэ' className='min-w-125px' />,
  //   id: 'price',
  //   Cell: ({...props}) => <PriceCell price={props.data[props.row.index].price} />,
  // },
  
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Ашиглах хэмжээ' className='min-w-125px' />,
    id: 'value',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].value} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Төрөл' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => <InfoCell data={!props.data[props.row.index].type ? 'Нэг удаагийн' : 'Олон удаагийн'} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Хязгаарлах тоо' className='min-w-125px' />,
    id: 'limit_number',
    Cell: ({...props}) => <PriceCell number={props.data[props.row.index].limit_number} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Ашигласан/ Үүсгэсэн тоо' className='min-w-125px' />,
    id: 'sold_number',
    Cell: ({...props}) => <PriceCell number={props.data[props.row.index].sold_number} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Эхлэх огноо' className='min-w-125px' />,
    id: 'start_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].start_date} />,
  },
  {
    Header: (props) => <CouponCustomHeader tableProps={props} title='Дуусах огноо' className='min-w-125px' />,
    id: 'end_date',
    Cell: ({...props}) => <DateCell data={props.data[props.row.index].end_date} />,
  },
  {
    Header: (props) => (
      <CouponCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CouponActionsCell id={props.data[props.row.index].id} />,
  },
]

export {couponsColumns}
