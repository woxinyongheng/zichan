<template>
    <div class="classifymanage">
      <div class="title-header">
      <p>资产分类管理</p>
    </div>
      <div class="banner">
        <div class="bannerleft">
          <el-button type="primary" @click="addClick" icon="el-icon-plus">新增</el-button>
          <el-button type="warning" plain>模板下载</el-button>
          <el-button type="warning" plain>导入</el-button>
          <el-button type="warning" plain>导出</el-button>
        </div>
      </div>
      <!--表哥-->
      <!--<el-row :gutter="32" class="table">-->
        <!--<el-col :span="24"><div class="grid-content">-->
          <!--左侧表格-->
          <p class="tabletitle">资产类别</p>
          <el-table
            :data="listData"
            style="width: 100%;text-align: center"
            >
            <el-table-column
              fixed
              prop="num"
              width="50"
              align="right"
              label="">
              <template slot-scope="scope">
                <img v-if="scope.row.parentId=='#'" src="./../../../static/images/file.png" alt="" style="width: 30px;">
              </template>
            </el-table-column>
            <el-table-column
              prop="classifyCode"
              align="left"
              label="编号">
              <template slot-scope="scope">
                <span @click="LookPage(scope.row)" class="classifycode" :class="scope.row.parentId=='#'?'mainclassify':''">{{scope.row.classifyCode}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="classifyName"
              align="center"
              label="类别名称">
            </el-table-column>
            <el-table-column
              prop="serviceLife"
              align="center"
              label="使用期限">
            </el-table-column>
            <el-table-column
              width="110"
              prop="residualRatio"
              align="center"
              label="残值率（%）">
            </el-table-column>
            <el-table-column
              prop="isMaintenance"
              align="center"
              label="需要保养">
              <template slot-scope="scope">
                {{scope.row.isMaintenance==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="zip"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <span class="btn"   @click="handleEdit(scope.row)">编辑</span>
                <!--<span class="btn" v-if="scope.row.parentId!='#'"  @click="handleDelete(scope.row)">删除</span>-->
                <span class="btn" style="color:#e6a23c;" v-if="scope.row.parentId!='#'"  @click="handleLook(scope.$index, scope.row)">查看品牌</span>
              </template>
            </el-table-column>
          </el-table>
        <!--</div></el-col>-->
        <!--<el-col :span="0"><div class="grid-content changeimgbox">-->
          <!--&lt;!&ndash;右侧表格&ndash;&gt;-->
          <!--<p class="tabletitle">资产品牌</p>-->
          <!--<el-table-->
            <!--:data="lookData"-->
            <!--style="width: 100%"-->
            <!--height="250">-->
            <!--<el-table-column>-->
              <!--&lt;!&ndash;fixed&ndash;&gt;-->
              <!--prop="num"-->
              <!--align="center"-->
              <!--label="">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="brandCode"-->
              <!--align="center"-->
              <!--label="编号">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="brandName"-->
              <!--align="center"-->
              <!--label="品牌名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="serviceLife"-->
              <!--align="center"-->
              <!--width="120"-->
              <!--label="使用期限（月）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="serviceLife"-->
              <!--align="center"-->
              <!--label="残值率">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="zip"-->
              <!--align="center"-->
              <!--label="需要保养">-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.isMaintenance==1?'是':'否'}}-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div></el-col>-->
      <!--</el-row>-->
      <!--弹框-->
      <!--查看-->
      <el-dialog title="查看页面" :visible.sync="dialogTableVisible" width="1000px">
        <el-row class="list">
          <el-col :span="3"><div class="grid-content bg-purple-dark">编号</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.classifyCode}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-dark">名称</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.classifyName}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">父级</div></el-col>
          <el-col :span="6"><div class="grid-content">{{lookPageData.parentClassifyName}}</div></el-col>
        </el-row>
        <el-row  class="list">
          <el-col :span="3"><div class="grid-content bg-purple-dark">使用期限</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.serviceLife}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-dark">需要保养</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.isMaintenance==1?'是':'否'}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row  class="list">
          <el-col :span="3"><div class="grid-content bg-purple-dark">备注</div></el-col>
          <el-col :span="21"><div class="grid-content">{{lookPageData.remarks}}</div></el-col>
        </el-row>
        <span slot="title" class="dialog-title">
          <p class="dialog-titlebox">查看页面</p>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="lookEditInfo">编辑</el-button>
      </span>
      </el-dialog>
      <!--增加编辑-->
      <el-dialog title="增加/编辑" :visible.sync="adddialogTableVisible" width="1000px"  >
        <el-form ref="form"  label-width="130px" style="text-align: left"  :model="form" :rules="rules">
          <el-form-item label="编号" prop="classifyCode" class="titletype">
            <el-input  v-model="form.classifyCode" placeholder="请输入分类编号"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="classifyName" class="titlename">
            <el-input  v-model="form.classifyName" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="父级"  class="parentreg">
            <el-select v-model="form.parentId" placeholder="请选择父级">
              <el-option v-for="item in parentArr" :label="item.classifyName" :value="item.id">{{item.classifyName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用期限(月)" prop="serviceLife" class="timereg">
            <el-input  v-model="serviceLife" type="number" placeholder="请输入使用期限"></el-input>
          </el-form-item>
          <el-form-item label="残值率(%)" prop="residualRatio" class="residualreg">
            <el-input  v-model="residualRatio" type="number" placeholder="请输入残值率"></el-input>
          </el-form-item>
          <el-form-item label="需要保养">
            <el-radio-group v-model="form.isMaintenance" required>
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="0" value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" class="markreg">
            <el-input type="textarea" v-model="form.remarks" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="adddialogTableVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "ClassifyManage",
        data:function () {
          return{
            listData:[],
            lookData:[],
            dialogTableVisible:false,
            lookPageData:'',
            adddialogTableVisible:false,
            isCenter:false,
            addEditId:'',
            parentArr:[],
            serviceLife:'',
            residualRatio:'',

            form:{
              classifyCode:'',
              classifyName:'',
              parentId:'',
              serviceLife:'',
              isMaintenance:'1',
              remarks:'',
              residualRatio:''
            },
            rules: {
              classifyCode: [
                { required: true, message: '请输入分类编号', trigger: 'blur' },
                { min: 1,  message: '不能为空', trigger: 'blur' }
              ],
              classifyName: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
                { min: 1,  message: '不能为空', trigger: 'blur' }
              ],
              serviceLife: [
                { required: true, message: '请输入分类年限', trigger: 'blur' },
                { min: 1,  message: '不能为空', trigger: 'blur' }
              ],
              residualRatio: [
                { required: true, message: '请输入残值率', trigger: 'blur' },
                { max:100,min: 0,  message: '请输入0-100之间数字', trigger: 'blur' }
              ],
            }
          }
        },
      mounted(){
          this.requestInfo()
        // this.lookInfo()
      },
      watch:{
        serviceLife:function () {
          this.form.serviceLife = this.serviceLife
          if(this.serviceLife<0 || this.serviceLife>1000 ){
            this.$message.error('资产使用年限在0-1000之间')
            document.querySelector('.timereg').className = 'is-error timereg el-form-item  is-required'
          }else{
            if(document.querySelector('.timereg')){
              document.querySelector('.timereg').className = 'timereg el-form-item  is-required'
            }

          }
        },
        residualRatio:function(){
          this.form.residualRatio = this.residualRatio
          if(this.residualRatio<0 || this.residualRatio>100 ){
            this.$message.error('请输入0-100之间数字')
            document.querySelector('.residualreg').className = 'is-error  residualreg el-form-item  is-required'
          }else{
            if(document.querySelector('.residualreg')){
              document.querySelector('.residualreg').className = 'residualreg el-form-item  is-required'

            }
          }
        }

      },
        methods:{

          lookEditInfo(){
            let vm =this
            this.dialogTableVisible=false
            this.addEditId = this.lookPageData.id
            var item = this.lookPageData
            this.adddialogTableVisible=true
            this.form={
              classifyCode:item.classifyCode,
              classifyName:item.classifyName,
              parentId:item.parentId,
              serviceLife:item.serviceLife,
              isMaintenance:item.isMaintenance+'',
              remarks:item.remarks,
              residualRatio:item.residualRatio
            }
            this.serviceLife=item.serviceLife
              this.residualRatio=item.residualRatio

          },
          handleEdit(item){
            let vm =this
            this.addEditId = item.id
            this.adddialogTableVisible=true
            vm.$http.post('/assrtsClassify/view',{
              Id:item.id
            }).then(res=>{
              if(res.code=='200'){
                vm.form={
                  classifyCode:res.data[0].classifyCode,
                  classifyName:res.data[0].classifyName,
                  parentId:res.data[0].parentId=='#'?'':res.data[0].parentId,
                  serviceLife:res.data[0].serviceLife,
                  isMaintenance:res.data[0].isMaintenance+'',
                  remarks:res.data[0].remarks,
                  residualRatio:''
                }
                vm.serviceLife=res.data[0].serviceLife
                vm.form.serviceLife = vm.serviceLife
                vm.residualRatio=item.residualRatio*1
                vm.form.residualRatio = vm.residualRatio

              }
            })

          },
          //删除类别
          handleDelete(item){
            var vm =this
            vm.$http.post('/assrtsClassify/delete',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              id:item.id,
            }).then(res=>{
              if(res.code=='200'){
                vm.$message({
                  message: res.message,
                  type: 'success'
                });
                vm.requestInfo()
              }
            })
          },
          addClick(){
            this.addEditId=''
            var srrform= {
              classifyCode:'',
                classifyName:'',
                parentId:'',
                serviceLife:'',
                isMaintenance:'1',
                remarks:'',
                residualRatio:''
            }
            this.serviceLife=''
            this.residualRatio=''
            this.form = srrform
            this.adddialogTableVisible=true
          },
          //添加编辑
          onSubmit(){
            var vm =this
            if(!vm.form.classifyCode){
              vm.$message.error('资产分类编号不能为空')
              document.querySelector('.titletype').className = 'is-error titletype el-form-item  is-required'
              return
            }
            if(vm.form.classifyCode.length>50){
              vm.$message.error('资产分类编号长度不得大于50')
              document.querySelector('.titletype').className = 'is-error titletype el-form-item  is-required'
              return
            }
            if(!vm.form.classifyName){
              vm.$message.error('资产分类名称不能为空')
              document.querySelector('.titlename').className = 'is-error titlename el-form-item  is-required'
              return
            }
            if(vm.form.classifyName.length>50){
              vm.$message.error('资产分类名称长度不得大于50')
              document.querySelector('.titlename').className = 'is-error titlename el-form-item  is-required'
              return
            }
            // if(!vm.form.parentId){
            //   vm.$message.error('资产父级不能为空')
            //   document.querySelector('.parentreg').className = 'table-content officereg el-form-item is-error'
            //   return
            // }
            if(!vm.form.serviceLife){  //timereg
              vm.$message.error('资产使用年限不能为空')
              document.querySelector('.timereg').className = 'is-error timereg el-form-item  is-required'
              return
            }
            if(!vm.form.residualRatio){
              vm.$message.error('资产残值率不能为空')
              document.querySelector('.residualreg').className = 'is-error residualreg el-form-item  is-required'
              return
            }else if(vm.form.residualRatio*1>100 || vm.form.residualRatio*1==100){
              vm.$message.error('资产残值率需输入0-100之间数字')
              document.querySelector('.residualreg').className = 'is-error residualreg el-form-item  is-required'
              return
            }
            if(vm.form.remarks.length>200){  //timereg
              vm.$message.error('备注长度不得大于200')
              document.querySelector('.markreg').className = 'is-error markreg el-form-item  is-required'
              return
            }

            vm.$http.post('/assrtsClassify/save',{
              id:vm.addEditId,
              classifyCode:vm.form.classifyCode,
              classifyName:vm.form.classifyName,
              serviceLife:vm.form.serviceLife,
              parentId:vm.form.parentId,
              isMaintenance:vm.form.isMaintenance,
              remarks:vm.form.remarks,
              residualRatio:vm.form.residualRatio
            }).then(res=>{
              if(res.code==200){
                vm.$message({
                  message: res.message,
                  type: 'success'
                });
                vm.requestInfo()
                vm.adddialogTableVisible =false
              }
            })
          },
          handleLook(a,b){
            this.$router.push('/brandlook/'+b.id)
          },
          //查看页面
          LookPage(item){
            let vm =this
            vm.$http.post('/assrtsClassify/view',{
              Id:item.id
            }).then(res=>{
              if(res.code=='200'){
                vm.lookPageData = res.data[0]
                this.dialogTableVisible=true

              }
            })
            // this.lookPageData = id
            // // this.lookInfo(id)
            // this.dialogTableVisible=true
          },
          requestInfo(){
            var vm =this
            vm.$http.post('/assrtsClassify/listData',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
            }).then(res=>{
              if(res.code=='200'){
                vm.listData = res.data.list
                var arrparent = []
                vm.parentArr=[]
                var obj={}
                vm.listData.forEach(function (item, index) {
                  if(item.parentId=='#'){
                    arrparent.push(item)
                    vm.parentArr.push(item)
                  }else{
                    if(obj[item.parentId]){
                      obj[item.parentId].push(item)
                    }else{
                      obj[item.parentId]=[]
                      obj[item.parentId].push(item)
                    }
                  }
                })
                for(var i in obj){
                  var _index;
                  arrparent.forEach(function (item,index) {
                    if(item.id == i){
                      _index = index
                    }
                  })
                  obj[i].forEach(function (a, ai) {
                    arrparent.splice(_index+1,0,a)
                  })
                }
                vm.listData = arrparent
                // vm.lookInfo(vm.listData[1].id)
              }
            })
          },

        }
    }
</script>

<style scoped lang="scss">
.classifymanage{
  background-color: #fff;
  padding: 0  20px 20px 20px;
  height: 100% ;
  .table{
    font-size: 14px;
  }
  .btn{
    cursor: pointer;
    padding: 0 5px;
    color: #409EFF;
  }
  .classifycode{
    padding-left: 15px;
    color: #409EFF;
    cursor: pointer;
  }
  .mainclassify{
    padding-left: 0px;
  }
  .tabletitle{
    text-align: left;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #409EFF;
    padding-left: 10px;

  }
  .banner{
    text-align: left;
    padding-bottom: 20px;
    /*height: 60px;*/
    .bannerleft{
      width: 80%;

    }

  }
  /*弹出层*/
  .list{
    margin: 10px 0;
  }
  .grid-content{
    height: 40px;
    line-height: 40px;
  }
  .bg-purple-dark{
    background-color: #f9fafc;
  }

}
</style>
