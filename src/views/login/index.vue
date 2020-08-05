<template>
  <div class="login-container">
    <div class="body animate__animated animate__tada">
      <h1>
        大象加油后台管理系统
      </h1>

      <el-button :style="{ marginTop: '20px' }" @click="handleLogin">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      /* 登录重定向 */
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      /* 改跳企业微信授权页面 */
      this.$router.push({ name: 'Dashboard' })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #333333;
  .banner-img {
    width: 100%;
    height: 100%;
  }
  .body {
    position: absolute;
    color: gray;
    top: 200px;
    font-size: 22px;
    letter-spacing: 3px;
    text-align: center;
    background: rgba(223, 222, 222, 0.9);
    width: 400px;
    padding: 20px;
    box-shadow: 0 0px 20px 0 rgba(177, 176, 176, 0.9);
    border-radius: 10px;
    &:hover {
      background: white;
    }
  }
}
</style>
