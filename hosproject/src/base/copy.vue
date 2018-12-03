<template>
  <div class="goods-detail">
    <div class="title">
      <div class="title-content">
        复制资产
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-guanbi1" @click="addcloseMask"></i>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="base-info">
          <div class="table-wrapper">
            <div class="copy">
              <el-input v-model="number" placeholder="">
                <template slot="prepend">复制</template>
              </el-input>
              <p class="textLeft">为保证效率，一次性最多复制99条</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="operator">
      <div class="right-button">
        <el-button plain size="mini" @click="addcloseMask">取消</el-button>
        <el-button type="primary" size="mini" @click="addture" >确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['multipleSelection'],
  data () {
    return {
      number:'',
    }
  },
  methods: {
    addcloseMask: function(){
      this.$emit('close')
    },
    addture(){
      this.$emit('copyList',this.number)
    }
  }
}
</script>
<style scoped lang="scss">
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
    .textLeft{
      text-align:left;
      margin-top:20px;
    }
    .content{
      width: 100%;
      float: left;
      .copy{
        width:80%;
        margin:0 auto;
        margin-top:70px;
      }
    }
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
