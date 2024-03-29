import { h } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    chartData: {
        type: Object,
        default: []
    }
    // styles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: () => {}
    // },
    // plugins: {
    //   type: Array as PropType<Plugin<'line'>[]>,
    //   default: () => []
    // }
  },
  setup(props) {
    // const chartData = {
    //   labels: ['','','','','','','','','','','','','','','','','','','','','','','','','',],
    //   datasets: [
    //     this.datasets
    //   ]
    // }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Line, {
        chartData: props.chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
}
