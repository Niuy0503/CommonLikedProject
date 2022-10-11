<template>
  <el-dialog
    title="人员详情"
    :visible="dialogVisible"
    width="630px"
    @close="detailsClose"
  >
    <el-row v-loading="detailLoading" class="userInfo">
      <el-col :span="9">人员名称: {{ userInfo.userName }}</el-col>
      <el-col :span="7">角色: {{ userInfo.roleName }}</el-col>
      <el-col :span="8">联系电话: {{ userInfo.mobile }}</el-col>
      <el-col :span="24" class="region-name">负责区域: {{ userInfo.regionName }}</el-col>
    </el-row>
    <!-- 表格头部 -->
    <el-row v-loading="detailLoading" class="user-work header">
      <el-col :span="5" class="item " style="border: 1px solid transparent" />
      <el-col :span="5" class="item border">总工单数</el-col>
      <el-col :span="5" class="item">拒绝工单</el-col>
      <el-col :span="5" class="item">完成工单</el-col>
      <el-col :span="5" class="item">进行中工单</el-col>
    </el-row>
    <!-- 表格主体 -->
    <el-row v-for="(item,index) in workOrder" :key="index" class="user-work">
      <el-col :span="5" class="item" :class="{border2:index===workOrder.length-1}">{{ index==0?'本周':index==1?'本月':'本年' }}</el-col>
      <el-col :span="5" class="item" :class="{border2:index===workOrder.length-1}">{{ item.total }}</el-col>
      <el-col :span="5" class="item" :class="{border2:index===workOrder.length-1}">{{ item.cancelCount }}</el-col>
      <el-col :span="5" class="item" :class="{border2:index===workOrder.length-1}">{{ item.workCount }}</el-col>
      <el-col :span="5" class="item" :class="{border2:index===workOrder.length-1}">{{ item.progressTotal }}</el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    workOrder: {
      type: Array,
      default: () => ([])
    },
    detailLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      header: {}
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    detailsClose() {
      this.$emit('dialogVisibleClose', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    margin-top: 26px;
    background: #f7f8fd;
  }
  .border{
    border-left: 1px solid #d8dde3;
  }
  .border2{
    border-bottom: 1px solid #d8dde3;
  }
  .user-work{
    border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3;
    .item{
      line-height: 40px;
      border-right: 1px solid #d8dde3;
      text-align: center;
    }
  }
  .el-col-5{
    width: 20%;
  }
  ::v-deep .el-dialog__header{
    .el-dialog__title{
      line-height: 22px;
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
  }
  ::v-deep .el-dialog__body{
    padding: 20px 20px 30px;
    font-size: 14px;
    color:#666
  }
  .userInfo{
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
    .region-name{
      margin-top: 15px;
    }
  }
</style>
