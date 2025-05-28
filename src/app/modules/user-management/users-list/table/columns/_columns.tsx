import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../../core/_models'
import { InfoCell } from '../../../../../../_metronic/partials/table/columns/InfoCell'
import { StatusCell } from '../../../../../../_metronic/partials/table/columns/StatusCell'
import { roleNames } from '../../../../../../_metronic/helpers'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Овог Нэр' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Утас' className='min-w-125px' />,
    id: 'phone',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].phone + ', ' + props.data[props.row.index].phone2} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Имэйл' className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Салбар' className='min-w-125px' />
    ),
    id: 'branch_name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].branch_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Төлөв' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <StatusCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Онлайн захиалга' className='min-w-125px' />
    ),
    id: 'show_in_online_booking',
    Cell: ({...props}) => <InfoCell data={
      props.data[props.row.index].show_in_online_booking === true ? 'Тийм' : props.data[props.row.index].show_in_online_booking === false ? 'Үгүй' : ''
    } />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Эрх' className='min-w-125px' />
    ),
    id: 'role',
    Cell: ({...props}) => <InfoCell data={roleNames.filter(roleName => roleName.value === props.data[props.row.index].role)[0]?.name } />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Үйлдэл' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
