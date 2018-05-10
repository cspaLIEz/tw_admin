<style lang="less">
    @import '../../../styles/common.less';
    @import './handle.less';
</style>

<template>
    <Card class="view-journal-handle">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="primary" @click="exportData()"><Icon type="ios-download-outline" style="margin-right:5px"></Icon>导出日志</Button>
                    <Button type="warning">清理日志</Button>
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
        <div class="view-main">
          <Table border  :columns="columns" :data="tableData" ref="table"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
            </div>
          </div>
        </div>
    </Card>
</template>

<script>
import {getloginfolist} from '@/api/api';
export default {
    name: 'releaseschedule',
    data(){
        return {
            totalRecord:1,
            totalPage:1,
            pageSize:20,
            currentPage:1,
            selectSearch:{},
            tagObj:{},
            terminalType:"all",
            typeList:[
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'userId',
                    label: '操作人'
                },
                {
                    value: 'operModule',
                    label: '操作模块'
                },
                {
                    value: 'logContent',
                    label: '日志内容'
                },
                {
                    value: 'logType',
                    label: '日志类型'
                },
                {
                    value: 'operResult',
                    label: '操作结果'
                },
            ],
            searchLikes:"",
            columns: [
                {
                    type: 'index',
                    width: 61,
                    title: '序号',
                    align: 'center'
                },
                {
                    title: '日志时间',
                    key: 'createTime'
                },
                {
                    title: '操作人',
                    key: 'userId'
                },
                {
                    title: '操作模块',
                    key: 'operModule'
                },
                {
                    title: 'IP',
                    key: 'userIp',
                },
                {
                    title: '事件名',
                    key: 'ename',
                },
                {
                    title: '日志类型',
                    key: 'logType',
                },
                {
                    title: '日志内容',
                    key: 'logContent',
                },
                {
                    title: '操作结果',
                    key: 'operResultCode',
                },
            ],
            tableData: [
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                
            ]
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch,operType=1){
            let data = {
                pageSize,
                currentPage,
                operType,
                ...searchInfo
            }
            getloginfolist(data).then((res)=>{
                console.log(res)
                if(res.status==0){
                    this.tableData=res.data.pinfo;
                    this.pageSize=pageSize;
                    this.currentPage=currentPage;
                    this.totalPage=res.data.totalPage;
                    this.totalRecord=res.data.totalRecord;
                    this.selectSearch=searchInfo;
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        handleSearch(){
            let { tagObj, terminalType, searchLikes} = this;
            tagObj[terminalType]=searchLikes;
            this.getList(1,this.pageSize,tagObj,2)
        },
        handleCloseTag(e,name){
            let tagObj= { ...this.tagObj };
            delete tagObj[name];
            this.tagObj=tagObj;
        },
        changePage(current) {
            this.getList(current)
        },
        exportData(){
            this.$refs.table.exportCsv({
                filename: 'The original data'
            });
        },
    }
};
</script>
