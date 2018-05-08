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
                    <Button type="primary">导出日志</Button>
                </Col>
                <Col span="20" class="handle-top-right">
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
                    value: 'name',
                    label: '消息主旨'
                },
                {
                    value: 'status',
                    label: '消息内容'
                },
                {
                    value: '分辨率',
                    label: '创建人'
                }
            ],
            searchLikes:"",
            searchInResult:"",
            columns: [
                {
                    type: 'index',
                    width: 70,
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
                    title: '开始时间',
                    key: 'playStartTime',                   
                },
                {
                    title:"结束时间",
                    key:'playEndTime'
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
        getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
            let data = {
                pageSize,
                currentPage,
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
                                    grandsonItem.title=grandsonItem.devName
                                })
                            }
                            
                        })
                    }
                
                })
                this.treeData=dataArr
            })
        },
        remove (index) {
            this.tableData.splice(index, 1);
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
}
</script>



