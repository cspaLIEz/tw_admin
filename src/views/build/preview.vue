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

            //计时器
            for(var m=0;m<$(".mz-timer").size();m++){
                
                var startTime = parseInt($(".mz-timer").eq(m).attr("startTime"));
                var finishTime = parseInt($(".mz-timer").eq(m).attr("finishTime"));
                
                if($(".mz-timer").eq(m).attr("way") == 2){
                    $(".mz-timer").eq(m).downCount({
                        date: DateFormat.format(new Date(finishTime),'yyyy/MM/dd hh:mm:ss'),
                        offset: +10
                    }, function () {
                        alert('倒计时结束!');
                    });
                } else {
                    $(".mz-timer").eq(m).upCount({
                        startDate: DateFormat.format(new Date(startTime),'yyyy/MM/dd hh:mm:ss'),
                        endDate: DateFormat.format(new Date(finishTime),'yyyy/MM/dd hh:mm:ss'),
                        offset: +10
                    }, function () {
                        alert('计时结束!');
                    });
                }
                
            }

            function createIframe (options) {
                var iframe = document.createElement('iframe');
                iframe.src = options.url;
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                return iframe;
            };
            
            //文档
            for(var n=0;n<$(".mz-file-site").size();n++){
                $(".mz-file-site").append(createIframe({
                    url:$(".mz-file-site").eq(n).attr('iframesrc')
                }))
            }
            

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
        word-wrap: break-word;
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


