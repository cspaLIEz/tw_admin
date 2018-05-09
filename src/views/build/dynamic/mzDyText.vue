<template>
  <div class="mz-dynamic-text" :dataurl="dataurl">
    {{ text }}
  </div>
</template>
<script>
import axios from 'axios';
export default {
    props:['dataurl'],
    data(){
      return {
        text:''
      }
    },
    mounted(){
      axios.get(this.dataurl).then(res=>{
        if(res.status===200){
          this.text = res.data;
        } else {
          this.$Message.error("数据获取错误！");
        }
      })
    }
}
</script>
