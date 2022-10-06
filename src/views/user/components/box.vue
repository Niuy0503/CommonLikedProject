<template>
  <div
    class="home-sku-sale-stats box"
    :style="{
      backgroundColor:bg,
      backgroundImage:'url('+src+')',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <ItemHead :title="title" :is-show-time="false" />
    <div class="body">
      <div v-for="(item,index) in boxData" :key="index" class="status">
        <div
          class="item"
        >
          <div
            class="num"
            :style="{
              color:color,
              'text-shadow':textshadow
            }"
          >{{ item.value }}</div>
          <div class="text" :style="{color:color1}">{{ item.prop }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemHead from '@/views/dashboard/components/itemHead.vue'
export default {
  components: { ItemHead },
  props: {
    title: {
      type: String,
      required: true
    },
    bg: {
      type: String,
      default: '#e9f3ff'
    },
    color: {
      type: String,
      default: '#000000'
    },
    textshadow: {
      type: String,
      default: 'unset'
    },
    color1: {
      type: String,
      default: '#000000'
    },
    boxData: {
      type: Array,
      default: () => ([])
    },
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .demo{
    width: 400px;
    height: 300px;
  }
  .home-sku-sale-stats{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
    background: #e9f3ff;
    border-radius: 20px;
    .body{
      flex: 1;
      display: flex;
      .status{
        display: flex;
        flex:1;
        align-items: center;
        justify-content: center;
        .item{
          display: flex;
          flex-direction: column;
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
            color: #91a7dc;
            line-height: 17px;
          }
        }
      }
    }
  }
  .box{
    padding: 20px;
  }
</style>
