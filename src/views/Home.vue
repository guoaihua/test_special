<template>
  <div class="home">
    <el-button type='success'>
        <router-link :to="{name: 'paper'}">创建模版</router-link>
    </el-button>
    <el-button type='success'>
        <router-link :to="{name: 'list'}">查看文章</router-link>
    </el-button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {

  }
}
</script>

<style lang="scss" scoped>
    .home {

    }
</style>
