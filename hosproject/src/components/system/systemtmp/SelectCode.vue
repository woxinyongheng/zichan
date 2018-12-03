<template>
    <div class="selectcode">
      <p v-for="item in selectListData" v-if="selectListData.length" @click="removeList(item)">{{item.name}}</p>
    </div>
</template>

<script>
    export default {
        name: "SelectCode",
        props:['selectListData'],
        methods:{
          removeList(item){
            this.$emit('removeList',item)
          }
        }
    }
</script>

<style scoped lang="scss">
.selectcode{
  min-height: 300px;
  padding: 20px 0;
  border: 2px solid #E9EEF3;
  font-size: 14px;
  p{
    margin: 10px auto;
    width: 95%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    /*background: rgba(0,0,0,0.2);*/
    background-color:#f5f6fb;


  }
}
</style>
