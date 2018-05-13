<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    props:['sourceData'],
    data () {
        return {
            //
        };
    },
    watch:{
        sourceData(newVal){
            this.initData();
        }
    },
    mounted () {
        this.initData();
    },
    methods:{
        initData(){
            this.$nextTick(() => {
                if(!this.sourceData){
                    return;
                }
                let colors = ['#9bd598','#ffd58f','#abd5f2','#ab8df2','#e14f60'];
                let legendData = [],seriesData = [
                                // {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
                                // {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
                                // {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                                // {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
                                // {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                            ];
                let index = 0;
                for(let key in this.sourceData){
                    legendData.push(key);
                    // console.log(this.sourceData[key])
                    seriesData.push({
                        value: this.sourceData[key], name: key, itemStyle: {normal: {color: colors[index]}}
                    });
                    index++;
                }
                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: legendData
                    },
                    series: [
                        {
                            name: '访问来源',
                            type:'pie',
                            radius: ['55%', '75%'],
                            avoidLabelOverlap: false,
                            center: ['50%', '45%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        }
    }
};
</script>
