import {Column} from 'react-table'
import {ServiceMethodActionsCell} from './ServiceMethodActionsCell'
import {ServiceCustomHeader} from './ServiceCustomHeader'
import {ServiceMethod} from '../../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'

const servicesColumns: ReadonlyArray<Column<ServiceMethod>> = [
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Агуулга' className='min-w-125px' />,
    id: 'content',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].content} />,
  },
  {
    Header: (props) => <ServiceCustomHeader tableProps={props} title='Үйлдэл' className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => <ServiceMethodActionsCell id={props.data[props.row.index].id}/>,
  }
]

export {servicesColumns}
