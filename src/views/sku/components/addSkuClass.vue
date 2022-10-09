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
        prop="className"
        label="商品类型名称"
        :rules="[{required:true,message:'商品名称不能为空',trigger:'blur'}]"
      >
        <el-input v-model="formData.className" style="width:80%" type="text" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancelBtn" @click="handerClose">取 消</el-button>
      <el-button
        v-model="loading"
        class="confirmBtn"
        @click="addGoods"
      >确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addSkuClass, editSkuClass } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        className: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.classId ? '修改商品类型' : '新增商品类型'
    }
  },
  methods: {
    // 取消按钮
    handerClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()// 重置表单
      this.formData = {}
    },
    // 添加商品类型
    async addGoods() {
      try {
        this.$refs.roleDialogForm.validate()// 表单校验
        this.loading = true
        this.formData.classId ? await editSkuClass(this.formData.classId, this.formData.className) : await addSkuClass(this.formData.className)
        this.$emit('refreshList')
        // 接口调用成功提示
        this.$message.success(this.formData.classId ? '编辑成功' : '新增成功')
        // 关闭弹窗
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
