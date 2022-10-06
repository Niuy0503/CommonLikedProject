<template>
  <el-dialog
    title="工单详情"
    :visible="WorkOrderDescVisible"
    width="630px"
    style="{ border-radius: 10px }"
    @close="$emit('update:workOrderDescVisible',false)"
  >
    <!-- 工单状态为取消 -->
    <div v-if="currentRow.taskStatusTypeEntity.statusId === 3" class="task-status">
      <img class="icon" src="../img/quxiao1.png" alt="">
      <span class="status">取消</span>
      <img class="pic" src="../img/quxiao2.png" alt="">
    </div>
    <!-- 工单状态为待办 -->
    <div v-else-if="currentRow.taskStatusTypeEntity.statusId === 1" class="task-status">
      <img class="icon" src="../img/daiban1.png" alt="">
      <span class="status">待办</span>
      <img class="pic" src="../img/daiban2.png" alt="">
    </div>
    <!-- 工单状态为完成 -->
    <div v-else-if="currentRow.taskStatusTypeEntity.statusId === 4" class="task-status">
      <img class="icon" src="../img/wancheng1.png" alt="">
      <span class="status">完成</span>
      <img class="pic" src="../img/wancheng2.png" alt="">
    </div>
    <!--? 详细信息区域 -->
    <el-descriptions v-if="currentRow.taskId" :column="2">
      <el-descriptions-item label="设备编号">{{ currentRow.innerCode }}</el-descriptions-item>
      <el-descriptions-item label="创建日期">{{ currentRow.createTime }}</el-descriptions-item>
      <el-descriptions-item v-if="currentRow.taskStatusTypeEntity.statusId === 3" label="取消日期">{{ currentRow.updateTime }}</el-descriptions-item>
      <el-descriptions-item v-if="currentRow.taskStatusTypeEntity.statusId === 4" label="完成日期">{{ currentRow.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="运营人员">{{ currentRow.userName }}</el-descriptions-item>
      <el-descriptions-item label="工单类型">{{ currentRow.taskType.typeName }}</el-descriptions-item>
      <el-descriptions-item label="补货数量"><a class="link" @click="desc">补货详情</a></el-descriptions-item>
      <el-descriptions-item label="工单方式">{{ currentRow.createType===0? '自动':'手动' }}</el-descriptions-item>
      <el-descriptions-item :label="currentRow.taskStatusTypeEntity.statusId === 3 ? '取消原因' : '备注'">{{ currentRow.desc }}</el-descriptions-item>
    </el-descriptions>
    <!--? footer区域 -->
    <div class="el-dialog__footer">
      <el-button v-if="currentRow.taskStatusTypeEntity.statusId === 3" type="warning" @click="reset">重新创建</el-button>
      <el-button v-if="currentRow.taskStatusTypeEntity.statusId === 1" type="warning" @click="cancel">取消工单</el-button>
    </div>

    <!-- 补货详情弹出层 -->
    <el-dialog
      title="补货详情"
      :visible="ReplenishmentDetailsVisible"
      width="630px"
      style="{ border-radius: 10px }"
      append-to-body
      class="ReplenishmentDetails"
      @close="ReplenishmentDetailsVisible = false"
    >
      <Table
        v-if="ReplenishmentDetailsVisible"
        :table-data="tableData"
        :table-column-list="tableColumnList"
        :is-show-index="false"
        :loading="loading"
        :is-show-operation="false"
        height="300"
        operation-area-width="200"
      />
    </el-dialog>

    <!-- 新增工单弹出层 -->
    <AddWorkOrder
      :add-work-order-visible.sync="addWorkOrderVisible"
      :inner-code="currentRow.innerCode"
      :product-type="2"
      :assignor-id="currentRow.assignorId"
      :desc="currentRow.desc"
    />

    <!-- 确认框 -->

  </el-dialog>

</template>

<script>
import { getTaskDetailsAPI, cancelTaskAPI } from '@/api'
import Table from './Table.vue'
import AddWorkOrder from './addWorkOrder.vue'
export default {
  components: { Table, AddWorkOrder },
  props: {
    WorkOrderDescVisible: {
      type: Boolean,
      default: false
    },
    currentRow: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ReplenishmentDetailsVisible: false,
      loading: false,
      addWorkOrderVisible: false,
      tableData: [],
      tableColumnList: [
        { label: '货道编号', prop: 'channelCode' },
        { label: '商品', prop: 'skuName' },
        { label: '补货数量', prop: 'expectCapacity' }
      ]
    }
  },
  methods: {
    desc() {
      this.getTaskDetails()
      this.ReplenishmentDetailsVisible = true
    },
    async getTaskDetails() {
      try {
        this.loading = true
        const { data } = await getTaskDetailsAPI(this.currentRow.taskId)
        this.tableData = data
        console.log(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.addWorkOrderVisible = true
    },
    async cancel() {
      try {
        await this.$confirm('取消工单后，将不能恢复，是否确认取消？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await cancelTaskAPI(this.currentRow.taskId, this.currentRow.desc)
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
    border-radius: 10px;

  .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
  }

  .task-status {
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0,0%,92.5%,.39);

    .icon {
      margin-left: 22px;
    }

    .status {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-left: 16px;
      color: rgba(0,0,0,.85);
    }

    .pic {
      margin-right: 76px;
      margin-bottom: 7px;
    }
  }

  .el-descriptions-item__label{
    width: 100px;
    justify-content: right;
  }

  .el-dialog__footer {
    padding-top: 20px;
    text-align: center;
    .el-button {
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0;
    border: none;
    color: #655b56;
  }
  }
  .link {
    color: #4368e1;
  }

}

.ReplenishmentDetails {
  ::v-deep .el-dialog__body {
    padding:0
  }
}

</style>

