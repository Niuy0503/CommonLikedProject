<template>
  <div class="header">
    <div class="title">
      {{ title }}
      <span v-if="isShowTime">{{ time.start }} ~{{ time.end }}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getCurrentWeek, getCurrentMonthFormat } from '@/utils/get-this-month'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    checked: {
      type: Number,
      default: 2
    },
    isShowTime: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    time() {
      if (this.checked === 1) {
        return getCurrentWeek()
      } else if (this.checked === 2) {
        return getCurrentMonthFormat()
      } else {
        return { start: dayjs().format('YYYY-01-01'), end: dayjs().format('YYYY-MM-DD') }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
      .title{
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 16px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #333;
        span{
          margin-left: 10px;
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color: #999;
        }
      }
    }
</style>
