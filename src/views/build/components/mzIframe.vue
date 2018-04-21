<template>
    <iframe :src="pageurl" frameborder="0" :style="setStyle"></iframe>
</template>
<script>
export default {
    props:['pageurl','styleWidth','styleHeight'],
    data(){
        return {
            setStyle:{
                width:'200px',
                height:'100px'
            }
        }
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
        }
    },
}
</script>

