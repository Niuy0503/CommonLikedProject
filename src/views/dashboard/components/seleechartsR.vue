<template>
  <div>
    <div v-if="true" ref="SalesdDistribution" class="SalesdDistribution">销售数据柱状图</div>
    <Nodata v-else />
  </div>
</template>

<script>
import echarts from '@/utils/echars'
import Nodata from './nodata.vue'
import { getRegionCollect } from '@/api'
import { getCurrentWeek, getCurrentMonthFormat } from '@/utils/get-this-month'
import dayjs from 'dayjs'
export default {
  components: { Nodata },
  props: {
    checked: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      Collect: {
        series: [],
        xAxis: []
      }
    }
  },
  watch: {
    checked() {
      this.getRegionCollect()
    }
  },
  async mounted() {
    await this.getRegionCollect()
    this.getSaleDataEchars()
  },
  methods: {
    getSaleDataEchars() {
      var chartDom = this.$refs.SalesdDistribution
      var myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: '销售额分布',
          // subtext:'',
          x: 'center',
          y: '7px',
          textStyle: {
            color: '#333',
            fontSize: 14
          },
          textAlign: 'left'
        },
        grid: {
          left: '16%',
          bottom: '10%',
          right: '3%'
        },
        xAxis: {
          type: 'category',
          data: this.Collect.xAxis,
          axisLine: {
            // // 轴线的颜色以及宽度
            lineStyle: {
              color: '#999999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位:  元',
          axisLine: {
            // // 轴线的颜色以及宽度
            lineStyle: {
              color: '#999999'
            }
          }
        },
        series: [
          {
            data: this.Collect.series,
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              // 柱状颜色和圆角
              color: '#91b0ff',
              barBorderRadius: [5, 5, 0, 0] // （顺时针左上，右上，右下，左下）
            }
          }
        ]
      }
      // console.log(option)
      option && myChart.setOption(option)
    },
    async getRegionCollect() {
      if (this.checked === 3) {
        var date = { start: dayjs().format('YYYY-01-01'), end: dayjs().format('YYYY-MM-DD') }
      } else if (this.checked === 1) {
        date = getCurrentWeek()
      } else {
        date = getCurrentMonthFormat()
      }

      const { data } = await getRegionCollect(date)
      this.Collect.xAxis = data.xAxis
      this.Collect.series = data.series.map((res) => {
        return res / 100
      })
      this.getSaleDataEchars()
    }
  }
}
</script>

<style lang="scss">
  .SalesdDistribution{
    width: 100%;
    height: 100%;
    & > div{
      height: 100%;
    }
  }
</style>
