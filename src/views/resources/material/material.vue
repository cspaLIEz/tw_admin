<style lang="less">
    @import '../../../styles/common.less';
    @import './material.less';
</style>

<template>
    <Card class="view-resources-material">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info">上传</Button>
                    <Button type="warning">删除</Button>
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
                    <Page :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
          </div>
        </div>
    </Card>
</template>

<script>
export default {
    name: 'releaseschedule',
    data(){
        return {
            value2:1,
            treeData:[
                {
                    title: '终端分组1',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
                        }
                    ]
                },
                {
                    title: '终端分组2',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
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
                    label: '素材名称'
                },
                {
                    value: 'status',
                    label: '素材格式'
                },
                {
                    value: 'time',
                    label: '上传时间'
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
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
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
                                    this.detail(params.index)
                                }
                            }
                        }, '重命名'),
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
                        }, '审批')
                    ]);
                    }
                }
            ],
            tableData: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
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
