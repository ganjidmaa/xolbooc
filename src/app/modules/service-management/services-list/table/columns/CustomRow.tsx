import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {Service} from '../../../core/_models'

type Props = {
  row: Row<Service>
}

const CustomRow: FC<Props> = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        cell.column.id !== 'nestedActions' ?
          <td
            {...cell.getCellProps()}
            className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
          >
            {cell.render('Cell')}
          </td>
          : null
        
      )
    })}
  </tr>
)

export {CustomRow}
