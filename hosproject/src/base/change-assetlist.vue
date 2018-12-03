<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        编辑页面
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-guanbi1" @click="addcloseMask"></i>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="base-info">
          <div class="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td class="table-title">资产编号</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产类别</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产名称</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">请购批号</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产品牌</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">规格型号</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">SN号</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">计量单位</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">金额（元）</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">购入时间</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">所在区域</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">存放位置</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">管理员</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">使用部门</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">使用人</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">使用期限（月）</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">残值率（%）</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">来源</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">折旧后金额</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
                <tr>
                  <td class="table-title">备注</td>
                  <td class="table-content" colspan="5"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">照片</td>
                  <td class="table-content img-wrapper" colspan="5">
                    <img src="http://imgcdn.huangjinx.com/uploadFiles/goods/main/image/20180324/波浪1.jpg?imageMogr2/thumbnail/450x/interlace/0" alt="">
                  </td>
                </tr>
                <tr>
                  <td class="table-title">供应商</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">联系人</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title">联系电话</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">维保到期</td>
                  <td class="table-content"><el-input placeholder="请输入内容"></el-input></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="operator">
      <div class="right-button">
        <el-button plain size="mini" @click="addcloseMask">取消</el-button>
        <el-button type="primary" size="mini">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showBase: true
    }
  },
  methods: {
    addcloseMask: function(){
      this.$emit('close')
    },
    choiceNav: function(item, index){
      if(item.active) {
        return 
      }
      this.nav.forEach(function(item){
        item.active = false
      })
      item.active = true
      if(index === 0) {
        this.showBase = true
      }else {
        this.showBase = false
      }
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
    .nav{
      width: 120px;
      float: left;
      li{
        line-height: 40px;
        cursor: pointer;
        &.active{
          border-right: 3px solid #66a3ff;
          color: #66a3ff
        }
      }
    }
    .content{
      width: 100%;
      float: left;
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
      .record{
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
          .blue{
            color: #66a3ff;
          }
        }
      }
      
    }
  }
  .pagination{
    margin-top: 10px;
  }
  .operator{
    background: #fff;
    padding: 10px 15px;
    overflow: hidden;
    border-top: 1px solid #eee;
    .left-button{
      float: left;
    }
    .right-button{
      float: right;
    }
  }
}
</style>
