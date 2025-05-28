/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import { MonthIncome } from '../../../../app/pages/dashboard/core/_models'
import { KTSVG } from '../../../helpers'

type Props = {
  className: string
  dataProp: Array<MonthIncome>
}

const ChartsWidget3: React.FC<Props> = ({className, dataProp}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshMode = () => {
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
    const chart = dataProp && refreshMode()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, dataProp])

  var totalIncome = 0;
  dataProp.map(monthIncome => {return totalIncome += monthIncome.income})

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Нийт орлого</span>

          <span className='text-muted fw-semibold fs-7'>
            нийт дүн - {totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ₮'}
          </span>
        </h3>

      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_3_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget3}

function getChartOptions(height: number, dataProp: Array<MonthIncome>): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const baseColor = getCSSVariableValue('--kt-info')
  const lightColor = getCSSVariableValue('--kt-info-light')

  const datas = dataProp.map(data => data.income || 0)
  const names = dataProp.map(income => income.month + ' -р сар' || '')

  return {
    series: [
      {
        name: 'Орлого',
        data: datas,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
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
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
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
   
            formatter: function (val) {
              return val.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ₮'
            },
    
      },
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
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  }
}
