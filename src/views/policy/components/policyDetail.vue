<template>
  <el-dialog
    title="策略详情"
    width="40%"
    :visible="dialogShow"
    @close="handerClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="140px"
      :model="formData"
      label-position="right"
    >
      <el-form-item
        prop="policyName"
        label="策略名称"
      >
        <span>{{ formData.policyName }}</span>
      </el-form-item>
      <el-form-item
        prop="discount"
        label="策略方案"
      >
        <template>
          <el-table
            :data="pageDate.currentPageRecords"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            />
            <el-table-column
              prop="nodeName"
              label="点位名称"
              width="180"
            />
            <el-table-column
              prop="innerCode"
              label="设备编号"
            />
          </el-table>
        </template>
      </el-form-item>
    </el-form>
    <pagination :total-count="pageDate.totalCount" :page-index="pageDate.pageIndex" :total-page="pageDate.totalPage" @prevPage="pagechange" />
  </el-dialog>
</template>

<script>
import pagination from './pagination.vue'
export default {
  name: 'PolicyDetail',
  components: { pagination },
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    pageDate: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        policyName: '',
        discount: ''
      }
    }
  },
  methods: {
    handerClose() {
      this.$emit('update:dialogShow', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = {}
    },
    pagechange(type) {
      if (type === 'next') {
        this.pageDate.pageIndex++
      } else {
        this.pageDate.pageIndex--
      }
      this.$emit('checkDetails', this.pageDate, this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
    border-radius: 10px;
    ::v-deep .el-dialog__header{
        span{
            font-weight: 700!important;
        }
    }
  .el-dialog__body {
        padding: 20px 30px 20px;
    }
}
</style>
