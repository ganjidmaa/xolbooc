import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {MembershipHeaderColumn} from './columns/MembershipHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import { KTCardBody } from '../../../../../../_metronic/helpers'
import { MembershipsListLoading } from '../components/loading/MembershipsListLoading'
import { MembershipsListPagination } from '../components/pagination/MembershipsListPagination'
import { MembershipColumns } from './columns/_columns'
import { Membership } from '../core/_models'

const MembershipsTable = () => {
  const membershipTypes = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => membershipTypes, [membershipTypes])
  const columns = useMemo(() => MembershipColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
 
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_membership_types'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Membership>) => (
                <MembershipHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Membership>, i) => {
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
      <MembershipsListPagination />
      {isLoading && <MembershipsListLoading />}
    </KTCardBody>
  )
}

export {MembershipsTable}
