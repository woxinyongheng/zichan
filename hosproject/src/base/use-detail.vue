<template>
  <div class="use-detail">
    <div class="title">
      <div class="title-content">
        查看页面
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-guanbi1" @click="closeMask"></i>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="base-info">
          <div class="table-wrapper">
            <table class="normal">
              <tbody>
                <tr>
                  <td class="table-title">记录单号</td>
                  <td class="table-content">{{uersdata.recordNumber}}</td>
                  <td class="table-title">领用/变更日期</td>
                  <td class="table-content">{{uersdata.receiveDate}}</td>
                  <td class="table-title">处理人</td>
                  <td class="table-content">{{uersdata.disposePersonName}}</td>
                </tr>
                <tr>
                  <td class="table-title">领用部门</td>
                  <td class="table-content">{{uersdata.receiveOfficeName}}</td>
                  <td class="table-title">领用人</td>
                  <td class="table-content">{{uersdata.receivePersonName}}</td>
                  <td class="table-title">所在区域</td>
                  <td class="table-content">{{uersdata.areaName}}</td>
                </tr>
                <tr>
                  <td class="table-title">存放位置</td>
                  <td class="table-content">{{uersdata.storageLocation}}</td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
                <tr>
                  <td class="table-title">处理说明</td>
                  <td class="table-content" colspan="5">{{uersdata.disposeExplain}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrapper">
            <el-table
            :data="uersdata.assetList"
            :border="true"
            style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="picture"
                label="照片"
                >
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" class="table-img">
                </template>
                </el-table-column>
                <el-table-column
                prop="assetsCode"
                label="资产编号"
                >
                </el-table-column>
                <el-table-column
                prop="assetsName"
                label="资产名称"
                >
                </el-table-column>
                <el-table-column
                prop="classifyName"
                label="资产类别"
                >
                </el-table-column>
                <el-table-column
                prop="brandName"
                label="品牌"
                >
                </el-table-column>
                <el-table-column
                prop="batchNumber"
                label="请购批号"
                >
                </el-table-column>
                <el-table-column
                prop="model"
                label="规格型号"
                >
                </el-table-column>
            </el-table>
            
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
      tableData: [
          {
            id: 1,
            img: 'http://imgcdn.huangjinx.com/test/uploadFiles/goods/main/image/20180510/F197230(20180510103656695).jpg?imageMogr2/thumbnail/450x/interlace/0',
            code: 'H137001',
            name: '旋转椅',
            type: '办公设备',
            brand: 'XXX',
            batchNumber: 'XXXXXXXXX',
            spec: 'XXXXXXX'
          }, 
          {
            id: 2,
            img: 'http://imgcdn.huangjinx.com/test/uploadFiles/goods/main/image/20180510/F197230(20180510103656695).jpg?imageMogr2/thumbnail/450x/interlace/0',
            code: 'H137001',
            name: '旋转椅',
            type: '办公设备',
            brand: 'XXX',
            batchNumber: 'XXXXXXXXX',
            spec: 'XXXXXXX'
          }, 
          {
            id: 3,
            img: 'http://imgcdn.huangjinx.com/test/uploadFiles/goods/main/image/20180510/F197230(20180510103656695).jpg?imageMogr2/thumbnail/450x/interlace/0',
            code: 'H137001',
            name: '旋转椅',
            type: '办公设备',
            brand: 'XXX',
            batchNumber: 'XXXXXXXXX',
            spec: 'XXXXXXX'
          }, 
          {
            id: 4,
            img: 'http://imgcdn.huangjinx.com/test/uploadFiles/goods/main/image/20180510/F197230(20180510103656695).jpg?imageMogr2/thumbnail/450x/interlace/0',
            code: 'H137001',
            name: '旋转椅',
            type: '办公设备',
            brand: 'XXX',
            batchNumber: 'XXXXXXXXX',
            spec: 'XXXXXXX'
          }
        ]
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
.use-detail{
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
          height: 200px;
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
        .normal{
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
        .table-img{
          width: 60px;
          height: 40px;
          margin-bottom: -10px;
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
    text-align: right;
  }
}
</style>
