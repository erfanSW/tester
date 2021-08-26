<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
/* eslint-disable */

import { defineComponent } from 'vue';
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import 'src/assets/js/JDate';

export default {
  name: 'PageIndex',
  props: {
    series: {
      type: Array,
      required: true,
    },
  },
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          type: 'column',
        },
        title: null,
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        colors: [ "#F4C608","#7E0FDF", "#E11BA0","#07E07C","#09D2E0"],
        xAxis: {
          type: 'category',
          gridLineWidth: 0.1,
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              color: "#B2B7C1"
            }
          },
          crosshair: {
            color: "#E8EAF6",
            width: 50
          }
        },
        yAxis: {
          title: null,
          gridLineWidth: 0.4,
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              color: "#B2B7C1"
            }
          }
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [],
      },
    };
  },
  created() {
    this.chartOptions.series = this.series;
  },
};
</script>
