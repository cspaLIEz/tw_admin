<template>
    <div>
        <video id=example-video width=600 height=300 class="video-js vjs-default-skin" ref="mzliver" controls>
		  <!-- <source
		     src="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
		     type="application/x-mpegURL"> -->
		</video>
    </div>
</template>
<script>
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
        }
    },
    mounted(){
        this.setStyle.width = parseInt(this.styleWidth);
        this.setStyle.height = parseInt(this.styleHeight);

        setTimeout(function(){
            this.myPlayer = videojs(this.$refs.mzliver,{
                width:this.setStyle.width,
                height:this.setStyle.height,
                sources: [
        　　　　　　{src: this.liveurl,type: 'application/x-mpegURL'}
        　　　　]
            },function(){
                this.myPlayer.play();
            }.bind(this));
        }.bind(this),100)
    },
    watch:{
        liveurl(){
            this.initLive();
        },
        styleWidth(newVal){
            this.setStyle.width = parseInt(newVal);
            this.myPlayer.width(this.setStyle.width);
        },
        styleHeight(newVal){
            this.setStyle.height = parseInt(newVal);
            this.myPlayer.height(this.setStyle.height);
        }
    },
    methods:{
        initLive(){
            var self = this;
            this.myPlayer.src(self.src);
        }
    }
}
</script>
