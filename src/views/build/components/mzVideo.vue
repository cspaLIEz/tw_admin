<template>
    <div>
        <video :id="videoId" class="video-js" controls width="200" height="100">
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
export default {
    props:['code','src','styleWidth','StyleHeight'],
    data(){
        return {
            videoId:null,
            setStyle:{
                width:'200',
                height:'200'
            },
            myPlayer:null,
        }
    },
    mounted(){
        this.videoId = "video"+this.code;
        this.setStyle.width = parseInt(this.styleWidth);
        this.setStyle.height = parseInt(this.StyleHeight);

        setTimeout(function(){
            this.myPlayer = videojs(this.videoId,{
                width:this.setStyle.width,
                height:this.setStyle.height,
                sources: [
        　　　　　　{src: this.src,type: 'video/mp4'},
        　　　　　　{src: this.src,type: 'video/webm'},
        　　　　　　{src: this.src,type: 'video/ogg'}
        　　　　]
            },function(){
                this.myPlayer.play();
            }.bind(this));
            window.myPlayer = this.myPlayer;
        }.bind(this),100)
    },
    watch:{
      src(){
        this.initVideo();
      },
      styleWidth(newVal){
          this.setStyle.width = parseInt(newVal);
        this.myPlayer.width(this.setStyle.width);
      },
      StyleHeight(newVal){
        this.setStyle.height = parseInt(newVal);
        this.myPlayer.height(this.setStyle.height);
      }
    },
    methods:{
        initVideo(){
            var self = this;
            this.myPlayer.src(self.src);
        }
    }
}
</script>

