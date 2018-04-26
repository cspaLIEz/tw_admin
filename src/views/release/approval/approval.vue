<style lang="less">
    @import '../../../styles/common.less';
    @import './approval.less';
</style>

<template>
    <Card class="view-release-approval">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="24" class="handle-top-right">
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
        <Modal v-model="deleteModal" title="发布详情" >
            <p style="font-size:16px;font-weigth:bold" >1.节目信息</p>
                <Form :model="terminalType" :label-width="80">
                    <FormItem label="节目名称">
                        <Input v-model="terminalType" ></Input>
                    </FormItem>
                    <FormItem label="节目时长">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                    <FormItem label="节目分辨率">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                    <FormItem label="节目描述">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                    <FormItem label="发布模式">
                        <Select  style="width:200px">
                            <Option value="1">定时发布</Option>
                            <Option value="1">周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker> 
                    </FormItem>
                    <FormItem label="播放模式">
                        <Select  style="width:200px">
                            <Option >定时发布</Option>
                            <Option >周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="起止时间">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> 
                    </FormItem>
                </Form>
            <p style="font-size:16px;font-weigth:bold" >2.播放日程</p>
            <p style="border:1px solid #dddee1;text-align:center">星期一 13:10~13:20</p>
            <p style="font-size:16px;font-weigth:bold" >3.终端信息</p>
            <Table border  :columns="columns" :data="tableData"></Table>
            <p style="font-size:16px;font-weigth:bold" >4.审批操作</p>
            <FormItem label="审批结果">
                <Select  style="width:200px">
                <Option >审批通过</Option>
                <Option >审批未通过</Option>
                </Select> 
            </FormItem>
            <FormItem label="审批意见">
                <Input v-model="terminalType"></Input>
            </FormItem>
            <div slot="footer">
                <Button type="" @click="deleteModal=false">取消</Button>
                <Button type="" >确认</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
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
                    align:'center',
                    width:60,
                    title:'序号',
                    type:'index'
                    //key:'progid'
                },
                {
                    title: '发布单号',
                    key: 'progid'
                },
                {
                    title: '节目名称',
                    key: 'progName'
                },{
                    title: '审批状态',
                    key: 'approveResultCode',
                    render: (h, params) => {
                            const row = params.row;
                            const text = row.approveResultCode==1?'审核通过':'审核未通过';

                            return h('div', {
                                props: {
                                }
                            }, text);   
                        }
                },{
                    title: '审批意见',
                    key: 'approveResultValue'
                },{
                    title: '更新时间',
                    key: 'updateTime'
                },
                {
                    title: ' ',
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
                        }, '详情'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.approve(params.index)
                                }
                            }
                        }, '审批')
                    ]);
                    }
                }
            ],
            tableData: [],
            data:{
                pinfo:[{
                    progid:'1',
                    progName:'节目名',
                    progCode:'节目源码',
                    progTime:'节目时长',
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
                    approveResultCode:"1",
                    approveUserId:"(审批人代码）",
                    approveUserName:"(审批人名)",
                    approveTime:"(审批时间)",
            },{
                    progid:'2',
                    progName:'节目名',
                    progCode:'节目源码',
                    progTime:'节目时长',
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
                    approveResultCode:"0",
                    approveUserId:"(审批人代码）",
                    approveUserName:"(审批人名)",
                    approveTime:"(审批时间)",
            }],
            ainfo:[{
                    approveResultCode:"(审批结果代码)",
                    approveResultValue:"(审批结果)"
                }],
            rinfo:[{
                resolutionCode:"(分辨率代码)",
                resolutionValue:"(分辨率)",

                }],
            sinfo:[{
                progStatusCode:"（节目状态代码)",
                progStatusValue:"(节目状态)",
            }],
            "totalPage": 1,
            "pageSize": 20,
            "currentPage": 1,
            "totalRecord": 3

            }
        }
    },
    methods:{
        detail(index){
            this.deleteModal=true
        },
        approve (index) {
            this.deleteModal=true
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
