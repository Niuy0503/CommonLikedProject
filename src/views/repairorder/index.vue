<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="64px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="工单编号:">
          <el-input v-model="taskCode" placeholder="请输入" size="small" />
        </el-form-item>
        <el-form-item label="工单状态:">
          <el-select v-model="status" placeholder="请选择" size="small">
            <el-option v-for="(item,index) in allTaskStatus" :key="index" :label="item.statusName" :value="item.statusId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" class="searchbtn" @click="taskSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- 表格区域 -->
    <Table
      :table-data="tableData"
      :table-column-list="tableColumnList"
      operation-area="操作"
      :total-count="totalCount"
      :page-index="pageIndex"
      :total-page="totalPage"
      :page-size="pageSize"
      :loading="loading"
      @prevPage="prevPage"
    >
      <!-- 插槽 表格头部 -->
      <template #table-header>
        <el-button class="el-button--primary1" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addWork">新建</el-button>
        <el-button class="el-button--primary2" type="primary" size="small" @click="orderConfig">工单配置</el-button>
      </template>
      <!-- 插槽 操作列:查看详情 -->
      <template v-slot:OperationColumn="{row}">
        <a class="link" @click="Operation(row)">查看详情</a>
      </template>
    </Table>
    <!-- 分页器 -->
    <!-- 工单详情弹出层 -->
    <WorkOrderDesc v-if="WorkOrderDescVisible" :work-order-desc-visible.sync="WorkOrderDescVisible" :current-row="currentRow" />
    <!-- 新增工单弹出层 -->
    <AddWorkOrder v-if="addWorkOrderVisible" :add-work-order-visible.sync="addWorkOrderVisible" @taskSearch="taskSearch" />
    <!-- 工单配置弹出层 -->
    <OrderConfig :order-config-visible.sync="orderConfigVisible" @taskSearch="taskSearch" />
  </el-container>
</template>

<script>
import { taskSearchAPI, getAllTaskStatusAPI } from '@/api'
import { createTypeMap } from './const'
import Table from './components/Table.vue'
import WorkOrderDesc from './components/WorkOrderDesc.vue'
import AddWorkOrder from './components/addWorkOrder.vue'
import OrderConfig from './components/orderConfig.vue'
export default {
  components: { Table, WorkOrderDesc, AddWorkOrder, OrderConfig },
  data() {
    return {
      loading: false,
      tableData: [],
      tableColumnList: [
        { label: '工单编号', prop: 'taskCode' },
        { label: '设备编号', prop: 'innerCode' },
        { label: '工单类型', prop: 'taskType.typeName' },
        {
          label: '工单方式',
          prop: 'createType',
          formatter: ({ createType }) => createType === createTypeMap.automatic ? '自动' : '手动'
        },
        {
          label: '工单状态',
          prop: 'taskStatusTypeEntity.statusName'
        },
        { label: '运营人员', prop: 'userName' },
        {
          label: '创建日期',
          prop: 'createTime'
        }
      ],
      allTaskStatus: [],
      currentRow: {},
      pageIndex: 1,
      pageSize: 10,
      taskCode: null,
      status: null,
      isRepair: false,
      totalCount: 0,
      totalPage: 0,
      WorkOrderDescVisible: false,
      addWorkOrderVisible: false,
      orderConfigVisible: false
    }
  },
  created() {
    this.taskSearch()
    this.getAllTaskStatus()
  },
  methods: {
    // 搜索工单
    async taskSearch() {
      try {
        this.loading = true
        const { data } = await taskSearchAPI(this.pageIndex, this.pageSize, this.taskCode, this.status, this.isRepair)
        this.formatter(data.currentPageRecords)
        this.tableData = data.currentPageRecords
        // console.log(this.tableData)
        this.pageIndex = data.pageIndex
        this.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        // console.log('1', data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 获取所有工单状态
    async getAllTaskStatus() {
      const { data } = await getAllTaskStatusAPI()
      this.allTaskStatus = data
      console.log(data)
    },
    Operation(row) {
      this.WorkOrderDescVisible = true
      this.currentRow = row
      console.log(row)
    },
    addWork() {
      this.addWorkOrderVisible = true
    },
    orderConfig() {
      this.orderConfigVisible = true
    },
    prevPage(type) {
      if (type === 'next') {
        this.pageIndex++
        this.taskSearch()
      } else {
        this.pageIndex--
        this.taskSearch()
      }
    },
    // 处理数据函数
    formatter(data) {
      data.map(item => {
        item.createTime = item.createTime.replace(/T/, ' ').replace(/-/g, '.')
        item.updateTime = item.updateTime.replace(/T/, ' ').replace(/-/g, '.')
        return item
      })
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
    background-color: #fff;

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
