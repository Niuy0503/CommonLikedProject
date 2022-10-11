<template>
  <el-dialog
    title="新增工单"
    :visible="addWorkOrderVisible"
    width="650px"
    style="{ border-radius: 10px }"
    append-to-body
    @close="$emit('update:addWorkOrderVisible',false)"
  >
    <el-form ref="roleDialogForm" v-loading="loading" label-width="140px" :model="formLabelAlign" :rules="rules">
      <el-form-item label="设备编号：" style="margin-right: 54px;" prop="innerCode">
        <el-input v-model="formLabelAlign.innerCode" placeholder="请输入" maxlength="15" show-word-limit @change="innerCodeChange" />
      </el-form-item>
      <el-form-item label="工单类型：" style="margin-right: 54px;" prop="productType">
        <el-select v-model="formLabelAlign.productType" placeholder="请选择" style="width:100%">
          <el-option label="补货工单" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量：" style="margin-right: 54px;">
        <span class="link" @click="pop"><i class="el-icon-tickets" style="margin-right:4px" />补货清单</span>
      </el-form-item>
      <el-form-item label="运营人员：" style="margin-right: 54px;" prop="assignorId">
        <el-select v-model="formLabelAlign.assignorId" placeholder="请选择" style="width:100%">
          <el-option v-for="item in personList" :key="item.userId" :label="item.userName" :value="item.userId" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" style="margin-right: 54px" prop="desc">
        <el-input v-model="formLabelAlign.desc" type="textarea" autocomplete="off" placeholder="请输入备注（不超过40字）" maxlength="40" rows="4" show-word-limit />
      </el-form-item>
    </el-form>

    <div class="el-dialog__footer">
      <el-button class="el-button--primary2" type="primary" size="small" @click="$emit('update:addWorkOrderVisible',false)">取消</el-button>
      <el-button class="el-button--primary1" type="primary" size="small" @click="onSubmit">确认</el-button>
    </div>

    <!-- 补货详情弹出层 -->
    <el-dialog
      title="补货详情"
      :visible="ReplenishmentDetailsVisible"
      width="630px"
      style="{ border-radius: 10px }"
      append-to-body
      class="ReplenishmentDetails"
      @close="ReplenishmentDetailsVisible = false"
    >
      <Table
        v-if="ReplenishmentDetailsVisible"
        :table-data="formLabelAlign.details"
        :table-column-list="tableColumnList"
        operation-area="补满数量"
        :is-show-index="false"
        :loading="loading"
        height="450"
        operation-area-width="200"
      >
        <template v-slot:OperationColumn="{row}">
          <el-input-number v-model="row.expectCapacity" controls-position="right" :min="1" :max="10" />
          <!-- @change="handleChange" -->
        </template>
      </Table>

      <div class="el-dialog__footer">
        <el-button class="el-button--primary2" type="primary" size="small" @click="$emit('update:addWorkOrderVisible',false)">取消</el-button>
        <el-button class="el-button--primary1" type="primary" size="small" @click="onConfirm">确认</el-button>
      </div>
    </el-dialog>
  </el-dialog>

</template>

<script>
import { getOperatorListAPI, getchannelListAPI, createTaskAPI } from '@/api'
import Table from './Table.vue'
export default {
  name: 'AddWorkOrder',
  components: { Table },
  props: {
    addWorkOrderVisible: {
      type: Boolean,
      default: false
    },
    innerCode: {
      type: [Number, String],
      default: ''
    },
    productType: {
      type: [Number, String],
      default: ''
    },
    assignorId: {
      type: [Number, String],
      default: ''
    },
    desc: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      formLabelAlign: {
        assignorId: this.assignorId,
        createType: 1,
        innerCode: this.innerCode,
        userId: this.$store.state.user.userInfo.userId,
        productType: this.productType,
        desc: this.desc,
        details: []
      },
      personList: [],
      ReplenishmentDetailsVisible: false,
      tableData: [],
      tableColumnList: [
        { label: '货道编号', prop: 'channelCode' },
        { label: '商品名称', prop: 'sku.brandName' },
        { label: '当前数量', prop: 'currentCapacity' },
        { label: '还可添加', prop: 'maxCapacity' }
      ],
      rules: {
        innerCode: [{ required: true, trigger: 'blur', message: '请输入' }],
        productType: [{ required: true, trigger: 'blur', message: '请输入' }],
        assignorId: [{ required: true, trigger: 'blur', message: '请输入' }],
        desc: [{ required: true, trigger: 'blur', message: '请输入' }]
      },
      loading: false
    }
  },
  created() {
    this.$nextTick(() => this.innerCodeChange())
  },
  methods: {
    // 根据售货机获取运营人员列表
    async innerCodeChange() {
      if (this.formLabelAlign.innerCode) {
        const { data } = await getOperatorListAPI(this.formLabelAlign.innerCode)
        this.personList = data
      }
    },
    // 获取售货机货道详情
    async getchannelList() {
      try {
        this.loading = true
        const { data } = await getchannelListAPI(this.formLabelAlign.innerCode)
        this.formLabelAlign.details = data.map(item => ({ expectCapacity: 10, ...item }))
        console.log(this.formLabelAlign.details)
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async pop() {
      this.$refs.roleDialogForm.validateField('innerCode', (val) => {
        if (!val) {
          this.ReplenishmentDetailsVisible = true
          this.getchannelList()
        }
      })
    },
    onConfirm() {
      this.formLabelAlign.details = this.formLabelAlign.details.filter(item => item.skuId !== '0')
      console.log(this.formLabelAlign.details)
      this.formLabelAlign.details = this.formLabelAlign.details.map(item => ({
        expectCapacity: item.expectCapacity,
        channelCode: item.channelCode,
        skuId: item.sku.skuId,
        skuImage: item.sku.skuImage,
        skuName: item.sku.skuName
      }))
      console.log(this.formLabelAlign.details)
      this.ReplenishmentDetailsVisible = false
    },
    async onSubmit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        await createTaskAPI(this.formLabelAlign)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$emit('taskSearch')
      } catch (error) {
        error.response ? this.$message.error(error.response.data) : console.log(error)
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
}
.link {
    color: #4368e1;
    &:hover {
      cursor: pointer;
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

.ReplenishmentDetails {
  ::v-deep .el-dialog__body {
    padding:0
  }
}
</style>
