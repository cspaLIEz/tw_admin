<style lang="less">
    @import '../../../styles/common.less';
    @import './approval.less';
</style>

<template>
    <Card class="view-program-approval">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="24" class="handle-top-right">
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
        <Modal
            v-model="approvalModel"
            title="复制节目"
            width="500">
            <Form :model="approvalForm" :label-width="100">
                <FormItem label="节目名称">
                    <Input v-model="approvalForm.name"></Input>
                </FormItem>
                <FormItem label="发布者">
                    <Input v-model="approvalForm.author"></Input>
                </FormItem>
                <FormItem label="发布时间">
                    <Input v-model="approvalForm.createdTime"></Input>
                </FormItem>
                <FormItem label="分辨率">
                    <Input v-model="approvalForm.fbl"></Input>
                </FormItem>
                <FormItem label="节目时长">
                    <Input v-model="approvalForm.times"></Input>
                </FormItem>
                <FormItem label="大小">
                    <Input v-model="approvalForm.size"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
export default {
    data(){
        return {
            approvalModel:false,
            approvalForm:{
                name:"",
                author:"",
                createdTime:"",
                fbl:"",
                times:"",
                size:""
            },
            terminalType:"all",
            typeList:[
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'name',
                    label: '节目'
                },
                {
                    value: 'updateTime',
                    label: '更新时间'
                }
            ],
            searchLikes:"",
            columns: [
                {
                    type: 'index',
                    width: 70,
                    title: '序号',
                    align: 'center'
                },
                {
                    title: '节目名称',
                    key: 'name'
                },
                {
                    title: '预览',
                    key: 'view'
                },
                {
                    title: '分辨率',
                    key: 'fbl'
                },
                {
                    title: '节目时长',
                    key: 'times'
                },
                {
                    title: '大小(MB)',
                    key: 'size'
                },
                {
                    title: '更新时间',
                    key: 'updateTime'
                },
                {
                    title: '审批时间',
                    key: 'approveTime'
                },
                {
                    title: '审批状态',
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
                                    this.approvalModel = true;
                                }
                            }
                        }, '审批')
                    ]);
                    }
                }
            ],
            tableData: [
                {
                    "name": "节目1",
                    "view": "使用节目缩略图，点击后预览",
                    "fbl": "1900*1200",
                    "times": "1000",
                    "size": "<span>111</span>",
                    "updateTime": "2016-10-03",
                    "approveTime": "2016-10-03",
                    "state": "待审批"
                },
                {
                    "name": "节目2",
                    "view": "使用节目缩略图，点击后预览",
                    "fbl": "1900*1200",
                    "times": "1000",
                    "size": "<span>111</span>",
                    "updateTime": "2016-10-03",
                    "approveTime": "2016-10-03",
                    "state": "待审批"
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
