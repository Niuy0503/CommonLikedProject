<template>
  <el-dialog
    title="订单详情"
    :visible="OrderDescVisible"
    width="630px"
    style="{ border-radius: 10px }"
    @close="$emit('update:order-desc-visible',false)"
  >
    <!-- 订单状态为出货成功 -->
    <div v-if="currentRow.status === '未支付'" class="task-status">
      <img class="icon" src="../img/weizhifu1.png" alt="">
      <span class="status">未支付</span>
      <img class="pic" src="../img/quxiao2.png" alt="">
    </div>
    <!-- 工单状态为待办 -->
    <!-- <div v-else-if="currentRow.taskStatusTypeEntity.statusId === 1" class="task-status">
      <img class="icon" src="../img/daiban1.png" alt="">
      <span class="status">待办</span>
      <img class="pic" src="../img/daiban2.png" alt="">
    </div> -->
    <!-- 工单状态为出货成功 -->
    <div v-else-if="currentRow.status === '出货成功'" class="task-status">
      <img class="icon" src="../img/wancheng1.png" alt="">
      <span class="status">出货成功</span>
      <img class="pic" src="../img/wancheng2.png" alt="">
    </div>
    <!--? 详细信息区域 -->
    <el-descriptions :column="2">
      <el-descriptions-item label="订单编号">{{ currentRow.orderNo }}</el-descriptions-item>
      <el-descriptions-item label="商品名称">{{ currentRow.skuName }}</el-descriptions-item>
      <el-descriptions-item label="设备编号">{{ currentRow.innerCode }}</el-descriptions-item>
      <el-descriptions-item label="订单金额">{{ currentRow.price }}</el-descriptions-item>
      <el-descriptions-item label="完成时间">{{ currentRow.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ currentRow.createTime }}</el-descriptions-item>
      <!-- <el-descriptions-item label="补货数量"><a class="link" @click="desc">补货详情</a></el-descriptions-item> -->
      <el-descriptions-item label="设备地址">{{ currentRow.addr }}</el-descriptions-item>
      <el-descriptions-item label="支付方式">{{ currentRow.payType }}</el-descriptions-item>
    </el-descriptions>
    <!--? footer区域 -->
    <!-- <div class="el-dialog__footer">
      <el-button v-if="currentRow.taskStatusTypeEntity.statusId === 3" type="warning" @click="reset">重新创建</el-button>
      <el-button v-if="currentRow.taskStatusTypeEntity.statusId === 1" type="warning" @click="cancel">取消工单</el-button>
    </div> -->

    <!-- 新增工单弹出层 -->

  </el-dialog>

</template>

<script>
import { getTaskDetailsAPI, cancelTaskAPI } from '@/api'
export default {
  props: {
    OrderDescVisible: {
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
      loading: false
    }
  },
  methods: {
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
        this.$emit('taskSearch')
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

.el-icon-location-outline {
  color:#5f84ff
  // background-color: #5f84ff;
}

</style>

