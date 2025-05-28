/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Chart, ChartConfiguration} from 'chart.js'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {toAbsoluteUrl} from '../../../helpers'
import { AppointmentStatus } from '../../../../app/pages/dashboard/core/_models'

type Props = {
  className: string
  innerPadding?: string
  dataProp: AppointmentStatus
}

const StatsWidget1: React.FC<Props> = ({className, innerPadding = '', dataProp}) => {
  useEffect(() => {
    const element = document.getElementById('kt_stats_widget_1_chart') as HTMLCanvasElement

    if (!element) {
      return
    }
    
    const options = getChartOptions(dataProp)
    const ctx = element.getContext('2d')
    let myDoughnut: Chart | null
    if (ctx) {
      myDoughnut = new Chart(ctx, options)
    }
    
    return function cleanUp() {
      if (myDoughnut) {
        myDoughnut.destroy()
      }
    }
  }, [dataProp])

  var totalAppointment = 0;
  dataProp.numbers.map(number => totalAppointment += number)

  return (
    <div className={`card ${className}`}>
      <div className={`card-header align-items-center border-0 mt-5 ${innerPadding}`}>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Цаг захиалгын тоо</span>
          <span className='text-muted mt-2 fw-bold fs-6'>төлвөөр </span>
        </h3>

      </div>

      <div className='card-body pt-12'>
        <div
          className='d-flex flex-center position-relative bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-center h-180px'
          style={{
            backgroundImage: `url('${toAbsoluteUrl('/media/svg/illustrations/bg-1.svg')}')`,
          }}
        >
          <div className='fw-bolder fs-1 text-gray-800 position-absolute pt-10'>{totalAppointment}</div>
          <canvas id='kt_stats_widget_1_chart'></canvas>
        </div>
      </div>

    </div>
  )
}

export {StatsWidget1}

function getChartOptions(dataProp: any) {
  const tooltipBgColor = getCSSVariableValue('--bs-gray-200')
  const tooltipColor = getCSSVariableValue('--bs-gray-800')

  const options: ChartConfiguration = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: dataProp.numbers,
          backgroundColor: dataProp.colors,
        },
      ],
      labels: dataProp.labels,
    },
    options: {
      cutoutPercentage: 100,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Technology',
      },
      animation: {
        /* @ts-ignore */
        animateScale: true,
        animateRotate: true,
      },
      tooltips: {
        enabled: true,
        intersect: false,
        mode: 'nearest',
        bodySpacing: 5,
        yPadding: 10,
        xPadding: 10,
        caretPadding: 0,
        displayColors: false,
        backgroundColor: tooltipBgColor,
        bodyFontColor: tooltipColor,
        cornerRadius: 4,
        footerSpacing: 0,
        titleSpacing: 0,
      },
    },
  }
  return options
}
