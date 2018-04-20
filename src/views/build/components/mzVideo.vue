<template>
    <video :id="videoId" class="video-js" controls preload="auto":width="setStyle.width" :height="setStyle.height">
        <source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/mp4' />
		<source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/webm' />
		<source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type='video/ogg' />
        <p class="vjs-no-js"> 
			不支持HTML5 video
		</p>
    </video>
</template>
<script>
export default {
    props:['code','src','styleSet'],
    data(){
        return {
            videoId:null,
            setStyle:{
            width:'200',
            height:'200'
            }
        }
    },
    mounted(){
        this.videoId = "video"+this.code;
        this.setStyle.width = parseInt(this.styleSet.width);
        this.setStyle.height = parseInt(this.styleSet.height);
    },
    watch:{
      src(){
        this.initVideo();
      },
      styleSet(){
        console.log(this.styleSet.width)
        this.setStyle.width = this.styleSet.width;
        this.setStyle.height = this.styleSet.height;
      }
    },
    methods:{
      initVideo(){
        setTimeout(function(){
            var myPlayer = videojs(this.videoId);
			videojs(this.videoId).ready(function(){
				var myPlayer = this;
				myPlayer.play();
			});
        },1000)
      }
    }
}
</script>

