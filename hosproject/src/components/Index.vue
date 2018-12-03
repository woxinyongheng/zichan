<template>
  <div class="index">
    <div class="topbox">
      <el-row :gutter="20">
        <el-col :span="12" class="topleft">
          <div class="grid-content bg-purple">
            <p class="title">资产总数</p>
              <!--资产总数表-->
            <div class="topleftbox">
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple lineone">
                  <img src="../../static/images/assetactive.png" alt=""><span class="label">资产总数</span><span class="text">{{assetData.assetCount}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light lineone">
                  <img src="../../static/images/assetico.png" alt=""><span class="label">资产总额</span><span class="text">{{assetData.allMoney}}</span>
                </div></el-col>
              </el-row>
              <el-row>
                <p class="labeltitle">在用资产</p>
                <el-col :span="12" :offset="1"><div class="grid-content bg-purple linetwo">
                  <img src="../../static/images/assetico.png" alt=""><span class="label">总额</span><span class="text">{{assetData.useMoney}}</span>

                </div></el-col>
                <el-col :span="11"><div class="grid-content bg-purple-light linetwo">
                  <img src="../../static/images/proportion.png" alt=""><span class="label">占比</span><span class="text">{{assetData.useMoneyPercent}}</span>

                </div></el-col>
              </el-row>
              <el-row>
                <p class="labeltitle">闲置资产</p>
                <el-col :span="12" :offset="1"><div class="grid-content bg-purple linetwo">
                  <img src="../../static/images/assetico.png" alt=""><span class="label">总额</span><span class="text">{{assetData.idleMoney}}</span>

                </div></el-col>
                <el-col :span="11"><div class="grid-content bg-purple-light linetwo">
                  <img src="../../static/images/proportion.png" alt=""><span class="label">占比</span><span class="text">{{assetData.idleMoneyPercent}}</span>

                </div></el-col>
              </el-row>
            </div>

          </div>
        </el-col>
        <el-col :span=12 class="topright">
          <div class="grid-content bg-purple">
            <p class="title">资产状态</p>
            <div class="toprightbox">
              <!--右侧-->
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple echartsbox rightlineheight" id="echartsbox">
                </div></el-col>
                <el-col :span="3" v-for="(item,index) in statusData" :key="index"><div class="grid-content bg-purple-light rightlineheight">
                  <span class="colorbox" :class="'colorbox'+(index+1)">{{item}}</span>
                  <p>362762</p>
                </div></el-col>
                <!--<el-col :span="3"><div class="grid-content bg-purple-light rightlineheight">-->
                  <!--<span class="colorbox colorbox2">闲置</span>-->
                <!--</div></el-col>-->
                <!--<el-col :span="3"><div class="grid-content bg-purple-light rightlineheight">-->
                  <!--<span class="colorbox colorbox3">报废</span>-->
                <!--</div></el-col>-->

              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="bottombox">
      <el-row :gutter="20">
        <el-col :span="24" class="topleft">
          <div class="grid-content bg-purple">
            <p class="title">资产分类统计</p>
            <el-tabs type="border-card" style="box-shadow: none;border: none" @tab-click="handleClick" v-model="activeType">
              <el-tab-pane label="数量" name="1"></el-tab-pane>
              <el-tab-pane label="金额" name="2"></el-tab-pane>
            </el-tabs>
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple optionbox" id="optionbox">

              </div></el-col>
            </el-row>

          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activeType:'1',
      //列表数据
      assetData:{},
      //图标数据
      statusData:[],
      option:{
        backgroundColor: 'white',
        color:['#4099f7','#91cc63','#d79566'],
        tooltip : {
          trigger: 'item',
          formatter: '{b}:{c}: ({d}%)',
  },
        series : [
          {
            type:'pie',
            clockwise:'true',
            startAngle:'90',
            radius : '80%',
            center: ['50%', '50%'],
            label:{
              normal:{
                show:false ,
                position : 'inner',
                formatter:'{d}%'
              }},
            data:[
              {
                value:31752,
                name:'在用',
              },
              {
                value:1752,
                name:'闲置',
              },
              {
                value:752,
                name:'报废',
              }
            ],
            itemStyle: {
              normal : {//饼状图上的文本显示
                label:{
                  show : true,
                  position : 'inner',
                  formatter: "{c}({d}%)",//数值和百分比
                  textStyle : {
                    fontSize : 12,
                    fontWeight : 'bolder'
                  }
                },
                labelLine:{
                  show : false //显示饼状图上的文本时，指示线不显示，在第一个data时显示指示线
                }
              }
            },
          }
        ]},
      option2:{
        tooltip:{},
        legend:{
          data:["销量"]
        },
        //x轴的文本
        xAxis:{
          data:[],
        },
        //y轴的文本
        yAxis:{
          name: '',//轴的名字，默认位置在y轴上方显示
        },
        series:[{
          type:"bar",
          barWidth : '30',
          data:[],
          itemStyle: {
            normal: {
              // color: '#FD6B71',//设置柱子颜色
              label: {
                show: true,//柱子上显示值
                position: 'top',//值在柱子上方显示
                textStyle: {
                  color: '#4099f7'//值得颜色
                }
              }
            }
          },
        }],
        color:['#4099f7'],

      },
    }
  },
  mounted(){
    this.reqtestiInfo()
    this.requestType()
    this.requestTypes()
    this.requestAsset(1)
    this.requestAssets(1)
  },
  methods:{
      handleClick(t,e){
        this.requestAsset(this.activeType)
        this.requestAssets(this.activeType)
      },
      //资产信息
      reqtestiInfo(){
        var vm =this
        vm.$http.post('/assetsInfo/getAssetOverview',{
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
        }).then(function (res) {
          if(res.code==200){
            vm.assetData = res.data
          }
        })
      },
  //    资产状态
      requestType(){
        var vm =this
        vm.$http.post('/assetsInfo/getStatusLegendData',{
          unitCode:'BJSCSYGJ',
          hospitalCode:'ZXYSHJ',
          userId:'4a00ebaa0219423daa55e07046f2edf9',
          userName:'张鹏',
        }).then(res=>{
          if(res.code=='200'){
            vm.statusData = res.data
          }
        })
      },
    requestTypes(){
      var vm =this
      vm.$http.post('/assetsInfo/getStatusSeriesData',{
        unitCode:'BJSCSYGJ',
        hospitalCode:'ZXYSHJ',
        userId:'4a00ebaa0219423daa55e07046f2edf9',
        userName:'张鹏',
      }).then(res=>{
        if(res.code=='200'){
          vm.option.series[0].data=res.data
          var myChart = vm.$echarts.init(document.getElementById('echartsbox'));
          myChart.setOption(
            vm.option
          )
        }
      })
    },
    requestAsset(type){
      var vm =this
      vm.$http.post('/assetsInfo/getCategoryXAxisData',{
        unitCode:'BJSCSYGJ',
        hospitalCode:'ZXYSHJ',
        userId:'4a00ebaa0219423daa55e07046f2edf9',
        userName:'张鹏',
        queryType:type
      }).then(res=>{
          if(res.code=='200'){
            if(type==2){
              vm.option2.yAxis.name = '万元'
            }else{
              vm.option2.yAxis.name = ''

            }
            vm.option2.xAxis.data=res.data
            var echat = this.$echarts.init(document.getElementById('optionbox'))
            echat.setOption(vm.option2)
          }
      })
    },
    requestAssets(type){
      var vm =this
      vm.$http.post('/assetsInfo/getCategorySeriesData',{
        unitCode:'BJSCSYGJ',
        hospitalCode:'ZXYSHJ',
        userId:'4a00ebaa0219423daa55e07046f2edf9',
        userName:'张鹏',
        queryType:type
      }).then(res=>{
          if(res.code=='200'){
            if(type==2){
              vm.option2.yAxis.name = '万元'
            }else{
              vm.option2.yAxis.name = ''

            }
            vm.option2.series[0].data=res.data
            var echat = this.$echarts.init(document.getElementById('optionbox'))
            echat.setOption(vm.option2)
          }
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index{
  text-align: left;
  color: #666;
  .topbox{
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    .bg-purple{
      /*height: 200px;*/
      background-color: #fff;
    }
  }
  .bottombox{
    margin-top: 20px;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    .bg-purple{
      height: 350px;
      background-color: #fff;
    }
  }
  .topleftbox{
    padding:0 20px;
    font-size: 14px;
    color: #666;
  }
  .title{
    height: 48px;
    line-height: 48px;
    padding: 0 10px;
    border-bottom: 1px solid #E9EEF3;

  }
  .labeltitle{
    height: 30px;
    line-height: 30px;
  }
  .lineone{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #E9EEF3;
    img{
      width: 30px;
      vertical-align: middle;
      padding-right: 10px;
    }
  }
  .linetwo{
    height: 50px;
    border-bottom: 1px solid #E9EEF3;
    line-height: 50px;
    img{
      width: 18px;
      vertical-align: middle;
      padding-right: 6px;
    }
  }
  .label{
    display: inline-block;
    vertical-align: middle;
  }
  .text{
    padding-left: 10%;
  }
  /*上部右侧*/
  .toprightbox{
    height: 223px;
    text-align: center;
    .rightlineheight{
      height: 223px;
      line-height: 223px;
    }
    .colorbox{
      position: relative;
      display: inline-block;
      line-height: 30px;
    }
    .colorbox::before{
      position: absolute;
      top: 17%;
      left: -30px;
      content:'';
      width: 20px;
      height: 20px;
      background-color: #4099f7;
    }
    .colorbox2::before{

      background-color: #91cc63;
    }
    .colorbox3::before{

      background-color: #d79566;
    }
  }

}

</style>
