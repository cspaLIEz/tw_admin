<template>
    <Card class="reset-card">
        <div slot="title">
            <div class="termainl-status-title">
                终端状态
                <div class="termainl-status-nav">
                    <a href="javascript:;" v-for="item in legend" @click="showCur(item)" :class="{'active':item.active}">
                        <span :style="item.style">
                            <img :src="item.img">
                        </span>
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <div style="width:100%;height:390px;" ref="terminalStatus"></div>
    </Card>
</template>
<script>
import clouldleave_png from '../../../images/index/clouldleave.png';
import clouldup_png from '../../../images/index/clouldup.png';
import pause_png from '../../../images/index/group47.png';
import playing_png from '../../../images/index/playing.png';
import echarts from 'echarts';
export default {
    data(){
        return {
            legend:[{
                title:'离线终端',
                img:clouldleave_png,
                active:false,
                style:{
                    backgroundColor:'#1d55a1'
                }
            },{
                title:'暂停终端',
                img:pause_png,
                active:false,
                style:{
                    backgroundColor:'#4B89DC'
                }
            },{
                title:'在线终端',
                img:clouldup_png,
                active:false,
                style:{
                    backgroundColor:'#26C6DA'
                }
            },{
                title:'正在播放',
                img:playing_png,
                active:false,
                style:{
                    backgroundColor:'#48CFAE'
                }
            }],
            terminalStatusCharts:{},
        }
    },
    mounted () {
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                show:false,
                data: ['离线终端', '暂停终端','在线终端','正在播放']
            },
            color:['#1d55a1','#4B89DC', '#26C6DA', '#48CFAE'],
            grid: {
                top:'0%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name: '离线终端',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '暂停终端',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '在线终端',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '正在播放',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                }
            ]
        };

        this.terminalStatusCharts = echarts.init(this.$refs.terminalStatus);
        this.terminalStatusCharts.setOption(option);
        // window.terminalStatusCharts = this.terminalStatusCharts;
        window.addEventListener('resize',  ()=>{
            this.terminalStatusCharts.resize();
        });
    },
    methods:{
        showCur(item){
            if(item.active){
                this.terminalStatusCharts.dispatchAction({
                    type: 'legendSelect',
                    name:item.title
                });
                item.active = false;
            } else {
                this.terminalStatusCharts.dispatchAction({
                    type: 'legendUnSelect',
                    name:item.title
                });
                item.active = true;
            }
            
        }
    }
}
</script>
<style lang="less" scoped>
.termainl-status-title{
    height: 40px;
    line-height: 40px;
    position: relative;
    .termainl-status-nav{
        position: absolute;
        right: 0px;
        top: 0px;
        a{
            color: #474C58;
            display: inline-block;
            font-size: 12px;
            padding: 0px 10px;
            span{
                display: inline-block;
                width: 23px;
                height: 23px;
                border-radius: 20px;
                line-height: 30px;
                text-align: center;
                position: relative;
                top: 3px;
            }
            &.active{
                span{
                    background-color: #bbb !important;
                }
            }
        }
    }
}
</style>


