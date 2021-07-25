<template>
  <div class="pagination">
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
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    //  :currentPageNo="searchParams.pageNo"
    //  :continueNo="5"
    //  :total="goodsListInfo.total"
    //  :pageSize="searchParams.pageSize"
    //声明接收
    props:{
      currentPageNo:Number,
      continueNo: Number,
      total:{
        type: Number,
        default: 0
      },
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
