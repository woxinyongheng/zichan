<template>
    <div class="templateset">
      <div class="title-header">
      <p>标签模板设置</p>
    </div>
      <p  class="lebel-title" style="margin-bottom: 60px">标签模板设置</p>
      <el-row :gutter="32">
        <el-col :span="8" v-for="item in listData"><div class="grid-content">
          <div class="templatebox" @click="selectTemplate(item.id)">
            <img style="width: 300px;height: 200px;box-sizing: border-box" :src="item.picture" alt="" :class="item.id==selectId?'acyiveimg':''">
          </div>
      <!--<card></card>-->
    </div></el-col>
      <!--<el-col :span="8"><div class="grid-content">-->
        <!--<card></card>-->
      <!--</div></el-col>-->
      <!--<el-col :span="8"><div class="grid-content">-->
        <!--<card></card>-->
      <!--</div></el-col>-->
      </el-row>
      <div class="set">
        <p class="lebel-title">标签打印纸设置</p>
        <p>
          <span>标签高度</span>
          <el-input  v-model="labellength" class="labelinput">
            <template slot="append">cm</template>
          </el-input>
          <span>标签宽度</span>
          <el-input v-model="labelwidth" class="labelinput">
            <template slot="append">cm</template>
          </el-input>
        </p>
        <p style="padding: 20px 0;">如果不设置则默认宽度5cm，高度3cm，且宽度不能低于5cm，高度不能低于1.8cm，否则保存不生效.</p>
      </div>
      <div class="btnbox">
        <el-button type="primary" @click="saveClick">保存</el-button>
      </div>
    </div>
</template>

<script>
    import card from '@/components/system/systemtmp/Card'
    export default {
        name: "TemplateSet",
        data:function () {
          return{
            labellength:'',
            labelwidth:'',
            listData:[],
            selectId:''
          }
        },
      mounted(){
          this.requestInfo()
      },
        methods:{
          selectTemplate(id){
            var vm =this
            vm.selectId = id
          },
          requestInfo(){
            var vm =this
            vm.$http.post('/labelTemplate/listData',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
            }).then(res=>{
              if(res.code=='200'){
                vm.listData = res.data
                vm.listData.forEach(function (item) {
                  if(item.status==1){
                    vm.labellength = item.height
                    vm.labelwidth = item.width
                    vm.selectId=item.id
                  }
                })
              }
            })
          },
          saveClick(){
            var vm =this
            if(vm.labelwidth<5){
              vm.$message({
                message: '宽度不能低于5cm',
                type: 'warning'
              });
              return
            }
            if(vm.labellength<1.8){
              vm.$message({
                message: '高度不能低于1.8cm',
                type: 'warning'
              });
              return
            }
            vm.$http.post('/labelTemplate/switchTemplate',{
              unitCode:'BJSCSYGJ',
              hospitalCode:'ZXYSHJ',
              userId:'4a00ebaa0219423daa55e07046f2edf9',
              userName:'张鹏',
              width:vm.labelwidth,
              height:vm.labellength,
              id:vm.selectId
            }).then(res=>{
              if(res.code=='200'){
                vm.$message({
                  message: res.message,
                  type: 'success'
                });
                vm.requestInfo()
              }
            })
          }
        },
        components:{
          card
        }

    }
</script>

<style scoped lang="scss">
.templateset{
  background-color: #fff;
  padding: 0  20px 20px 20px;
  .templatebox{
    display: inline-block;
    position: relative;
    .surepic{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 26px;
    }
  }
  .lebel-title{
     padding: 10px 0;
     text-align: left;
     font-size: 14px;
     margin-bottom: 20px;
      position: relative;
    padding-left: 10px;

   }
  .acyiveimg{
    border: 2px solid #409EFF;
  }
  .lebel-title::before{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: lightgreen;
    left: -10px;
    top: 15px;
  }
  .set{
    text-align: left;
    font-size: 14px;
    margin-top: 100px;
    .labelinput{
      width: 120px;
      vertical-align: middle;

    }
  }
  .btnbox {
    padding: 20px 0;
  }
}
</style>
