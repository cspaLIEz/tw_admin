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
        <Table border  :columns="columns" :data="tableData"  disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Button type="info">上一周</Button>
                <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-change="ChangeDate"></DatePicker>
                <Button type="info" @click="one()">下一周</Button>
                <span>&nbsp;&nbsp;</span>
                <Input v-model="value2" style="width: 30px"></Input>
                <Button type="info">跳转</Button>
            </div>
        </div>
    </div>
    <Modal v-model="deleteModal" title="时段节目信息" width="1280">
        
        <Table border  :columns="columns2" :data="data3.data.pinfo"  disabled-hover></Table>
        <div slot="footer">
            <Button @click="deleteModal=false" >关闭</Button>
        </div>
    </Modal>
  </Card>

        
</template>

<script>
import util from '../../../libs/util';
import {getplayschedulestat} from '@/api/api';
export default {
    name: 'releaseschedule',
    data(){
        return {
            deleteModal:false,
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
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        // console.log(params.row.timesect)
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Monday);
                        }
                },
                {
                    title: '3月6日星期二',
                    key: 'Tuesday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Tuesday);
                        }
                },
                {
                    title: '3月7日星期三',
                    key: 'Wednesday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Wednesday);
                        }
                },
                {
                    title: '3月8日星期四',
                    key: 'Thursday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Thursday);
                        }
                },
                {
                    title: '3月9日星期五',
                    key: 'Friday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Friday);
                        }
                },
                {
                    title: '3月10日星期六',
                    key: 'Saturday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Saturday);
                        }
                },
                {
                    title: '3月11日星期日',
                    key: 'Sunday',
                    align:'center',
                    render: (h, params) => {
                            return h('Button', {
                                style:{
                                    cursor:'pointer',
                                    width:'100%'
                                },
                                on:{
                                    click: ()=>{
                                        this.show(params.row.Monday)
                                    }
                                }
                            }, params.row.Sunday);
                        }
                }
                
            ],
            tableData: [
               
            ],
            startstop:'2014/8/8至2015/6/6',
            
            data: {
                        date:['1月15日星期一','2月25日星期一','3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一'],
                        playsum:[
                            {
                            timesect:'8:00-9:00',
                            Monday: 1,
                            Tuesday:2,
                            Wednesday:3,
                            Thursday:4,
                            Friday:5,
                            Saturday:6,
                            Sunday:7
                            },{
                            timesect:'9:00-10:00',
                            Monday: 21,
                            Tuesday:22,
                            Wednesday:23,
                            Thursday:24,
                            Friday:25,
                            Saturday:26,
                            Sunday:27
                            },{
                            timesect:'10:00-11:00',
                            Monday: 321,
                            Tuesday:32,
                            Wednesday:323,
                            Thursday:34,
                            Friday:35,
                            Saturday:36,
                            Sunday:37
                            }
                        ]
            },
            data2:{
                "pinfo": [{
                date:"(日期)",
                week:'(星期)',
                playsum:[
                {
                timesect:'(时段)',
                shiduan:{
                sum:'(节目数)',
                pslist:'(当时段播放日程列表)'
                }
                }
                ],//(分时段节目数) 
                        }]



            },
            data3:{
                data: {
                    pinfo: [{
                        id:"(记录顺序号)",
                        playPlanid:'(播放计划序号)',
                        releaseId:"(发布节目ID)",
                        progName:"(节目名)",
                        progCode:"(节目源码)",
                        progTime:"(节目时长)",
                        progSize:"(节目大小)",
                        prgPlayMode:"(播放模式)",
                        deployuserId:"(发布人)",
                        deployUserName:'(发布人名)',
                        deployTime:"(发布时间)",
                    },{
                        id:"11(记录顺序号)",
                        playPlanid:'22(播放计划序号)',
                        releaseId:"33(发布节目ID)",
                        progName:"44(节目名)",
                        progCode:"55(节目源码)",
                        progTime:"66(节目时长)",
                        progSize:"77(节目大小)",
                        prgPlayMode:"88(播放模式)",
                        deployuserId:"99(发布人)",
                        deployUserName:'10(发布人名)',
                        deployTime:"11(发布时间)",
                    }
                    ]
                }

            },
            columns2:[
                {
                    type:'index',
                    title:'序号'
                },{
                    title:'节目编号',
                    key:'releaseId'
                },{
                    title:'节目名称',
                    key:'progName'
                },{
                    title:'预览',
                    key:'progName'
                },{
                    title:'时长',
                    key:'progTime'
                },{
                    title:'大小（MB）',
                    key:'progSize'
                },{
                    title:'发布人',
                    key:'deployuserId'
                },{
                    title:'发布时间',
                    key:'deployTime'
                },{
                    title:'节目状态',
                    key:'deployTime'
                },{
                    title:' ',
                    width:'230',
                    render: (h, params) => {
                        return h('div',[
                            h('Button', {
                                style:{
                                    cursor:'pointer',
                                },
                                on:{
                                    click: ()=>{
                                        console.log(params.row.releaseId)
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                style:{
                                    cursor:'pointer',
                                    marginLeft:'20px'
                                },
                                on:{
                                    click: ()=>{
                                        console.log(params.row.releaseId)
                                    }
                                }
                            }, '播放or暂停')
                        ])
                            
                        }
                }
            ]

        }
    },
    methods:{
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
            for(var i=0;i<obj.date.length;i++){
                this.columns[i+1].title=obj.date[i]
            }
            this.tableData=obj.playsum
        },
        show(index){
            this.deleteModal=true
        },
        ChangeDate(a,b){
            alert(a)
        }
        
    },
    created:function(){
        let startTime=util.getMonday('s',0)
        let endTime=util.getMonday('e',0)
        this.resetup(this.data)
        this.tableData=this.data.playsum
        //请求列表数据
        getplayschedulestat({
            "loginer":"admin",
            "loginId":"YH0001",
            "startDate":"20180416",
            "startTime":"09:00:00",
            "endDate":"20180423",
            "endTime":"12:00:00",
            "devId":"ZD0002",//终端编号
            "timeSection":"15"//时间分段长度，只能为15，30，60分钟
        }).then(function(res){
                    console.log(res)
                })
    }
};
</script>
