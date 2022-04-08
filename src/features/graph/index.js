import React from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMore from 'highcharts/highcharts-more'
import Placeholder from './Placeholder'
import Spinner from './Spinner'


const Graph = () => {
  // Get state data
  const data = useSelector((state) => state.graphSlice.data)
  const isLoading = useSelector((state) => state.graphSlice.isLoading)
  const error = useSelector((state) => state.graphSlice.error)

  // Process data for chart
  const top = []
  const median = []
  const bottom = []
  const underPerform = []
  const benchmark = []
  const totalDeposits = []

  data.map((row) => {
    const currentDay = Date.UTC(...row.yearMonth.split("-"))
    top.push([currentDay, Math.round(Number(row.expectedAmounts["75"])), Math.round(Number(row.expectedAmounts["10"]))])
    median.push([currentDay, Math.round(Number(row.expectedAmounts["50"]))])
    bottom.push([currentDay, Math.round(Number(row.expectedAmounts["10"]))])
    underPerform.push([currentDay, Math.round(Number(row.chanceOfUnderPerformingBenchmark))])
    benchmark.push([currentDay, Math.round(Number(row.expectedAmounts["benchmark"]))])
    totalDeposits.push([currentDay, Math.round(Number(row.totalDeposit))])
  })

  const options = {
    title:{
      text: null
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: null
      }
    },

    yAxis: {
      title: {
        text: null
      },
      opposite: true
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      valuePrefix: 'S$'
    },

    legend: { 
      enabled: false 
    },

    series: [{
      name: 'Median',
      data: median,
      zIndex: 1,
      marker: {
        fillColor: 'blue',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Top 25% and Bottom 10% Range',
      data: top,
      type: 'arearange',
      lineWidth: 0,
      linkedTo: ':previous',
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      zIndex: 0,
      marker: {
        enabled: false
      }
    }, {
      name: '2.5% p.a.',
      data: benchmark,
      zIndex: 1,
      marker: {
        fillColor: 'yellow',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Deposits',
      data: totalDeposits,
      zIndex: 1,
      marker: {
        fillColor: 'black',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }
  ]
  };

  // To allow area range on highcharts
  highchartsMore(Highcharts)

  return (
    <div>
      {isLoading ? <Spinner></Spinner> :
        (
          data.length === 0 || error ? <Placeholder></Placeholder>:
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        )
      }
    </div>
  )
}

export default Graph