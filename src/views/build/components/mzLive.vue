<template>
    <div>
        <video id=example-video class="video-js vjs-default-skin mz-live" ref="mzliver" :poster="poster" :style="setStyle" :liveSrc="liveSrc">
		  <!-- <source
		     src="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
		     type="application/x-mpegURL"> -->
		</video>
    </div>
</template>
<script>
import video_png from "../../../images/video.jpg";
export default {
    props:['liveurl','styleWidth','styleHeight'],
    data(){
        return {
            videoId:null,
            setStyle:{
                width:'200',
                height:'200'
            },
            myPlayer:null,
            poster:video_png,
            liveSrc:''
        }
    },
    mounted(){
        this.setStyle.width = this.styleWidth;
        this.setStyle.height = this.styleHeight;
        this.liveSrc = this.liveurl;

        // setTimeout(function(){
        //     this.myPlayer = videojs(this.$refs.mzliver,{
        //         width:this.setStyle.width,
        //         height:this.setStyle.height,
        //         sources: [
        // 　　　　　　{src: this.liveurl,type: 'application/x-mpegURL'}
        // 　　　　]
        //     },function(){
        //         this.myPlayer.play();
        //     }.bind(this));
        // }.bind(this),100)
    },
    watch:{
        liveurl(newVal){
            this.liveSrc = newVal;
            // this.initLive();
        },
        styleWidth(newVal){
            this.setStyle.width = newVal;
            // this.myPlayer.width(this.setStyle.width);
        },
        styleHeight(newVal){
            this.setStyle.height = newVal;
            // this.myPlayer.height(this.setStyle.height);
        }
    },
    methods:{
        initLive(){
            var self = this;
            // this.myPlayer.src(self.src);
        }
    }
}
</script>
