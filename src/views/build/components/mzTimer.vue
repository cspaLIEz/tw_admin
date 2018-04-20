<template>
    <div class="mz-timer" ref="mzTimer" :startTime="startTime" :finishTime="finishTime" :way="way">
        <span class="days">0</span>天
        <span class="hours">0</span>小时
        <span class="minutes">0</span>分
        <span class="seconds">0</span>秒
    </div>
</template>
<script>
export default {
    props:['endTime','way'],
    data(){
        return {
            startTime:'',
            finishTime:'',
            downTimer:null,
            upTimer:null
        }
    },
    created(){
        this.startTime = new Date().getTime();
        if(this.endTime && this.endTime!=' '){
            let a = new Date(this.endTime).getTime();
            this.finishTime = a-this.startTime>0 ? a: 0;
        } else {
            this.finishTime = new Date();
        }
    },
    mounted() {
        // this.updateTime();
    },
    watch:{
        endTime(newVal){
            if(newVal && newVal!=' '){
                let a = new Date(newVal).getTime();
                this.finishTime = a-this.startTime>0 ? a: 0;
            } else {
                this.finishTime = new Date();
            }
            this.updateTime();
        },
        way(){
            if(this.endTime && this.endTime!=' '){
                this.updateTime();
            }
        }
    },
    methods:{
        updateTime(){
            if(this.downTimer){
                this.downTimer.stop();
            }
            if(this.upTimer){
                this.upTimer.stop();
            }
            if(this.way == 2){
                
                this.downTimer = $(this.$refs.mzTimer).downCount({
                    date: DateFormat.format(new Date(this.finishTime),'yyyy/MM/dd hh:mm:ss'),
                    offset: +10
                }, function () {
                    alert('倒计时结束!');
                });
            } else {
                this.upTimer = $(this.$refs.mzTimer).upCount({
                    startDate: DateFormat.format(new Date(this.startTime),'yyyy/MM/dd hh:mm:ss'),
                    endDate: DateFormat.format(new Date(this.finishTime),'yyyy/MM/dd hh:mm:ss'),
                    offset: +10
                }, function () {
                    alert('计时结束!');
                });
            }
            
        }
    }
}
</script>


