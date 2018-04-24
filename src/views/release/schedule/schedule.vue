<style lang="less">
    @import '../../../styles/common.less';
    @import './schedule.less';
</style>

<template>
  <Card class="view-release-schedule">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="8" class="handle-top-left">
                    终端名：终端1
                </Col>
                <Col span="8" class="handle-top-center">
                    {{this.startstop}}
                </Col>
                <Col span="8" class="handle-top-right">
                    时段设置
                    <Select v-model="times" style="width:50px">
                        <Option v-for="item in timeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Button type="info">上一周</Button>
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                <Button type="info" @click="one()">下一周</Button>
                <span>&nbsp;&nbsp;</span>
                <Input v-model="value2" style="width: 30px"></Input>
                <Button type="info">跳转</Button>
            </div>
        </div>
    </div>
  </Card>
</template>

<script>
import util from '../../../libs/util';
export default {
    name: 'releaseschedule',
    data(){
        return {
            value2:1,
            treeData:[
                {
                    title: '终端分组1',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
                        }
                    ]
                },
                {
                    title: '终端分组2',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
                        }
                    ]
                }
            ],
            times:"10",
            timeSelect:[
                {
                    value: '10',
                    label: '10'
                },
                {
                    value: '15',
                    label: '15'
                },
                {
                    value: '30',
                    label: '30'
                },
                {
                    value: '60',
                    label: '60'
                }
            ],
            columns: [
                {
                    title: '时段',
                    key: 'timesect',
                    align:'center'
                },
                {
                    title: '3月5日星期一',
                    key: 'Monday',
                    align:'center'
                },
                {
                    title: '3月6日星期二',
                    key: 'Tuesday',
                    align:'center'
                },
                {
                    title: '3月7日星期三',
                    key: 'Wednesday',
                    align:'center'
                },
                {
                    title: '3月8日星期四',
                    key: 'Thursday',
                    align:'center'
                },
                {
                    title: '3月9日星期五',
                    key: 'Friday',
                    align:'center'
                },
                {
                    title: '3月10日星期六',
                    key: 'Saturday',
                    align:'center'
                },
                {
                    title: '3月11日星期日',
                    key: 'Sunday',
                    align:'center'
                }
                
            ],
            tableData: [
                {
                    timesect: '8:00-9:00',
                    Monday: 18,
                    Tuesday:2,
                    Wednesday:3,
                    Thursday:4,
                    Friday:5,
                    Saturday:6,
                    Sunday:7
                }
            ],
            startstop:'2014/8/8',
            data: {
                pinfo:[{
                        date:'3月5日',//(日期)
                        week:'星期一',//(星期)
                        playsum:[
                            {
                            timesect:'8:00-9:00',//(时段)
                            sum:'2'//(节目数)
                            },
                            {
                            timesect:'9:00-10:00',//(时段)
                            sum:'2'//(节目数)
                            },
                            {
                            timesect:'10:00-11:00',//(时段)
                            sum:'3'//(节目数)
                            }
                        ],//(分时段节目数) 
                    },{
                        date:'3月6日',//(日期)
                        week:'星期二',//(星期)
                        playsum:[
                            {
                            timesect:'8:00-9:00',//(时段)
                            sum:'0'//(节目数)
                            },
                            {
                            timesect:'9:00-10:00',//(时段)
                            sum:'2'//(节目数)
                            },
                            {
                            timesect:'10:00-11:00',//(时段)
                            sum:'63'//(节目数)
                            }
                        ],//(分时段节目数) 
                    }]
            }

        }
    },
    methods:{
        register(index){

        },
        remove (index) {
            this.tableData.splice(index, 1);
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        },
        one (){
            // alert(1);
            // console.log(this.columns)
            // this.columns[2].title=1
            // let aa={
            //     title: '3月11111日星期日',
            //     key: 'address'
            // }
            // this.columns.push(aa)
            alert(util.getMonday('s',-1)+','+util.getMonday('e',-1))
        },
        resetup (obj){
            for(var i=0;i<obj.pinfo.length;i++){
                
            }
        }
        
    },
    created:function(){
        console.log(1)
    }
};
</script>
