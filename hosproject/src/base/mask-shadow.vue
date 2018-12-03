<template>
 <transition name="el-fade-in-linear">
  <div class="shadow">
    <div class="content">
      <slot></slot>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="scss">
.shadow{
  position: absolute;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
