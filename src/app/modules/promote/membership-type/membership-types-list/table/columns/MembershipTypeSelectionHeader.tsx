import {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useListView} from '../../core/ListViewProvider'
import { MembershipType } from '../../core/_models'

type Props = {
  tableProps: PropsWithChildren<HeaderProps<MembershipType>>
}

const MembershipTypeSelectionHeader: FC<Props> = ({tableProps}) => {
  const {isAllSelected, onSelectAll} = useListView()
  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        <input
          className='form-check-input'
          type='checkbox'
          checked={isAllSelected}
          onChange={onSelectAll}
        />
      </div>
    </th>
  )
}

export {MembershipTypeSelectionHeader}
