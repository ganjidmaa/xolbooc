import {Column} from 'react-table'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../_metronic/partials/table/columns/PriceCell'
import { Sms } from '../../core/_models'
import { DetailHeader } from './DetailCustomHeader'
import { StatusCell } from '../../../../../../_metronic/partials/table/columns/StatusCell'

const detailColumns: ReadonlyArray<Column<Sms>> = [
  {
    Header: (props) => <DetailHeader tableProps={props} title='' className='min-w-5px' />,
    id: 'id',
    Cell: ({...props}) => <InfoCell data='' />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Огноо' className='min-w-125px' />,
    id: 'created_at',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].created_at} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Утас' className='min-w-90px' />,
    id: 'tel',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].tel} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Мэссэж' className='min-w-175px' />,
    id: 'msg',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].msg} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Info' className='min-w-125px' />,
    id: 'result',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].result} />,
  },
  {
    Header: (props) => <DetailHeader tableProps={props} title='Төлөв' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status + 'msg'} />,
  },

]

export {detailColumns}
