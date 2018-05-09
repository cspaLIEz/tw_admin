<template>
    <div>
        <iframe allowtransparency="true" frameborder="0" :style="setStyle" scrolling="no" 
        :src="iframeSrc">
        </iframe>
    </div>
</template>
<script>
export default {
    props:['fromUrl','days','styleWidth','styleHeight','type'],
    data(){
        return {
            setStyle:{
                width:'200px',
                height:'100px'
            },
            iframeSrc:'http://tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=0&v=0&d=1&bd=0&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=290&h=96&align=center',
            showType:0,
            showDays:1
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
        },
        days(newVal){
            if(Number(newVal)){
                this.iframeSrc = `http://tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=0&v=0&d=${newVal}&bd=0&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=290&h=96&align=center`
            }
        }
    }
}
</script>

