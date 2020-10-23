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
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- 向下的小三角 -->
    <van-sticky z-index="999">
      <div class="container" @click="$router.push('/tabsedit')">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>

    <!-- tab栏 -->
    <van-tabs v-model="active" sticky>
      <van-tab :title="tab.name" v-for="tab in tabsList" :key="tab.id">
        <!-- 分页 -->
        <!-- +下拉刷新 -->
        <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
          <van-list
            :immediate-check="false"
            v-model="loading"
            :finished="finished"
            @load="onload"
            finished-text="我是有底线的!!"
          >
            <hm-post
              @click.native="$router.push('/detail')"
              v-for="(post, index) in postList"
              :key="index"
              :post="post"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
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
      postList: [], //文章列表
      loading: false, //是否在加载状态(上一次)
      finished: false, //是否全部加载完成
      pageIndex: 1,
      pageSize: 5,
      isRefreshing: false, //是否正在下拉刷新中(上一次)
    }
  },
  //监听active获取每个栏目相对应的数据
  watch: {
    active(newActive) {
      console.log('切换了tab')
      //处理之前的数据
      this.postList = []
      this.pageIndex = 1
      //处理加载的问题
      this.finished = false
      this.loading = true
      //从新加载最新数据
      this.getPostList(this.tabsList[newActive].id)
    },
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

      //请求完 tabslist =>tab =>id
      this.getPostList(this.tabsList[this.active].id)
    },
    //获取文章列表
    async getPostList(id) {
      //清空
      // if (this.postList.length > 0 && this.pageIndex === 1) {
      //   this.postList = []
      // }

      let res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      this.postList = [...this.postList, ...res.data.data]
      this.loading = false
      this.isRefreshing = false
      if (res.data.data.length < this.pageSize) {
        this.finished = true
      }
      console.log('文章列表', this.postList)
    },
    //触底加载
    onload() {
      console.log('触底加载更多')

      this.pageIndex++

      this.getPostList(this.tabsList[this.active].id)
    },
    //下拉刷新
    onRefresh() {
      console.log('下拉刷新')

      //处理之前的数据
      this.postList = []
      //分页在设置回1
      this.pageIndex = 1

      //底部文字问题
      this.finished = false

      //从新加载
      this.getPostList(this.tabsList[this.active].id)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__nav {
  background: #ddd;
  margin-right: 40px;
}
//小三角
.container {
  width: 40px;
  height: 44px;
  background: #ddd;
  line-height: 44px;
  text-align: center;
  color: #000;
  position: absolute;
  right: 0;
  z-index: 999;
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
