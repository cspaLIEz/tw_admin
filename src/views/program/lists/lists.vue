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
                    <Button type="warning" @click="deleteSelectProgram">删除节目</Button>
                    <Button type="success">导出节目</Button>
                    <Button type="warning">导入节目</Button>
                </Col>
                <Col span="12" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:80px" filterable multiple>
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
        <Table border ref="selection" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange"></Table>
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
    </Card>
</template>

<script>
import { Getprginfolist } from '@/api/api';

export default {
    name: 'releaseschedule',
    data(){
        return {
            selectSearch:{},
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
                {
                    title: '预览',
                    key: 'view'
                },
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
                        }, '编辑')
                    ]);
                    }
                }
            ],
            tableData: [
                // {
                //     "code": "PM2018030821360001",
                //     "name": "节目1",
                //     "fbl": "1900*1200",
                //     "view": "使用节目缩略图，点击后预览",
                //     "time": "2016-10-03",
                //     "size": "",
                //     "author": "admin",
                //     "updateTime": "2016-10-03",
                //     "from": "新建",
                //     "approve": "通过"
                // },
                // {
                //     "code": "PM2018030821360002",
                //     "name": "节目2",
                //     "fbl": "1900*1200",
                //     "view": "使用节目缩略图，点击后预览",
                //     "time": "2016-10-03",
                //     "size": "",
                //     "author": "admin",
                //     "updateTime": "2016-10-03",
                //     "from": "新建",
                //     "approve": "通过"
                // }
            ],
            checkedDatas:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
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
            let obj = {}
            this.terminalType.map((item)=>{
                obj[item]=this.searchLikes
            })
            console.log(obj)
            this.getList(1,this.pageSize,obj)
        },
        detail(index){

        },
        approve (index) {
            
        },
        changePage(current) {
            this.getList(current)
        },
        onSelectionChange(selection){
            console.log(selection)
            this.checkedDatas = selection;
        },
        deleteSelectProgram(){
            this.$Modal.confirm({
                title: '<h4>警 告</h4>',
                content: '<p>请确认删除所选中的节目！(要求判断有一个或多个节目被选中了才能转到这一步，否则提示需要先选择节目)</p>',
                onOk: () => {
                    if(this.checkedDatas.length>0){
                        this.checkedDatas.forEach(function(item){
                            this.tableData.forEach(function(row,index){
                                if(item.code == row.code){
                                    this.tableData.splice(index,1);
                                }
                            }.bind(this))
                        }.bind(this))
                    }
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
            
        }
    }
};
</script>
