<template>
  <!-- 分页组件
   -->
  <div v-if="pageIndex!==totalPage" class="pagination" style="display: flex; justify-content: space-between; padding: 10px 0;align-items: center;">
    <span>共 {{ totalCount }} 条记录 第 {{ pageIndex }} /
      {{ totalPage }} 页</span>
    <div>
      <el-button type="info" :disabled="isDisabled" size="small" @click="changePage('prev')">上一页</el-button>
      <el-button type="info" size="small" @click="changePage('next')">下一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: String,
      required: true
    },
    pageIndex: {
      type: String,
      required: true
    },
    totalPage: {
      type: String,
      required: true
    }
  },
  computed: {
    isDisabled() {
      if (this.pageIndex === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changePage(type) {
      this.$emit('prevPage', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  padding: 32px 16px !important;
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
