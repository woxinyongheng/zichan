<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        资产退还
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
                  <td class="table-title">资产编号</td>
                  <td class="table-content"><el-input disabled v-model="witchone.assetsCode"  placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产名称</td>
                  <td class="table-content"><el-input disabled v-model="witchone.assetsName" placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产类别</td>
                  <td class="table-content"><el-input disabled v-model="witchone.classifyName" placeholder="请输入内容"></el-input></td>
                </tr>  
                <tr>
                  <td class="table-title must-title">退还日期</td>
                  <td class="table-content">
                
                  <el-date-picker type="date" class="mustdate" v-model="handbackDate" value-format="yyyy-MM-dd" placeholder="开始时间"></el-date-picker>
                  </td>
                  <td class="table-title">所在区域</td>
                  <td class="table-content">
                    <el-select v-model="area" placeholder="请选择">
                      <el-option
                        v-for="item in areaList"
                        :key="item.id"
                        :label="item.gridName"
                        :value="item.id">{{item.gridName}}
                      </el-option>
                    </el-select>
                  </td>
                  <td class="table-title">存放位置</td>
                  <td class="table-content"> <el-input v-model="storageLocation" placeholder="请输入内容"></el-input> </td>
                </tr>
                <tr>
                  <td class="table-title">说明</td>
                  <td class="table-content" colspan="5"><el-input v-model="disposeExplain" placeholder="请输入内容"></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    <div class="operator">
      <el-button plain size="mini" @click="closeMask">取消</el-button>
      <el-button type="primary" size="mini" @click="Masksure">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:['witchone','areaList'],
  data () {
    return {
    handbackDate:'',
    areaName:'',
    areaCode:"",
    storageLocation:'',
    disposeExplain:'',
      area:''
    }
  },
  methods: {
    closeMask: function(){
      this.$emit('close')
    },
    Masksure(){
      var vm=this
      if(!vm.handbackDate){
        vm.$message.error('请选择退还日期')
        document.querySelector('.mustdate>input').className = 'input__inner el-input__inner'
        return
      }
        let url = '/handbackRecord/assetReturned'
        let data = {
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          roleCode:'corpAdmin,default',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
          assetIds:this.witchone.id,
          handbackDate:this.handbackDate,
          areaName:this.areaName,
          areaCode:'',
          storageLocation:this.storageLocation,
          disposeExplain:this.disposeExplain
        }
      this.areaList.forEach(function (item, index) {
        if(item.id==vm.area){
          data.areaName = item.gridName
          data.areaCode = item.id
        }
      })
        this.$http.post(url,data).then(res=>{
         if(res.code=='200'){
           vm.$message({
             message: res.message,
             type: 'success'
           });
           vm.$emit('close',true)
         }
        })
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
