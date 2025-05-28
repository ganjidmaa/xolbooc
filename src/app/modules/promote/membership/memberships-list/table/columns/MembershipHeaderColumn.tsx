import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Membership } from '../../core/_models'

type Props = {
  column: ColumnInstance<Membership>
}

const MembershipHeaderColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {MembershipHeaderColumn}
