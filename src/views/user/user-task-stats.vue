<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 头部盒子组件左 -->
        <Box :box-data="taskReportData" title="运营人员（当天）" :src="backgroundImage" textshadow="2px 4px 7px rgb(85 132 255 / 50%)" bg="#e9f3ff" color="#072074" color1="#91a7dc" />
      </el-col>
      <el-col :span="12">
        <!-- 头部盒子组件右 -->
        <Box :box-data="taskReportRepairData" title="运维人员（当天）" :src="backgroundImage2" textshadow="2px 4px 7px rgb(255 99 85 / 50%)" bg="#fbefe8" color="#ff5757" color1="#de9690" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 人员状态组件 -->
        <Status />
      </el-col>
      <el-col :span="6">
        <!-- 排名组件 -->
        <Ranking :region-list="regionList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Box from './components/box.vue'
import { getTaskReportInfoApi, getRegionApi } from '@/api'
import dayjs from 'dayjs'
import Status from './components/status.vue'
import Ranking from './components/ranking.vue'
export default {
  components: { Box, Status, Ranking },
  data() {
    return {
      taskReport: {},
      taskReportRepair: {},
      backgroundImage: require('@/assets/common/circle.png'),
      backgroundImage2: require('@/assets/common/operation.png'),
      regionList: []
    }
  },
  computed: {
    taskReportData() {
      return [
        {
          prop: '工单总数（个）',
          value: this.taskReport.total
        },
        {
          prop: '完成工单（个）',
          value: this.taskReport.completedTotal
        },
        {
          prop: '拒绝工单（个）',
          value: this.taskReport.cancelTotal
        },
        {
          prop: '运营人员数（个）',
          value: this.taskReport.workerCount
        }
      ]
    },
    taskReportRepairData() {
      return [
        {
          prop: '工单总数（个）',
          value: this.taskReportRepair.total
        },
        {
          prop: '完成工单（个）',
          value: this.taskReportRepair.completedTotal
        },
        {
          prop: '拒绝工单（个）',
          value: this.taskReportRepair.cancelTotal
        },
        {
          prop: '运维人员数（个）',
          value: this.taskReportRepair.workerCount
        }
      ]
    }
  },
  created() {
    this.getTaskReportInfo()
    this.getRegion()
  },
  methods: {
    async getTaskReportInfo() {
      const { data } = await getTaskReportInfoApi(dayjs(new Date()).format('YYYY-MM-DD 00:00:00'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))
      console.log(data)
      this.taskReport = data[0]
      this.taskReportRepair = data[1]
    },
    async getRegion() {
      const { data } = await getRegionApi()
      console.log(data)
      this.regionList = data.currentPageRecords
    }
  }
}
</script>

<style>
</style>
