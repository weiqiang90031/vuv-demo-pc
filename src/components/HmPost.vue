<template>
  <div>
    <!-- 单张图片 -->
    <div class="single-img-post">
      <div class="left">
        <div class="title line2">刚拼的名媛,好害怕一会跑了</div>
        <div class="bottom">
          <span>娱乐在线</span>
          <span>0 跟帖</span>
        </div>
      </div>
      <div class="right">
        <img src="../assets/7.png" alt="" />
      </div>
    </div>
    <!-- 三张图片 -->
    <!-- 视频 -->
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.single-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;

    .title {
      line-height: 20px;
      font-size: 14px;
    }
    span {
      color: #999;
    }
  }
  .right {
    img {
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}
</style>
