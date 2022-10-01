<template>
  <div class="monitoring">
    <div class="headbox">
      <ItemHead :title="'异常设备监控'" :is-show-time="false" />
      <SvgIcon icon-class="more" />
    </div>
    <Nodata />
  </div>
</template>

<script>
import ItemHead from './itemHead.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Nodata from './nodata.vue'
export default {
  components: { ItemHead, SvgIcon, Nodata }
}
</script>

<style lang="scss">
.headbox{
    display: flex;
    justify-content: space-between;
  }
.monitoring{
  display: flex;
  flex-direction: column;
}
</style>
