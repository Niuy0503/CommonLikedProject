<template>
  <div>
    <!-- 搜索 -->
    <SearchHead :option="option" @search="getUserInfo" />
    <!-- 表格部分 -->
    <IndexTable :table-data="tabledata" :page="page" :dialog-visible.sync="dialogVisible" @sendData="sendData" />
    <!-- 分页器 -->
    <pagination :total-count="totalCount" :page-index="page.pageIndex" :total-page="totalPage" @prevPage="changePage" />
    <!-- 弹窗 -->
    <el-dialog
      title="新增人员"
      :visible="dialogVisible"
      width="630px"
      @close="handerclose"
    >
      <el-form ref="userDialogForm" :label-position="labelPosition" label-width="140px" :model="userInfo" :rules="rules">
        <el-form-item label="人员名称：" prop="userName">
          <el-input v-model="userInfo.userName" placeholder="请输入" maxlength="5" show-word-limit />
        </el-form-item>
        <el-form-item ref="role" label="角色：" prop="roleId">
          <el-select v-model="userInfo.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item ref="mobile" label="联系电话：" prop="mobile">
          <el-input v-model="userInfo.mobile" placeholder="请输入" maxlength="11" show-word-limit />
        </el-form-item>
        <el-form-item ref="region" label="负责区域：" prop="region">
          <el-select v-model="region" placeholder="请选择" value-key="id" @change="pushObj">
            <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像：" prop="image">
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <SvgIcon v-else icon-class="upload" />
              <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-checkbox v-model="userInfo.status">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from './components/pagination.vue'
import SearchHead from './components/searchHead.vue'
import IndexTable from './components/indexTable.vue'
import { getUserInfoApi, addUserApi, upImage, getRoleApi, getRegionApi, updataUserApi } from '@/api'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { validPhone } from '@/utils/validate'
export default {
  name: 'UserIndex',
  components: { SearchHead, Pagination, IndexTable, SvgIcon },
  data() {
    const phoneValid = (rules, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      option: {
        searchBox: {
          show: true,
          text: '人员搜索',
          placeholder: '请输入',
          dataField: 'userName'
        },
        selectionBox: {
          show: false
        }
      },
      dialogVisible: false,
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      totalCount: 0,
      totalPage: 0,
      tabledata: [],
      searchInfo: {},
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      imageUrl: '',
      userInfo: {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        status: '',
        image: ''
      },
      id: '',
      region: {
        id: '',
        name: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入', trigger: 'blur' }],
        roleId: [{ required: true, message: '请输入', trigger: 'change' }],
        mobile: [{ required: true, message: '请输入' }, {
          validator: phoneValid,
          trigger: 'blur'
        }],
        regionId: [{ required: true, message: '请输入', trigger: 'change' }],
        image: [{ required: true, message: '请上传', trigger: 'change' }]
      },
      roleList: [],
      regionList: []
    }
  },
  created() {
    this.getUserInfo()
    this.getRole()
    this.getRegion()
  },
  methods: {
    pushObj() {
      this.userInfo.regionId = this.region.id
      this.userInfo.regionName = this.region.name
    },
    async getUserInfo(res, type) {
      if (type) {
        this.page.pageIndex = 1
      }
      this.searchInfo = res
      const { data } = await getUserInfoApi({ ...this.page, ...this.searchInfo })
      console.log(data)
      this.page.pageIndex = data.pageIndex
      this.page.pageSize = data.pageSize
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      this.tabledata = data.currentPageRecords
    },
    changePage(type) {
      if (type === 'prev') {
        this.page.pageIndex--
      } else {
        this.page.pageIndex++
      }
      this.getUserInfo(this.searchInfo)
    },
    async beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file)
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      const imgFile = new FormData()
      imgFile.append('fileName', file)
      const { data } = await upImage(imgFile)
      this.userInfo.image = data
      return isJPG && isLt2M
    },
    async fn() {
      try {
        await this.$refs.userDialogForm.validate()
        this.id ? await updataUserApi(this.id, this.userInfo) : await addUserApi(this.userInfo)
        this.$refs.userDialogForm.resetFields()
        this.userInfo.image = ''
        this.region = {
          id: '',
          name: ''
        }
        this.userInfo.regionName = ''
        this.userInfo.regionId = ''
        this.imageUrl = ''
        this.dialogVisible = false
        await this.getUserInfo()
        this.id = ''
      } catch (error) {
        console.log(error)
      }
    },
    async getRole() {
      const { data } = await getRoleApi()
      this.roleList = data
    },
    async getRegion() {
      const { data } = await getRegionApi()
      this.regionList = data.currentPageRecords
    },
    async handerclose() {
      this.dialogVisible = false
      this.$refs.userDialogForm.resetFields()
      this.userInfo.userName = ''
      this.userInfo.roleId = ''
      this.userInfo.image = ''
      this.userInfo.status = false
      this.region = {
        id: '',
        name: ''
      }
      this.userInfo.regionName = ''
      this.userInfo.regionId = ''
      this.userInfo.mobile = ''
      this.imageUrl = ''
      this.id = ''
    },
    sendData(data) {
      this.dialogVisible = true
      this.region = { id: data.regionId, name: data.regionName }
      this.imageUrl = data.image
      this.userInfo.userName = data.userName
      this.userInfo.roleId = data.role.roleId
      this.userInfo.mobile = data.mobile
      this.userInfo.regionId = data.regionId
      this.userInfo.regionName = data.regionName
      this.userInfo.status = data.status
      this.userInfo.image = data.image
      this.id = data.id
    }
  }
}
</script>

<style lang="scss" scoped>
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
    color:#666;
    .el-form-item__label{
     font-weight: normal;
    }
  }
  ::v-deep .el-input{
    width: 396px;
    input{
      height: 36px !important;
    }
  }
  ::v-deep .el-dialog{
    border-radius: 15px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep .el-upload--text{
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    color: #bac0cd;
  }
  ::v-deep .el-upload{
    background: #f3f6fb;
  }
  .el-upload__tip{
    font-size: 14px;
    color: #bac0cd;
    line-height: 1.15;
  }
  .avatar{
    width: 76px;
    height: 76px;
    margin: 4px;
}
</style>

