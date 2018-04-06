<template>
  <div id="preview-container">

  </div>
</template>
<script>
export default {
    mounted(){
        var data = localStorage.getItem("previewHtml");
        if(data){
            $("#preview-container").html(data);
        }
        
    }
}
</script>
<style lang="less">
#preview-container{
    width: 100%;
    height: 100%;
    .build-page{
        width: 100%;
        height: 100%;
        overflow: hidden;
        transform-origin: center center;
        position: relative;
        .ui-icon-gripsmall-diagonal-se{
            display: none !important;
        }
        .ui-widget-content{
            cursor: pointer;
        }
        .build-page-node.normal-component{
            display: flex;
        }
    }
}
</style>


