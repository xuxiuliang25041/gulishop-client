<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <ReCommend></ReCommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor)  in floorList" :key="floor.id" :floor='floor'></Floor>
    
  </div>
</template>

<script>
// import TypeNav from '@/conponents/TypeNav'
import ListContainer from '@/pages/Home/ListContainer'
import ReCommend from '@/pages/Home/ReCommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'

import {mapState} from 'vuex'

export default {
  name: 'Home',

  mounted(){
    //调用 函数， 发请求  存在vuex
    this.getFloorList()
  },

  methods:{
    getFloorList(){
      this.$store.dispatch('getFloorList')
    }
  },

  computed:{
    ...mapState({
      floorList: state => state.home.floorList
    })
  },


  components:{
    ListContainer,
    ReCommend,
    Rank,
    Like,
    Floor,
  }
}
</script>

<style lang='less' scoped>

</style>
