<style lang="less">
    @import '../../../styles/common.less';
    @import './lists.less';
</style>

<template>
    <Card class="view-release-lists">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info">新建发布</Button>
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
    </Card>
</template>

<script>
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
                                    this.detail(params.index)
                                }
                            }
                        }, '详情')
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
        }
    },
    created:function(){
        this.tableData=this.data.pinfo
    }
};
</script>
