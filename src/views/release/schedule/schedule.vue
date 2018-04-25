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
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                <Button type="info" @click="one()">下一周</Button>
                <span>&nbsp;&nbsp;</span>
                <Input v-model="value2" style="width: 30px"></Input>
                <Button type="info">跳转</Button>
            </div>
        </div>
    </div>
    <Modal v-model="deleteModal" width="360">
        <p slot="header">
            <span>1111</span>
        </p>
        <div style="text-align:center">
            <p>111</p>
        </div>
        <div slot="footer">
            <Button type="error" @click="deleteModal=false">取消</Button>
            <Button type="error" >确认</Button>
        </div>
    </Modal>
  </Card>

        
</template>

<script>
import util from '../../../libs/util';
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
                        date:['3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一','3月5日星期一'],
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
            }

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
        }
        
    },
    created:function(){
        this.resetup(this.data)
    }
};
</script>
