<template>
    <div class="login">
      <div class="logobox">
        <img src="../../../static/images/titlelogo.png" alt="">
      </div>
      <div class="titlebox">
        <img src="../../../static/images/title.png" alt="">

      </div>
      <div class="box">
        <div class="item" style="margin-top: 40px;margin-bottom: 40px">
          <p class="label">用户名</p>
          <el-input class="namereg" v-model="userName" placeholder="请输入用户名"></el-input>
        </div>
        <p class="regtitle" style="margin-top: -20px" v-if="titlename">{{titlename}}</p>

        <div class="item">
          <p class="label">密码</p>
          <el-input type="password" class="passreg" v-model="password" placeholder="请输入密码"></el-input>
        </div>
        <p class="regtitle" v-if="title">{{title}}</p>
        <div class="item" style="margin-top: 60px">
          <p class="btn" @click="loginClick">登陆</p>
        </div>
        <!--<p class="forgetpass">忘记密码</p>-->
        <div class="download">
          <p><span>下载中心</span> |  <span> 版本信息</span></p>
        </div>
        <div class="tip">
          请使用google浏览器，最佳分辨率1920*1080
        </div>
      </div>
      <div class="power">
        Copyright @ 2018 SINOMIS. All Rights Reserved
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data:function () {
          return{
            userName:'',
            password:'',
            title:'',
            titlename:''
          }
        },
        methods:{
          loginClick(){
            var vm =this
            if(!vm.userName){
              document.querySelector('.namereg').className='namereg errorinput'
              this.titlename = '用户名不能为空'
              return
            }
            if(!vm.password){
              document.querySelector('.passreg').className='passreg errorinput'
              this.title = '密码不能为空'

              return
            }
            vm.$http.post('/userLoginController/userLogin', {
                userName: vm.userName,
                passWord: vm.password
              }
            ).then(function (res) {
              if(res.code==200){
                var obj = {}
                obj.companyCode = res.data.companyCode
                obj.hospitalCode = res.data.hospitalCode
                obj.hospitalName = res.data.hospitalName
                obj.id = res.data.id
                obj.name = res.data.name
                obj.officeCode = res.data.officeCode
                obj.roleCode = res.data.roleCode
                obj.roleName = res.data.roleName
                obj.unitCode = res.data.unitCode
                obj.unitName = res.data.unitName
                obj.unitCode = res.data.unitCode
                obj.type = res.data.type
                // var listData = res.data.menuList
                // var itemList = []
                // listData.forEach(function (item) {
                //   if(item.parentId==0){
                //     itemList.push(item)
                //   }
                // })
                // itemList.forEach(function (item,index) {
                //   item.list=[]
                //   listData.forEach(function (list) {
                //     if(item.menuId==list.parentId){
                //       item.list.push(list)
                //     }
                //   })
                //   itemList[index]=item
                // })
                vm.$store.commit('listChange')
                localStorage.setItem('LIST',JSON.stringify(res.data.menuList))
                localStorage.setItem('LOGINDATA',JSON.stringify(obj))
                vm.$store.commit('loginChangeTrue')
                vm.$router.push('/index')
              }

            })
            // var obj = {
            //   unitCode:'BJSCSYGJ',
            //   hospitalCode:'ZXYSHJ',
            //   userId:'4a00ebaa0219423daa55e07046f2edf9',
            //   userName:'张鹏',
            //   roleCode:'corpAdmin,default'
            // }
            // localStorage.setItem('LOGINDATA',JSON.stringify(obj))
            // this.$store.commit('loginChangeTrue')
            // this.$router.push('/index')
          }
        },
      watch:{
        userName:function () {
          if(!this.userName){
            document.querySelector('.namereg').className='namereg errorinput'
            this.titlename = '用户名不能为空'

          }else{
            document.querySelector('.namereg').className='namereg'
            this.titlename = ''
          }
        },
        password:function () {
          if(!this.password){
            document.querySelector('.passreg').className='passreg errorinput'
            this.title = '密码不能为空'

          }else{
            document.querySelector('.passreg').className='passreg'
            this.title = ''
          }
        }
      }
    }
</script>

<style scoped lang="scss">
.login{
  /*width: 100%;*/
  height: 100%;
  background: url("/static/images/bg.png") no-repeat;
  background-size: 100% 100%;
  background-color: #3267bf;
  position: relative;
  min-width: 1300px;
  .logobox{
    position: absolute;
    top: 40px;
    right: 40px;
  }
  .titlebox{
    position: absolute;
    top:30%;
    right: 45%;
    img{
      /*width: 520px;*/
    }
  }
  .nametitle{
    position: absolute;
    top: 30%;
    color: #fff;
    font-size: 50px;
    font-weight: bolder;
    width: 100%;
    text-align: center;
  }
  .power{
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    bottom: 20px;
  }
  .box{
    width: 380px;
    height: 500px;
    padding: 10px;
    position: absolute;
    right: 300px;
    top: 280px;
    background-color: #fff;
    border-top: 8px solid #27bfbd;
    /*margin: 50px auto;*/
    box-shadow:0 0 10px #999;
    .regtitle{
      color: #f56c6c;
      font-size: 12px;
      text-align: left;
      margin-top: 10px;
      padding-left: 10%;
    }
    .item{
      margin: 0px auto;
      width: 80%;
      height: 60px;
      line-height: 60px;
      margin-bottom: 60px;
      .label{
        font-size: 15px;
        color: #666;
        text-align: left;
        line-height: 20px;
      }
      .btn{
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        text-align: center;
        background-color: #27bfbd;
        cursor: pointer;

      }
    }
    .forgetpass{
      text-align: left;
      color: #999999;
      font-size: 14px;
      padding-left: 10%;
      cursor: pointer;
      margin-bottom: 40px;
    }
    .download{
      color: #599392;
      font-size: 14px;
      height: 20px;line-height: 20px;
      span{
        cursor: pointer;
      }
    }
    .tip{
      font-size: 14px;
      color: #999999;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
