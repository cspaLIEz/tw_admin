<style lang="less">
    @import '../../../styles/common.less';
    @import './lists.less';
</style>

<template>
    <Card class="view-release-lists">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info" @click="getlist">新建发布</Button>
                    <Button type="success">素材发布</Button>
                    <Button type="warning">一键发布</Button>
                </Col>
                <Col span="12" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:80px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search"></Button>
                    </div>
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal v-model="deleteModal" title="发布详情" width="880">
            <p style="font-size:16px;font-weigth:bold" >1.节目信息</p>
            
                <Form :model="terminalType" :label-width="80">
                    <Col span='8'>
                    <FormItem label="节目名称">
                        <Input v-model="terminalType" ></Input>
                    </FormItem>
                    </Col>
                    <Col span='8'>
                    <FormItem label="节目时长">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                     </Col>
                    <Col span='8'>
                    <FormItem label="节目分辨率">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                     </Col>
                    <FormItem label="节目描述">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                    <Col span='12'>
                    <FormItem label="发布模式">
                        <Select  style="width:200px">
                            <Option value="1">定时发布</Option>
                            <Option value="2">周期发布</Option>
                        </Select> 
                    </FormItem>
                    </Col>
                    <Col span='12'>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker> 
                    </FormItem>
                    </Col>
                    <FormItem label="播放模式">
                        <Select  style="width:200px">
                            <Option >定时发布</Option>
                            <Option >周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="起止时间">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> 
                    </FormItem>
                
            <p style="font-size:16px;font-weigth:bold" >2.播放日程</p>
            <p style="border:1px solid #dddee1;text-align:center">星期一 13:10~13:20</p>
            <p style="font-size:16px;font-weigth:bold" >3.终端信息</p>
            <Table border  :columns="columns" :data="tableData"></Table>
            </Form>
            <div slot="footer">
                <Button type="" @click="deleteModal=false">取消</Button>
                <Button type="" >确认</Button>
            </div>
        </Modal>
        <Modal v-model="detilModal" title="发布进度详情" width="880">
            <Table border  :columns="columns" :data="tableData"></Table>
            <div slot="footer">
                <Button type="" @click="detilModal=false">取消</Button>
                <Button type="" >确认</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import {Getrellist} from '@/api/api';
export default {
    name: 'releaseschedule',
    data(){
        return {
            terminalType:'aaa',
            detilModal:false,
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
            terminalType:"all",
            typeList:[
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'name',
                    label: '终端名称'
                },
                {
                    value: 'status',
                    label: '终端状态'
                },
                {
                    value: 'ip',
                    label: 'IP'
                },
                {
                    value: '分辨率',
                    label: '分辨率'
                }
            ],
            searchLikes:"",
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    type: 'index'
                },
                {
                    title: '节目编号',
                    key: 'progId'
                },
                {
                    title: '节目名称',
                    key: 'progName'
                },{
                    title: '分辨率',
                    key: 'resolutionValue'
                },{
                    title: '预览',
                    key: 'resolutionValue'
                },{
                    title: '时长',
                    key: 'resolutionValue'
                },{
                    title: '大小（MB）',
                    key: 'progSize'
                },{
                    title: '创建人',
                    key: 'progSourceName'
                },{
                    title: '更新时间',
                    key: 'updateTime'
                },{
                    title: '节目来源',
                    key: 'progSourceName'
                },{
                    title: '审批状态',
                    key: 'progSourceName'
                },{
                    title: '审批状态',
                    key: 'progSourceName'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.deleteModal=true
                                }
                            }
                        }, '详情'),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.detilModal=true
                                }
                            }
                        }, '进度详情')
                    ]);
                    }
                }
            ],
            tableData: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
                
            ],
            data: {
                pinfo: [{
                    progId:"(节目ID)",
                    progName:"(节目名)",
                    progCode:"(节目源码)",
                    progTime:"(节目时长)",
                    resolutionCode:"(节目分辨率代码)",
                    resolutionValue:"(节目分辨率)",
                    progSize:"(节目大小)",
                    progTypeCode:"(节目类型代码)",
                    progTypeName:"(节目类型)",
                    progStatusCode:"(节目状态代码)",
                    progStatusName:"(节目状态)",
                    updateTime:"(节目更新时间)",
                    progSourceCode:"(节目来源代码)",
                    progSourceName:"(节目来源)",
                    progUrl:"(节目下载地址)",
                }],
                rinfo: [{
                    resolutionCode:"(分辨率代码)",
                    resolutionValue:"(分辨率)",
                }],
                tinfo: [{
                    progTypeCode:"(节目类型代码)",
                    progTypeValue:"(节目类型)",
                }],
                sinfo: [{
                    progStatusCode:"（节目状态代码)",
                    progStatusValue:"(节目状态)",
                }],
                tinfo: [{
                    progSourceCode:"(节目来源代码)",
                    progSourceValue:"(节目来源)",
                }],
                totalPage: 1,
                pageSize: 20,
                currentPage: 1,
                totalRecord: 3
            }
        }
    },
    methods:{
        detail(index){

        },
        approve (index) {
            
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        },
        getlist(){
            Getrellist({
                loginer:"admin",
                currentPage:"1",
                pageSize:"10"
            }).then(function(res){
                console.log(res)
            })
        }
    },
    created:function(){
        this.tableData=this.data.pinfo
        
    }
};
</script>
