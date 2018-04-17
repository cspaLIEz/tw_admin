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
        setTimeout(function(){
            //图片轮播
            let mySwiper = new Swiper ('.swiper-container', {
                autoplay: true,
                loop: true
            })
            //文字滚动
            var marq_boxs = $(".marqueebox");
            for(var i=0;i<marq_boxs.size();i++){
                marq_boxs.eq(i).liMarquee({
                    direction: marq_boxs.eq(i).attr("direction")
                });
            }
            //日期
            for(var j=0;j<$(".mz-now-date").size();j++){
                $(".mz-now-date").eq(j).html(DateFormat.format(new Date(),$(".mz-now-date").eq(j).attr("pattern")));
            }
            setInterval(function(){
                for(var j=0;j<$(".mz-now-date").size();j++){
                    $(".mz-now-date").eq(j).html(DateFormat.format(new Date(),$(".mz-now-date").eq(j).attr("pattern")));
                }
            },1000);
            
        },200)
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


