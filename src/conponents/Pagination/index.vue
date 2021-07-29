<template>
  <div class="pagination">
<<<<<<< HEAD
    <!--  子传父  自定义事件 -->
    <button :disabled="currentPageNo === 1" @click="$emit('changePageNo', currentPageNo - 1)">上一页</button>
    <button v-if="startEnd.start > 1"  @click="$emit('changePageNo',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <button 
      :class="{active: currentPageNo === page}"
      v-for="page in startEnd.end" :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo', page)"
    >{{page}}</button>
    
    
    <button v-if="startEnd.end < totalPageNo - 1">···</button>
    <button v-if="startEnd.end < totalPageNo"   @click="$emit('changePageNo', totalPageNo)">{{totalPageNo}}</button>
    <button :disabled="currentPageNo === totalPageNo"   @click="$emit('changePageNo', currentPageNo + 1)">下一页</button>
=======
    <!--  自定义事件。 让父组件修改页码值 并重新发送请求   -->
    <!--   点击上一页， 当前页面减一 
          点击1  传个1
    -->
    <button
      :disabled="currentPageNo === 1"
      @click="$emit('changePageNo', currentPageNo - 1)"
    >上一页</button>
    <!-- 起始位置大于一 显示1可以点 -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo', 1)">1</button>
    <!-- 起始位置大于2 显示...   -->
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor通常是用来遍历数组的，但是也可以遍历一个数字 
    vfor和vif可以同时使用（面试题）
    vfor优先级比vif要高-->
    <!-- 连续页码    遍历 连续从头到连续页的结束位置。。 然后if判断 page是从1到结束， 当page大于起始位置才显示， 我只要起始位置到结束位置-->
    <!-- 什么时候高亮选中显示， 当前页和遍历的这个页码一样，就是当前页在连续页这几个数之中 -->
    <button
      :class="{active: currentPageNo === page}"
      v-for="page in startEnd.end" 
      :key="page"
      v-if="page >= startEnd.start"
       @click="$emit('changePageNo', page)"
    >{{page}}</button>
    
    
    <button v-if="startEnd.end < totalPageNo -1 ">···</button>
    <!--  总页数  结束位置小于总页数的时候  可以点  -->
    <button v-if="startEnd.end < totalPageNo"  @click="$emit('changePageNo', totalPageNo)">{{totalPageNo}}</button>
    <button
      :disabled="currentPageNo === totalPageNo" 
       @click="$emit('changePageNo', currentPageNo + 1)"
    >下一页</button>
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
<<<<<<< HEAD
    //  :currentPageNo="searchParams.pageNo"
    //  :continueNo="5"
    //  :total="goodsListInfo.total"
    //  :pageSize="searchParams.pageSize"
    //声明接收
    props:{
      currentPageNo:Number,
      continueNo: Number,
=======
    // :currentPageNo="searchParams.pageNo"
    // :continueNo="5"
    // :total="goodsListInfo.total"
    // :pageSize="searchParams.pageSize"

    // 声明接收
    props:{
      //当前页
      currentPageNo:{
        type: Number,
        default:1
      },
      // 连续页数量
      continueNo: Number,
      // 总页数  要用第三种方式  给一个默认值。不给默认值，一开始有可能获取的是undefined  会出问题
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
      total:{
        type: Number,
        default: 0
      },
<<<<<<< HEAD
      pageSize: {
        type: Number,
        default: 1
      }
    },

    //computed 什么时候用， 我想要数据，但是没有，  watch 我有数据

    computed:{
      // 计算总页数
      totalPageNo(){
        // 总条数 / 每一页数量 
        return Math.ceil(this.total / this.pageSize)
      },

      //计算连续页  起始位置和结束位置
      startEnd(){
        //获取当前页， 总页数， 连续页
        let {currentPageNo, totalPageNo, continueNo} = this
        let start, end
        // 分几种情况  如果总页数小于连续页 修正
        if(totalPageNo <= continueNo){
          start = 1
          end = continueNo
        }else{
          //先设置正常在中间的情况  
          // 起始位置 是  当前页码 减去 连续页/2  向下取整
          start = currentPageNo - Math.floor(continueNo / 2)
          end = currentPageNo + Math.floor(continueNo / 2)

          //起始位置比1 小 修正
          if(start < 1){
            start = 1
            end = continueNo
          }

          //  结束位置比总页数大 修正
          if(end > totalPageNo){
            end = totalPageNo
            //总页数 减去连续页 + 1
            start = totalPageNo - continueNo + 1
          }
        }
        return {start , end}
      }

    },


=======
      // 每一页的数量
      pageSize: Number,
    },

    //计算属性， 我想要数据，但是我没有。， watch是我有那个数据 
    computed:{
      //计算总页码
      totalPageNo(){
        // 总页数等于总条数 除以 每一页能放的数量  会有小数， 向上取整
        return  Math.ceil(this.total / this.pageSize)
      },

      //计算连续页码的起始和结束
      startEnd(){
        //计算连续页面的起始位置和结束位置
        //先获取到当前页， 总页数， 和规定的连续页显示数量
        let {currentPageNo, totalPageNo, continueNo} = this
        let start, end;
        //有几种情况。  总页数比连续页显示 要少
        if(totalPageNo <= continueNo){
          start = 1
          end = totalPageNo
        }else{
          //通用算法。 不管前后， 先计算正常在中间的逻辑 start 和 end
          //  用  当前页减去   连续页 除以2 向下取整，  就是连续页起始的位置 
          start = currentPageNo - Math.floor(continueNo / 2)
          // 用  当前页加上   连续页 除以2 向下取整   结束位置
          end = currentPageNo + Math.floor(continueNo / 2)

          //当连续页在左边的时候
          //就是开始位置 小于1 的时候  修正
          if(start < 1){
            start = 1,
            end = continueNo
          }
          // 在右边
          //如果结束位置 大于总页数 修正  
          // 开始的位置就是  总页数 减去 连续页 + 1
          if(end > totalPageNo){
            end = totalPageNo
            start = totalPageNo - continueNo + 1
          }
        }
        // 把起始位置和结束位置 返回
          return {start, end}
      }
    },

>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
