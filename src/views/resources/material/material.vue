<style lang="less">
    @import '../../../styles/common.less';
    @import './material.less';
</style>

<template>
    <Card class="view-resources-material">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info" @click="MaterialUpload=true">上传</Button>
                    <Button type="warning" >删除</Button>
                    <Button type="info" @click="MaterialGrouping=true">分组</Button>
                    <Button type="info">缩略图查看</Button>
                </Col>
                <Col span="12" class="handle-top-right">
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
                    <Select v-model="approvaFrom.type"  style="width:200px">
                        <Option value="1">文本素材</Option>
                        <Option value="2">视频素材</Option>
                        <Option value="3">图片素材</Option>
                        <Option value="4">音频素材</Option>
                    </Select>
                </FormItem>
                <FormItem label="素材分组">
                    <Select v-model="approvaFrom.group"  style="width:200px">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
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
        <!--素材分组-->
        <Modal v-model="MaterialUpload" title="上传素材">
            <Form :model="approvaFrom" :label-width="80">
                <FormItem label="素材类型">
                    <Select v-model="approvaFrom.type"  style="width:200px">
                        <Option value="1">文本素材</Option>
                        <Option value="2">视频素材</Option>
                        <Option value="3">图片素材</Option>
                        <Option value="4">音频素材</Option>
                    </Select>
                </FormItem>
                <FormItem label="素材分组">
                    <Select v-model="approvaFrom.group"  style="width:200px">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
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
        <!--添加分租-->
        <Modal v-model="groupModelVisible" title="创建分组">
            <Form :model="groupFrom" :label-width="80">
                <FormItem label="分组名称">
                    <Input v-model="groupFrom.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="btn_center_wrap">		
                <Button type="primary" @click="append()">确定</Button>
                <Button type="default" @click="groupModelVisible=false">取消</Button>
            </div>
        </Modal>  
    </Card>
</template>

<script>
import {Getmateriallist} from "@/api/api";
export default {
    name: 'releaseschedule',
    data(){
        return {
            MaterialGrouping:false,
            MaterialUpload:false,
            value2:1,
            renameModal:false,
            approvaModal:false,
            totalRecord:1,
            totalPage:1,
            pageSize:20,
            currentPage:1,
            tagObj:{},
            renameFrom:{},
            approvaFrom:{},
            groupModelVisible:false,
            groupFrom:{},
            treeData:[
                {
                    title: '素材文本',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-plus-empty'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        padding: "0px 5px",
                                    },
                                    on: {
                                        click: () => { this.groupModelChange(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: [
                        {
                            title: '文本'
                        },
                        {
                            title: '表格'
                        },
                        {
                            title: '幻灯片'
                        },
                        {
                            title: 'PDF'
                        }
                    ]
                },
                {
                    title: '图片素材',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-plus-empty'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        padding: "0px 5px",
                                    },
                                    on: {
                                        click: () => { this.groupModelChange(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: [
                        {
                            title: '风光'
                        },
                    ]
                },
                {
                    title: '视频素材',
                },
                {
                    title: '音频素材',
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
                    align: 'center'
                },
                {
                    title: '素材名称',
                    key: 'matName'
                },
                {
                    title: '预览',
                    key: 'matTypeValue'
                },
                {
                    title: '分辨率',
                    key: 'matResolution'
                },
                {
                    title: '大小',
                    key: 'matSize'
                },
                {
                    title: '上传人',
                    key: 'userId'
                },
                {
                    title: '审核人',
                    key: 'approveUserId'
                },
                {
                    title: '审核时间',
                    key: 'updateTime'
                },
                {
                    title: '审核状态',
                    key: 'approvalResultValue'
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
                                    this.approvaModal =true
                                }
                            }
                        }, '审批')
                    ]);
                    }
                }
            ],
            tableData: []
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty'
                        }),
                        style: {
                            marginRight: '8px',
                            padding: "0px 5px",
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        handleSearch(){
            let { tagObj, terminalType, searchLikes} = this;
            tagObj[terminalType]=searchLikes;
            this.getList(1,this.pageSize,tagObj)
        },
        handleCloseTag(e,name){
            let tagObj= { ...this.tagObj };
            delete tagObj[name];
            this.tagObj=tagObj;
        },
        changePage(current) {
            this.getList(current)
        },
        groupModelChange(data){
            if(data){
                this.checkData=data;
            }
            this.groupModelVisible=true;
        },
        append () {
            const children = this.checkData.children || [];
            children.push({
                title: this.groupFrom.name,
                expand: true
            });
            this.$set(this.checkData, 'children', children);
            console.log(this.checkData)
            this.groupModelVisible=false;
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        getList(currentPage=this.currentPage,pageSize=this.pageSize,operType=1){
            let data = {
                pageSize,
                currentPage,
                operType,
            }
            Getmateriallist(data).then((res)=>{
                console.log(res)
                // if(res.status==0){
                //     this.tableData=res.data.pinfo;
                //     this.pageSize=pageSize;
                //     this.currentPage=currentPage;
                //     this.totalPage=res.data.totalPage;
                //     this.totalRecord=res.data.totalRecord;
                //     this.selectSearch=searchInfo;
                //     this.orgSelection=res.data.tree;
                // }else{
                //     this.$Message.error(res.message);
                // }
            })
        },
    },
};
</script>
