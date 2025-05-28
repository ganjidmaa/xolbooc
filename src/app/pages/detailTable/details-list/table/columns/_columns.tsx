import {Column} from 'react-table'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../_metronic/partials/table/columns/PriceCell'
import { Event } from '../../core/_models'
import { DetailHeader } from './DetailCustomHeader'
import { StatusCell } from '../../../../../../_metronic/partials/table/columns/StatusCell'

const detailColumns: ReadonlyArray<Column<Event>> = [
  {
    Header: (props) => <DetailHeader tableProps={props} title='' className='min-w-5px' />,
    id: 'id',
    Cell: ({...props}) => <InfoCell data='' />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Огноо' className='min-w-125px' />,
    id: 'start_time',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].start_time} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Хугацаа' className='min-w-90px' />,
    id: 'duration',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].duration} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Эмч' className='min-w-175px' />,
    id: 'username',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].username} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Эмчлүүлэгч' className='min-w-125px' />,
    id: 'customer_name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].customer_name} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Эмчилгээ' className='min-w-100px' />,
    id: 'event_number',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].event_number} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Төлөв' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Төлбөр' className='min-w-125px' />,
    id: 'payment',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].payment} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Хөнгөлөлт' className='min-w-125px' />,
    id: 'discount',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].discount} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Төлсөн' className='min-w-125px' />,
    id: 'total_paid',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].paid} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Үлдсэн' className='min-w-125px' />,
    id: 'total_left',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].left_amount} />,
  },

]

export {detailColumns}
