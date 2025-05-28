import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Event } from '../../core/_models'

type Props = {
  column: ColumnInstance<Event>
  index: number
}

const DetailHeaderColumn: FC<Props> = ({column, index}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {DetailHeaderColumn}
