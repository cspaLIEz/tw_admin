<style lang="less">
    @import "./control.less";
    @import "../../../styles/common.less";
</style>
<template>
  <Card class="view-terminal-control">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="primary">开始播放</Button>
                    <Button type="primary">停止播放</Button>
                    <Button type="primary">清空节目</Button>
                    <Button type="primary">重启终端</Button>
                    <Button type="primary">节目管理</Button>
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
                    <div class="search-item">
                        <Checkbox v-model="searchInResult">在结果中查询</Checkbox>
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
                    title: '机构1',
                    expand: true,
                    children: [
                        {
                            title: '管理员1',
                            expand: true,
                            children: [{
                                title: '分组1',
                                expand: true,
                                children: [{
                                    title:'终端1'
                                }]
                            },{
                                title: '分组2'
                            }]
                        },
                        {
                            title: '管理员2',
                            expand: true,
                            children: [{
                                title: '分组1'
                            },{
                                title: '分组2'
                            }]
                        }
                    ]
                },
                {
                    title: '机构2',
                    expand: true,
                    children: [
                        {
                            title: '管理员1'
                        },
                        {
                            title: '管理员2'
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
            searchInResult:"",
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '终端名称',
                    key: 'name'
                },
                {
                    title: '设备ID',
                    key: 'deviceId'
                },
                {
                    title: '终端状态',
                    key: 'status'
                },
                {
                    title: '分辨率',
                    key: 'fbl'
                },
                {
                    title: '终端类型',
                    key: 'type'
                },
                {
                    title: 'IP地址',
                    key: 'ipAddress'
                },
                {
                    title: '所属机构',
                    key: 'org'
                },
                {
                    title: '管理员',
                    key: 'admin'
                },
                {
                    title: '位置信息',
                    key: 'address'
                }
            ],
            tableData: [
                {
                    name: 'test1',
                    deviceId: 1,
                    status: '在线',
                    fbl: '1900*1200',
                    type: 'windows',
                    ipAddress: '192.168.1.100',
                    org: '酒店大堂',
                    admin: '张三',
                    address: '武汉东西湖区'
                },
                {
                    name: 'test2',
                    deviceId: 2,
                    status: '离线',
                    fbl: '800*600',
                    type: 'windows',
                    ipAddress: '192.168.1.100',
                    org: '酒店大堂',
                    admin: '张三',
                    address: '武汉东西湖区'
                }
            ]
        }
    },
    methods:{
        register(index){

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