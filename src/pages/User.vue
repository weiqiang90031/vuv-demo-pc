<template>
  <div>
    <!-- 头部 -->
    <hm-header>个人中心</hm-header>
    <!-- 信息 -->
    <div class="info">
      <div class="left">
        <!-- <img :src="$axios.defaults.baseURL+ info.head_img" alt=""> -->
        <img :src="$axios.defaults.baseURL + info.head_img" />
      </div>
      <div class="center">
        <div class="nickname">
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>{{ info.nickname }}
        </div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
    </div>
    <!-- 列表部分 -->
    <van-cell-group>
      <van-cell
        @click="$router.push('myfollow')"
        title="我的关注"
        is-link
        value="关注的用户"
      />
      <van-cell
        @click="$router.push('/mycomment')"
        title="我的跟帖"
        is-link
        value="跟帖/回复"
      />
      <van-cell
        @click="$router.push('/mystar')"
        title="我的收藏"
        is-link
        value="文档/视频"
      />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
import { log } from 'util'
export default {
  data() {
    return {
      info: {},
    }
  },

  created() {
    let token = localStorage.getItem('token')
    let user_id = localStorage.getItem('user_id')
    this.$axios.get(`/user/${user_id}`).then(res => {
      console.log('获取用户详情', res.data)
      const { statusCode, data, message } = res.data

      if (statusCode === 200) {
        // 保存
        this.info = data
      } else {
        this.$toast.fail(message)
      }
    })
  },
  methods: {
    //退出
    async logout() {
      try {
        // 弹窗
        let res = await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出账号吗？',
        })
        // on confirm
        console.log('确定')
        // 1删除token
        localStorage.removeItem('token')
        // 2提示退出功能
        this.$toast.success('退出成功')
        // 3跳转到login
        this.$router.push('/login')
      } catch (error) {
        console.log('取消')
      }

      // .then(() => {

      // })
      // .catch(() => {
      //   // on cancel
      //   console.log('取消')
      // })
    },
  },
}
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 2px solid #cccccc;
  display: flex;
  padding: 0 20px;

  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    height: 50px;
    line-height: 25px;
    .name {
      color: #000;
    }
  }
}
</style>
