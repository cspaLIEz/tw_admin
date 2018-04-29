<template>
  <div style="position:relative;" :style="setStyle">
      <div ref="qrcode" class="mz-qrcode"></div>
      <img v-if="logo" :src="logo" style="width:50px;height:50px;border-radius:4px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)" />
  </div>
</template>
<script>
export default {
    props:['content','logoUrl','styleWidth','styleHeight'],
    data(){
        return {
            setStyle:{
                width:'200px',
                height:'100px'
            },
            mQrcode:null,
            logo: null,
        }
    },
    mounted(){
        this.setStyle.width = this.styleWidth;
        this.setStyle.height = this.styleHeight;
        var style = document.createElement('style');
        style.innerHTML=`
            .mz-qrcode{
                width:100%;
                height:100%;
            }
            .mz-qrcode img{
                width:100%;
                height:100%;
            }
        `;
        this.$refs.qrcode.appendChild(style);
        this.mQrcode = new QRCode(this.$refs.qrcode, {
            text: this.content,
            width: parseInt(this.setStyle.width),
            height: parseInt(this.setStyle.height),
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
        });
        window.mQrcode = this.mQrcode;
    },
    watch:{
        styleWidth(newVal){
            this.setStyle.width = newVal;
        },
        styleHeight(newVal){
            this.setStyle.height = newVal;
        },
        logoUrl(newVal){
            if(newVal && newVal!=' ') this.logo = newVal;
        },
        content(newVal){
            this.mQrcode.clear();
            this.mQrcode.makeCode(newVal);
        }
    }
}
</script>


