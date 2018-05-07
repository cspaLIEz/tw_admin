<template>
  <div class="mz-dynamic-text">
    {{ text }}
  </div>
</template>
<script>
export default {
    props:['text'],
    mounted(){
      console.log(123,this.text);
    }
}
</script>
