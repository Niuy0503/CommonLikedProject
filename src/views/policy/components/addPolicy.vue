<template>
  <el-dialog
    :title="title"
    width="40%"
    :visible="dialogVisible"
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
        :rules="[{required:true,message:'策略名称不能为空',trigger:'blur'}]"
      >
        <el-input v-model="formData.policyName" style="width:80%" type="text" placeholder="请输入" maxlength="15" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="discount"
        label="策略方案"
        :rules="[{required:true,message:'策略方案不能为空',trigger:'blur'}]"
      >
        <template>
          <el-input-number v-model="formData.discount" controls-position="right" style="width:80%" type="text" placeholder="请输入" />
        </template>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancelBtn" @click="handerClose">取 消</el-button>
      <el-button
        v-model="loading"
        class="confirmBtn"
        @click="addPolicy"
      >确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPolicy, editPolicy } from '@/api'
export default {
  name: 'AddPolicy',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        policyName: '',
        discount: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.policyId ? '修改策略' : '新增策略'
    }
  },
  methods: {
    // 取消按钮
    handerClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = {}
    },
    // 添加策略
    async addPolicy() {
      try {
        // 表单校验
        this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.policyId ? await editPolicy(this.formData.policyId, this.formData) : await addPolicy(this.formData)
        this.$emit('refreshList')
        this.$message.success(`${this.formData.policyId ? '编辑' : '新增'}成功`)
        this.handerClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cancelBtn{
    background-color: #fbf4f0!important;
    color: #655b56!important;
    border:none
}
.confirmBtn{
    margin-left:40px;background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color:#fff
}
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
