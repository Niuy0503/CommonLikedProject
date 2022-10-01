<template>
  <div class="empty">
    <img src="~@/assets/common/empty.png" alt="">
    <div class="tips">暂无数据</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty{
    display: flex;
    height: calc(100% - 48px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tips{
    margin-top: 25px;
    color: #20232a;
    font-size: 14px;
  }
}
</style>
