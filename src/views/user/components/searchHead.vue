<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item v-if="option.searchBox.show" :label="option.searchBox.text">
      <el-input v-model="formInline.user" :placeholder="option.searchBox.placeholder" />
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
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => (
        {
          searchBox: {
            show: true,
            text: '搜索',
            placeholder: '请输入',
            dataField: 'userName'
          },
          selectionBox: {
            show: true,
            text: '选择',
            placeholder: '请选择',
            option: ['选择一', '选择二'],
            value: ['value1', 'value2'],
            dataField: 'isRepair'
          }
        })
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
      console.log('submit!')
    }
  }
}
</script>
