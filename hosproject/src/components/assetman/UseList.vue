<template>
    <div class="use-list">
      <div class="title-header">
      <p>领用记录</p>
    </div>
        <div class="banner">
          <div class="bannerleft">
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
                      <el-form-item label="所在区域">
                        <el-cascader
                          v-model="areaselect"
                          :options="areaList"
                          @change="handleAreaChange"
                          :props="propsArea"
                        ></el-cascader>
                        <!--<el-select v-model="areaCode" placeholder="请选择">-->
                          <!--<el-option-->
                            <!--v-for="item in areaList"-->
                            <!--:key="item.id"-->
                            <!--:label="item.gridName"-->
                            <!--:value="item.id">-->
                          <!--</el-option>-->
                        <!--</el-select>-->
                      </el-form-item>
                    </el-form>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                    <el-form ref="form"  label-width="110px">
                      <el-form-item label="存放位置">
                        <el-input v-model="storageLocation"></el-input>
                      </el-form-item>
                    </el-form>
                  </div></el-col>

                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                    <el-form ref="form"  label-width="110px">
                      <el-form-item label="处理人">
                        <el-input v-model="disposePersonCode"></el-input>
                      </el-form-item>
                    </el-form>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                    <el-form ref="form"  label-width="110px">
                      <el-form-item label="使用部门">
                        <el-cascader
                          v-model="officeselect"
                          :options="officeList"
                          @change="handleOfficeChange"
                          :props="propsOffice"
                        ></el-cascader>
                        <!--<el-select  v-model="receiveOfficeCode" placeholder="请选择">-->
                          <!--<el-option-->
                            <!--v-for="item in officeList"-->
                            <!--:key="item.id"-->
                            <!--:label="item.officeName"-->
                            <!--:value="item.id">{{item.officeName}}-->
                          <!--</el-option>-->
                        <!--</el-select>-->
                      </el-form-item>
                    </el-form>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                    <el-form ref="form"  label-width="110px">
                      <el-form-item label="领用人">
                        <el-select v-model="receivePersonName" placeholder="请选择">
                          <el-option
                            v-for="item in personList"
                            :key="item.staffId"
                            :label="item.name"
                            :value="item.staffId">{{item.name}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-dark">
                    <el-form ref="form"  label-width="110px">
                      <el-form-item label="使用/变更日期">
                        <el-date-picker
                          v-model="dataarr"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
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
                      <el-button size="mini" @click="resetClick">重置</el-button>
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
                style="width: 100%">
                <el-table-column
                type="selection"
                align="center"
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
                align="center"
                label="记录单号"
                >
                <template slot-scope="scope">
                    <el-button  @click="showUseInfo(scope.row.recordNumber,scope.row)" type="text">{{scope.row.recordNumber}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="receiveDate"
                align="center"
                label="领用/变更日期"
                >
                </el-table-column>
                <el-table-column
                prop="disposePersonName"
                align="center"
                label="处理人"
                >
                </el-table-column>
                <el-table-column
                prop="receiveOfficeName"
                align="center"
                label="领用部门"
                >
                </el-table-column>
                <el-table-column
                prop="receivePersonName"
                align="center"
                label="领用人"
                >
                </el-table-column>
                <el-table-column
                prop="areaName"
                align="center"
                label="所在区域"
                >
                </el-table-column>
                <el-table-column
                prop="storageLocation"
                align="center"
                label="存放位置"
                >
                </el-table-column>
                <el-table-column
                prop="disposeExplain"
                align="center"
                label="说明"
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
        
        <mask-shadow v-if="showUseDetail">
            <use-detail :uersdata='uersdata' @close="closeUseDetail"></use-detail>
        </mask-shadow>
    </div>
</template>

<script>
import MaskShadow from '@/base/mask-shadow'
import UseDetail from '@/base/use-detail'
export default {
    name: "UseList",
    data:function () {
      return{
        officeselect:[],
        areaselect:[],
        showUseDetail: false,
        tableData: [],
        sum:0,
        uersdata:'',
        filter: false,
        value: '',
        currentPage:1,
        options: [{
          value: '选项1',
          label: '办公设备'
        }, {
          value: '选项2',
          label: '冷冻设施'
        }, {
          value: '选项3',
          label: '办公设备'
        }, {
          value: '选项4',
          label: '冷冻设施'
        }, {
          value: '选项5',
          label: '办公设备'
        }],
        recordNumber:'',
        disposePersonCode:'',
        receiveOfficeCode:'',
        receivePersonName:'',
        storageLocation:'',
        areaCode:'',
        dataarr:[],
        areaList:[],
        officeList:[],
        personList:[],
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
        propsOffice:{
          label:'officeName',
          value:'id',
          children:'children'
        },
        propsArea:{
          label:'gridName',
          value:'id',
          children:'children'
        },

      }
    },
    mounted(){
      this.ajax()
      this.requestArea()
      this.requestOffice()
      this.requestPerson()
    },
    methods:{
      handleAreaChange(val){
        this.areaCode = val[val.length-1]
      },
      handleOfficeChange(val){
        this.receiveOfficeCode = val[val.length-1]
      },
      pageNumChange(){
        this.currentPage = 1
        this.ajax()
      },
      //区域
      requestArea(){
        var vm = this
        vm.$http.post(__PATH.BASEPATH+'hospitalController/getHospitalGridInfo',{
          unitCode:'ZXYSZGDW',
          hospitalCode:'zkzxysyy',
        }).then(res=>{
          if(res.code=='200'){
            var arrData = res.data
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
            // debugger
            vm.areaList = _arr
          }
        })
      },
      //部门
      requestOffice(){
        var vm = this
        vm.$http.post(__PATH.BASEPATH+'hospitalController/getHospitalOfficeInfo',{
          unitCode:'ZXYSZGDW',
          hospitalCode:'zkzxysyy',
        }).then(res=>{
          if(res.code=='200'){
            var arrData = res.data
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
            // debugger
            vm.officeList = _arr
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
      //使用人
      requestPerson(){
        var vm = this
        vm.$http.post(__PATH.BASEPATH+'staffController/getHospitalStaffList',{
          unitCode:'ZXYSZGDW',
          hospitalCode:'zkzxysyy',
        }).then(res=>{
          if(res.code=='200'){
            vm.personList = res.data
          }
        })
      },
      searchClick(){
        this.ajax()
      },
      resetClick(){
          this.recordNumber=''
          this.disposePersonCode=''
          this.receiveOfficeCode=''
          this.receivePersonName=''
          this.storageLocation=''
          this.areaCode=''
          this.dataarr=[]
        this.officeselect=[]
          this.areaselect=[]
        this.ajax()
      },
      changePage(num){
        this.currentPage = num
        this.ajax()
      },
        showUseInfo: function(recordNumber,row){
          var data={
            unitCode:'BJSCSYGJ',
            hospitalCode:'ZXYSHJ',
            userId:'4a00ebaa0219423daa55e07046f2edf9',
            userName:'张鹏',
            recordNumber:recordNumber
          }
          var url='/receiveRecord/view';
          this.uersdata = row
          this.$http.post(url,data).then(res=>{
            if(res.code==200 && res.data[0]){
                this.uersdata.assetList = res.data[0].assetList
            }
            this.showUseDetail = true

          }) 
        },
        closeUseDetail: function(){
            this.showUseDetail = false
        },
        ajax:function(){
          var vm=this;
          var params = {
            unitCode:'BJSCSYGJ',
            hospitalCode:'ZXYSHJ',
            userId:'4a00ebaa0219423daa55e07046f2edf9',
            userName:'张鹏',
            roleCode:'corpAdmin,default',
            pageSize:vm.pagevulue,
            currentPage:vm.currentPage,
            recordNumber:vm.recordNumber,
            disposePersonCode:vm.disposePersonCode,
            receiveOfficeCode:vm.receiveOfficeCode,
            receivePersonName:vm.receivePersonName,
            storageLocation:vm.storageLocation,
            areaCode:vm.areaCode,
            beginReceiveDate:vm.dataarr[0],
            endReceiveDate:vm.dataarr[1],
          }
          this.$http.post('/receiveRecord/listData',params).then(res=>{
              if(res.code==200){
                  vm.tableData = res.data.list;
                  vm.sum = res.data.sum;

              }
          })
        }
    },
    components: {
      MaskShadow,
      UseDetail
    }
}
</script>

<style scoped lang="scss">
.use-list{
  background-color: #fff;
  padding: 0  20px 20px 20px;
  .banner{
    text-align: left;
    height: 54px;
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
  }
  .filter{
    width: 100%;
    right: 0;
    /*height: 230px;*/
    color: #000;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 4px;
    padding-top: 20px;
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
    table{
      font-size:14px;
      margin-top:20px;
      .table-title{
        margin-left:20px;
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
