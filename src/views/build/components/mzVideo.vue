<template>
    <div>
        <video class="video-js mz-video" ref="mzVideo" :poster="poster" :style="setStyle" :videoSrc="videoSrc">
            <!-- <source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/mp4' />
            <source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/webm' />
            <source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/ogg' /> -->
            <p class="vjs-no-js"> 
                不支持HTML5 video
            </p>
        </video>
    </div>
</template>
<script>
import video_png from "../../../images/video.jpg";
export default {
    props:['code','src','styleWidth','styleHeight'],
    data(){
        return {
            videoId:null,
            setStyle:{
                width:'200',
                height:'100'
            },
            myPlayer:null,
            poster:video_png,
            videoSrc:''
        }
    },
    mounted(){
        // this.videoId = "video"+this.code;
        this.setStyle.width = this.styleWidth;
        this.setStyle.height = this.styleHeight;
        this.videoSrc = this.src;
        
        // setTimeout(function(){
        //     this.myPlayer = videojs(this.$refs.mzVideo,{
        //         sources: [
        // 　　　　　　{src: this.src,type: 'video/mp4'},
        // 　　　　　　{src: this.src,type: 'video/webm'},
        // 　　　　　　{src: this.src,type: 'video/ogg'}
        // 　　　　]
        //     },function(){
        //         this.myPlayer.play();
        //     }.bind(this));
        //     window.myPlayer = this.myPlayer;
        // }.bind(this),100)
    },
    watch:{
        src(newVal){
            // this.initVideo();
            this.videoSrc = newVal;
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
        initVideo(){
            var self = this;
            // this.myPlayer.src(self.src);
        }
    }
}
</script>

