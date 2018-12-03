<template>
    <div class="codemanage">
      <div class="title-header">
      <p>资产编码规则</p>
    </div>
      <p class="managetitle">通过选择一个或者多个字段的组合设置资产编码的生成规则：</p>
      <el-row :gutter="32">
        <el-col :span="10"><div class="grid-content">
          <p style="height: 20px"></p>
          <codetmp :listData="listData" @selectList="selectList"></codetmp>
        </div></el-col>
        <el-col :span="4"><div class="grid-content changeimgbox">
          <img src="/static/images/right.png" alt="" class="changeimg">
          <br/>
          <img src="/static/images/left.png" alt="" class="changeimg">
        </div></el-col>
        <el-col :span="10"><div class="grid-content">
          <p style="height: 20px;font-size: 14px;line-height: 20px;padding-left: 20px">已选择字段</p>
          <selectcode :selectListData="selectListData" @removeList="removeList"></selectcode>
        </div></el-col>
      </el-row>
      <div class="managebox">
        <div class="list">
          <div class="item">
            <span class="label">流水号长度</span>
            <span class="txt">
              <el-select v-model="serialNumber" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="item">
            <span class="label">连接符</span>
            <span class="txt">
              <el-select v-model="connector" placeholder="请选择">
                <el-option
                  v-for="item in connectoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="item">
            <span class="label">资产编码规则：</span>
            <span class="txt">{{codeJoin}}  {{serialNumber}}位流水号保存</span>
          </div>
        </div>
      </div>
      <div class="btnbox">
        <el-button type="primary" @click="saveClick">保存</el-button>
      </div>
    </div>
</template>

<script>
    import codetmp from '@/components/system/systemtmp/CodeTmp'
    import selectcode from '@/components/system/systemtmp/SelectCode'
    export default {
        name: "CodeManage",
        data:function () {
          return{
            listData:[],
            options:[{label:'3',value:'3'},{label:'4',value:'4'},{label:'5',value:'5'},{label:'6',value:'6'}],
            serialNumber:'',
            connectoptions:[{label:'无',value:''},{label:'-',value:'-'},{label:'.',value:'.'},{label:'_',value:'_'}],
            connector:'',
            selectListData:[]
          }
        },
      mounted(){
        this.requestInfo()
      },
      computed:{
          codeJoin(){
            var vm =this
            var str = ''
            vm.selectListData.forEach(function (item) {
              if(item.entityCode=='buyDate'){
                str += '购入日期-年份(四位) + 购入日期-月份(两位)+'
              }else{
                str += ( item.name+'+')
              }

            })
            return str

          }
      },
      methods:{
          requestInfo(){
            var vm = this
            vm.$http.post('/codeRule/data',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
            }).then(res=>{
              if(res.code=='200'){
                res.data.list.forEach(function (item) {
                  if(item.status==1){
                    vm.selectListData.push(item)
                  }else{
                    vm.listData.push(item)
                  }
                })
                vm.serialNumber = res.data.serialNumber
                vm.connector = res.data.connector
              }
            })
          },
          selectList(item){
              this.selectListData.push(item)
              var _index;
              this.listData.forEach(function (i,index) {
                if(i.id == item.id){
                  _index = index
                }
              })
            this.listData.splice(_index,1)
          },
          removeList(item){
            this.listData.push(item)
            var _index;
            this.selectListData.forEach(function (i,index) {
              if(i.id == item.id){
                _index = index
              }
            })
            this.selectListData.splice(_index,1)
          },
          saveClick(){
              var vm =this
              if(!vm.selectListData.length){
                vm.$message({
                  message: '请先选择组合字段',
                  type: 'warning'
                });
                return
              }
              debugger
              var arr = [];
              vm.selectListData.forEach(function (item,index) {
                var obj ={}
                obj.id = item.id
                obj.sort = index
                arr.push(obj)
              })
              vm.$http.post('/codeRule/save',{
                unitCode:'BJSCSYGJ',
                hospitalCode:'ZXYSHJ',
                userId:'4a00ebaa0219423daa55e07046f2edf9',
                userName:'张鹏',
                serialNumber:vm.serialNumber,
                connector:vm.connector,
                codesList:JSON.stringify(arr)
              }).then(res=>{
                if(res.code=='200'){
                  vm.$message({
                    message: res.message,
                    type: 'success'
                  });
                  vm.selectListData=[]
                  vm.listData=[]
                  vm.requestInfo()
                }
              })
          }
      },
        components:{
          codetmp,selectcode
        }
    }
</script>

<style scoped lang="scss">
.codemanage{
  min-height: 300px;
  padding: 0  20px 20px 20px;
  text-align: left;
  background-color: #fff;
  .changeimgbox{
    text-align: center;
    margin-top: 150px;
    .changeimg{
      width: 40px;
      height: 20px;
    }
  }
  .managetitle{
    font-size: 14px;
    color: #333;
    margin: 25px 0;
  }
  .list{
    font-size: 14px;
    .item{
      padding: 15px 0;
      .label{
        display: inline-block;
        vertical-align: middle;
        width: 120px;
      }
    }
  }
  .btnbox{
    text-align: center;
  }

}
</style>
