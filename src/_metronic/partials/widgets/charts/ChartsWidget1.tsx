/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import { UserIncome } from '../../../../app/pages/dashboard/core/_models'

type Props = {
  className: string
  dataProp: Array<UserIncome>
}

const ChartsWidget1: React.FC<Props> = ({className, dataProp}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  useEffect(() => {
    const chart = dataProp && refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, dataProp])

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

  var totalIncome = 0;
  dataProp.map(monthIncome => {return totalIncome += monthIncome.user_income})

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Орлогын мэдээлэл ажилчдаар</span>

          <span className='text-muted fw-semibold fs-7'>
            нийт дүн - {totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ₮'}
          </span>
        </h3>
        {/* end::Title */}

      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget1}

function getChartOptions(height: number, dataProp: Array<UserIncome>): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const baseColor = getCSSVariableValue('--kt-primary')
  const secondaryColor = getCSSVariableValue('--kt-gray-300')

  const datas = dataProp.map(income => income.user_income || 0)
  const names = dataProp.map(income => income.firstname || '')

  return {
    series: [
      {
        name: 'Орлого',
        data: datas,
      },
    ],
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
        horizontal: true,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: names,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
       
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
        
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
        
      },
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
          return val.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ₮'
        },
      },
    },
    colors: [baseColor, secondaryColor],
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
