<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="64px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="订单编号:">
          <el-input v-model="orderInfo.orderNo" placeholder="请输入" size="small" clearable />
        </el-form-item>
        <el-form-item label="选择时间:">
          <el-date-picker
            v-model="createTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
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
    </el-header>

    <!-- 表格 -->
    <Table
      :table-data="tableData"
      :table-column-list="tableColumnList"
      operation-area="操作"
      :total-count="totalCount"
      :page-index="orderInfo.pageIndex"
      :total-page="totalPage"
      :page-size="orderInfo.pageSize"
      :loading="loading"
      @prevPage="prevPage"
    >
      <!-- 插槽 操作列:查看详情 -->
      <template v-slot:OperationColumn="{row}">
        <a class="link" @click="Operation(row)">查看详情</a>
      </template>
    </Table>

    <!-- 订单详情弹出层 -->
    <OrderDesc v-if="OrderDescVisible" :order-desc-visible.sync="OrderDescVisible" :current-row="currentRow" />
  </el-container>
</template>

<script>
import dayjs from 'dayjs'
import Table from '../workorder/components/Table.vue'
import { SearchOrderListAPI } from '@/api'
import OrderDesc from './components/OrderDesc.vue'
export default {
  components: { Table, OrderDesc },
  data() {
    return {
      orderInfo: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: null,
        startDate: null,
        endDate: null
      },
      tableData: [],
      tableColumnList: [
        { label: '订单编号', prop: 'orderNo' },
        { label: '商品名称', prop: 'skuName' },
        { label: '订单金额(元)', prop: 'price' },
        { label: '设备编号', prop: 'innerCode' },
        { label: '订单状态', prop: 'status' },
        { label: '订单日期', prop: 'createTime' }
      ],
      totalCount: 0,
      totalPage: 0,
      loading: false,
      createTime: [],
      currentRow: [],
      OrderDescVisible: false
    }
  },
  created() {
    this.SearchOrderList()
  },
  methods: {
    // 搜索订单
    async SearchOrderList() {
      try {
        this.loading = true
        const { data: { currentPageRecords, totalCount, totalPage }} = await SearchOrderListAPI(this.orderInfo)
        this.tableData = this.handleData(currentPageRecords)
        console.log(this.tableData)
        this.totalCount = totalCount
        this.totalPage = totalPage
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    // 根据条件查询订单
    search() {
      this.SearchOrderList()
    },
    Operation(row) {
      this.OrderDescVisible = true
      this.currentRow = row
      console.log(row)
    },
    // 分页请求
    prevPage(type) {
      if (type === 'next') {
        this.orderInfo.pageIndex++
        this.SearchOrderList()
      } else {
        this.orderInfo.pageIndex--
        this.SearchOrderList()
      }
    },
    // 处理数据函数
    handleData(currentPageRecords) {
      return currentPageRecords.map(item => {
        item.price = item.price / 100
        item.updateTime = item.updateTime.replace('-', '.').replace('T', ' ')
        item.createTime = item.createTime.replace('-', '.').replace('T', ' ')
        item.payType === 1 ? item.payType = '支付宝' : item.payType = '微信'
        switch (item.status) {
          case 0:
            item.status = '未支付'
            break
          case 1:
            item.status = '支付完成'
            break
          case 2:
            item.status = '出货成功'
            break
          case 3:
            item.status = '出货失败'
            break
        }
        return item
      })
    },
    // datepicker获取时间
    timeRange() {
      // 将时间转化成字符串
      this.orderInfo.startDate = dayjs(this.createTime[0]).format('YYYY-MM-DD')
      this.orderInfo.endDate = dayjs(this.createTime[1]).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang="scss">
.el-header {
    display: flex;
    height: 64px;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff !important;

    .el-form{
      height: 36px;
    }
}
.link {
    color: #4368e1;
}

.el-button {
  width: 80px!important;
  height: 36px;

}

.el-button--primary1 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    font-size: 14px;
  }
.el-button--primary1:hover {
    background: linear-gradient(135deg,#ff7d43,#db3602)!important;
}

.el-button--primary2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    font-size: 14px;
}
.el-button--primary2:hover {
  background-color: #f3e7e1!important;
}
.el-icon-circle-plus-outline {
  font-size: 16px;
}

.searchbtn {
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-width: 80px;
    height: 36px;
    padding: 0;
    background-color: #5f84ff;
    border: none;
    font-size: 14px;
}
</style>
