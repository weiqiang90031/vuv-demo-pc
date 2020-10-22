<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky>
      <van-tab :title="tab.name" v-for="tab in tabsList" :key="tab.id">
        洗洗
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1, //tab栏当前激活的索引值
      tabsList: [], //tab栏列表数据
    }
  },
  created() {
    this.getTabsList()
  },
  methods: {
    //获取栏目列表数据 tablist
    async getTabsList() {
      let res = await this.$axios.get('/category')
      console.log('tabsList', res.data.data)
      this.tabsList = res.data.data
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__nav {
  background: pink;
}
.header {
  height: 40px;
  background: red;
  display: flex;
  // line-height: 40px;
  text-align: center;
  color: aliceblue;
  align-items: center;
  .left,
  .right {
    width: 60px;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 30px;
  }
  .iconsearch {
    margin-right: 10px;
  }

  .center {
    flex: 1;
    background: rgba(255, 255, 255, 0.5);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
  }
}
</style>
