import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import { KTCardBody } from '../../../../../_metronic/helpers'
import { Event } from '../core/_models'
import { CustomRow } from './columns/CustomRow'
import { DetailListPagination } from '../components/pagination/DetailListPagination'
import { DetailListLoading } from '../components/loading/DetailListLoading'
import { detailColumns } from './columns/_columns'
import { DetailHeaderColumn } from './columns/DetailHeaderColumn'


const DetailTable = () => {
  const queryData = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => queryData && queryData[0] ? queryData[0].events as Array<Event> : [], [queryData])
  const columns = useMemo(() => detailColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
 
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          className='table table-row-dashed align-middle gs-0 gy-4'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-muted fw-bold fs-7 bg-light text-uppercase'>
              {headers.map((column: ColumnInstance<Event>, index) => (
                <DetailHeaderColumn key={column.id} column={column} index={index}/>
              ))}
            </tr>
          </thead>
          <tbody className='text-dark' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Event>, i) => {
                prepareRow(row) 
                return <CustomRow row={row} key={`row-${i}-${row.id}`} /> 
              }) 
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found 
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DetailListPagination />
      {isLoading && <DetailListLoading />}
    </KTCardBody>
  )
}

export {DetailTable}
