<style lang="less">
    @import '../../../styles/common.less';
    @import './broadcast.less';
</style>

<template>
    <Card class="view-program-broadcast">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info">新建消息</Button>
                    <Button type="warning">清空消息</Button>
                </Col>
                <Col span="12" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:90px">
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
        <div class="view-main">
          <div class="view-main-left">
            <Card>
              <Tree :data="treeData"></Tree>
            </Card>
          </div>
          <div class="view-main-right">
            <Table border  :columns="columns" :data="tableData"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
                </div>
            </div>
          </div>
        </div>
    </Card>
</template>

<script>
import {getmsginfolist,getdevgroupinfolist} from '@/api/api';
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
                    label: '节目名称'
                },
                {
                    value: 'status',
                    label: '更新时间'
                },
                {
                    value: 'time',
                    label: '主旨'
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
                    title: '终端编号',
                    key: 'devId'
                },
                {
                    title: '所属机构',
                    key: 'org'
                },
                {
                    title: '主旨',
                    key: 'gist'
                },
                {
                    title: '开始时间',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    key: 'endTime'
                },
                {
                    title: '插播状态',
                    key: 'state'
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
                        }, '详情'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                    }
                }
            ],
            tableData: [
                {
                    deviceCode: '100001',
                    org: 18,
                    gist: 'New York No. 1 Lake Park',
                    startTime: '2016-10-03',
                    endTime: '2016-10-03',
                    state: '2016-10-03'
                },
                {
                    deviceCode: '100002',
                    org: 18,
                    gist: 'New York No. 1 Lake Park',
                    startTime: '2016-10-03',
                    endTime: '2016-10-03',
                    state: '2016-10-03'
                },
                {
                    deviceCode: '100003',
                    org: 18,
                    gist: 'New York No. 1 Lake Park',
                    startTime: '2016-10-03',
                    endTime: '2016-10-03',
                    state: '2016-10-03'
                }
            ]
        }
    },
    mounted(){
        this.getLeftGroup();
        this.getList()
    },
    methods:{
        detail(index){

        },
        getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
            let data = {
                pageSize,
                currentPage,
                ...searchInfo
            }
            getmsginfolist(data).then((res)=>{
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
};
</script>
