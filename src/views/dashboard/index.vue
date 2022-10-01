<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="13">
            <div class="orderStatistics bgc1 home-user-task-stats">
              <ItemHead :title="'工单统计'" />
              <div class="body">

                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow1">{{ orderStatistics.total }}</div>
                    <div class="text text1">
                      工单总数（个）
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow1">{{ orderStatistics.completedTotal }}</div>
                    <div class="text text1">
                      完成工单（个）
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow1">{{ orderStatistics.progressTotal }}</div>
                    <div class="text text1">
                      进行工单（个）
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow1">{{ orderStatistics.cancelTotal }}</div>
                    <div class="text text1">
                      取消工单（个
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="home-sku-sale-stats home-user-task-stats bgc2">
              <ItemHead :title="'销售统计'" />
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow2">{{ orderSum.Count }}</div>
                    <div class="text text2">
                      订单量（个）
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num text-shadow2">{{ orderSum.Amount }}</div>
                    <div class="text text2">
                      销售额（万）
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 销售数据 -->
          <el-col :span="24" style="margin-top:20px">
            <div ref="main" class="sku-sale-collect">
              <div style="display:flex;justify-content: space-between;">
                <ItemHead :title="'销售数据'" :checked="checked" />
                <div class="week-month-year">
                  <div class="item" :class="{'is-checked':checked===1}" @click="checked=1">周</div>
                  <div class="item" :class="{'is-checked':checked===2}" @click="checked=2">月</div>
                  <div class="item" :class="{'is-checked':checked===3}" @click="checked=3">年</div>
                </div>
              </div>
              <div class="echarts">
                <!-- 销售数据折线图 -->
                <seleecharts :checked="checked" />
                <!-- 销售数据折线图 -->
                <seleecharts-r :checked="checked" />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="hotgoods">
          <!-- 排行榜 -->
          <StopTop />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="14">
        <partnersecharts />
      </el-col>
      <el-col :span="10">
        <Vmequipment />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllTaskStatus, getOrderCount, getorderAmount } from '@/api'
import seleecharts from './components/seleecharts.vue'
import SeleechartsR from './components/seleechartsR.vue'
import StopTop from './components/StopTop.vue'
import ItemHead from './components/itemHead.vue'
import Partnersecharts from './components/partnersecharts.vue'
import Vmequipment from './components/vmequipment.vue'
export default {
  name: 'Dashboard',
  components: {
    seleecharts,
    SeleechartsR,
    StopTop,
    ItemHead,
    Partnersecharts,
    Vmequipment
  },
  data() {
    return {
      checked: 1,
      orderStatistics: {
        total: 0,
        completedTotal: 0,
        progressTotal: 0,
        cancelTotal: 0
      },
      orderSum: {
        Count: 0,
        Amount: 0
      }
    }
  },
  created() {
    this.$store.dispatch('dashboard/getCurrentMonth')
    this.getAllTaskStatus()
    this.getOrderCount()
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    async getAllTaskStatus() {
      const { data } = await getAllTaskStatus(this.$store.getters.month)
      data.forEach(element => {
        this.orderStatistics.total += element.total
        this.orderStatistics.completedTotal += element.completedTotal
        this.orderStatistics.progressTotal += element.progressTotal
        this.orderStatistics.cancelTotal += element.cancelTotal
      })
    },
    async getOrderCount() {
      try {
        const { data } = await getOrderCount(this.$store.getters.month)
        const { data: res } = await getorderAmount(this.$store.getters.month)
        this.orderSum.Count = data
        this.orderSum.Amount = (res / 1000000).toFixed(2)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg{
    background-color: pink;
  }
  .bgc1{
    background: #e9f3ff;
    background-image: url(../../assets/common/circle.png),url(../../assets/common/task.png);
    // background-image: url(data:image/png;base64,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),url(../img/task.66b715b7.png);
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
  }
  .bgc2{
    background: #fbefe8 url(../../assets/common/pinkpig.png) no-repeat calc(100% - 12px) 100%;
  }
  .text1{
    color: #91a7dc;
  }
  .text2{
    color:#de9690
  }
  .text-shadow1{
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
    color: #072074;
  }
  .text-shadow2{
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
    color: #ff5757
  }
  .week-month-year{
    display: flex;
    width: 129px;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .is-checked{
      background: #fff;
      -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      font-weight: 600;
      color: #333;
    }
    .item{
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
    .body{
      display: flex;
      justify-content: space-around;
      height: 100%;
      .item{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        .num{
          height: 50px;
          font-size: 36px;
          font-weight: 600;
          line-height: 50px;
        }
        .text{
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
        }
      }
    }
  .home-user-task-stats{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
    // background: #e9f3ff;
    border-radius: 20px;
  }
  .partnerPoints,.monitoring{
    width: 100%;
    height: 353px;
    padding: 20px;
    background-color: #fff;
  }
  .dashboard-container{
    background-color: #f8fafd !important;
  }
  .hotgoods{
    height: 538px;
  }
  .orderStatistics{
    padding: 20px;
    // width: 459px;
    height: 166px;
  }
  .home-sku-sale-stats{
    // width: 385px;
    padding: 20px;
    height: 166px;
  }
  .sku-sale-collect{
    height: 352px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    // width: 864px;
    background-color: #fff;
    height: calc(40vh - 68px);
    min-height: 352px;
    background: #fff;
    border-radius: 20px;
    .title{
      display: flex;
      align-items: center;
    }
    .echarts{
      display: flex;
      height: calc(40vh - 68px);
      min-height: 278px;
      &>div{
        flex: 1;
      }
    }
  }
</style>
