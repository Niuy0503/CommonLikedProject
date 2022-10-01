<template>
  <div class="partnerPoints home-user-task-stats">
    <div class="echarts-pie">
      <div class="headbox">
        <ItemHead :title="'合作商点位数Top5'" :is-show-time="false" />
        <SvgIcon icon-class="more" />
      </div>
      <el-row v-if="true">
        <el-col :span="17">
          <div class="chars">
            <div ref="partnerNodeCollect" class="partnerNodeCollect">饼图</div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="collect-box">
            <div class="collect">
              <div class="count">{{ count.nodeCount }}</div>
              <div class="name">点位数</div>
              <div class="count count2">{{ count.PartnerCount }}</div>
              <div class="name">合作商数</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <Nodata v-else />
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echars'
import ItemHead from './itemHead.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Nodata from './nodata.vue'
import { getNodeCollect, getNodeCount, getPartnerCount } from '@/api'
export default {
  components: { ItemHead, SvgIcon, Nodata },
  data() {
    return {
      echartsData: {},
      count: {
        nodeCount: 0,
        PartnerCount: 0
      }
    }
  },
  created() {
    this.getCount()
  },
  async mounted() {
    await this.getNodeCollect()
    this.getSaleDataEchars()
  },
  methods: {
    getSaleDataEchars() {
      var chartDom = this.$refs.partnerNodeCollect
      var myChart = echarts.init(chartDom)
      var option
      option = {
        color: ['#85a7ff', '#99ebbd', '#ffb18b', '#c6ebff', '#becce6', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: [30, 100],
            roseType: 'radius',
            label: {
              show: true,
              formatter: `{b|{b}}\n{d}%`,
              rich: {
                b: {
                  fontWeight: 700
                }
              }
            },
            labelLine: {
              lineStyle: {
                color: '#bfbfbf'
              }
            },
            data: this.echartsData
          }
        ]
      }
      option && myChart.setOption(option)
    },
    async getNodeCollect() {
      const { data } = await getNodeCollect()
      this.echartsData = data
    },
    async getCount() {
      const { data } = await getNodeCount()
      const { data: res } = await getPartnerCount()
      this.count.nodeCount = data
      this.count.PartnerCount = res
    }
  }
}
</script>

<style lang="scss">
  .headbox{
    display: flex;
    justify-content: space-between;
  }
  .partnerNodeCollect{
   width: 100%;
   height: 100%;
  }
  .echarts-pie{
    height: 300px;
    .chars{
      height: 300px;
      padding-top: 16px;
    }
  }
  .collect-box{
    height: 300px;
    display: flex;
    align-items: center;
    .collect{
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    .count{
      height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
    }
    .name{
      height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
    }
    .count2{
      margin-top: 20px;
    }
  }
}
</style>
