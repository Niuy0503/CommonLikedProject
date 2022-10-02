<template>
  <div>
    <el-row class="result">
      <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="$emit('update:dialogVisible',true)">新建</el-button>
    </el-row>
    <div class="my_table">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          width="80"
          type="index"
          :index="indexAdd"
        />
        <el-table-column
          label="人员名称"
          prop="userName"
        />
        <el-table-column
          width="242"
          label="归属区域"
          prop="regionName"
        />
        <el-table-column
          label="角色"
          width="242"
          prop="role.roleName"
        />
        <el-table-column
          label="联系电话"
          width="242"
          prop="mobile"
        />
        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="{row}">
            <el-button size="small" type="text" @click="editRole(row)">修改</el-button>
            <el-button size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div></template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      required: true
    },
    detailLoading: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    indexAdd(index) {
      const page = this.page.pageIndex
      const pageSize = this.page.pageSize
      return index + 1 + (page - 1) * pageSize
    },
    editRole(row) {
      // row 直接赋值给 addRole 的formData
      console.log(row)
      this.$emit('sendData', row)
      // this.$refs.addRole.formData = { ...row }
      // this.dialogVisible = true
      // 数据是引用类型 带来的问题
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button--primary{
    width: 80px;
    height: 36px;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    font-size: 14px;
    border: unset;
  }
  ::v-deep .el-icon-circle-plus-outline{
    font-size: 16px !important;
    text-align: center;
    vertical-align: middle;
  }
  .result{
    padding: 20px 15px 19px 17px;
    background-color: #fff;
  }
  ::v-deep .el-table td{
  border: unset !important;
  height: 44px;
  padding: 2px 0px;
  text-align: left;
  color: rgb(102, 102, 102);
 }
 ::v-deep .el-table th{
  border: unset !important;
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
  font-weight: 500;
  text-align: left;
  color: rgb(102, 102, 102);
 }
 ::v-deep .el-table::before{
  height: 0;
 }
 .my_table{
  .el-button{
    color: #5f84ff;
    font-size: 14px;
  }
 }
</style>
