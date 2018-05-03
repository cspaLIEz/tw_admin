<template>
    <div class="mz-timer" ref="mzTimer" :startTime="startTime" :finishTime="finishTime" :way="way">
        <span class="days" v-show="showFormat.days">0</span><span v-show="showFormat.days">天</span>
        <span class="hours" v-show="showFormat.hours">0</span><span v-show="showFormat.hours">小时</span>
        <span class="minutes" v-show="showFormat.minutes">0</span><span v-show="showFormat.minutes">分</span>
        <span class="seconds" v-show="showFormat.seconds">0</span><span v-show="showFormat.seconds">秒</span>
    </div>
</template>
<script>
export default {
    props:['endTime','way','showType'],
    data(){
        return {
            startTime:'',
            finishTime:'',
            downTimer:null,
            upTimer:null,
            showFormat:{
                days:true,
                hours:true,
                minutes:true,
                seconds:true
            }
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
        },
        showType(newVal){
            switch (newVal) {
                case '1':
                    this.showFormat = {
                        days:true,
                        hours:false,
                        minutes:false,
                        seconds:false
                    }
                    break;
                case '2':
                    this.showFormat = {
                        days:true,
                        hours:true,
                        minutes:false,
                        seconds:false
                    }
                    break;
                case '3':
                    this.showFormat = {
                        days:true,
                        hours:true,
                        minutes:true,
                        seconds:false
                    }
                    break;
                case '4':
                    this.showFormat = {
                        days:true,
                        hours:true,
                        minutes:true,
                        seconds:true
                    }
                    break;
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


