<template>
  <div class="login-container">
    <el-image
      :fit="`cover`"
      :src="bannerImg"
      class="banner-img animate__animated animate__fadeIn"
    />

    <div class="body animate__animated animate__tada">
      <h1>
        聚米生活后台管理系统
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
      otherQuery: {},
      bannerImg: require('@/assets/login.jpg')
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
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
    background: white;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
