import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../provider/QueryResponseProvider'
import {KTCardBody} from '../../../../../_metronic/helpers'
import { customersColumns } from './columns/_columns'
import { Customer } from '../../core/_models'
import { CustomersListPagination } from '../components/pagination/CustomersListPagination'
import { CustomersListLoading } from '../components/loading/CustomersListLoading'

const CustomersTable = () => {
  const customers = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => customers, [customers])
  const columns = useMemo(() => customersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
 
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_customers'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Customer>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Customer>, i) => {
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
      <CustomersListPagination />
      {isLoading && <CustomersListLoading />}
    </KTCardBody>
  )
}

export {CustomersTable}
