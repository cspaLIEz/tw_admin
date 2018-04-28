<style lang="less">
    @import '../../../styles/common.less';
    @import './template.less';
</style>

<template>
    <Card class="view-resources-template">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info" @click="MaterialUpload=true">上传</Button>
                    <Button type="warning">删除</Button>
                    <Button type="default" @click="hrefs">新建模板</Button>
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
        <!-- 重命名 -->
        <Modal v-model="renameModal" width="350">
            <p slot="header" style="color:#f60;text-align:center">
                <span>模板重命名</span>
            </p>
            <div style="text-align:center">
                <Form :model="renameFrom" :label-width="80">
                <FormItem label="原名">
                    <Input v-model="renameFrom.oldName" disabled></Input>
                </FormItem>
                <FormItem label="新名">
                    <Input v-model="renameFrom.matName"></Input>
                </FormItem>
                </Form>
            </div>
            <div slot="footer" class="btn_center_wrap">			
                <Button type="primary" @click="">确认</Button>
                <Button type="default" @click="renameModal=false">返回</Button>
            </div>
        </Modal>
        <!-- 审批 -->
        <Modal v-model="approvaModal" width="350">
            <p slot="header" style="color:#f60;text-align:center">
                <span>模板审批</span>
            </p>
            <div style="text-align:center">
                <Form :model="approvaFrom" :label-width="80">
                <FormItem label="模板名">
                    <Input v-model="approvaFrom.matName" disabled></Input>
                </FormItem>
                </Form>
            </div>
            <div slot="footer" class="btn_center_wrap">			
                <Button type="primary" @click="approvaModal=false">通过</Button>
                <Button type="default" @click="approvaModal=false">不通过</Button>
            </div>
        </Modal>
        <!--素材上传-->
        <Modal v-model="MaterialUpload" title="上传素材">
            <Form :model="approvaFrom" :label-width="80">
                <FormItem label="素材类型">
                    <Select  style="width:200px">
                        <Option >文本素材</Option>
                        <Option >视频素材</Option>
                        <Option >图片素材</Option>
                        <Option >音频素材</Option>
                    </Select>
                </FormItem>
                <FormItem label="素材分组">
                    <Select  style="width:200px">
                        <Option >1</Option>
                        <Option >2</Option>
                        <Option >3</Option>
                        <Option >4</Option>
                    </Select>
                </FormItem>
                <FormItem label="素材本地地址">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" >浏览</Button>
                </Upload>
                </FormItem>
            </Form>
            <div slot="footer" class="btn_center_wrap">			
                <Button type="primary" @click="MaterialUpload=false">上传</Button>
                <Button type="default" @click="MaterialUpload=false">取消</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
export default {
    name: 'releaseschedule',
    data(){
        return {
            value2:1,
            renameModal:false,
            approvaModal:false,
            MaterialUpload:false,
            renameFrom:{},
            approvaFrom:{},
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
                    type: 'index',
                    title:"序号",
                    width: 80,
                    align: 'center'
                },
                {
                    title: '模板名称',
                    key: 'name'
                },
                {
                    title: '预览',
                    key: 'age'
                },
                {
                    title: '分辨率',
                    key: 'address'
                },
                {
                    title: '大小',
                    key: 'address'
                },
                {
                    title: '所属机构',
                    key: 'address'
                },
                {
                    title: '上传人',
                    key: 'address'
                },
                {
                    title: '审核人',
                    key: 'address'
                },
                {
                    title: '审核时间',
                    key: 'address'
                },
                {
                    title: '审核状态',
                    key: 'address'
                },
                {
                    title: '操作',
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
                                    this.renameModal=true
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
                                    this.approvaModal=true
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
        },
        hrefs(){
             this.$router.push('../build')
        }
    }
};
</script>
