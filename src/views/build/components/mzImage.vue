<template>
  <img v-if="image.length<=1" :src="image[0]" :style="setStyle" alt=""/>
  <div v-else-if="image.length>1" class="swiper-container" :style="setStyle">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in image">
          <img :src="item" alt="">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
<script>
export default {
    props:['image','styleSet'],
    data(){
      return {
        setStyle:{
          width:'200px',
          height:'200px'
        }
      }
    },
    mounted(){
      this.setStyle.width = this.styleSet.width;
      this.setStyle.height = this.styleSet.height;
    },
    watch:{
      image(){
        this.initSwiper();
      },
      styleSet(){
        console.log(this.styleSet.width)
        this.setStyle.width = this.styleSet.width;
        this.setStyle.height = this.styleSet.height;
      }
    },
    methods:{
      initSwiper(){
        setTimeout(function(){
          var mySwiper = new Swiper ('.swiper-container', {
            autoplay: true,
            loop: true
          })
        },1000)
      }
    }
}
</script>
<style lang="less">
.swiper-container{
  max-width: 100%;
  max-height: 100%;
  img{
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

