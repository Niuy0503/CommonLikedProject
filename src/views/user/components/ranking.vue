<template>
  <div class="status box">
    <div class="header">
      <ItemHead title="人效排名(月度)" :is-show-time="false" />
      <el-select v-model="value" placeholder="请选择" size="small" class="user-task-rank">
        <el-option
          v-for="item in regionListHandler"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="role-group">
      <div class="role-list">
        <div class="item" :class="{'is-checked':checked===1}" @click="checked=1">
          运营人员
        </div>
        <div class="item" :class="{'is-checked':checked===2}" @click="checked=2">
          运维人员
        </div>
      </div>
    </div>
    <Nodata />
  </div>
</template>

<script>
import ItemHead from '@/views/dashboard/components/itemHead.vue'
import Nodata from '@/views/dashboard/components/nodata.vue'
export default {
  components: { ItemHead, Nodata },
  props: {
    regionList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: 1,
      checked: 1
    }
  },
  computed: {
    regionListHandler() {
      return [{ name: '全部', id: 1 }, ...this.regionList]
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
      justify-content: space-between;
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
  .user-task-rank{
    width: 88px;
  }
  .role-group {
    width: 177px;
    margin: 15px auto 0;
    .role-list {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px;
    .is-checked {
    background: #fff;
    -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    border-radius: 7px;
    font-weight: 600;
    color: #333!important;
    }
    .item{
    width: 78px;
    height: 25px;
    font-size: 14px;
    color: #9ca3b4;
    cursor: pointer;
    line-height: 25px;
    text-align: center;
    }
  }
  }
</style>
