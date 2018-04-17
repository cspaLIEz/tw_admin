<template>
  <div class="marqueebox" style="width:100%;min-height:100%;" :direction="direction" ref="marqueebox">
      {{content}}
  </div>
</template>
<script>
export default {
    props:['content','direction'],
    data(){
        return {
            dowebok: null
        }
    },
    mounted(){
        var self = this;
        $(function(){
            // self.dowebok = $(self.$refs.marqueebox).liMarquee({
            //     direction: self.direction,
            //     runshort: false,
            // });
        });
    },
    watch:{
        direction(newVal){
            // this.dowebok.liMarquee('destroy');
            // $(this.$refs.marqueebox).liMarquee({
            //     direction: this.direction
            // });
        }
    }
}
</script>


