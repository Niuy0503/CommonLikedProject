<template>
  <div class="product-type">
    <div class="search">
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
        <el-form-item label="商品类型搜索：">
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
          <el-button type="primary" icon="el-icon-search" @click="getSkuClassList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result">
      <el-row :gutter="10">
        <el-button
          class="addBtn"
          icon="el-icon-circle-plus-outline"
          @click="addGoods"
        >新增</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="goodsList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="180"
        />
        <el-table-column
          prop="className"
          label="商品类型名称"
          width="180"
        />
        <el-table-column
          align="right"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="editGoods(row)">修改</el-button>
            <el-button size="small" type="danger" @click="delGoods(row.classId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total-count="totalCount" :page-index="page.pageIndex" :total-page="totalPage" @prevPage="pagechange" />
    </div>
    <addSkuClass ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getSkuClassList" />
  </div>
</template>

<script>
import { getSkuClassSearch, delSkuClass } from '@/api'
import addSkuClass from './components/addSkuClass.vue'
import pagination from './components/pagination.vue'
export default {
  components: { addSkuClass, pagination },
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
      goodsList: [],
      dialogVisible: false,
      loading: false
    }
  },
  mounted() {
    this.getSkuClassList()
  },
  methods: {
    // 获取商品类型列表
    async getSkuClassList() {
      try {
        this.loading = true
        console.log(this.queryInfo.keywords)
        const { data } = await getSkuClassSearch(this.page.pageIndex, this.page.pageSize, this.queryInfo.keywords)
        this.goodsList = data.currentPageRecords
        // 将商品类型存贮到vuex
        // const totalClassName = this.goodsList.map(ele => ele.className)
        // this.$store.commit('sku/SET_CLASS_NAME', totalClassName)
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
    addGoods() {
      this.dialogVisible = true
    },
    editGoods(row) {
      console.log(row)
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    async delGoods(id) {
      try {
        await this.$confirm('确认删除该商品类型吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 删除接口封装
        // 调用删除接口
        await delSkuClass(id)
        // 刷新列表
        this.getSkuClassList()
      } catch (error) {
        console.log(error)
      }
    },
    // 分页组件
    pagechange(type) {
      if (type === 'next') {
        this.page.pageIndex++
      } else {
        this.page.pageIndex--
      }
      this.getSkuClassList()
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
