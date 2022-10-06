<template>
  <el-dialog
    title="工单配置"
    :visible="orderConfigVisible"
    width="630px"
    @close="$emit('update:order-config-visible',false)"
  >
    <template>
      <el-form ref="form" label-width="140px" :rules="rules" :model="form">
        <el-form-item v-loading="loading" label="补货警戒线：" prop="AlertValue">
          <el-input-number v-model="form.AlertValue" controls-position="right" :min="1" :max="100" />
        </el-form-item>
      </el-form>
    </template>
    <div class="el-dialog__footer">
      <el-button class="el-button--primary2" type="primary" size="small" @click="$emit('update:order-config-visible',false)">取消</el-button>
      <el-button class="el-button--primary1" type="primary" size="small" @click="setAlertValue">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAlertValueAPI, setAlertValueAPI } from '@/api'
export default {
  props: {
    orderConfigVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        AlertValue: [{ required: true, message: '不可为空', trigger: 'blur' }]
      },
      form: {
        AlertValue: ''
      }
    }
  },
  created() {
    this.getAlertValue()
  },
  methods: {
    // 获取补货预警值
    async getAlertValue() {
      try {
        this.loading = true
        const { data } = await getAlertValueAPI()
        this.form.AlertValue = data
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async setAlertValue() {
      try {
        await this.$refs.form.validate()
        this.loading = true
        await setAlertValueAPI(this.form.AlertValue)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('taskSearch')
        this.$emit('update:order-config-visible', false)
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
    border-radius: 10px;

  .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
  }

  .el-input-number{
    width: 390px;
  }
}

.el-button--primary1 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    margin-left: 34px!important;

  }
.el-button--primary1:hover {
    background: linear-gradient(135deg,#ff7d43,#db3602)!important;
}

.el-button--primary2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
}
.el-button--primary2:hover {
  background-color: #f3e7e1!important;
}
.el-dialog__footer {
  display: flex;
  justify-content: center;
}
</style>
