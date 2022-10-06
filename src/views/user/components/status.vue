<template>
  <div class="status box">
    <div class="header">
      <ItemHead title="工单状态" :is-show-time="false" class="title" />
      <div class="block">
        <el-date-picker
          v-model="value"
          size="small"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="date-picker"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="week-month-year">
        <div class="item" :class="{'is-checked':checked===1}" @click="checked=1">周</div>
        <div class="item" :class="{'is-checked':checked===2}" @click="checked=2">月</div>
        <div class="item" :class="{'is-checked':checked===3}" @click="checked=3">年</div>
      </div>
    </div>
    <Nodata />
  </div>
</template>

<script>
import ItemHead from '@/views/dashboard/components/itemHead.vue'
import { getCurrentWeekFormat, getCurrentMonth, getCurrentYearFormat } from '@/utils/get-this-month'
import Nodata from '@/views/dashboard/components/nodata.vue'
export default {
  components: { ItemHead, Nodata },
  data() {
    return {
      checked: 1,
      value: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler(newValue) {
        if (newValue === 1) {
          const week = getCurrentWeekFormat()
          this.value = [week.start, week.end]
        } else if (newValue === 2) {
          const month = getCurrentMonth()
          this.value = [month.start, month.end]
        } else {
          const year = getCurrentYearFormat()
          this.value = [year.start, year.end]
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .status{
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    .header{
      display: flex;
      align-items: center;
      .date-picker{
        width: 230px;
        margin-right: 21px;
      }
    }
  }
  .box{
    padding: 20px;
    border-radius: 20px;
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
</style>
