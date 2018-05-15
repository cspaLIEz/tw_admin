<style lang="less">
    @import '../../../styles/common.less';
    @import './lists.less';
</style>

<template>
    <Card class="view-program-lists">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info" @click="$router.push('/program/build')">新建节目</Button>
                    <Button type="warning" @click="handleDel()">删除节目</Button>
                    <Button type="success">导出节目</Button>
                    <!-- <Button type="warning">导入节目</Button> -->
                </Col>
                <Col span="12" class="handle-top-right">
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
        <Modal
            v-model="copyModel"
            title="复制节目"
            width="500">
            <Form :model="copyForm" :label-width="100">
                <FormItem label="待复制节目名">
                    <Input v-model="copyForm.copyName"></Input>
                </FormItem>
                <FormItem label="新节目名">
                    <Input v-model="copyForm.newName"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="delModelConfig" width="360" title='删除节目'>
            <div>
                请确认删除所选中的节目！
            </div>
            <div slot="footer" class="btn_center_wrap">			
                <Button type="primary" @click="handleDelOk">确认</Button>
                <Button type="default" @click="delModelConfig=false">取消</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import { Getprginfolist, delprg, submitprg } from '@/api/api';

export default {
    name: 'releaseschedule',
    data(){
        return {
            delModelConfig: false,
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 70,
                    title: '序号',
                    align: 'center'
                },
                {
                    title: '节目编号',
                    key: 'progId'
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
                                    this.copyModel = true;
                                    // this.copyModel(params)
                                    console.log(params);
                                    this.copyForm.copyName = params.row.name;
                                    this.copyForm.newName = params.row.name + "-001";
                                }
                            }
                        }, '复制'),
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
                        }, '编辑'),
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

                                }
                            }
                        }, '预览'),
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
                                    console.log(params.row.progId);
                                    this.submitToApproval(params.row.progId);
                                }
                            }
                        }, '提交')
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
                ...searchInfo
            }
            Getprginfolist(data).then((res)=>{
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
        approve (index) {
            
        },
        changePage(current) {
            this.getList(current)
        },
        hangdleSelect(selection){
            this.checkSelection=selection;
        },
        handleDel(){
            if(this.checkSelection.length>0){
                this.delModelConfig=true
            }else{
                this.$Message.error("至少选中一项")
            }
        },
        handleDelOk(){
            // if(this.checkSelection.length>0){
            //     this.checkSelection.forEach(function(item){
            //         this.tableData.forEach(function(row,index){
            //             if(item.code == row.code){
            //                 this.tableData.splice(index,1);
            //             }
            //         }.bind(this))
            //     }.bind(this))
            // }
            let progIdStr=""
            this.checkSelection.map((item,index)=>{
                if(index==this.checkSelection.length-1){
                    progIdStr+=item.progId
                }else{
                    progIdStr += item.progId + ";";
                }
            })
            let data = {
                loginer:this.$store.state.user.user,
                loginId:this.$store.state.user.userId,
                progId:progIdStr
            }
            // console.log(progIdStr);
            delprg(data).then((res)=>{
                if(res.status==0){
                    this.$Message.success("删除成功");
                    this.delModelConfig=false;
                    this.getList();
                }else{
                    this.$Message.error(res.message)
                }
            })
        
        },
        submitToApproval(progid){
            let data = {
                loginer:this.$store.state.user.user,
                loginId:this.$store.state.user.userId,
                progid:progid
            };
            submitprg(data).then((res)=>{
                if(res.status==0){

                } else {
                    this.$Message.error(res.message);
                }
            })
        }
    }
};
</script>
