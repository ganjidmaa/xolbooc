import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {Service} from '../../../core/_models'

type Props = {
  row: Row<Service>
}

const CustomNestedRow: FC<Props> = ({row}) => (
    <tr {...row.getRowProps()} className='fw-bolder text-muted bg-light'>
      {row.cells.map((cell) => {
        return (
          cell.column.id === 'nestedActions' || cell.column.id === 'name' ?
              <th
                {...cell.getCellProps()}
                className={clsx({'text-end min-w-100px ': cell.column.id === 'nestedActions'})}
                colSpan={cell.column.id === 'name' ? 2 : 1}
              >
                {cell.render('Cell')}
              </th>
            : 
            cell.column.id !== 'actions' && cell.column.id !== 'price' ?
            <th {...cell.getCellProps()}>
              <span></span>
            </th> 
            : null
          
        )
      })}
    </tr>
)

export {CustomNestedRow}
