import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {MembershipTypeHeaderColumn} from './columns/MembershipTypeHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import { KTCardBody } from '../../../../../../_metronic/helpers'
import { MembershipTypesListLoading } from '../components/loading/MembershipTypesListLoading'
import { MembershipTypesListPagination } from '../components/pagination/MembershipTypesListPagination'
import { MemberShipTypeColumns } from './columns/_columns'
import { MembershipType } from '../core/_models'

const MembershipTypesTable = () => {
  const membershipTypes = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => membershipTypes, [membershipTypes])
  const columns = useMemo(() => MemberShipTypeColumns, [])
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
              {headers.map((column: ColumnInstance<MembershipType>) => (
                <MembershipTypeHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<MembershipType>, i) => {
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
      <MembershipTypesListPagination />
      {isLoading && <MembershipTypesListLoading />}
    </KTCardBody>
  )
}

export {MembershipTypesTable}
