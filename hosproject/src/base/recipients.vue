<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        领用页面
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-guanbi1" @click="addcloseMask"></i>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="base-info">
          <div class="table-wrapper">
            <el-table
            :data="lingyongList"
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
                  <img :src="scope.row.picture" alt="" class="table-img" width="50px" height="50px">
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
            <table class="marginTop">
              <tbody>
                <tr>
                  <td class="table-title must-title">领用部门</td>
                  <td class="table-content officereg">
                    <el-select v-model="add.office" placeholder="请选择部门" :disabled="isDisabledInfo">
                      <el-option
                        v-for="item in officeList"
                        :key="item.id"
                        :label="item.officeName"

                        :value="item.id">{{item.officeName}}
                      </el-option>
                    </el-select>
                  </td>
                  <td class="table-title">领用人</td>
                  <td class="table-content">
                    <el-select v-model="add.usePersonId" placeholder="请选择领用人" :disabled="isDisabledInfo">
                      <el-option
                        v-for="item in personList"
                        :key="item.staffId"
                        :label="item.name"
                        :value="item.staffId">{{item.name}}
                      </el-option>
                    </el-select>
                  </td>
                  <td class="table-title must-title">领用日期</td>
                  <td class="table-content">
                    <el-date-picker :disabled="isDisabledInfo" class="mustdate" v-model='add.receiveDate' value-format="yyyy-MM-dd" type="date" placeholder="领用日期" style="width: 100%;"></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td class="table-title must-title">所在区域</td>
                  <td class="table-content areareg">
                    <el-select v-model="add.area" placeholder="请选择区域" :disabled="isDisabledInfo">
                      <el-option
                        v-for="item in areaList"
                        :key="item.id"
                        :label="item.gridName"
                        :value="item.id">{{item.gridName}}
                      </el-option>
                    </el-select>
                  </td>
                  <td class="table-title">存放位置</td>
                  <td class="table-content"><el-input :disabled="isDisabledInfo" placeholder="请输入存放位置" v-model="add.storageLocation"></el-input></td>
                  <td class="table-title"></td>
                  <td class="table-content"></td>
                </tr>
                <tr>
                  <td class="table-title">说明</td>
                  <td class="table-content" colspan="5"><el-input :disabled="isDisabledInfo" v-model="add.disposeExplain" placeholder="请输入说明"></el-input></td>
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
        <el-button type="primary" size="mini" @click="recipentSure">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['lingyongList','officeList','personList','areaList','type','isDisabledInfo'],
  data () {
    return {
      showBase: true,
      add:{
        usePersonId:'',
        receiveDate:'',
        area:'',
        office:'',
        disposeExplain:'',
        storageLocation:'',
        type:'0'
      }
    }
  },
  mounted(){
      console.log(this.tableData)
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
    },
    recipentSure(){
      if(this.isDisabledInfo){
        this.$emit('close')
        return
      }
      var vm =this
      var obj ={}
      obj.storageLocation=this.add.storageLocation
      obj.receiveDate = this.add.receiveDate
      obj.disposeExplain=this.add.disposeExplain
      this.officeList.forEach(function (item, index) {
        if(item.id==vm.add.office){
          obj.receiveOfficeName = item.officeName
          obj.receiveOfficeCode = item.id
        }
      })
      this.personList.forEach(function (item, index) {
        if(item.staffId==vm.add.usePersonId){
          obj.receivePersonName = item.name
          obj.receivePersonCode = item.staffId
        }
      })
      this.areaList.forEach(function (item, index) {
        if(item.id==vm.add.area){
          obj.areaName = item.gridName
          obj.areaCode = item.id
        }
      })
      //验证
      if(!obj.receiveOfficeCode){
        this.$message.error('请选择部门')
        document.querySelector('.officereg').className = 'table-content officereg el-form-item is-error'
        return
      }
      if(!obj.receiveDate){
        vm.$message.error('请选择领用日期')
        document.querySelector('.mustdate>input').className = 'input__inner el-input__inner'
        return

      }
      if(!obj.areaCode){ //areareg
        vm.$message.error('请选择领用区域')
        document.querySelector('.areareg').className = 'table-content areareg el-form-item is-error'
        return
      }
      obj.type=this.type
      debugger
      this.$emit('recipentSure',obj)
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
      /*float: left;*/
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
          /*border-collapse:collapse;*/
          font-size: 14px;
          td{
            padding: 6px 0;
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
  .marginTop{
    margin-top:20px;
  }
}
</style>
