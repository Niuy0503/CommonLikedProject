<template>
  <el-dialog
    :title="title"
    width="45%"
    :visible="dialogVisible"
    @close="handerClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="skuName"
        label="商品名称"
        :rules="[{required:true,message:'商品名称不能为空',trigger:'blur'}]"
      >
        <el-input v-model="formData.skuName" style="width:80%" type="text" placeholder="请输入" maxlength="15" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="brandName"
        label="品牌"
        :rules="[{required:true,message:'品牌不能为空',trigger:'blur'}]"
      >
        <el-input v-model="formData.brandName" style="width:80%" type="text" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="price"
        label="商品价格"
        :rules="[{required:true,message:'商品价格不能为空',trigger:'blur'}]"
      >
        <template>
          <el-input-number v-model="formData.price" controls-position="right" style="width:80%" type="text" placeholder="请输入" :min="0.01" :max="10" />
        </template>
      </el-form-item>
      <el-form-item
        prop="classId"
        label="商品类型"
        :rules="[{required:true,message:'商品类型不能为空',trigger:'blur'}]"
      >
        <el-select v-model="formData.classId" style="width:80%" placeholder="请选择">
          <el-option v-for="item in skuClass " :key="item.classId" :label="item.className" :value="item.classId" />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="unit"
        label="规格"
        :rules="[{required:true,message:'规格不能为空',trigger:'blur'}]"
      >
        <el-input v-model.number="formData.unit" style="width:80%" type="text" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="skuImage"
        label="商品图片"
        :rules="[{required:true,message:'图片不能为空',trigger:'blur'}]"
      >
        <template>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="uploadSectionFile"
          >
            <img v-if="formData.skuImage" :src="formData.skuImage" class="avatar" style="width:84px;height:84px">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip" style="color:#ccc;font-size:14px;margin-left:40px">支持扩展名：jpg、png，文件不得大于100kb</div>
          </el-upload>
        </template>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="delBtn" @click="handerClose">取 消</el-button>
      <el-button
        v-model="loading"
        class="confirmBtn"
        @click="addSku"
      >确 定</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
import { getSkuClassSearch, uploadPic, addSku, editSku } from '@/api'
// import { resolveToBase64 } from '@/utils'
export default {
  name: 'AddSku',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        skuName: '', // 商品名称
        brandName: '', // 品牌
        price: '', // 商品价格
        classId: '', // 商品类型
        unit: '', // 规格
        skuImage: ''// 商品图片
      },
      files: {},
      photoObj: '',
      loading: false,
      skuClass: [] // 商品类型
    }
  },
  computed: {
    title() {
      return this.formData.skuId ? '修改商品' : '新增商品'
    }
  },
  created() {
    this.getSkuClass()
  },
  methods: {
    // 取消按钮
    handerClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = {
        skuName: '', // 商品名称
        brandName: '', // 品牌
        price: '', // 商品价格
        classId: '', // 商品类型
        unit: '', // 规格
        skuImage: ''// 商品图片
      }
    },
    // 获取商品类型
    async getSkuClass() {
      const { data } = await getSkuClassSearch()
      this.skuClass = data.currentPageRecords
    },
    // 添加商品
    async addSku() {
      try {
        // 表单校验
        this.$refs.roleDialogForm.validate()
        this.loading = true
        console.log(this.className)
        if (this.formData.skuId) { // 修改
          await editSku(this.formData.skuId, this.formData)
        } else { // 新增
          await addSku(this.formData)
        }
        // 提示弹窗
        this.$message.success(`${this.formData.skuId ? '修改' : '新增'}成功`)
        // 通知父组件刷新页面
        this.$emit('refreshList')
        // 关闭弹窗
        this.handerClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async uploadSectionFile(file) {
      // console.log(file.file)
      const fm = new FormData()
      fm.append('fileName', file.file)

      const typeArr = ['image/png', 'image/jpg', 'image/jpeg']
      const isJPG = typeArr.indexOf(file.file.type) !== -1
      const isLt100K = file.file.size / 1024 < 100
      if (!isJPG) {
        console.log(!isJPG)
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
        return
      }
      if (!isLt100K) {
        console.log(!isLt100K)
        this.$message.error('上传头像图片大小不能超过 100kB!')
        return
      }
      // 上传图片
      const { data } = await uploadPic(fm)
      this.formData.skuImage = data
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.cancelBtn{
    background-color: #fbf4f0!important;
    color: #655b56!important;
    border:none
}
.confirmBtn{
    margin-left:40px;background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color:#fff
}
::v-deep .el-upload-dragger{
    width: 86px!important;
    height: 86px!important;
}
::v-deep .el-dialog__footer {
    padding: 0px 20px 20px;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }

::v-deep .el-dialog {
  border-radius: 10px;
.el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
}
.el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
    font-weight: 700;
}
.el-form-item {
    margin-bottom: 20px;
}
.el-form-item__label {
    margin-left: 40px;
    line-height: 36px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}
.el-form-item__content {
    width: 396px;
    line-height: 36px;
}
.el-upload-dragger .el-icon-upload {
    font-size: 30px;
    color: #C0C4CC;
    margin: 17px 0px;
    line-height: 50px;
}

}

</style>
