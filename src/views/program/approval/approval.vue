<style lang="less">
    @import '../../../styles/common.less';
    @import './approval.less';
</style>

<template>
    <Card class="view-program-approval">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="24" class="handle-top-right">
                    <div class="search-item">
                        <Tag v-for="item in Object.keys(tagObj)" :key="item" :name="item" closable @on-close="handleCloseTag">{{tagObj[item]}}</Tag>
                    </div>
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:90px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search" @click="handleSearch"></Button>
                    </div>
                </Col>
            </Row>
        </div>
        <Table border ref="selection" @on-selection-change="hangdleSelect" :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalRecord" :current="currentPage" :page-size="pageSize" show-elevator show-total @on-change="changePage"></Page>
            </div>
        </div>
        <!--审批-->
        <Modal v-model="approveModel" title="审批">
            <div>
                <!-- <p><span>节目名称</span>{{curApprove.progName}}</p>
                <p><span>创建人</span>{{curApprove.progName}}</p>
                <p><span>节目名称</span>{{curApprove.progName}}</p>
                <p><span>节目名称</span>{{curApprove.progName}}</p> -->
                请选择审批结果
            </div>
            <div slot="footer" class="btn_center_wrap">			
                <Button type="primary" @click="approve(0);approveModel=false">通过</Button>
                <Button type="default" @click="approve(1);approveModel=false">不通过</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import { getprgappinfolist, approveprg } from '@/api/api';

export default {
    name: 'releaseschedule',
    data(){
        return {
            approveModel:false,
            curApprove:{},
            curApproveId:'',
            selectSearch:{},
            tagObj:{},
            totalRecord:1,
            totalPage:1,
            pageSize:20,
            currentPage:1,
            copyModel:false,
            copyForm:{
                copyName:"",
                newName:""
            },
            terminalType:[],
            checkSelection:[],
            typeList:[
                {
                    value: 'progName',
                    label: '节目名称'
                },
                {
                    value: 'updateTime',
                    label: '更新时间'
                }
            ],
            searchLikes:"",
            columns: [
                {
                    type: 'index',
                    width: 70,
                    title: '序号',
                    align: 'center'
                },
                {
                    title: '节目编号',
                    key: 'progid'
                },
                {
                    title: '节目名称',
                    key: 'progName'
                },
                {
                    title: '分辨率',
                    key: 'resolutionValue'
                },
                // {
                //     title: '预览',
                //     key: 'view'
                // },
                {
                    title: '时长',
                    key: 'progTime'
                },
                {
                    title: '大小（MB）',
                    key: 'progSize'
                },
                {
                    title: '创建人',
                    key: 'userName'
                },
                {
                    title: '更新时间',
                    key: 'updateTime'
                },
                {
                    title: '节目来源',
                    key: 'progSourceValue'
                },
                {
                    title: '审批状态',
                    key: 'progStatusValue'
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
                                    this.approveModel = true;
                                    this.curApproveId = params.row.progid;
                                    // this.approve(params.row.progid);
                                }
                            }
                        }, '审批')
                    ]);
                    }
                }
            ],
            tableData: [
                
            ],
            checkSelection:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(currentPage=this.currentPage,pageSize=this.pageSize,opertype=1,searchInfo=this.selectSearch){
            let data = {
                loginer:this.$store.state.user.user,
                loginId:this.$store.state.user.userId,
                pageSize,
                currentPage,
                opertype,
                ...searchInfo
            }
            getprgappinfolist(data).then((res)=>{
                if(res.status==0){
                    this.tableData = res.data.pinfo;
                    this.pageSize = pageSize;
                    this.currentPage = currentPage;
                    this.totalPage = res.data.totalPage;
                    this.totalRecord = res.data.totalRecord;
                    this.selectSearch = searchInfo;
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        handleSearch(){
            let { tagObj, terminalType, searchLikes} = this;
            tagObj[terminalType]=searchLikes;
            this.getList(1,this.pageSize,2,tagObj)
        },
        handleCloseTag(e,name){
            let tagObj= { ...this.tagObj };
            delete tagObj[name];
            this.tagObj=tagObj;
        },
        detail(index){

        },
        approve (resCode) {
            let data = {
                loginer:this.$store.state.user.user,
                loginId:this.$store.state.user.userId,
                progid:this.curApproveId,
                approveResultCode:resCode
            }
            approveprg(data).then((res)=>{
                if(res.status==0){
                    this.$Message.error(res.message);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        changePage(current) {
            this.getList(current)
        },
        hangdleSelect(selection){
            this.checkSelection=selection;
        }
    }
};
</script>
