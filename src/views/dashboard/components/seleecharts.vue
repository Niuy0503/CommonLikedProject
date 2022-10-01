<template>
  <div>
    <div v-if="true" ref="SaleData" class="SaleData" />
    <Nodata v-else />
  </div>
</template>

<script>
import echarts from '@/utils/echars'
import dayjs from 'dayjs'
import { getAmountCollect } from '@/api'
import { getCurrentWeek, getCurrentMonthFormat } from '@/utils/get-this-month'
export default {
  name: 'Seleecharts',
  props: {
    checked: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      echartsDate: {
        series: [],
        xAxis: []
      }
    }
  },
  watch: {
    checked() {
      this.getAmountCollect()
    }
  },
  async mounted() {
    await this.getAmountCollect()
    this.getSaleDataEchars()
  },
  methods: {
    getSaleDataEchars() {
      var chartDom = this.$refs.SaleData
      var myChart = echarts.init(chartDom)
      var option

      option = {
        color: ['#ff5757'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // axisLine: { lineStyle: {
          //   color: '#9d9d9d'
          // }},
          data: this.echartsDate.xAxis,
          axisLine: {
            lineStyle: {
              color: '#9d9d9d'
            },
            axisLabel: {
              color: '#999999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
          nameTextStyle: {
            color: '#9d9d9d'
          },
          axisLabel: {
            color: '#9d9d9d'
          }
        },
        series: [
          {
            data: this.echartsDate.series,
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fecbcb' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ],
        grid: {
          left: '18%',
          bottom: '8%',
          right: '6%'
        },
        title: {
          show: true,
          text: '销售额趋势图',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        }
      }
      option && myChart.setOption(option)
    },
    async getAmountCollect() {
      var type = 1
      if (this.checked === 3) {
        type = 2
        var date = { start: dayjs().format('YYYY-01-01'), end: dayjs().format('YYYY-MM-DD') }
      } else {
        if (this.checked === 1) {
          type = 1
          date = getCurrentWeek()
        } else if (this.checked === 2) {
          type = 1
          date = getCurrentMonthFormat()
        }
      }
      var { data } = await getAmountCollect(type, date)
      this.echartsDate.xAxis = data.xAxis.map((res) => {
        if (this.checked === 1) {
          return dayjs(res).format('dddd')
        } else if (this.checked === 2) {
          return dayjs(res).format('MM月DD日')
        } else {
          return dayjs(res).format('YYYY年MM月')
        }
      })
      this.echartsDate.series = data.series.map((res) => {
        return res / 100
      })
      this.getSaleDataEchars()
    }
  }
}
</script>

<style lang="scss" scoped>
.SaleData{
    width: 100%;
    height: 100%;
    & > div{
      height: 100%;
    }
  }
</style>
