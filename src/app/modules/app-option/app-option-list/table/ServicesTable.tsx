import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../provider/QueryResponseProvider'
import {servicesColumns} from './columns/_columns'
import {Service} from '../../core/_models'
import {ServicesListLoading} from '../components/loading/ServicesListLoading'
import {ServicesListPagination} from '../components/pagination/ServicesListPagination'
import {KTCardBody} from '../../../../../_metronic/helpers'
import { useAuth } from '../../../auth'

const ServicesTable = () => {
  const {settings} = useAuth()
  const services = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => services, [services])
  const codeColumnNum = 2
  const typeColumnNum = 5
  const columns = useMemo(() => {
    return settings?.has_service_type ? servicesColumns : servicesColumns.filter((servicesColumn, key) => (key !== codeColumnNum && key !== typeColumnNum))
  }, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_services'
          className='table align-middle table-row-dashed gs-0 gy-3 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Service>) => (
                column.id !== 'nestedActions' &&
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead> 
          <tbody className='text-gray-600 fw-bold ' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Service>, i) => {
                prepareRow(row) 
                return (
                    row.original.category_id ? 
                    <CustomRow row={row} key={`row-${i}-${row.id}`} />
                  :  
                    null
                )
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
      <ServicesListPagination />
      {isLoading && <ServicesListLoading />}
    </KTCardBody>
  )
}

export {ServicesTable}
