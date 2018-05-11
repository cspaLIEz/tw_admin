<style lang="less">
    @import "../../../styles/common.less";
    @import "./broadcast-message.less";
</style>
<template>
  <Card class="view-journal-broadcast-message">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="4" class="handle-top-left">
                    <Button type="primary" @click="exportData()"><Icon type="ios-download-outline" style="margin-right:5px"></Icon>导出日志</Button>
                </Col>
                <Col span="20" class="handle-top-right">
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
import {getmsglist,getdevgroupinfolist} from '@/api/api';
export default {
    data(){
        return {
            totalRecord:1,
            totalPage:1,
            pageSize:20,
            currentPage:1,
            tagObj:{},
            selectSearch:{},
            treeData:[
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
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
                    value: 'msgTitle',
                    label: '消息主旨'
                },
                {
                    value: 'msgContent',
                    label: '消息内容'
                },
                {
                    value: 'userName',
                    label: '创建人'
                }
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
                    title: '终端编号',
                    key: 'devId'
                },
                {
                    title: '消息主旨',
                    key: 'msgTitle'
                },
                {
                    title: '消息内容',
                    key: 'msgContent'
                },
                {
                    title:"创建人",
                    key:'userName'
                },
            ],
            tableData: [
                {
                    createPeople: 'John Brown',
                    devId: 18,
                    msgContent: 'New York No. 1 Lake Park',
                    playStartTime: '2016-10-03',
                    playEndTime: '2016-10-03',
                },
                {
                    createPeople: 'John Brown',
                    devId: 18,
                    msgContent: 'New York No. 1 Lake Park',
                    playStartTime: '2016-10-03',
                    playEndTime: '2016-10-03',
                },
                {
                    createPeople: 'John Brown',
                    devId: 18,
                    msgContent: 'New York No. 1 Lake Park',
                    playStartTime: '2016-10-03',
                    playEndTime: '2016-10-03',
                },
                {
                    createPeople: 'John Brown',
                    devId: 18,
                    msgContent: 'New York No. 1 Lake Park',
                    playStartTime: '2016-10-03',
                    playEndTime: '2016-10-03',
                },
                
            ]
        }
    },
    mounted(){
        this.getLeftGroup();
        this.getList()
    },
    methods:{
        register(index){

        },
        getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch,operType=1){
            let data = {
                pageSize,
                currentPage,
                operType,
                ...searchInfo
            }
            getmsglist(data).then((res)=>{
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
            console.log(22,this.$store.state.user.userId)
            
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
        getLeftGroup(){
            getdevgroupinfolist({loginId:'YH0001'}).then((res)=>{
                console.log(res)
                let dataArr = []
                dataArr=res.data.tree;
                dataArr.map((item,index)=>{
                    if(item.orggroup){
                        item.children=item.orggroup;
                        item.title=item.organName;
                        item.children.map((childItem,index)=>{
                            if(childItem.group){
                                childItem.children=childItem.group;
                                childItem.title=childItem.userName;
                                childItem.children.map((grandsonItem,index)=>{
                                    grandsonItem.title=grandsonItem.groupName;
                                })
                            }
                            
                        })
                    }
                
                })
                this.treeData=dataArr
            })
        },
        exportData(){
            this.$refs.table.exportCsv({
                filename: 'The original data'
            });
        },
    }
}
</script>



