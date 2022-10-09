<template>
  <div class="product-type">
    <div class="search">
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
        <el-form-item label="策略搜索：">
          <el-input
            v-model="queryInfo.keywords"
            type="text"
            placeholder="请输入"
          >
            <i
              slot="suffix"
              :class="queryInfo.keywords?'el-icon-circle-close':''"
              @click="queryInfo.keywords = ''"
            />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getPolicyList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result">
      <el-row :gutter="10">
        <el-button
          class="addBtn"
          icon="el-icon-circle-plus-outline"
          @click="addPolicy"
        >新增</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="policyList"
        style="width: 100%"
        size="medium"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="policyName"
          label="策略名称"
          width="344"
        />
        <el-table-column
          prop="discount"
          label="策略方案"
          width="240"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="300"
        >
          <template slot-scope="{row}">
            {{ row.createTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          width="280"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="checkDetails(row)">查看详情
            </el-button>
            <el-button size="small" type="primary" @click="editPolicy(row)">修改</el-button>
            <el-button size="small" type="danger" @click="delPolicy(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total-count="totalCount" :page-index="page.pageIndex" :total-page="totalPage" @prevPage="pagechange" />
    </div>
    <add-policy ref="addPolicy" :dialog-visible.sync="dialogVisible" @refreshList="getPolicyList" />
    <policy-detail ref="currentPolicy" v-loading="loading" :page-date="pageDate" :dialog-show.sync="dialogShow" @checkDetails="changeDetails" />
  </div>
</template>

<script>
import { getPolicySearch, getAutomatSearch, delPolicy } from '@/api'
import addPolicy from './components/addPolicy.vue'
import policyDetail from './components/policyDetail.vue'
import pagination from './components/pagination.vue'
export default {
  components: { pagination, addPolicy, policyDetail },
  data() {
    return {
      activeName: 'first',
      queryInfo: {
        keywords: ''
      },
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      totalPage: 0,
      totalCount: 0,
      policyList: [],
      pageDate: {},
      dialogVisible: false,
      dialogShow: false,
      loading: false
    }
  },
  mounted() {
    this.getPolicyList()
  },
  methods: {
    // 获取策略搜索列表
    async getPolicyList() {
      try {
        this.loading = true
        const { data } = await getPolicySearch(this.page.pageIndex, this.page.pageSize, this.queryInfo.keywords)
        this.policyList = data.currentPageRecords
        this.page.pageIndex = data.pageIndex
        this.page.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 添加策略
    addPolicy() {
      this.dialogVisible = true
    },
    // 查看策略详情
    async checkDetails(row) {
      this.$refs.currentPolicy.formData = { ...row }
      const { data } = await getAutomatSearch(row.policyId, this.page)
      this.pageDate = data
      this.dialogShow = true
    },
    // 修改策略
    editPolicy(row) {
      this.$refs.addPolicy.formData = { ...row }
      this.dialogVisible = true
    },
    // 删除策略
    async delPolicy(row) {
      try {
        await this.$confirm('确认删除该策略吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除接口
        await delPolicy(row.policyId, { pageIndex: this.page.pageIndex, pageSize: this.page.pageSize, policyName: row.policyName })
        // 刷新表单
        this.getPolicyList()
      } catch (error) {
        console.log(error)
      }
    },
    // 分页展示
    pagechange(type) {
      console.log(type)
      if (type === 'next') {
        this.page.pageIndex++
        console.log(this.page.pageIndex)
      } else {
        this.page.pageIndex--
      }
      this.getPolicyList()
    },
    // 改变策略方案
    async changeDetails(date, formData) {
      this.page = {
        pageIndex: date.pageIndex,
        pageSize: date.pageSize
      }
      try {
        this.loading = true
        const { data } = await getAutomatSearch(formData.policyId, this.page)
        this.pageDate = data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style scoped lang="scss">
::v-deep .pagination {
    padding: 20px 16px 32px !important;
    background-color: #fff;
    }
.product-type{
  .search{
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    .el-form-item {
    margin-bottom: 0px;
    }
  }
  .result{
    padding: 20px 15px 19px 17px;
    background-color: #fff;
   .addBtn{
    background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
    width: 85px;
    height: 36px;
    color: #fff;
    }
  }
}
</style>
