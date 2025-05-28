import { Card4 } from "../../../_metronic/partials/content/cards/Card4"
import { CRUD_RESPONSES, KTCard, toExcelUrl } from "../../../_metronic/helpers";
import Moment from 'moment';
import { useState } from "react";
import { NotifySuccess } from "../../../_metronic/helpers/notify/NotifySuccess";
import { WarningAlert } from "../../../_metronic/helpers/alerts/Warning";
import { ErrorAlert } from "../../../_metronic/helpers/alerts/Error";
import { getGeneralReport, incomeReportByUsers, incomeReportByDays, attendanceReportByUsers, attendanceReportByServices, attendanceReportByRushHours, serviceReortByEvents } from "./core/_requests";
import { ReportLoading } from "./loading/ReportLoading";
import { saveAs } from "file-saver";
import { DateRange } from "../../../_metronic/helpers/components/DateRange";

export const ReportPage = () => {          
    const [loading, setLoading] = useState(false)
    const [interval, setInterval] = useState([Moment().format('YYYY/MM/01'), Moment().format('YYYY/MM/DD')])

    const handleDownload = async (apiRequest: any) => {
        try {
            setLoading(true)
            const response = await apiRequest({start_date: interval[0], end_date: interval[1]})
            const fileName = response.data.file_name

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

    const onDateRangeChanged = (startDate: string, endDate: string) => { 
        setInterval([startDate, endDate])
    }
    

    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" className="app-content flex-column-fluid">
				    <div id="kt_app_content_container" className="app-container container-xxl">

                        <KTCard>
                            <DateRange onDateChanged={onDateRangeChanged} defaultTab='month'>
                                <h3 className='card-title fw-bold my-2'>Тайлан татах </h3>
                            </DateRange>
                        </KTCard>

                        <div className="row g-5 g-xl-6 my-3">
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-info.svg' 
                                    title='Нэгдсэн тайлан' 
                                    description='Эмчилгээний дэлгэрэнгүй' 
                                    handleDownload={() => handleDownload(getGeneralReport)}
                                />
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-red.svg' 
                                    title='Орлогын тайлан' 
                                    description='Эмчээр' 
                                    handleDownload={() => handleDownload(incomeReportByUsers)}/>
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-dark.svg' 
                                    title='Орлогын тайлан' 
                                    description='Өдрөөр' 
                                    handleDownload={() => handleDownload(incomeReportByDays)}/>
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-pink.svg' 
                                    title='Эмчилгээний тайлан' 
                                    description='Эмчээр' 
                                    handleDownload={() => handleDownload(attendanceReportByUsers)}/>
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-yellow.svg'
                                    title='Эмчилгээний тайлан' 
                                    description='Эмчилгээгээр' 
                                    handleDownload={() => handleDownload(attendanceReportByServices)}/>
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-green.svg'
                                    title='Эмчилгээний тайлан' 
                                    description='Цагийн ачааллаар' 
                                    handleDownload={() => handleDownload(attendanceReportByRushHours)}/>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <Card4 icon='/media/svg/files/xls-green.svg'
                                    title='Үзлэгийн болон хүлээлгийн тайлан' 
                                    description='Цаг захиалгаар' 
                                    handleDownload={() => handleDownload(serviceReortByEvents)}/>
                            </div>
                        </div>

                    </div>

                    {loading && <ReportLoading />}
                </div>
            </div>
        </div>
    )
}