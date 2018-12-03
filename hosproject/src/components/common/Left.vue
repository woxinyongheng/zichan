<template>
    <div class="left">
      <div class="itemsource">
        <div v-for="(item,index) in $store.state.itemList" :key="index" class="leftlist" @click="foldHandle(index)">
          <img class="iconimg" :src="'./static/images/'+item.icon+'.png'" alt=""/>
          <span class="labeltitle point" >{{item.menuName}}</span>
          <el-collapse-transition>
            <div class="itemlist" v-if="activeList.indexOf(index)>-1">
              <p  class="point" v-for="i in $store.state.itemList[index].list" @click.stop="activeClick(i.menuId,i.menuHref)" :class="pathActive==i.menuId?'active':''">{{i.menuName}}</p>
            </div>
          </el-collapse-transition>
          <i class="el-icon-arrow-down" v-if="activeList.indexOf(index)==-1"></i>
          <i class="el-icon-arrow-right" v-if="activeList.indexOf(index)>-1"></i>
        </div>


      </div>

    </div>
</template>

<script>
    export default {
        name: "Left",
        data:function () {
          return{
            activeNum:0,
            itemList:[],
            pathActive:sessionStorage.getItem('activePath')||'1044496516047708160',
            activeList:JSON.parse(sessionStorage.getItem('activeList'))||[0]
          }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
          }
        },
        methods:{
          activeClick(path,menuHref){
            if(this.pathActive==path) return
            this.pathActive = path
            sessionStorage.setItem('activePath',path)
            this.$router.push('/'+menuHref)
          },
          foldHandle(index){
            if(this.activeList.indexOf(index)>-1){
              var _i = this.activeList.indexOf(index)
              this.activeList.splice(_i,1)
            }else{
              this.activeList.push(index)
            }
            sessionStorage.setItem('activeList',JSON.stringify(this.activeList))
          }
        },

    }
</script>

<style scoped lang="scss">
  .left {
    padding-left: 20px;
    line-height: 36px;
    font-size: 14px;
    .itemsource{
      text-align: left;
      .labeltitle{
        font-weight: bold;
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
      }
      .iconimg{
        width:20px;
        height: 20px;
        vertical-align: middle;
        padding-right: 5px;
        /*margin-top: 5px;*/
      }
      .itemlist{
        padding-left: 30px;
        font-size: 16px;
        line-height: 40px;
      }
      .point{
        cursor: pointer;
      }
      .active{
        color: #409eff;
      }
    }
    .leftlist{
      line-height: 50px;
      position: relative;
      .el-icon-arrow-down{
        position: absolute;
        right: 10px;
        top: 15px;
        font-size: 16px;
        cursor: pointer;
      }
      .el-icon-arrow-right{
        position: absolute;
        right: 10px;
        top: 13px;
        font-size: 16px;
        cursor: pointer;
      }
    }

  }
</style>
