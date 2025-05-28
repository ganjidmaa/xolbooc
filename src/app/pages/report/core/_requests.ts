import axios, {AxiosResponse} from 'axios'
import { Response } from '../../../../_metronic/helpers'
import { dateInterval, ReportResponse } from './_models'

const APP_URL = process.env.REACT_APP_API_URL
const REPORT_URL = `${APP_URL}/report`

const getGeneralReport = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/general_report`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const incomeReportByDays = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/income_report_by_days`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const incomeReportByUsers = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/income_report_by_users`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const attendanceReportByUsers = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/attendance_report_by_users`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const attendanceReportByServices = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/attendance_report_by_services`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const attendanceReportByRushHours = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/attendance_report_by_rush_hours`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

const serviceReortByEvents = (dateInterval: dateInterval):  Promise<Response<ReportResponse>> => {
    return axios
        .post(`${REPORT_URL}/service_report_by_events`, dateInterval)
        .then((response: AxiosResponse<Response<ReportResponse>>) => response.data)
}

export {
    getGeneralReport,
    incomeReportByUsers,
    incomeReportByDays,
    attendanceReportByUsers,
    attendanceReportByServices,
    attendanceReportByRushHours,
    serviceReortByEvents
}