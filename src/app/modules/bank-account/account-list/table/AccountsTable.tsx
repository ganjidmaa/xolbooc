import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import { KTCardBody } from '../../../../../_metronic/helpers'
import { AccountListLoading } from '../components/loading/AccountListLoading'
import { AccountListPagination } from '../components/pagination/DiscountsListPagination'
import { discountsColumns } from './columns/_columns'
import { BankAccount } from '../core/_models'

const AccountsTable = () => {
  const accounts = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => accounts, [accounts])
  const columns = useMemo(() => discountsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
 
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_discounts'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<BankAccount>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<BankAccount>, i) => {
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
      <AccountListPagination />
      {isLoading && <AccountListLoading />}
    </KTCardBody>
  )
}

export {AccountsTable}
