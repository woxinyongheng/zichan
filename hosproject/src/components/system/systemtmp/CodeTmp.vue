<template>
    <div class="codetmp">
      <p v-for="item in listData" v-if="listData.length" @click="selectList(item)">{{item.name}}</p>

    </div>
</template>

<script>
    export default {
        name: "CodeTmp",
        props:['listData'],
        methods:{
          selectList(item){
            this.$emit('selectList',item)
          }
        }
    }
</script>

<style scoped lang="scss">
.codetmp{
  width: 100%;
  /*height: 200px;*/
  min-height: 300px;
  background-color: #E9EEF3;
  padding: 20px 0;
  font-size: 14px;
  p{
    margin: 10px auto;
    width: 95%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    background-color: #409EFF;
  }
}
</style>
