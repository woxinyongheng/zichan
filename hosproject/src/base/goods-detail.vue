<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        资产查看
      </div>
      <div class="icon-wrapper">
        <i class="el-icon-close" @click="closeMask"></i>
      </div>
    </div>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple" style="background-color:#fff;height: 484px;color: #333;font-size: 14px;border-right: 1px solid #eee">
        <p @click="activenum=0" :class="activenum==0?'active':''" style="line-height: 40px;height: 40px;cursor: pointer;">基本信息</p>
        <p @click="processingRecordsClick"  :class="activenum==1?'active':''" style="line-height: 40px;height: 40px;cursor: pointer;">处理记录</p>

      </div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">
        <div class="main">
          <div class="content">
            <div class="base-info">
              <div class="table-wrapper" v-if="activenum==0">
                <table>
                  <tbody>
                  <tr>
                    <td class="table-title">资产编码</td>
                    <td class="table-content">{{uersdata.assetsCode}}</td>
                    <td class="table-title">资产类别</td>
                    <td class="table-content">{{uersdata.classifyName}}</td>
                    <td class="table-title">资产名称</td>
                    <td class="table-content">{{uersdata.assetsName}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">请购批号</td>
                    <td class="table-content">{{uersdata.batchNumber}}</td>
                    <td class="table-title">资产品牌</td>
                    <td class="table-content">{{uersdata.brandName}}</td>
                    <td class="table-title">规格型号</td>
                    <td class="table-content">{{uersdata.model}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">SN号</td>
                    <td class="table-content">{{uersdata.snNumber}}</td>
                    <td class="table-title">计量单位</td>
                    <td class="table-content">{{uersdata.unit}}</td>
                    <td class="table-title">金额（元）</td>
                    <td class="table-content">{{uersdata.money}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">购入时间</td>
                    <td class="table-content">{{uersdata.buyDate}}</td>
                    <td class="table-title">所在区域</td>
                    <td class="table-content">{{uersdata.areaName}}</td>
                    <td class="table-title">存放位置</td>
                    <td class="table-content">{{uersdata.storageLocation}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">管理员</td>
                    <td class="table-content">{{uersdata.adminName}}</td>
                    <td class="table-title">使用部门</td>
                    <td class="table-content">{{uersdata.useDepartmentName}}</td>
                    <td class="table-title">使用人</td>
                    <td class="table-content">{{uersdata.usePersonName}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">使用期限（月）</td>
                    <td class="table-content">{{uersdata.serviceLife}}</td>
                    <td class="table-title">残值率（%）</td>
                    <td class="table-content">{{uersdata.residualRatio}}</td>
                    <td class="table-title">来源</td>
                    <td class="table-content">{{uersdata.source}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">折旧后金额</td>
                    <td class="table-content">{{uersdata.residualValue}}</td>
                    <td class="table-title"></td>
                    <td class="table-content"></td>
                    <td class="table-title"></td>
                    <td class="table-content"></td>
                  </tr>
                  <tr>
                    <td class="table-title">备注</td>
                    <td class="table-content" colspan="5">{{uersdata.remarks}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">照片</td>
                    <td class="table-content img-wrapper" colspan="5">
                      <img style="width: 80px;height: 80px;padding: 20px;" :src="uersdata.picture" alt="">
                    </td>
                  </tr>
                  <tr>
                    <td class="table-title">供应商</td>
                    <td class="table-content">{{uersdata.supplier}}</td>
                    <td class="table-title">联系人</td>
                    <td class="table-content">{{uersdata.contacts}}</td>
                    <td class="table-title">联系电话</td>
                    <td class="table-content">{{uersdata.phone}}</td>
                  </tr>
                  <tr>
                    <td class="table-title">维保到期</td>
                    <td class="table-content">{{uersdata.warranties}}</td>
                    <td class="table-title"></td>
                    <td class="table-content"></td>
                    <td class="table-title"></td>
                    <td class="table-content"></td>
                  </tr>
                  <!--<tr>-->
                    <!--<td class="table-title">创建人</td>-->
                    <!--<td class="table-content">H337A001</td>-->
                    <!--<td class="table-title">创建时间</td>-->
                    <!--<td class="table-content">办公用品</td>-->
                    <!--<td class="table-title"></td>-->
                    <!--<td class="table-content"></td>-->
                  <!--</tr>-->
                  </tbody>
                </table>
              </div>
              <div v-if="activenum=='1'" class="table-wrapper">
                <el-table
                  :data="tableData"
                  align="center"

                  style="width: 100%">
                  <el-table-column
                    prop="disposeDate"
                    label="处理时间"

                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="disposeModeName"
                    label="处理方式"
                    width="180">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.disposeModeName=='已领用'"  @click="quickClick('a','disable')" type="text">领用</el-button>
                      <el-button v-if="scope.row.disposeModeName=='变更领用人'" @click="quickClick('b','disable')"   type="text">变更领用人</el-button>
                      <span  v-if="scope.row.disposeModeName=='退还'"   type="text">退还</span>
                      <el-button v-if="scope.row.disposeModeName=='报废'" @click="quickClick('d','disable')"  type="text">报废</el-button>
                      <span v-if="scope.row.disposeModeName=='新增'"  type="text">新增</span>
                      <span v-if="scope.row.disposeModeName=='报废还原'"  type="text">还原</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="disposePerson"
                    label="处理人">
                  </el-table-column>
                </el-table>

              </div>
              <div  v-if="activenum=='1'"  style="text-align: right">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="changePage"
                  :total="sum">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>


      </div></el-col>
    </el-row>

    <div class="operator" style="text-align: left">
      <el-dropdown v-if="showedit" size="mini" split-button type="primary" @command="quickClick">
        快速处理
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="(!uersdata.useDepartmentName)" command="a">领用</el-dropdown-item>
          <el-dropdown-item v-if="(uersdata.useDepartmentName)" command="b">变更领用人</el-dropdown-item>
          <el-dropdown-item v-if="(!uersdata.useDepartmentName)" command="c">退还</el-dropdown-item>
          <el-dropdown-item command="d">报废</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-if="useEditShow" plain size="mini" @click="editClick" >编辑</el-button>

      <div class="right-button">
        <el-button plain size="mini" @click="closeMask">取消</el-button>
        <el-button type="primary" size="mini">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['uersdata','uersdatack','showedit','useEditShow'],
  data () {
    return {
      showBase: true,
      activenum:0,
      currentPage:1,
      tableData:[],
      sum:0,
      nav: [
        {
          name: '基本信息',
          active: true
        },
        {
          name: '处理记录',
          active: false
        }
      ]
    }
  },
  mounted(){

  },
  methods: {
    quickClick(n,j){
      var judge = (j=='disable'?'disable':'able')
      this.$emit('quickhandle',n,judge)
    },
    editClick(){
      this.$emit('close')
      this.$emit('editClickpose',this.uersdatack)
    },
    processingRecordsClick(){
      var vm =this
      vm.$http.post('/disposeRecord/listData',{
        currentPage:vm.currentPage,
        pageSize:10,
        assetsId:vm.uersdatack
      }).then(res=>{
        if(res.code==200){
          vm.activenum=1
          vm.tableData = res.data.list
          vm.sum = res.data.sum
        }
      })
    },
    changePage(num){
      this.currentPage = num
      this.processingRecordsClick()

    },
    closeMask: function(){
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
  .active{
    color:#409EFF;
  }
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
      width: calc(100% - 120px);
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
            width: 130px;
          }
          .table-content{
            background: #fff;
            text-align: left;
            padding-left: 10px;
            width: 220px;
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
<!--







-->
