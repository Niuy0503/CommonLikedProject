<template>
  <el-container class="home-user-task-stats bg1 box">
    <el-header height="18px">日销售统计 </el-header>
    <el-main>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">{{ orderCount }}</div>
          <div class="text color2">当日销售量（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">{{ orderAmount }}</div>
          <div class="text color2">当日销售额（元）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">{{ totalBill }}</div>
          <div class="text color2">当日分成（元）</div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import dayjs from 'dayjs'
import { getOrderCountAPI, getOrderAmountAPI, getTotalBillAPI } from '@/api'
export default {
  data() {
    return {
      time: {
        start: dayjs().format('YYYY-MM-DD 00:00:00'),
        end: dayjs().format('YYYY-MM-DD 23:59:59')
      },
      orderCount: 0,
      orderAmount: 0,
      totalBill: 0
    }
  },
  created() {
    this.getOrderCount()
    this.getOrderAmount()
    this.getTotalBill()
  },
  methods: {
    async getOrderCount() {
      const { data } = await getOrderCountAPI(this.time)
      this.orderCount = data
    },
    async getOrderAmount() {
      const { data } = await getOrderAmountAPI(this.time)
      this.orderAmount = data / 100
    },
    async getTotalBill() {
      const { data } = await getTotalBillAPI(this.time)
      this.totalBill = data / 100
    }
  }

}
</script>

<style scoped lang="scss">
  .el-header {
    padding: 0;
    font-size: 16px;
    color: #333;

    .sub-title {
      margin-left: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular,PingFang SC;
      font-weight: 400 !important;
      color: #999;
    }
}
.el-main{
  padding: 0;
  display: flex;
  .stats {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .item {

      .num {
        height: 50px;
        font-size: 36px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        line-height: 50px;
        // text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
      }
      .text {
        height: 17px;
        margin-top: 3px;
        font-size: 12px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #91a7dc;
        line-height: 17px;
      }
    }
  }
}
.color1 {
  color: #072074;
}
.color2 {
  color: #91a7dc;
}
.color3 {
  color: #ff5757;
}
.text-shadow1 {
  text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
}
.text-shadow2 {
  text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
}

  .box {
    padding: 20px;
  }
  // 工单统计
  .home-user-task-stats {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 160px;
    min-height: 166px;
    background: #e9f3ff;
    border-radius: 20px;
  }
  .bg1 {
    background: #e9f3ff;
    background-repeat: no-repeat,no-repeat;
    background-image: url(~@/assets/common/circle.png),url(~@/assets/common/task.png);
    background-position: 0 0,calc(100% - 12px) 100%;
  }

  .sku-sale-collect {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
  }
  .bg2 {
    background: #fbefe8 url(~@/assets/common/pinkpig.png) no-repeat calc(100% - 12px) 100%;
  }

</style>
