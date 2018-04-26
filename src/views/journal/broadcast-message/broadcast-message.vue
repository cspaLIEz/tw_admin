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
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
  </Card>
</template>
<script>
export default {
    data(){
        return {
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
                    key:'createPeople'
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
        console.log(88)
        this.getLeftGroup()
    },
    methods:{
        register(index){

        },
        getLeftGroup(){
            let url = "/device/getdevgroupinfolist";
            
            let data = [
                {
                    organId:"234",
                    organName:"test1",
                    group:[
                        {
                            userId:"122",
                            userName:"管理员1",
                            group:[
                                {
                                    devId:123,
                                    devName:"终端一"
                                },
                                {
                                    devId:1253,
                                    devName:"终端二"
                                }
                            ]
                        }
                    ]
                },
                {
                    organId:"234",
                    organName:"test2",
                    group:[
                        {
                            userId:"122",
                            userName:"管理员2",
                            group:[
                                {
                                    devId:1223,
                                    devName:"终端1"
                                },
                                {
                                    devId:12523,
                                    devName:"终端2"
                                }
                            ]
                        }
                    ]
                },
            ];
            data.map((item,index)=>{
                if(item.group){
                    item.children=item.group;
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
            this.treeData=data
            console.log(data)
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



