import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Sms } from '../../core/_models'

type Props = {
  column: ColumnInstance<Sms>
  index: number
}

const SmsHeaderColumn: FC<Props> = ({column, index}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {SmsHeaderColumn}
