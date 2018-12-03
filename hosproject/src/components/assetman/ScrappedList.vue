<template>
    <div class="scrapped-list">
      <div class="title-header">
        <p>报废记录</p>
      </div>
        <div class="banner">
          <div class="bannerleft">
            <el-button @click="open" type="warning" plain>还原</el-button>
            <el-button type="warning" plain>导出</el-button>
          </div>
          <div class="bannerright">
            <el-button @click="filter = !filter">检索</el-button>
          </div>
        </div>
      <div class="filter" v-show="filter">
        <div class="table-wrapper" style="font-size: 12px;vertical-align: middle">
          <el-row>
            <el-col :span="22"><div class="grid-content bg-purple-dark">
              <el-row>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="记录单号">
                      <el-input v-model="recordNumber"></el-input>
                    </el-form-item>
                  </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="报废原因">
                      <el-input v-model="scrapReason"></el-input>
                    </el-form-item>
                  </el-form>
                </div></el-col>

                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="规格型号">
                      <el-input v-model="model"></el-input>
                    </el-form-item>
                  </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="处理人">
                      <el-select v-model="disposePersonCode" placeholder="请选择">
                        <el-option
                          v-for="item in adminList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">{{item.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div></el-col>
              </el-row>
              <el-row>

                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="资产编号">
                      <el-input v-model="assetsCode"></el-input>
                    </el-form-item>
                  </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="资产名称">
                      <el-input v-model="assetsName"></el-input>
                    </el-form-item>
                  </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="资产类别">
                      <el-cascader
                        :options="typeList"
                        @change="handleItemChange"
                        v-model="typeselect"
                        :props="props"
                      ></el-cascader>
                    </el-form-item>
                  </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="资产品牌">
                      <el-select  v-model="brandName" placeholder="请选择">
                        <el-option
                          v-for="item in brandList"
                          :key="item.brandName"
                          :label="item.brandName"
                          :value="item.brandName">{{item.brandName}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div></el-col>
              </el-row>
              <el-row>
                <!--<el-col :span="6"><div class="grid-content bg-purple-dark">-->
                  <!--<el-form ref="form"  label-width="110px">-->
                    <!--<el-form-item label="规格型号">-->
                      <!--<el-input v-model="model"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-form>-->
                <!--</div></el-col>-->
                <el-col :span="12"><div class="grid-content bg-purple-dark">
                  <el-form ref="form"  label-width="110px">
                    <el-form-item label="报废时间">
                      <el-date-picker
                        v-model="dataarr"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                      </el-date-picker>
                    </el-form-item>
                  </el-form>
                </div></el-col>
              </el-row>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-dark">
              <div class="button-wrapper">
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark">
                    <el-button  type="primary" size="mini" @click="searchClick">查询</el-button>
                  </div></el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="24"><div class="grid-content bg-purple-dark">
                    <el-button size="mini"  @click="resetClick">重置</el-button>
                  </div></el-col>
                </el-row>
              </div>
            </div></el-col>
          </el-row>
        </div>

      </div>
        <div class="table center-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
              prop="recordNumber"
              label="记录单号"
              align="center"
              >
              <template slot-scope="scope">
                <el-button  @click="showOrderInfo(scope.row.recordNumber)" type="text">{{scope.row.recordNumber}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="scrapReason"
              align="center"
              label="报废原因"
              >
            </el-table-column>
            <el-table-column
              prop="scrapDate"
              label="报废时间"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="disposePersonName"
              label="处理人"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="picture"
              label="照片"
              align="center"
              >
              <template slot-scope="scope">
                <img :src="scope.row.picture" alt="" class="table-img">
              </template>
            </el-table-column>
            <el-table-column
              prop="assetsCode"
              align="center"
              label="资产编号"
              >
            </el-table-column>
            <el-table-column
              prop="assetsName"
              label="资产名称"
              align="center"
              >
              <template slot-scope="scope">
                <el-button @click="showGoodsInfo(scope.row,scope.row.assetsId)"  type="text">{{scope.row.assetsName}}</el-button>
                  <!--@click="showGoodsInfo(scope.row.recordNumber)" -->

              </template>
            </el-table-column>
            <el-table-column
              prop="classifyName"
              label="资产类别"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="资产品牌"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="model"
              label="规格型号"
              align="center"
              >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div>
            显示第1条到第{{pagevulue}}条记录，总共{{sum}}条记录，每页显示
            <el-select v-model="pagevulue" size="mini" @change="pageNumChange">
              <el-option
                v-for="item in pageoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            条记录
          </div>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="changePage"
              :page-size="pagevulue*1"
              :current-page="currentPage"
              :total="sum">
            </el-pagination>
          </div>
        </div>
        <mask-shadow v-if="showGoodsDetail" style="z-index:99">
            <goods-detail @quickhandle="quickhandle" :showedit="showedit" :uersdata='uersdata' :uersdatack="uersdatack" @close="closeGoodsDetail"></goods-detail>
        </mask-shadow>
        <mask-shadow v-if="showScrappedDetail">
            <scrapped-detail :uersdata='uersdata' @close="closeScrappedDetail"></scrapped-detail>
        </mask-shadow>
      <mask-shadow style="z-index:999" v-if="baofeiShow">
        <baofei :isDisabledInfo="isDisabledInfo" @close="closeBaofeiDetail" :witchone="witchone"></baofei>
      </mask-shadow>
    </div>
</template>

<script>
import GoodsDetail from '@/base/goods-detail'
import MaskShadow from '@/base/mask-shadow'
import ScrappedDetail from '@/base/scrapped-detail'
import baofei from '@/base/baofei'
export default {
    name: "ScrappedList",
    data:function () {
      return{
        typeselect:[],
        showedit:false,
        showGoodsDetail: false,
        showScrappedDetail: false,
        tableData: [],
        uersdata:'',
        multipleSelection:'',
        filter: false,
        sum:0,
        dataarr:[],
        recordNumber:'',
        disposePersonCode:'',
        scrapReason:'',
        assetsCode:'',
        model:'',
        brandName:'',
        assetsName:'',
        uersdatack:'',
        currentPage:1,
        pagevulue:10,
        pageoptions: [{
          value: '10',
          label: '10'
        }, {
          value: '25',
          label: '25'
        }, {
          value: '50',
          label: '50'
        }],
        baofeiShow:false,
        witchone:'',
        isDisabledInfo:'',
        quickData:'',
        typeList:[],
        typeListCommon:[],
        props:{
          label:'classifyName',
          value:'id',
          children:'children'
        },
        assetsTypeId:'',
        adminList:[],
        adminId:'',
        brandList:[]



      }
    },
    mounted(){
      var data={
        unitCode:'BJSCSYGJ',
        hospitalCode:'ZXYSHJ',
        userId:'4a00ebaa0219423daa55e07046f2edf9',
        userName:'张鹏',
        roleCode:'corpAdmin,default',
        pageSize:this.pagevulue,
        currentPage:1
      }
      var url='/scrapRecord/listData';
      this.ajax(url,data,1)
      this.requestType()
      this.requestAdminInfo()
    },
    methods:{
      //显示下拉框 请求资产设备品牌
      showbrandName(){
        if(!this.assetsTypeId){
          return
        }
        var vm =this
        vm.$http.post('/assetsBrand/listData',{
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
          pageSize:'10',
          currentPage:'1',
          classifyId:vm.assetsTypeId
        }).then(res=>{
          if(res.code==200){
            vm.brandList = res.data.list
          }
        })
      },
      //获取管理员信息
      requestAdminInfo(){
        var vm =this
        vm.$http.post('/userLoginController/getAdminUser',{
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
        }).then(res=>{
          if(res.code=='200'){
            vm.adminList = res.data
          }
        })
      },
      handleItemChange(val){
        this.assetsTypeId = val[val.length-1]
        this.showbrandName()
      },
      //资产类别
      requestType(){ //assrtsClassify/listData
        var vm =this
        vm.$http.post('/assrtsClassify/listData',{
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
        }).then(res=>{
          if(res.code=='200'){
            var arrData = res.data.list
            var arr=[]
            var arrChild =[]
            arrData.forEach(function (item) {
              if(item.parentId=='#'){
                arr.push(item)
              }else{
                arrChild.push(item)
              }
            })
            var _arr = vm.recursiveFun(arr,arrChild)
            vm.typeList = _arr
            vm.typeListCommon = res.data.list

          }
        })
      },
      recursiveFun(arr,arrData){
        var vm =this
        arr.forEach(function (item) {

          arrData.forEach(function (arritem) {
            if(arritem.parentId==item.id){
              if(!item.children){
                item.children=[]
              }
              item.children.push(arritem)
            }
          })
          if(item.children && item.children.length){
            vm.recursiveFun(item.children,arrData)
          }
        })
        return arr
      },
      closeBaofeiDetail(){
        this.baofeiShow=false
      },
      quickhandle(n,j){
        debugger
        this.isDisabledInfo = (j=='disable'?true:false)
        //a领用b变更领用c退还d报废
        this.baofeiShow = true
        this.witchone = this.quickData
      },
      changePage(num){
        this.currentPage = num
        var data={
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
          roleCode:'corpAdmin,default',
          pageSize:this.pagevulue,
          currentPage:num
        }
        var url='/scrapRecord/listData';
        this.ajax(url,data,1)
      },
      pageNumChange(){
        this.currentPage =1
        var data={
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
          roleCode:'corpAdmin,default',
          pageSize:this.pagevulue,
          currentPage:1
        }
        var url='/scrapRecord/listData';
        this.ajax(url,data,1)
      },
        searchClick(){
          var data={
            unitCode:'BJSCSYGJ',
            hospitalCode:'ZXYSHJ',
            userId:'4a00ebaa0219423daa55e07046f2edf9',
            userName:'张鹏',
            roleCode:'corpAdmin,default',
            pageSize:10,
            currentPage:1
          }
          var url='/scrapRecord/listData';
          this.ajax(url,data,1)
        },
        resetClick(){
        this.typeselect=[]
            this.dataarr=''
            this.recordNumber=''
            this.disposePersonCode=''
            this.scrapReason=''
            this.assetsCode=''
            this.model=''
          this.adminId=''
          this.assetsTypeId=''
          this.brandName=''
          this.assetsName=''
          var data={
            unitCode:'BJSCSYGJ',
            hospitalCode:'ZXYSHJ',
            userId:'4a00ebaa0219423daa55e07046f2edf9',
            userName:'张鹏',
            roleCode:'corpAdmin,default',
            pageSize:10,
            currentPage:1
          }
          var url='/scrapRecord/listData';
          this.ajax(url,data,1)
        },
        closeGoodsDetail: function(){
            this.showGoodsDetail = false
        },
        showOrderInfo: function(recordNumber){
            var data={
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              recordNumber:recordNumber
            }
            var url='/scrapRecord/view';
            this.$http.post(url,data).then(res=>{
              if(res.code==200){
                  this.uersdata = res.data.data
                  this.showScrappedDetail = true
              }
          })   
        },
        closeScrappedDetail: function(){
            this.showScrappedDetail = false
        },
        showGoodsInfo: function(row,id){
          this.uersdatack = id
          var data={
            unitCode:'BJSCSYGJ',
            hospitalCode:'ZXYSHJ',
            userId:'4a00ebaa0219423daa55e07046f2edf9',
            userName:'张鹏',
            id:id
          }
          var url='/assetsInfo/view';
          var vm =this
          vm.$http.post(url,data).then(res=>{
            if(res.code=='200'){
              vm.uersdata = res.data[0]
              vm.quickData = res.data[0]
              vm.showGoodsDetail = true
            }
          })
        },
        open:function(){
          this.$alert('确定要还原此资产吗？', '还原资产', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            var data={
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              recordNumbers:this.multipleSelection
            }
            var url='/scrapRecord/restore';
            this.ajax(url,data,2)
          });
        },
        ajax:function(url,data,type){
          var vm=this;
          if(type==1){
            data.beginReceiveDate=vm.dataarr[0]
            data.endReceiveDate=vm.dataarr[1]
            data.recordNumber=vm.recordNumber
            data.disposePersonCode=vm.disposePersonCode
            data.scrapReason=vm.scrapReason
            data.assetsCode=vm.assetsCode
            data.model=vm.model
            data.assetsTypeId = vm.assetsTypeId
            data.brandName=vm.brandName
            data.assetsName=vm.assetsName
          }
          vm.$http.post(url,data).then(res=>{
              if(res.code==200){
                if(type==1){
                  vm.tableData = res.data.list;
                  vm.sum = res.data.sum;
                }else if(type==2){
                  if(res.code==200){
                    vm.$message.success(res.message)
                    var data={
                      unitCode:'BJSCSYGJ',
                      hospitalCode:'ZXYSHJ',
                      userId:'4a00ebaa0219423daa55e07046f2edf9',
                      userName:'张鹏',
                      roleCode:'corpAdmin,default',
                      pageSize:10,
                      currentPage:1
                    }
                    var url='/scrapRecord/listData';
                    this.ajax(url,data,1)
                  }

                }
              }
          })
        },
        handleSelectionChange(val){
          var string="";
          //console.log(val)
          for(var i=0;i<val.length;i++){
            string+=val[i].recordNumber;
            if((i+1)<val.length){
              string+=',';
            }
          }
          this.multipleSelection=string;
        }
    },
    components: {
      GoodsDetail,
      MaskShadow,
      ScrappedDetail,baofei
    }
}
</script>

<style scoped lang="scss">
.scrapped-list{
  background-color: #fff;
  padding: 0  20px 20px 20px;
  .banner{
    text-align: left;
    height: 60px;
    position: relative;
    .bannerleft{
      width: 80%;
      float: left;
    }
    .bannerright{
      width: 20%;
      text-align: right;
      float: left;
    }
    .filter{
      position: absolute;
      width: 400px;
      background: #fff;
      right: 0;
      top: 60px;
      height: 600px;
      color: #000;
      z-index: 900;
      border: 1px solid #eee;
      box-sizing: border-box;
      border-radius: 4px;
      .operator{
        border-bottom: 1px solid #eee;
        padding: 10px 15px;
        overflow: hidden;
        .back{
          width: 10%;
          float: left;
          margin-top: 5px;
        }
        .button-wrapper{
          text-align: right;
          float: left;
          width: 90%;
        }
      }
      .form-detail{
        padding: 15px;
        .title{
          margin-bottom: 15px;
          font-size: 16px;
        }
        .form{
          .line-list{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .pagination{
    margin-top: 10px;
  }
  .table{
    .cell{
      .table-img{
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
