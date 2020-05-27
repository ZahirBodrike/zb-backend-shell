<template>
  <el-backtop>
    <div :style="backTopStyle">
      UP
    </div>
  </el-backtop>
</template>

<script>
export default {
  data() {
    return {
      backTopStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f2f5f6',
        boxShadow: '0 0 6px rgba(0,0,0, .12)',
        textAlign: 'center',
        lineHeight: '40px',
        color: '#1989fa'
      }
    }
  }
}
</script>
