<style lang="less">
    @import '../../../styles/common.less';
    @import './lists.less';
</style>

<template>
    <Card class="view-program-lists">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info">新建节目</Button>
                    <Button type="warning">删除节目</Button>
                    <Button type="success">导出节目</Button>
                    <Button type="warning">导入节目</Button>
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
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    name: 'releaseschedule',
    data(){
        return {
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
                    key: 'code'
                },
                {
                    title: '节目名称',
                    key: 'name'
                },
                {
                    title: '分辨率',
                    key: 'fbl'
                },
                {
                    title: '预览',
                    key: 'view'
                },
                {
                    title: '时长',
                    key: 'time'
                },
                {
                    title: '大小（MB）',
                    key: 'size'
                },
                {
                    title: '创建人',
                    key: 'author'
                },
                {
                    title: '更新时间',
                    key: 'updateTime'
                },
                {
                    title: '节目来源',
                    key: 'from'
                },
                {
                    title: '审批状态',
                    key: 'approve'
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
                {
                    "code": "PM2018030821360001",
                    "name": "节目1",
                    "fbl": "1900*1200",
                    "view": "使用节目缩略图，点击后预览",
                    "time": "2016-10-03",
                    "size": "",
                    "author": "admin",
                    "updateTime": "2016-10-03",
                    "from": "新建",
                    "approve": "通过"
                },
                {
                    "code": "PM2018030821360001",
                    "name": "节目1",
                    "fbl": "1900*1200",
                    "view": "使用节目缩略图，点击后预览",
                    "time": "2016-10-03",
                    "size": "",
                    "author": "admin",
                    "updateTime": "2016-10-03",
                    "from": "新建",
                    "approve": "通过"
                }
            ]
        }
    },
    methods:{
        detail(index){

        },
        approve (index) {
            
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
};
</script>
