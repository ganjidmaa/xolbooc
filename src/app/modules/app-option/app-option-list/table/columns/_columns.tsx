import {Column} from 'react-table'
import {ServiceActionsCell} from './ServiceActionsCell'
import { ServiceSelectionCell } from './ServiceSelectionCell'
import {ServiceCustomHeader} from './ServiceCustomHeader'
import {ServiceSelectionHeader} from './ServiceSelectionHeader'
import {Service} from '../../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { PriceCell } from '../../../../../../_metronic/partials/table/columns/PriceCell'
import { StatusCell } from '../../../../../../_metronic/partials/table/columns/StatusCell'

const servicesColumns: ReadonlyArray<Column<Service>> = [
  {
    Header: (props) => <ServiceSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <ServiceSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Код' className='min-w-125px' />,
    id: 'code',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Үнэ' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <PriceCell price={props.data[props.row.index].price} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Хугацаа' className='min-w-125px' />,
    id: 'duration',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].duration && props.data[props.row.index].duration + ' мин'} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Төрөл' className='min-w-125px' />,
    id: 'type_name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].type_name} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Төлөв' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <ServiceCustomHeader tableProps={props} className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ServiceActionsCell id={props.data[props.row.index].id}/>,
  },
  {
    Header: (props) => (
      <ServiceCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-125px'/>
    ),
    id: 'nestedActions',
    Cell: ({...props}) => null,
  },
]

export {servicesColumns}
