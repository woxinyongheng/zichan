<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        资产报废
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
                  <td class="table-content"><el-input disabled v-model="witchone.assetsCode" placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产名称</td>
                  <td class="table-content"><el-input disabled v-model="witchone.assetsName"  placeholder="请输入内容"></el-input></td>
                  <td class="table-title">资产类别</td>
                  <td class="table-content"><el-input disabled v-model="witchone.classifyName"  placeholder="请输入内容"></el-input></td>
                </tr>  
                <tr>
                  <td class="table-title must-title">报废日期</td>
                  <td class="table-content ">
<el-date-picker type="date" class="mustdate" :disabled="isDisabledInfo" v-model="scrapDate" value-format="yyyy-MM-dd" placeholder="开始时间"></el-date-picker>

                  </td>
                  <td class="table-title must-title ">报废原因</td>
                  <td class="table-content">
                    <el-select v-model="scrapReason" placeholder="请选择" :disabled="isDisabledInfo">
                      <el-option
                        v-for="item in scapeReasonList"
                        :key="item.dictLabel"
                        :label="item.dictLabel"
                        :value="item.dictLabel">
                      </el-option>
                    </el-select>
                    <!--<el-input :disabled="isDisabledInfo" class="mustreason" v-model="scrapReason" placeholder="请输入内容"></el-input>-->
                  </td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
                <tr>
                  <td class="table-title">说明</td>
                  <td class="table-content" colspan="5"><el-input :disabled="isDisabledInfo" v-model="disposeExplain" placeholder="请输入内容"></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    <div class="operator">
      <el-button plain size="mini" @click="closeMask">取消</el-button>
      <el-button v-if="!isDisabledInfo" type="primary" size="mini" @click="Masksure">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:['witchone','isDisabledInfo','scapeReasonList'],
  data () {
    return {
    scrapDate:'',
    scrapReason:'',
    disposeExplain:"",

    }
  },
  methods: {
    closeMask: function(){
      this.$emit('close')
    },
    Masksure(){
      var vm =this
      let url = '/scrapRecord/assetRetirement'
      if(!vm.scrapDate){
        vm.$message.error('请选择报废日期')
        document.querySelector('.mustdate>input').className = 'input__inner el-input__inner'
        return

      }
      if(!vm.scrapReason){//mustreason
        vm.$message.error('请选择报废原因')
        document.querySelector('.mustreason>input').className = 'input__inner el-input__inner'
        return

      }
        let data = {
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          roleCode:'corpAdmin,default',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
          assetsId:this.witchone.id,
          scrapDate:this.scrapDate,
          scrapReason:this.scrapReason,
          disposeExplain:this.disposeExplain
        }
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
