<template>
  <div>
    <!-- 头部 -->
    <hm-header>我的跟帖</hm-header>
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :immediate-check="false"
      finished-text="我有底线~~~~~"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">{{ item.created_date }}</div>
        <div class="parent" v-if="item.parent">
          <div class="parent-nickname">
            回复:{{ item.parent.user.nickname }}
          </div>
          <div class="parent-content line2">
            {{ item.parent.content }}
          </div>
        </div>
        <div class="content">{{ item.contene }}</div>
        <div class="post">
          <div class="title line1">{{ item.post.title }}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [], //所有评论内容
      pageIndex: 1,
      loading: false, //是否加载完成(上一次)
      finished: false, //是否全部加载完成 false
    }
  },
  created() {
    this.getMyComments()
  },
  methods: {
    // 获取我的评论/跟帖
    async getMyComments() {
      let res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex, //页码1
          pageSize: 5, //每页的条数
        },
      })
      //请求成功记得把loading:false
      if (res.data.statusCode === 200) {
        this.list = [...this.list, ...res.data.data]
        this.loading = false //代表这一页加载完成了
        console.log(this.list)
        if (res.data.data.length < 5) {
          this.finished = true // 全部加载完成
        }
      }
    },
    onLoad() {
      console.log('触底出发')
      // this.loading = false
      this.pageIndex++
      this.getMyComments()
    },
  },
}
</script>

<style scoped lang="less">
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .date {
    line-height: 20px;
    height: 20px;
    color: #999;
  }
  .parent {
    background: #ddd;
    padding: 10px;
    color: #999;
    .parent-nickname {
      height: 20px;
      line-height: 20px;
      &-content {
        font-size: 14px;
        line-height: 25px;
      }
    }
    .content {
      font-size: 14px;
      padding: 10px 0;
    }
  }
  .post {
    display: flex;
    color: #999;
    .title {
      flex: 1;
    }
    .iconfont {
      width: 30px;
      text-align: center;
    }
  }
}
</style>
