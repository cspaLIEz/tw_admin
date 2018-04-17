<template>
  <div class="mz-now-date" :pattern="pattern">
    {{ showDate }}
  </div>
</template>
<script>
export default {
    props:['pattern'],
    data(){
        return {
            showDate:'',
            intervalId:null
        }
    },
    mounted(){
        this.showDate = DateFormat.format(new Date(),this.pattern);
        this.intervalId = setInterval(function(){
            this.showDate = DateFormat.format(new Date(),this.pattern);
        }.bind(this),1000)
    },
    destroyed(){
        clearInterval(this.intervalId);
    },
    watch:{
        pattern(newVal){
            // this.showDate = DateFormat.format(new Date(),newVal);
        }
    }
}
</script>
