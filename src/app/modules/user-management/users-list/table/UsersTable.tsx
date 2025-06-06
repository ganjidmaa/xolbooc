import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from '../table/columns/CustomHeaderColumn'
import {CustomRow} from '../table/columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../provider/QueryResponseProvider'
import {usersColumns} from './columns/_columns'
import {User} from '../../core/_models'
import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {KTCardBody} from '../../../../../_metronic/helpers'
import { useAuth } from '../../../auth'
import { Loading } from '../../../../../_metronic/partials/loading/Loading'

const UsersTable = () => {
  const {settings} = useAuth()
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const branchColumnNum: number = 4
  const columns = useMemo(() => {return settings?.has_branch ? usersColumns : usersColumns.filter((userColumn,key) => key !== branchColumnNum)}, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
 
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
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
      <UsersListPagination />
      {isLoading && <Loading />}
    </KTCardBody>
  )
}

export {UsersTable}
