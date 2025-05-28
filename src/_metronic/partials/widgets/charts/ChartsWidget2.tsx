/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import { UserAppointment } from '../../../../app/pages/dashboard/core/_models'
import { KTSVG } from '../../../helpers'

type Props = {
  className: string
  dataProp: UserAppointment
}

const ChartsWidget2: React.FC<Props> = ({className, dataProp}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, dataProp))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = dataProp && refreshChart()
    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, dataProp])

  var totalCount = dataProp.totalCount;

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Захиалгын тоо ажилчдаар</span>

          <span className='text-muted fw-semibold fs-7'>
            нийт захиалга - {totalCount}
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_2_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget2}

function getChartOptions(height: number, dataProp: UserAppointment): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')

  const baseColor = '#1bf803' 
  const secondaryColor = '#f880bc'
  const baseColor1 = getCSSVariableValue('--kt-success')
  const secondaryColor1 = '#9d0606'
  const baseColor2 = getCSSVariableValue('--kt-primary')
  const secondaryColor2 = '#f9f33e'
  const baseColor3 = getCSSVariableValue('--kt-info')
  const secondaryColor3 = getCSSVariableValue('--kt-gray-500')
  const baseColor4 = getCSSVariableValue('--kt-danger')
  const secondaryColor4 = '#43f1e0'
  const baseColor5 = getCSSVariableValue('--kt-gray-900')
  const secondaryColor5 = '#af88f7'
  const baseColor6 = '#198754'
  const secondaryColor6 = getCSSVariableValue('--kt-warning')
  const baseColor7 = '#2045e9'
  const secondaryColor7 = getCSSVariableValue('--kt-gray-300')
  const baseColor8 = '#7a1111'
  const secondaryColor8 = '#ff09eb'

  return {
    series: dataProp.series,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadius: 3,
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },
    xaxis: {
      categories: dataProp.resources,
    },
    
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val.toLocaleString(undefined, { maximumFractionDigits: 0 })
        },
      },
    },
    colors: [baseColor, secondaryColor, baseColor1, secondaryColor1, baseColor2, secondaryColor2, 
        baseColor3, secondaryColor3, baseColor4, secondaryColor4, baseColor5, secondaryColor5,
        baseColor6, secondaryColor6, baseColor7, secondaryColor7, baseColor8, secondaryColor8],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
