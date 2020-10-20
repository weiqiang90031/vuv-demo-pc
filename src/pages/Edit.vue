<template>
  <div>
    <!-- 头部 -->
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader
        class="uploader"
        :before-read="beforeRead"
        :after-read="afterRead"
      />
    </div>
    <!-- 列表 -->
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="info.nickname"
        is-link
        @click="showNickname"
      />
      <van-cell title="密码" value="******" is-link />
      <van-cell
        @click="showGender"
        title="性别"
        :value="info.gender === 1 ? '男' : '女'"
        is-link
      />
    </van-cell-group>
    <!-- 修改昵称的弹窗 -->
    <van-dialog
      v-model="isShowNickname"
      @confirm="confirmNickname"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 修改性别的弹窗 -->
    <van-dialog
      v-model="isShowGender"
      @confirm="confirmGender"
      title="修改性别"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { fstat } from 'fs'
// import { runMain } from 'module'
export default {
  data() {
    return {
      info: {}, //用户信息对象
      isShowNickname: false,
      nickname: '', //最新修改的昵称
      isShowGender: false, //是否显示性别
      gender: 0,
    }
  },
  created() {
    // 获取个人信息
    this.getInfo()
  },
  methods: {
    async getInfo() {
      // 发送axios信息获取个人信息
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')

      let res = await this.$axios.get(`/user/${user_id}`)
      const { statusCode, data, message } = res.data
      if (statusCode === 200) {
        this.info = data
      } else {
        this.$toast.fail(message)
      }
      // this.info = res.data.data
      // console.log(this.info)
    },
    //点击cell显示修改昵称
    showNickname() {
      //显示
      this.isShowNickname = true
      console.log(123)
      //给nickname赋值
      this.nickname = this.info.nickname
    },
    confirmNickname() {
      // console.log(123)
      if (this.nickname === this.info.nickname) {
        this.$toast('新旧昵称不能一样')
        return
      }
      this.ml_editUser({
        nickname: this.nickname,
      })
      // 发送请求修改昵称
      // let user_id = localStorage.getItem('user_id')
      // let token = localStorage.getItem('token')
      // this.$axios.post(`/user_update/${user_id}`,{
      //   nickname : this.nickname
      // }).then(res=>{
      //   console.log('修改成功',res.data)
      //   // 获取最新的昵称
      //   this.getInfo()
      //   // 弹窗
      //   this.$toast.success('修改昵称成功')

      // })
    },
    showGender() {
      console.log(123)
      this.isShowGender = true

      // 显示弹窗
      this.gender = this.info.gender
    },
    // 点击弹窗内的确定按钮
    confirmGender() {
      if (this.gender === this.info.gender) {
        this.$toast('性别不能一样')
        return
      }
      this.ml_editUser({
        gender: this.gender,
      })
      // // 发送请求
      // let user_id = localStorage.getItem('user_id')
      // let token = localStorage.getItem('token')
      // this.$axios.post(`/user_update/${user_id}`,{
      //   gender:this.gender
      // }).then(res=>{
      //   console.log('修改性别成功',res.data)
      //   // 获取最新数据
      //   this.getInfo()
      //   // 弹窗
      //   this.$toast.success('修改成功')
      // })
    },
    // 封装后的函数，编辑资料
    async ml_editUser(data) {
      let user_id = localStorage.getItem('user_id')
      let res = await this.$axios.post(`/user_update/${user_id}`, data)

      // 获取最新的数据
      this.getInfo()
      // 弹窗
      this.$toast.success(res.data.message)
    },
    // 读取图片之前的回调
    beforeRead(data) {
      //限制图片的大小5k
      if (data.size / 1024 > 5) {
        this.$toast.fail('图片不能超过5kb')
        return false
      }

      if (data.type !== 'image/png') {
        this.$toast.fail('图片必须是png类型')
        return false
      }
      return true
    },
    // 读取图片后的回调
    async afterRead(data) {
      console.log(123)
      // 创建formdata
      let formdata = new FormData()
      formdata.append('file', data.file)
      // 上传
      let res = await this.$axios.post('/upload', formdata)
      console.log('文件上传', res)
      this.ml_editUser({
        head_img: res.data.data.url,
      })
    },
  },
}
</script>

<style scoped lang="less">
.avatar {
  text-align: center;
  margin: 20px o;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
