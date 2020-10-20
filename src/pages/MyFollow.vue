<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from 'util'
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    // this.getFollowsList()
    this.follow()
  },
  methods: {
    // 获取关注的用户列表
    async getFollowsList() {
      let res = await this.$axios.get('/user_follows')
      console.log('关注的用户列表', res)
      this.list = res.data.data
    },
    // 取消关注用户
    async unfollow(id) {
      await this.$dialog.confirm({
        title: '提示',
        message: '您确定要取消关注吗',
      })
      let res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log('取消关注', res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 弹窗
        this.$toast.success(message)
        // 再次获取最新的列表
        this.getFollowsList()
      }
    },
    // 关注模拟用户
    async follow() {
      let res = await this.$axios.get('/user_follows/20')
      console.log('关注的', res)
      this.getFollowsList()
    },
  },
}
</script>

<style scoped lang="less">
.list {
  .item {
    height: 90px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      height: 50px;
      line-height: 25px;
      .nickname {
        font-size: 14px;
      }
      .date {
        color: #999;
      }
    }
    .right {
      padding: 10px 20px;
      background: #ddd;
      height: 25px;
      line-height: 25px;
      border-radius: 50px;
      color: #000;
    }
  }
}
</style>
