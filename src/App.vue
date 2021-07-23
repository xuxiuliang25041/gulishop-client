<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidden"></Footer>

  </div>
</template>

<script>

import Header from '@/conponents/Header'
import Footer from '@/conponents/Footer'

export default {
  name: 'App',
  
  components:{
    Header,
    Footer,
  },

  //组件加载完之后调用函数请求数据  此时数据还在vuex里面
    mounted(){
        this.getCategoryList();
    },
    
  methods: {
    getCategoryList(){
          this.$store.dispatch('getCategoryList')
      },

  }
}
</script>

<style lang='less' scoped>

</style>
