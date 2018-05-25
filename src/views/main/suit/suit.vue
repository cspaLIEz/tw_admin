<style lang="less">
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <div style="margin-bottom:20px">
            <Button type="primary" @click="addModal=true">添加套装</Button>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <Modal v-model="addModal" title="添加套装">
            <Form :label-width="100">
                <FormItem label="套装名称">
                    <Input v-model="suit"></Input>
                </FormItem> 
                <FormItem label="套装部件">
                    <Input v-model="suit" placeholder="以逗号隔开"></Input>
                </FormItem> 
                <FormItem label="套装图片">
                     <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片上传</Button>
                    </Upload>
                </FormItem>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> 
                <FormItem label="套装游戏截图">
                     <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片上传</Button>
                    </Upload>
                </FormItem>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> 
            </Form>    
            <div slot="footer">
                <Button type="warning" @click="addModal=false">关闭</Button>
                <Button type="primary" @click="addModal=false">确定</Button>
            </div>
        </modal>
        <Modal v-model="editModal" title="编辑套装">
            <Form :label-width="100">
                <FormItem label="套装名称">
                    <Input v-model="suit"></Input>
                </FormItem> 
                <FormItem label="套装部件">
                    <Input v-model="suit" placeholder="以逗号隔开"></Input>
                </FormItem> 
                <FormItem label="套装图片">
                     <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片变更</Button>
                    </Upload>
                </FormItem>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> 
                <FormItem label="套装游戏截图">
                     <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片变更</Button>
                    </Upload>
                </FormItem>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> 
            </Form>    
            <div slot="footer">
                <Button type="warning" @click="editModal=false">关闭</Button>
                <Button type="primary" @click="editModal=false">确定</Button>
            </div>
        </modal>
    </Card>
</template>
<script>
import {GetSuitsList} from '@/api/api.js'
    export default {
        name:"globalswith",
        data() {
            return {
                editModal:false,
                suit:'',
                addModal:false,
                alipay:true,
                wechatpay:true,
                Notice:'',
                NoticeSwitch:true,
                GlobalPopup:true,
                animal:"新页面",
                columns:[
                    {
                        title:"套装名称",
                        key:'name',
                        type:"center"
                    },{
                        title:"套装部件，以逗号隔开",
                        key:'assetNames'
                    },{
                        title:"套装图片",
                        key:'suitImgUrl',
                        render:(h,params) =>{
                            return h("img",
                                {
                                    attrs:{
                                        'src':params.row.suitImgUrl
                                    },
                                    style: {
                                        width: "50px"
                                    }  
                                }
                            )
                        }
                    },{
                        title:"套装游戏截图",
                        key:'detailedImgUrl',
                        render:(h,params) =>{
                            return h("img",
                                {
                                    attrs:{
                                        'src':params.row.detailedImgUrl
                                    }  
                                }
                            )
                        }
                    },{
                        title:' ',
                        render:(h,params) => {
                            return h("div",[
                                h('Button',
                                    {
                                        props: {
                                            type: "success",
                                            icon:"edit"
                                        },
                                        on:{
                                            click:()=>{
                                                this.editModal=true
                                            }
                                        }    
                                    },"编辑"
                                ),
                                h('Button',
                                    {
                                        props: {
                                            type: "error"
                                        },
                                        style:{marginLeft:"10px"},
                                        on:{
                                            click:()=>{
                                                console.log("321")
                                            }
                                        }    
                                    },"删除"
                                )
                                
                            ])
                            
                        }
                    }
                ],
                tableData:[],
                file: null,
                loadingStatus: false
            }
        },
        methods:{
            chenge(e){
                console.log(e)
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
            getlist(){
                GetSuitsList().then((res)=>{
                    let data = res.data
                    if(data.success==true){
                        this.tableData=data.data
                    }
                })
            }
        },
        created:function(){
            this.getlist()
        }
    }
</script>
