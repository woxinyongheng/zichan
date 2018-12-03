<template>
    <div class="brandlook">
      <div class="banner">
        <div class="bannerleft">
          <el-button type="primary" @click="$router.back()" icon="el-icon-arrow-left">返回</el-button>
          <el-button type="primary" @click="addClick" icon="el-icon-plus">新增</el-button>
          <!--<el-button type="primary">编辑</el-button>-->
          <!--<el-button type="primary">删除</el-button>-->
          <el-button type="warning" plain>模板下载</el-button>
          <el-button type="warning" plain>导入</el-button>
          <el-button type="warning" plain>导出</el-button>
        </div>
      </div>

      <!--表哥-->
      <el-row :gutter="32" class="table">
        <el-col :span="24"><div class="grid-content changeimgbox">
          <!--右侧表格-->
          <p class="tabletitle">资产品牌</p>
          <el-table
            :data="lookData"
            style="width: 100%"
            height="250">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="brandCode"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="brandName"
              align="center"
              label="品牌名称">
            </el-table-column>
            <el-table-column
              prop="serviceLife"
              align="center"
              width="120"
              label="使用期限（月）">
            </el-table-column>
            <el-table-column
              prop="residualRatio"
              align="center"
              label="残值率">
            </el-table-column>
            <el-table-column
              prop="zip"
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
                <span class="btn" v-if="scope.row.parentId!='#'"  @click="handleEdit(scope.row)">编辑</span>
                <!--<span class="btn" v-if="scope.row.parentId!='#'"  @click="handleDelete(scope.row)">删除</span>-->
              </template>
            </el-table-column>
          </el-table>
          <div  style="margin-top: 10px;text-align: right">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="changePage"
              :total="total">
            </el-pagination>
          </div>
        </div></el-col>

      </el-row>

      <!--弹框-->
      <!--查看-->
      <el-dialog title="查看页面" :visible.sync="dialogTableVisible" width="1000px">
        <el-row class="list">
          <el-col :span="3"><div class="grid-content bg-purple-dark">编号</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.classifyCode}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-dark">名称</div></el-col>
          <el-col :span="5"><div class="grid-content">{{lookPageData.classifyName}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">父级</div></el-col>
          <el-col :span="6"><div class="grid-content">{{lookPageData.parentId}}</div></el-col>
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
        <el-button type="primary" @click="dialogTableVisible = false">编辑</el-button>
      </span>
      </el-dialog>
      <!--增加编辑-->
      <el-dialog title="增加/编辑" :visible.sync="adddialogTableVisible" width="1000px" >
        <el-form ref="form" :model="form" label-width="130px"   :rules="rules" style="text-align: left">
          <!--<el-form-item label="排序" prop="classifyCode" required>-->
            <!--<el-input v-model="form.sort"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="编码" prop="brandCode" class="titletype" >
            <el-input  v-model="form.brandCode" placeholder="请输入分类编码"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="brandName" class="titlename">
            <el-input  v-model="form.brandName" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="使用期限(月)" prop="serviceLife" class="timereg">
            <el-input  v-model="serviceLife" type="number" placeholder="请输入使用期限"></el-input>
          </el-form-item>
          <el-form-item label="残值率(%)" prop="residualRatio" class="residualreg">
            <el-input  v-model="residualRatio" type="number" placeholder="请输入残值率"></el-input>
          </el-form-item>
          <el-form-item label="需要保养">
            <el-radio-group v-model="form.isMaintenance">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="0" value="0">否</el-radio>
            </el-radio-group>
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
        name: "BrandLook",
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
              brandCode:'',
              brandName:'',
              serviceLife:'',
              residualRatio:'',
              isMaintenance:'1'
            },
            total:0,
            currentPage:1,
            rules: {
              brandCode: [
                { required: true, message: '请输入分类编号', trigger: 'blur' },
                { min: 1,  message: '不能为空', trigger: 'blur' }
              ],
              brandName: [
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
            this.$message.error('资产残值率在0-100之间')
            document.querySelector('.residualreg').className = 'is-error  residualreg el-form-item  is-required'
          }else{
            if(document.querySelector('.residualreg')){
              document.querySelector('.residualreg').className = 'residualreg el-form-item  is-required'

            }
          }
        }

      },
        mounted(){
          var vm =this
          this.lookInfo(vm.$route.params.id)
        },
        methods:{
          changePage(num){
            this.currentPage = num
            this.lookInfo(vm.$route.params.id)
          },
          handleEdit(item){
            this.addEditId = item.id
            this.adddialogTableVisible=true
            this.form={
              brandCode:item.brandCode,
              brandName:item.brandName,
              serviceLife:item.serviceLife,
              residualRatio:item.residualRatio,
              isMaintenance:item.isMaintenance+''
            }
            this.serviceLife=item.serviceLife
            this.residualRatio=item.residualRatio
          },
          handleDelete(item){
            var vm =this
            vm.$http.post('/assetsBrand/delete',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              id:item.id
            }).then(res=>{
              if(res.code=='200'){
                vm.$message({
                  message: res.message,
                  type: 'success'
                });
                vm.lookInfo(vm.$route.params.id)
              }
            })
          },
          lookInfo(id){
            var vm =this
            vm.$http.post('/assetsBrand/listData',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              pageSize:'10',
              currentPage:vm.currentPage,
              classifyId:id
            }).then(res=>{
              if(res.code=='200'){
                vm.lookData = res.data.list
                vm.total = res.data.count
              }
            })
          },
          addClick(){
            this.addEditId=''
            var arrform =  { brandCode:'',
              brandName:'',
              serviceLife:'',
              residualRatio:'',
              isMaintenance:'1'
            }
            this.form = arrform
            this.serviceLife=''
            this.residualRatio=''
            this.adddialogTableVisible=true
          },
          //添加编辑
          onSubmit(){
            var vm =this
            if(!vm.form.brandCode){
              vm.$message.error('资产分类编号不能为空')
              document.querySelector('.titletype').className = 'is-error titletype el-form-item  is-required'
              return
            }
            if(!vm.form.brandName){
              vm.$message.error('资产分类名称不能为空')
              document.querySelector('.titlename').className = 'is-error titlename el-form-item  is-required'
              return
            }
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
              vm.$message.error('资产残值率需小于100')
              document.querySelector('.residualreg').className = 'is-error residualreg el-form-item  is-required'

              return
            }
            vm.$http.post('/assetsBrand/save',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              id:vm.addEditId,
              brandCode:vm.form.brandCode,
              brandName:vm.form.brandName,
              serviceLife:vm.form.serviceLife,
              residualRatio:vm.form.residualRatio,
              isMaintenance:vm.form.isMaintenance,
              classifyId:vm.$route.params.id
            }).then(res=>{
              if(res.code==200){
                vm.$message({
                  message: res.message,
                  type: 'success'
                });
                vm.lookInfo(vm.$route.params.id)
                vm.adddialogTableVisible=false
              }
            })
          },
        },

    }
</script>

<style scoped lang="scss">
  .brandlook{
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
      height: 120px;
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
