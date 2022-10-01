<template>
  <div>
    <div class="grid-content2 bg-purple-light">
      <ItemHead :title="'商品热榜'" />
      <!-- 商品热榜
      <span>{{ start }} ~{{ end }}</span> -->
      <el-row v-for="item,index in shopList" :key="index" class="ranking-box">
        <div class="text-style">
          <el-col :span="4"><div class="topbox" :class="{'bg1':index===0,'bg2':index===1,'bg3':index===2,'bgather':index>2}">{{ index +1 }}</div></el-col>
          <el-col :span="15">{{ item.skuName }}</el-col>
          <el-col :span="5" class="text-style1">{{ item.count }}单</el-col>
        </div>
      </el-row>
    </div>

  </div>
</template>

<script>
import { getSkuTopAPI } from '@/api/home'
import ItemHead from './itemHead.vue'

export default {
  name: 'StopTop',
  components: { ItemHead },
  data() {
    return {
      shopList: []
    }
  },
  created() {
    this.getSkuTop()
  },
  methods: {
    // 商品热榜排行
    async getSkuTop() {
      const { data } = await getSkuTopAPI(10, '2022-09-01', '2022-09-28')
      this.shopList = data
      // console.log(this.shopList)
    }
  }
}
</script>

<style scoped lang="scss">
  .topbox{
    width: 21px;
    height: 20px;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
  }
  .bg1{
    background-image: url(~@/assets/common/topone.png);
    background-repeat: no-repeat;
    color:#8e5900
  }
  .bg2{
    background-image: url(~@/assets/common/toptwo.png);
    background-repeat: no-repeat;
    color:#494949
  }
  .bg3{
    background-image: url(~@/assets/common/topthree.png);
    background-repeat: no-repeat;
    color:#cf6d3d
  }
  .bgather{
    background-image: url(~@/assets/common/topather.png);
    background-repeat: no-repeat;
    color:#e9b499;
    background-position: 2px 0;
  }
.grid-content2{
  padding-top: 20px;
  padding-left: 20px;
height: 538px;
background-color: #fff;
border-radius: 20px;
}
.ranking-box{
  margin-top: 25px;
  margin-bottom: 27px;
}
.text-style{
    line-height: 20px;
    height: 20px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-size: 14px;
    color: #333;
font-weight: 400;
  .text-style1{
    color: #737589;
  }
}
span {
   font-size: 12px;
 color: #999999;
 margin-left: 10px;
    }
</style>
