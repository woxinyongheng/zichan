<template>
    <div class="card">
      <div class="box">
        <div class="name">
          <img src="/static/images/logo.png" alt="" class="logoimg">
          中科医信
          <img src="/static/images/sure.png" alt="" class="surepic">
        </div>
        <div class="list">
          <div class="item">
            <span class="label">资产编号： </span>
            <span class="txt">dgfhhhhhhfffrrff</span>
          </div>
          <div class="item">
            <span class="label">资产名称： </span>
            <span class="txt">空调点三</span>
          </div>
          <div class="item">
            <span class="label">规格型号： </span>
            <span class="txt">sdfsgsdfggfdfg</span>
          </div>
          <div class="item">
            <span class="label">使用部门： </span>
            <span class="txt">技术部</span>
          </div>
          <div class="item">
            <span class="label">使用日期：</span>
            <span class="txt">2018-10-18</span>
          </div>
          <div class="item">
            <span class="label">条码：</span>
            <span class="txt"><img src="/static/images/code1.png" alt=""></span>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        data:function () {
          return{

          }
        }
    }
</script>

<style scoped lang="scss">
.card{
  background-color: #fff;
  .box{
    .name{
      height: 40px;
      line-height: 40px;
      position: relative;
      border-bottom: 1px solid #999;
      .surepic{
        position: absolute;
        width: 26px;
        top: 10px;
        right: 10px;
      }
    }
    .logoimg{
      width: 60px;
      vertical-align: middle;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .list{
      .item{
        /*height: 30px;*/
        line-height: 30px;
        text-align: left;
        padding: 0 20px;
        font-size: 14px;
        color: #666;
        .label{
          display: inline-block;
          vertical-align: middle;
          width: 80px;
        }
        .txt{
          color: #999;
          img{
            height: 60px;
            vertical-align: middle;
          }
        }
      }

    }
  }
}
</style>
