import { useState } from "react"
import { CRUD_RESPONSES, KTSVG, toExcelUrl } from "../../../../../../../_metronic/helpers"
import { useAuth } from "../../../../../auth"
import { userCanCreateCoupons } from "../../../../coupon/coupons-list/core/const"
import { useListView } from "../../core/ListViewProvider"
import { WarningAlert } from "../../../../../../../_metronic/helpers/alerts/Warning"
import { ErrorAlert } from "../../../../../../../_metronic/helpers/alerts/Error"
import { NotifySuccess } from "../../../../../../../_metronic/helpers/notify/NotifySuccess"
import { saveAs } from "file-saver";
import { downloadCouponCodes } from "../../core/_requests"

const CouponCodesListToolbar = () => {
  const { currentUser } = useAuth()
  const {setItemIdForUpdate} = useListView()
  const userRole: string = currentUser?.role || ''
  const [loading, setLoading] = useState(false)
  
  const openAddCouponModal = () => {
    setItemIdForUpdate(null)
  }

  const downloadExcel = async () => {
    try {
        setLoading(true)
        const response = await downloadCouponCodes()
        const fileName = 'coupon_code_list.xlsx'

        const url = toExcelUrl(fileName)
        saveAs(url, fileName);
    } catch (ex: any) {
        setLoading(false)
        console.error(ex)
        ex.response?.status === 403 ?
            WarningAlert(CRUD_RESPONSES.failed_authorization)
        :
            ErrorAlert(CRUD_RESPONSES.error)
    } finally {
        NotifySuccess('Амжилттай татагдлаа.')
        setLoading(false)
    } 
}

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <CouponCodesListFilter /> */}

      {userCanCreateCoupons(userRole) && 
        <button type='button' className='btn btn-light-primary me-3' onClick={downloadExcel}>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Эксел татах
        </button>
      }

      {userCanCreateCoupons(userRole) && 
        <button type='button' className='btn btn-primary' onClick={openAddCouponModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Нэмэх
        </button>
      }
    </div>
  )
}

export {CouponCodesListToolbar}
