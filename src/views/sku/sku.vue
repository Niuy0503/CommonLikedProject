<template>
  <div class="product-type">
    <div class="search">
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
        <el-form-item label="商品搜索：">
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
          <el-button type="primary" icon="el-icon-search" @click="getSkuList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result">
      <el-row :gutter="10">
        <el-button
          class="addBtn"
          icon="el-icon-circle-plus-outline"
          @click="addSku"
        >新增</el-button>
        <el-button
          class="importBtn"
          @click="uploadSku"
        >导入数据</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="skuList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="180"
        />
        <el-table-column
          prop="skuImage"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-image style="width:50px;height:50px" :src="row.skuImage" />
          </template>
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
        />
        <el-table-column
          prop="unit"
          label="规格"
        />
        <el-table-column
          prop="price"
          label="商品价格"
        />
        <el-table-column
          prop="className"
          label="商品类型"
        >
          <template slot-scope="{row}">
            {{ row.skuClass.className }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="创建日期"
          width="180"
        >
          <template slot-scope="{row}">
            {{ row.updateTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="editSku(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <pagination :total-count="totalCount" :page-index="page.pageIndex" :total-page="totalPage" @prevPage="pagechange" />
    </div>
    <add-sku ref="addSku" :dialog-visible.sync="dialogVisible" @refreshList="getSkuList" />
    <upload-sku :dialogshow.sync="dialogshow" />
  </div>
</template>

<script>
import { getSkuSearch } from '@/api'
import addSku from './components/addSku.vue'
import uploadSku from './components/uploadSku.vue'
import pagination from './components/pagination.vue'
export default {
  components: { addSku, uploadSku, pagination },
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
      skuList: [],
      dialogVisible: false,
      dialogshow: false,
      loading: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取商品搜索列表
    async getSkuList() {
      try {
        this.loading = true
        const { data } = await getSkuSearch(this.page.pageIndex, this.page.pageSize, this.queryInfo.keywords)
        this.skuList = data.currentPageRecords
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
    // 新增商品
    addSku() {
      this.dialogVisible = true
    },
    // 上传文件
    uploadSku() {
      this.dialogshow = true
    },
    // 修改商品
    editSku(row) {
      console.log(row)
      this.$refs.addSku.formData = { ...row }
      this.dialogVisible = true
    },
    // 分页组件
    pagechange(type) {
      if (type === 'next') {
        this.page.pageIndex++
      } else {
        this.page.pageIndex--
      }
      this.getSkuList()
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
    .importBtn{
      width: 95px;
      height: 36px;
      text-align: center;
      background-color: #fbf4f0!important;
    }
  }
}
</style>
