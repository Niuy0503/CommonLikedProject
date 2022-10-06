<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><DayStatisticalChart /></el-col>
      <el-col :span="12"><MonthStatisticalChart /></el-col>
    </el-row>

    <Table
      :table-data="tableData"
      :table-column-list="tableColumnList"
      :total-count="totalCount"
      :page-index="partnerCollectList.pageIndex"
      :total-page="totalPage"
      :page-size="partnerCollectList.pageSize"
      :loading="loading"
      :is-show-operation="false"
      @prevPage="prevPage"
    >
      <!-- 插槽 表格头部 -->
      <template #table-header>
        <el-header height="100px">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="合作商：">
              <el-select v-model="partnerCollectList.partnerName" placeholder="请选择" clearable>
                <el-option v-for="item in partnerList" :key="item.mobile" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="日期：">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="{
                  disabledDate(time) { // 设置禁用状态，参数为当前日期，要求返回 Boolean
                    return time.getTime() > Date.now();
                  }
                }"
                @change="timeRange"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" icon="el-icon-search" class="searchbtn" @click="search">查询</el-button>
            </el-form-item>
          </el-form>

          <div class="stats">
            <span class="label">笔数统计：</span> <span class="value">{{ orderCount }}</span> <span class="unit">个</span>
            <span class="label">收入统计：</span> <span class="value">{{ orderAmount }}</span> <span class="unit">个</span>
            <span class="label">分成统计：</span> <span class="value">{{ totalBill }}</span> <span class="unit">个</span>
          </div>
        </el-header>
      </template>
    </Table>
  </div>
</template>

<script>
import DayStatisticalChart from './components/DayStatisticalChart.vue'
import MonthStatisticalChart from './components/MonthStatisticalChart.vue'
import Table from '../workorder/components/Table.vue'
import dayjs from 'dayjs'
import { getPartnerCollectAPI, getPartnerAPI, getOrderCountAPI, getOrderAmountAPI, getTotalBillAPI } from '@/api'

export default {
  name: 'Report',
  components: { DayStatisticalChart, MonthStatisticalChart, Table },
  data() {
    return {
      createTime: [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      partnerCollectList: {
        pageIndex: 1,
        pageSize: 10,
        partnerName: '',
        start: dayjs().startOf('month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')
      },
      partnerList: [],
      totalCount: 0,
      totalPage: 0,
      orderCount: 0,
      orderAmount: 0,
      totalBill: 0,
      tableData: [],
      tableColumnList: [
        { label: '订单日期', prop: 'date' },
        { label: '合作商', prop: 'ownerName' },
        { label: '分成比例', prop: 'ratio' },
        { label: '收入(元)', prop: 'orderTotalMoney' },
        { label: '笔数', prop: 'orderCount' },
        { label: '分成金额(元)', prop: 'totalBill' }
      ],
      loading: false
    }
  },
  created() {
    this.getPartnerCollect()
    this.getPartner()
    this.getOrderCount()
    this.getOrderAmount()
    this.getTotalBill()
  },
  methods: {
    // 获取一定日期范围之内的合作商分成汇总数据
    async getPartnerCollect() {
      try {
        this.loading = true
        const { data: { currentPageRecords, totalCount, totalPage }} = await getPartnerCollectAPI(this.partnerCollectList)
        this.tableData = this.handleData(currentPageRecords)
        this.totalCount = totalCount
        this.totalPage = totalPage
        console.log(totalPage)
        console.log(currentPageRecords)
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    // 合作商搜索
    async getPartner() {
      const { data: { currentPageRecords }} = await getPartnerAPI(1, 100000)
      this.partnerList = currentPageRecords
    },
    async getOrderCount() {
      const { data } = await getOrderCountAPI({
        start: dayjs(this.partnerCollectList.start).format('YYYY-MM-DD hh:mm:ss'),
        end: dayjs(this.partnerCollectList.end).format('YYYY-MM-DD hh:mm:ss')
      })
      this.orderCount = data
    },
    async getOrderAmount() {
      const { data } = await getOrderAmountAPI({
        start: dayjs(this.partnerCollectList.start).format('YYYY-MM-DD hh:mm:ss'),
        end: dayjs(this.partnerCollectList.end).format('YYYY-MM-DD hh:mm:ss')
      })
      this.orderAmount = data / 100
    },
    async getTotalBill() {
      const { data } = await getTotalBillAPI({
        start: dayjs(this.partnerCollectList.start).format('YYYY-MM-DD hh:mm:ss'),
        end: dayjs(this.partnerCollectList.end).format('YYYY-MM-DD hh:mm:ss')
      })
      this.totalBill = data / 100
    },
    // 搜索请求
    search() {
      this.getPartnerCollect()
      this.getOrderCount()
      this.getOrderAmount()
      this.getTotalBill()
    },
    timeRange() {
      // 将时间转化成字符串
      this.partnerCollectList.start = dayjs(this.createTime[0]).format('YYYY-MM-DD')
      this.partnerCollectList.end = dayjs(this.createTime[1]).format('YYYY-MM-DD')
    },
    // 分页请求
    prevPage(type) {
      if (type === 'next') {
        this.partnerCollectList.pageIndex++
        this.getPartnerCollect()
      } else {
        this.partnerCollectList.pageIndex--
        this.getPartnerCollect()
      }
    },
    // 处理数据函数
    handleData(currentPageRecords) {
      return currentPageRecords.map(item => {
        item.ratio += '%'
        item.orderTotalMoney = '+' + item.orderTotalMoney / 100
        item.totalBill = '+' + item.totalBill / 100
        return item
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-header {
  padding: 0;
}
.el-main {
  margin-top: 20px;
}

.stats {
  background-color: #fff;
  padding: 10px 0 0 0;

  .label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.value {
  font-size: 20px;
  color: #ff5757;
  font-weight: 500;
}

.unit {
  margin-right: 50px;
  font-size: 12px;
  color: #000;
}
}

</style>
