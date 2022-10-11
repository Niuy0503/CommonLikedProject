<template>
  <el-card shadow="never" class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item v-if="option.searchBox.show" :label="option.searchBox.text">
        <el-input v-model.trim="formInline.user" :placeholder="option.searchBox.placeholder" />
      </el-form-item>
      <el-form-item v-if="option.selectionBox.show" :label="option.selectionBox.text">
        <el-select v-model="formInline.region" :placeholder="option.selectionBox.placeholder">
          <el-option v-for="(item,index) in option.selectionBox.option" :key="index" :label="item" :value="option.selectionBox.value[index]" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const data = {}
      this.option.searchBox.show ? data[this.option.searchBox.dataField] = this.formInline.user : ''
      this.option.selectionBox.show ? data[this.option.selectionBox.dataField] = this.formInline.region : ''
      this.$emit('search', data, 'search')
    }
  }
}
</script>
<style lang="scss">
.search{
  display: flex;
  width: 100%;
  height: 64px;
  background-color: #fff;
  padding-left: 17px;
  margin-bottom: 20px;
  align-items: center;
  .el-card__body{
    padding-left: 0;
    .el-form-item{
      margin-bottom: 0;
      .el-form-item__label{
        font-weight: 400;
      }
      .el-form-item__content .el-input{
        width: 203px;
      }
      .el-form-item__content .el-button{
        background-color: #5f84ff;
      }
    }
  }
}
</style>
