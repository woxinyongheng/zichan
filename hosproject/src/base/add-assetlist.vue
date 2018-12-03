<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        {{editadd=='edit'?'编辑页面':'新增页面'}}
      </div>
      <div class="icon-wrapper">
        <i class="el-icon-close" @click="addcloseMask"></i>
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
                  <td class="table-content"><el-input disabled v-model='add.assetsCode' placeholder="自动生成"></el-input></td>
                  <td class="table-title must-title">资产类别</td>
                  <td class="table-content typereg" style="position:relative">
                    <el-cascader
                      :options="typeList"
                      v-model="selectedTypearr"
                      @change="handleItemChange"
                      :props="props"
                    ></el-cascader>
                  </td>
                  <td class="table-title must-title">资产名称</td>
                  <td class="table-content"><el-input class="titlename" v-model='add.assetsName' placeholder="请输入资产名称"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">请购批号</td>
                  <td class="table-content"><el-input v-model='add.batchNumber' placeholder="请输入请购批号"></el-input></td>
                  <td class="table-title">资产品牌</td>
                  <td class="table-content">
                    <el-select  v-model="add.brandId" placeholder="请选择" @change="changeBrand">
                      <el-option
                        v-for="item in brandList"
                        :key="item.id"
                        :label="item.brandName"
                        :value="item.id">{{item.brandName}}
                      </el-option>
                    </el-select>
                  </td>
                  <td class="table-title">规格型号</td>
                  <td class="table-content"><el-input v-model='add.model' placeholder="请输入规格型号"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">SN号</td>
                  <td class="table-content"><el-input v-model='add.snNumber' placeholder="请输入SN号"></el-input></td>
                  <td class="table-title">计量单位</td>
                  <td class="table-content">

                  <el-input v-model='add.unit' placeholder="请输入计量单位"></el-input>

                  </td>
                  <td class="table-title">金额（元）</td>
                  <td class="table-content"><el-input type="number" v-model='add.money' placeholder="请输入金额"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title must-title">购入时间</td>
                  <td class="table-content">
                    <el-date-picker class="buytime" :picker-options="pickerOptions1" v-model='add.buyDate' value-format="yyyy-MM-dd" type="date" placeholder="领用/变更日期" style="width: 100%;"></el-date-picker>
                  </td>
                  <td class="table-title must-title">所在区域</td>
                  <td class="table-content areareg">
                    <el-cascader
                      v-model="selectAreaarr"
                      change-on-select
                      :options="areaList"
                      @change="handleAreaChange"
                      :props="propsArea"
                    ></el-cascader>
                  </td>
                  <td class="table-title">存放位置</td>
                  <td class="table-content"><el-input v-model='add.storageLocation' placeholder="请输入存放位置"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title must-title">管理员</td>
                  <td class="table-content managereg">
                    <el-select v-model="add.adminId" placeholder="请选择">
                        <el-option
                          v-for="item in adminList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">{{item.name}}
                        </el-option>
                    </el-select>
                  </td>
                  <td class="table-title">使用部门</td>
                  <td class="table-content">
                    <el-cascader
                      :options="officeList"
                      v-model="selectOfficearr"
                      @change="handleOfficeChange"
                      :props="propsOffice"
                    ></el-cascader>
                    <!--<el-select v-model="add.useDepartmentCode" placeholder="请选择">-->
                      <!--<el-option-->
                        <!--v-for="item in officeList"-->
                        <!--:key="item.id"-->
                        <!--:label="item.officeName"-->
                        <!--:value="item.id">{{item.officeName}}-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  </td>
                  <td class="table-title">使用人</td>
                  <td class="table-content">

                  <el-select v-model="add.usePersonId" placeholder="请选择">
                      <el-option
                        v-for="item in personList"
                        :key="item.staffId"
                        :label="item.name"
                        :value="item.staffId">{{item.name}}
                      </el-option>
                  </el-select>

                  </td>
                </tr>
                <tr>
                  <td class="table-title">使用期限（月）</td>
                  <td class="table-content"><el-input type="number" v-model='serviceLife' placeholder="请输入使用期限"></el-input></td>
                  <td class="table-title">残值率（%）</td>
                  <td class="table-content"><el-input type="number" v-model='canresidualRatio' placeholder="请输入残值率"></el-input></td>
                  <td class="table-title must-title">来源</td>
                  <td class="table-content sourcereg">
                  <el-select v-model="add.source" placeholder="请选择">
                      <el-option
                        v-for="item in optionsclass4"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                  </el-select>
                  </td>
                </tr>
                <tr>
                  <td class="table-title">备注</td>
                  <td class="table-content" colspan="5"><el-input v-model='remarks' placeholder="请输入备注内容"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">照片</td>
                  <div
                    class="avatar-uploader"
                    @click="uploadImg">
                    <img v-if="imgurl" :src="imgurl" class="avatar">
                    <input @change="upImage" type="file" name="file" style="display:none;" />
                    <i v-if="!imgurl" class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                </tr>
                <tr>
                  <td colspan="6">
                    <p class="fenge">维保信息</p>
                  </td>

                </tr>
                <tr>
                  <td class="table-title">供应商</td>
                  <td class="table-content"><el-input v-model='add.supplier' placeholder="请输入供应商"></el-input></td>
                  <td class="table-title">联系人</td>
                  <td class="table-content">

                  <el-input v-model='add.contacts' placeholder="请输入联系人"></el-input>
                  
                  </td>
                  <td class="table-title">联系电话</td>
                  <td class="table-content"><el-input v-model='add.phone' placeholder="请输入联系电话"></el-input></td>
                </tr>
                <tr>
                  <td class="table-title">维保到期</td>
                  <td class="table-content">
                      <el-date-picker v-model='add.warranties' value-format="yyyy-MM-dd" type="date" placeholder="维保到期" style="width: 100%;"></el-date-picker>
                    </td>
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
        <el-button type="primary" size="mini" @click="addsure">确认</el-button>
      </div>
    </div>
    <el-dialog
      title="选择使用人"
      :visible.sync="dialogVisible"
      width="100%">
      <el-table
        ref="multipleTable"
        :data="personList"
        :modal-append-to-body="true"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"

          width="120">
        </el-table-column>
        <el-table-column
          prop="office"
          align="center"

          label="单位"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:['adminList','typeList','personList','officeList','areaList','editadd','edititem','sum','typeListCommon','officeListCommon','areaListCommon'],
  data () {
    return {
      brandList:[],
      showBase: true,
      assetsCode:'',
      canresidualRatio:'',
      dialogVisible:false,
      add:{
        assetsCode:'',
          assetsTypeId:'',
          assetsName:'',
          batchNumber:'',
          brandId:'',
          brandName:'',
          model:'',
          snNumber:'',
          unit:'',
          money:'',
          buyDate:'',
          areaCode:'',
          areaName:'',
          storageLocation:'',
          adminId:'',
          adminName:'',
          useDepartmentCode:'',
          useDepartmentName:'',
          usePersonId:'',
          usePersonName:'',
          serviceLife:'',
          residualRatio:'',
          source:'',
          remarks:'',
          photo:'',
          supplier:'',
          contacts:'',
          phone:'',
          warranties:'',
          id:''
      },
      imgurl:'',
      optionsclass1: [],
      optionsclass2:[],
      optionsclass3:[],
      optionsclass4:[
        {
          name:'购入',
          id:'购入'
        },
        {
          name:'租赁',
          id:'租赁'
        },
        {
          name:'自建',
          id:'自建'
        },

      ],
      canzhinum:'',
      serviceLife:'',
      remarks:'',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },

      },
      //  联级
      props:{
        label:'classifyName',
        value:'id',
        children:'children'
      },
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
      //编辑赋值使用
      selectedTypearr:[],
      selectAreaarr:[],
      selectOfficearr:[]
    }
  },
  mounted(){
    var vm =this
    this.getclassfity()
    this.getclassfity3()
    //编辑赋值
    if(this.editadd=='edit'){
      vm.$http.post('/assetsInfo/view',{
        unitCode:'BJSCSYGJ',
        hospitalCode:'ZXYSHJ',
        userId:'4a00ebaa0219423daa55e07046f2edf9',
        userName:'张鹏',
        id:vm.edititem.id
      }).then(res=>{
        for(var item in vm.add){
          vm.add[item] = res.data[0][item]
        }
        vm.serviceLife = res.data[0].serviceLife
        vm.remarks = res.data[0].remarks
        vm.canresidualRatio = res.data[0].residualRatio
        vm.imgurl = res.data[0].picture
      //  下拉框赋值
        var _adminindex = vm.adminList.findIndex(function (item) {
          return item.name == res.data[0].adminName
        })
        if(_adminindex>-1){
          vm.add.adminId = vm.adminList[_adminindex].id
          vm.add.adminName = vm.adminList[_adminindex].name

        }
        var useidexx = vm.personList.findIndex(function (item) {
          return item.name == res.data[0].usePersonName
        })
        if(useidexx>-1){
          vm.add.usePersonId = vm.personList[useidexx].staffId
          vm.add.usePersonName = vm.personList[useidexx].name
        }
        // var brandidexx = vm.brandList.findIndex(function (item) {
        //   return item.brandName == res.data[0].brandName
        // })
        // if(brandidexx>-1){
        //   vm.add.brandId = vm.brandList[brandidexx].id
        //   vm.add.brandName = vm.brandList[brandidexx].brandName
        // }
      //  联级下啦赋值
        var _typeindex = vm.typeListCommon.findIndex(function (item) {
          return item.classifyName == res.data[0].classifyName
        })
        vm.add.assetsTypeId = vm.typeListCommon[_typeindex].id
        vm.add.assetsName = res.data[0].classifyName
        vm.selectedTypearr = vm.calcCasArr([vm.typeListCommon[_typeindex].id],vm.typeListCommon,'id')



        var _areaindex = vm.areaListCommon.findIndex(function (item) {
          return item.gridName == res.data[0].areaName
        })
        vm.add.areaCode = vm.areaListCommon[_areaindex].id
          vm.add.areaName = res.data[0].areaName
        vm.selectAreaarr = vm.calcCasArr([vm.areaListCommon[_areaindex].id],vm.areaListCommon,'id')



        var _officeindex = vm.officeListCommon.findIndex(function (item) {
          return item.officeName == res.data[0].useDepartmentName
        })
        if(_officeindex>-1){
          vm.add.useDepartmentCode = vm.officeListCommon[_officeindex].id
            vm.add.useDepartmentName = res.data[0].useDepartmentName
          vm.selectOfficearr = vm.calcCasArr([vm.officeListCommon[_officeindex].id],vm.officeListCommon,'id')

        }
        vm.showbrandName(res.data[0].brandName)

      })

    }else{
      vm.serviceLife = ''
      vm.canresidualRatio = ''
    }

  },

  methods: {
    calcCasArr(a,arr,id){
      var vm =this
      var _i = arr.findIndex(function (item) {
        if(item[id]==a[a.length-1]){
          a.push(item['parentId'])
          if(item.parentId!='#'){
            vm.calcCasArr(a,arr,id)
          }
        }
      })
      return a.reverse()

    },
    handleAreaChange(val){
      var vm =this
      this.add.areaCode = val[val.length-1]
      var _index = this.areaListCommon.findIndex(function (item) {
        return item.id == vm.add.areaCode
      })
      this.add.areaName =this.areaListCommon[_index].gridName
    },
    handleOfficeChange(val){
      this.add.useDepartmentCode = val[val.length-1]
    },
    handleItemChange(val){
      debugger
      this.add.assetsTypeId = val[val.length-1]
      this.showbrandName()
      if(this.editadd=='edit'){
        return
      }
      var _id = val[val.length-1]
      var _index = this.typeListCommon.findIndex(function (item) {
        return item.id == _id
      })
      this.serviceLife =this.typeListCommon[_index].serviceLife
      this.canresidualRatio = this.typeListCommon[_index].residualRatio
    },
    changeBrand(val){
      var _index = this.brandList.findIndex(function (item) {
        return item.id == val
      })
      this.brandId = val
       this.brandName=this.brandList[_index].brandName
      this.serviceLife =this.brandList[_index].serviceLife
      this.canresidualRatio = this.brandList[_index].residualRatio
    },
    uploadImg(){
      document.querySelector('[type="file"]').click();
    },
    upImage(e){
      var vm =this
      var _file = e.target.files[0];
      var form = new FormData(); // FormData 对象
      form.append("file", _file); // 文件对象
      // vm.add.photo = form
      vm.add.photo = e.target.files[0]
      var _reader = new FileReader();
      _reader.readAsDataURL(_file);
      _reader.onload = function(result){
        var  data = ''
        if (typeof result.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([result.target.result]))
        } else {
          data = result.target.result
        }
        vm.imgurl = data

      }
    },
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
    addsure(){
      var vm = this
      this.officeList.forEach(function (item, index) {
        if(item.id==vm.add.useDepartmentCode){
          vm.add.useDepartmentName = item.officeName
        }
      })
      this.personList.forEach(function (item, index) {
        if(item.staffId==vm.add.usePersonId){
          vm.add.usePersonName = item.name
        }
      })
      this.areaList.forEach(function (item, index) {
        if(item.id==vm.add.areaCode){
          vm.add.areaName = item.gridName
        }
      })
      this.adminList.forEach(function (item, index) {
        if(item.id==vm.add.adminId){
          vm.add.adminName = item.name
        }
      })
      //验证
      if(!this.add.assetsTypeId){
        this.$message.error('请选择资产类别')
        document.querySelector('.typereg').className = 'table-content officereg el-form-item is-error'
        return
      }
      if(!this.add.assetsName){
        vm.$message.error('请输入资产名称')
        document.querySelector('.titlename>input').className = 'input__inner el-input__inner'
        return
      }
      if(!this.add.buyDate){
        vm.$message.error('请输入购入时间')
        document.querySelector('.buytime>input').className = 'input__inner el-input__inner'
        return
      }
      if(!this.add.areaCode){//areareg
        vm.$message.error('请选择区域')
        document.querySelector('.areareg').className = 'table-content areareg el-form-item is-error'
        return
      }
      if(!this.add.adminId){
        vm.$message.error('请选择管理员')
        document.querySelector('.managereg').className = 'table-content officereg el-form-item is-error'
        return
      }
      if(!this.add.source){
        vm.$message.error('请选择来源')
        document.querySelector('.sourcereg').className = 'table-content officereg el-form-item is-error'
        return
      }
      var params = this.add
        params.unitCode='BJSCSYGJ'
        params.hospitalCode='ZXYSHJ'
        params.userId='4a00ebaa0219423daa55e07046f2edf9'
        params.userName='张鹏'
        params.flagkuayu='true'

      // var formdata = new FormData();
      // for(var item in params){
      //   formdata.append(item, params[item]||'');
      // }

      vm.$http.post('assetsInfo/save',params,true).then(res=>{
        if(res.code=='200'){
          vm.$message({
            message: res.message,
            type: 'success'
          });
          vm.$emit('close','add')
        }
      })

      // $.ajax({
      //   type:'POST',
      //   url:__PATH.COMMONPATH+'assetsInfo/save',
      //   data:formdata,
      //   contentType:false,
      //   processData:false,
      //   // mimeType:"multipart/form-data",
      //   dataType : "JSON",
      //   success:function(res){
      //       if(res.code=='200'){
      //         vm.$message({
      //           message: res.message,
      //           type: 'success'
      //         });
      //         vm.$emit('close')
      //       }
      //   },
      //   error:function (res) {
      //     vm.$message.error(res.message)
      //   }
      // });

    },

       //获取下拉资产类别
        getclassfity(){
          // let url = '/api/assrtsClassify/listData'
          // let data = {
          //   unitCode:'BJSCSYGJ',
          //   hospitalCode:'ZXYSHJ',
          //   userId:'4a00ebaa0219423daa55e07046f2edf9',
          //   userName:'张鹏',
          // }
          // this.$http.post(url,data).then(res=>{
          //    this.optionsclass1 = res.data.list
          // })
        },
        //获取下拉资产设备品牌
        getclassfity2(){
          // let url = '/api/assetsBrand/listData'
          // let data = {
          //   unitCode:'BJSCSYGJ',
          //   hospitalCode:'ZXYSHJ',
          //   userId:'4a00ebaa0219423daa55e07046f2edf9',
          //   userName:'张鹏',
          //   pageSize:10,
          //   currentPage:0,
          //   classifyId:this.add.assetsTypeId
          // }
          // this.$http.post(url,data).then(res=>{
          //    this.optionsclass2 = res.data.list
          // })
        },
        //显示下拉框 请求资产设备品牌
        showbrandName(str){
          if(!this.add.assetsTypeId){
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
              classifyId:vm.add.assetsTypeId
          }).then(res=>{
            if(res.code==200){
              vm.brandList = res.data.list
              if(str){
                var brandidexx = vm.brandList.findIndex(function (item) {
                  return str == item.brandName
                })
                if(brandidexx>-1){
                  vm.add.brandId = vm.brandList[brandidexx].id
                  vm.add.brandName = vm.brandList[brandidexx].brandName
                }
              }
            }
          })
        },
        //获取下拉管理员
        getclassfity3(){
          // let url = 'api/userLoginController/getAdminUser'
          // let data = {
          //   unitCode:'BJSCSYGJ',
          //   hospitalCode:'ZXYSHJ',
          //   userId:'4a00ebaa0219423daa55e07046f2edf9',
          //   userName:'张鹏',
          // }
          // this.$http.post(url,data).then(res=>{
          //   this.optionsclass3 = res.data
          // })
        },
        //获取下拉使用人
        getclassfity4(){
          // let url = 'api/userLoginController/getAdminUser'
          // let data = {
          //   unitCode:'BJSCSYGJ',
          //   hospitalCode:'ZXYSHJ',
          //   userId:'4a00ebaa0219423daa55e07046f2edf9',
          //   userName:'张鹏',
          // }
          // this.$http.post(url,data).then(res=>{
          //   this.optionsclass4 = res.data
          // })
        },

  },
  watch:{
    canresidualRatio:function () {
      this.add.residualRatio = this.canresidualRatio
      if(this.canresidualRatio>100||this.canresidualRatio==100){
        this.$message.error('请输入0-100之间数字')
        this.canresidualRatio = ''
      }
    },
    serviceLife:function () {
      this.add.serviceLife = this.serviceLife
      if(this.serviceLife>1000){
        this.$message.error('使用年限不得大于1000,请重新输入')
        this.canresidualRatio = ''
      }
    },
    remarks:function () {
      if(this.remarks.length>300){
        this.$message.error('备注文字不得超过300')
        this.remarks = this.remarks.splice(0,300)
      }
      this.add.remarks = this.remarks
    }
  },

}
</script>
<style scoped lang="scss">
.goods-detail{
  width: 950px;
  .fenge{
    height: 40px;
    line-height: 40px;
    background-color: #409EFF;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    padding: 20px;
    width: 80px;
    height: 80px;
    display: block;
  }
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
            box-sizing: border-box;
            padding-right: 10px;
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
