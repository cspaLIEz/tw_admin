<style lang="less">
    @import "./information.less";
    @import "../../../styles/common.less";
</style>
<template>
  <Card class="view-terminal-information">
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
                    <Button type="primary">批量导入</Button>
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
        <!-- 删除框 -->
        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>终端删除</span>
            </p>
            <div style="text-align:center">
                <p>本操作将删除指定终端！该终端所有信息将被删除，不可再使用。请确认！</p>
            </div>
            <div slot="footer">
                <Button type="error" @click="deleteModal=false">取消</Button>
                <Button type="error" @click="remove">确认</Button>
            </div>
        </Modal>
        <!-- 注册框 -->
        <Modal v-model="registerModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>终端注册</span>
            </p>
            <div style="text-align:center">
                <Form :model="formRegister" :label-width="80">
                    <FormItem label="终端名称">
                        <Input v-model="formRegister.name" readonly></Input>
                    </FormItem>
                    <FormItem label="终端ID">
                        <Input v-model="formRegister.id" readonly></Input>
                    </FormItem>
                    <FormItem label="终端标识">
                        <Input v-model="formRegister.mark" readonly></Input>
                    </FormItem>
                    <FormItem label="终端类型">
                        <Input v-model="formRegister.type" readonly></Input>
                    </FormItem>
                    <FormItem label="安装地址">
                        <Input v-model="formRegister.address" readonly></Input>
                    </FormItem>
                    <FormItem label="管理员">
                        <Select>
                            <Option value="admin">admin</Option>
                            <Option value="zs">张三</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error" @click="registerModal=false">取消</Button>
                <Button type="error" @click="register">确认</Button>
            </div>
        </Modal>
    </div>
  </Card>
</template>
<script>
export default {
    data(){
        return {
            deleteModal:false,
            deleteIndex:'',
            registerModal:false,
            formRegister:{
                name:'',
                id:'',
                mark:'',
                type:'',
                address:''
            },
            treeData:[
                {
                    title: '未注册',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        }
                    ]
                },
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
                                    this.register(params.index)
                                    this.registerModal = true;
                                }
                            }
                        }, '注册'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    this.deleteModal = true;
                                    this.deleteIndex = params.index;
                                }
                            }
                        }, '删除')
                    ]);
                    }
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
        remove () {
            this.tableData.splice(this.deleteIndex, 1);
            this.deleteModal = false;
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
}
</script>



