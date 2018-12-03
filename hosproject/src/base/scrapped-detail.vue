<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        报废查看页面
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-guanbi1" @click="closeMask"></i>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="base-info">
          <div class="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td class="table-title">记录单号</td>
                  <td class="table-content">{{uersdata.recordNumber}}</td>
                  <td class="table-title">报废日期</td>
                  <td class="table-content">{{uersdata.scrapDate}}</td>
                  <td class="table-title">处理人</td>
                  <td class="table-content">{{uersdata.disposePersonName}}</td>
                </tr>
                <tr>
                  <td class="table-title">报废原因</td>
                  <td class="table-content">{{uersdata.scrapReason}}</td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
                <tr>
                  <td class="table-title">说明</td>
                  <td class="table-content" colspan="5">{{uersdata.disposeExplain}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    <div class="operator">
      <el-button type="primary" size="mini" @click="closeMask">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:['uersdata'],
  data () {
    return {

    }
  },
  mounted(){
    console.log(this.uersdata)
  },
  methods: {
    closeMask: function(){
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="scss">
.goods-detail{
  width: 950px;
  .title{
    background: #66a3ff;
    padding: 10px 15px;
    overflow: hidden;
    color: #fff;
    .title-content{
      width: 50%;
      float: left;
      text-align: left;
    }
    .icon-wrapper{
      float: right;
      width: 10%;
      text-align: right;
      padding-top: 5px;
      i{
        cursor: pointer;
      }
    }
  }
  .main{
    height: 484px;
    background: #fff;
    .content{
      width: 100%;
      .base-info{
        padding: 15px;
        .table-wrapper{
          width: 100%;
          height: 400px;
          overflow: auto;
          &::-webkit-scrollbar{
            width:10px;
            height:10px;
          }
          &::-webkit-scrollbar-button    {
            background-color:#eee;
            display: none;
          }
          &::-webkit-scrollbar-thumb    {
            background:#eee;
            border-radius:4px;
            height: 30px;
          }
          &::-webkit-scrollbar-corner    {
            background:#eee;
          }
          &::-webkit-scrollbar-resizer    {
            background:#eee;
          }
        }
        table{
          width: 100%;
          border-collapse:collapse;
          font-size: 14px;
          td{
            border: 1px solid #e4e4e4;
            padding: 6px 0;
          }
          .table-title{
            background: #f2f2f2;
          }
          .table-content{
            background: #fff;
            text-align: left;
            padding-left: 10px;
          }
        }
      }
    }
  }
  .operator{
    background: #fff;
    padding: 10px 15px;
    overflow: hidden;
    border-top: 1px solid #eee;
    text-align: right;
  }
}
</style>
