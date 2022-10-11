<template>
  <el-main>
    <div class="margin">
      <div class="table-header">
        <slot name="table-header" />
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :height="height"
      :header-cell-style="{ color: 'rgb(102, 102, 102)',backgroundColor:'rgb(243, 246, 251)','font-weight': '500',padding: '10px 0px 9px' }"
    >
      <!-- 序号列 -->
      <el-table-column
        v-if="isShowIndex"
        label="序号"
        type="index"
        width="80"
        :index="indexAdd"
      />
      <el-table-column
        v-for="(item,index) in tableColumnList "
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
      />
      <!-- 操作列 -->
      <el-table-column v-if="isShowOperation" :label="OperationArea" :width="OperationAreaWidth">
        <template slot-scope="scope">
          <slot name="OperationColumn" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件
   -->
    <div v-if="totalCount>10" class="pagination" style="display: flex; justify-content: space-between; padding: 10px 0;align-items: center;">
      <span>共 {{ totalCount }} 条记录 第 {{ pageIndex }} /
        {{ totalPage }} 页</span>
      <div>
        <el-button type="info" :disabled="pageIndex === '1'" size="small" @click="changePage('prev')">上一页</el-button>
        <el-button type="info" :disabled="pageIndex ===totalPage" size="small" @click="changePage('next')">下一页</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  props: {
    // 表格数据: 接口请求
    tableData: {
      type: Array,
      required: true
    },
    // 需要配置的表头中间列数据 :[ { label: '工单编号', prop: 'taskCode' } ]
    tableColumnList: {
      type: Array,
      required: true
    },
    // 是否显示序号列
    isShowIndex: {
      type: Boolean,
      default: true
    },
    // 修改操作列名
    OperationArea: {
      type: String,
      default: '操作'
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    OperationAreaWidth: {
      type: String,
      default: '100'
    },
    isShowOperation: {
      type: Boolean,
      default: true
    },
    columnIndex: {
      type: [String, Number],
      default: null
    },
    // ----------------------分页组件配置项------------------------
    totalCount: {
      type: [String, Number],
      default: 0
    },
    pageIndex: {
      type: [String, Number],
      default: 0
    },
    totalPage: {
      type: [String, Number],
      default: 0
    },
    pageSize: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    isDisabled() {
      if (this.pageIndex === '1') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changePage(type) {
      this.$emit('prevPage', type)
    },
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    }
  }
}
</script>

<style scoped lang="scss">
.el-main {
  background-color: #fff;
}
// 表头
.has-gutter {
  background-color: #f3f6fb;
}
.el-table thead {
  background-color: #f3f6fb;

}

.table-header  {
  display: flex;
  margin-bottom: 20px
}
// 分页器
.pagination{
  padding: 32px 16px !important;
  background-color: #fff;
  span{
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    font-size: 16px!important;
    color: #dbdfe5!important;
  }
  .el-button{
    background: #d5ddf8;
    color: #606266;
    border: unset;
  }
  .is-disabled{
    background: #edf0f9;
    color: #d8dde3;
  }
}
</style>
