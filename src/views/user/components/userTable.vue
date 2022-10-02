<template>
  <div>
    <el-card shadow="never">
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
            width="157"
            label="角色"
            prop="roleName"
          />
          <el-table-column
            label="联系电话"
            width="157"
            prop="mobile"
          />
          <el-table-column
            label="完成工单（本月）"
            width="157"
            prop="workCount"
          />
          <el-table-column
            label="进行中工单"
            width="157"
            prop="progressTotal"
          />
          <el-table-column
            label="拒绝工单（本月）"
            prop="cancelCount"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="{row}">
              <el-button size="small" type="text" @click="check(row.userId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserApi, getUserWorkOrderApi } from '@/api'
import { getCurrentMonth, getCurrentWeekFormat } from '@/utils/get-this-month'
import dayjs from 'dayjs'
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
    }
  },
  methods: {
    async check(id) {
      try {
        this.$emit('update:showDetails', true)
        this.$emit('update:detailLoading', true)
        const { data } = await getUserApi(id)
        const { data: weekRes } = await getUserWorkOrderApi({ userId: id, ...getCurrentWeekFormat() })
        const { data: monthRes } = await getUserWorkOrderApi({ userId: id, ...getCurrentMonth() })
        const { data: yearRes } = await getUserWorkOrderApi({ userId: id, start: dayjs().format('YYYY-01-01 HH:mm:ss'), end: dayjs().format('YYYY-MM-DD HH:mm:ss') })
        this.$emit('userInfo', { data: data, res: [weekRes, monthRes, yearRes] })
      } catch (error) {
        console.log(error)
      } finally {
        this.$emit('update:detailLoading', false)
      }
    },
    indexAdd(index) {
      const page = this.page.pageIndex
      const pageSize = this.page.pageSize
      return index + 1 + (page - 1) * pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
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
 .el-card{
  border: unset;
 }
</style>
