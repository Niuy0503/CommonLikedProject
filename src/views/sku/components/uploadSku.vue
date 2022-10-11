<template>
  <el-dialog
    title="数据导入"
    width="35%"
    :visible="dialogshow"
    @close="handerClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="skuName"
        label="标题："
      >
        <template>
          <el-upload
            class="upload-demo"
            action="#"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :file-list="fileList"
            accept=".xls,.xlsx"
            :before-upload="handleExceed"
          >
            <el-button size="big" type="primary">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：xls、xlsx，文件不得大于1M</div>
          </el-upload>
        </template>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="delBtn" @click="handerClose">取 消</el-button>
      <el-button
        v-model="loading"
        class="confirmBtn"
        @click="submit"
      >确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { uploadSku } from '@/api'
export default {
  props: {
    dialogshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {},
      formData: {
        fileName: ''
      },
      fileList: [],
      loading: false
    }
  },
  methods: {
    handerClose() {
      this.$emit('update:dialogshow', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = {
        fileName: ''
      }
      this.fileList = []
      this.data = {}
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传文件
    async handleExceed(file) {
      const typeArr = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      const isEXE = typeArr.indexOf(file.type) !== -1
      const isLt100K = file.size / 1024 < 1024
      if (!isEXE) {
        this.$message.error('上传头像图片只能是 xls、xlsx 格式!')
        return
      }
      if (!isLt100K) {
        this.$message.error('上传头像图片大小不能超过 1M')
        return
      }
      const fm = new FormData()
      fm.append('fileName', file)
      this.data = fm
    },
    async submit() {
      try {
        if (this.data) {
          this.loading = true
          const res = await uploadSku(this.data)
          this.$message.success('文件上传成功')
          console.log(res)
        }
      } finally {
        this.handerClose()
        this.loading = false
      }
    }
  }

}
</script>

<style  lang="scss" scoped>
.el-upload__tip{
  color: #ccc;
}
.cancelBtn{
    background-color: #fbf4f0!important;
    color: #655b56!important;
    border:none
}
.confirmBtn{
    margin-left:40px;background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color:#fff
}
::v-deep .el-dialog .el-dialog__body .el-form-item .el-form-item__content .el-button {
  width: 221px;
    padding-top: 6px;
    padding-bottom: 6px;
}
::v-deep .el-upload__tip {
    font-size: 14px;
}
::v-deep .el-dialog__body {
    padding: 20px 20px 0px;
}
::v-deep .el-form-item {
    margin-bottom: 0px;
    margin-left:70px;
}
</style>
