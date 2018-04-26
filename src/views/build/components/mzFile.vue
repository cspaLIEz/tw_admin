<template>
    <div class="mz-file-site" :fileurl="fileurl" v-bind:style="setStyle" :iframesrc="iframeSrc">
        
    </div>
</template>
<script>
export default {
    props:['fileurl','styleWidth','styleHeight'],
    data(){
        return {
            setStyle:{
                width:'200px',
                height:'100px'
            },
            iframeSrc:'http://localhost:8081/static/libs/pdfjs/web/viewer.html',
        }
    },
    created(){

    },
    mounted(){
        this.setStyle.width = this.styleWidth;
        this.setStyle.height = this.styleHeight;
    },
    watch:{
        styleWidth(newVal){
            this.setStyle.width = newVal;
        },
        styleHeight(newVal){
            this.setStyle.height = newVal;
        },
        fileurl(newVal){
            this.iframeSrc = this.iframeSrc + '?file='+newVal;
        }
    }
}
</script>

