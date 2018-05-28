<style lang="less">
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <div style="margin-bottom:20px">
            <Button type="primary" @click="addModal=true">添加套装</Button>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <Modal v-model="addModal"  title="添加套装" ref="myaddsuit">
            <Form :label-width="100" v-model="suitform" method="post" enctype="multipart/form-data" id="addshuits">
                <FormItem label="套装名称">
                    <Input v-model="suitform.name" name="Name"></Input>
                </FormItem> 
                <FormItem label="套装部件">
                    <Input v-model="suitform.assname" placeholder="以逗号隔开" name="AssetNames"></Input>
                </FormItem> 
                <FormItem label="套装图片">
                    <input type="file" accept="image/*" name="Image">
                </FormItem>
                 
                <FormItem label="套装游戏截图">
                    <input type="file" accept="image/*" name="ImageLarge">
                </FormItem>
            </Form>    
            <div slot="footer">
                <Button type="warning" @click="addModal=false">关闭</Button>
                <Button type="primary" @click="addsuit">确定</Button>
            </div>
        </modal>
        <Modal v-model="editModal" title="编辑套装">
            <Form :label-width="100" v-model="suitform" method="post" enctype="multipart/form-data" id="editshuits">
                <FormItem label="套装名称">
                    <Input name="Name"></Input>
                </FormItem> 
                <FormItem label="套装部件">
                    <Input name="AssetNames" placeholder="以逗号隔开"></Input>
                </FormItem> 
                <FormItem label="套装图片">
                    <input type="file" accept="image/*" name="Image">
                </FormItem>
                <!-- <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>  -->
                <FormItem label="套装游戏截图">
                    <input type="file" accept="image/*" name="ImageLarge">
                </FormItem>
            </Form>    
            <div slot="footer">
                <Button type="warning" @click="editModal=false">关闭</Button>
                <Button type="primary" @click="editsuit">确定</Button>
            </div>
        </modal>
        <Modal v-model="deleteM" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认要删除吗</span>
            </p>
            <div style="text-align:center">
                <p>删除套装</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="deletes">删除套装</Button>
            </div>
        </modal>
    </Card>
</template>
<script>
import {GetSuitsList,UpdateSuits,AddSuits,DeleteSuits} from '@/api/api.js';
import axios from '@/libs/axios';
    export default {
        // name:"globalswith",
        data() {
            return {
                gurl:"http://adminapi.tanwandao.com",
                deleteM:false,
                suitform:{
                    id:0,
                    name:'',
                    assname:'',
                    image:null,
                    imagel:null
                },
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
                                                this.editId=params.row.id
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

                                                this.deleteID=params.row.id
                                                this.deleteM=true
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
                loadingStatus: false,
                editId:'',
                deleteID:''
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
            getlist(){
                GetSuitsList().then((res)=>{
                    let data = res.data
                    if(data.success==true){
                        this.tableData=data.data
                    }
                })
            },
            changeimg(file){
                
                this.suitform.image=file
                return false;
            },
            changeimgl(file){
                this.suitform.imagel=file
                return false;
            },
            addsuit(){
                let _this=this
                let faobj=document.getElementById("addshuits");
                let formData =new FormData(faobj);
                //原生JS
                var oReq = new XMLHttpRequest();
                
                oReq.onreadystatechange=function(){
                if(oReq.readyState==4){
                    if(oReq.status==200){
                        let res=$.parseJSON(oReq.responseText)
                        console.log(res);
                        if(res.success==true){
                            _this.$Message.success("操作成功")
                            _this.getlist()
                            _this.addModal=false
                        }else{
                            _this.$Message.error(res.message)
                        }

                    }
                }
                };
                oReq.open("POST", _this.gurl+"/api/market/add_suits");
                oReq.setRequestHeader("Authorization",'Bearer '+localStorage.getItem('token'))
                oReq.send(formData); 
            
            },
            editsuit(){
                let _this=this
                let faobj=document.getElementById("editshuits");
                let formData =new FormData(faobj);
                formData.append('Id',_this.editId)
                //原生JS
                var oReq = new XMLHttpRequest();
                
                oReq.onreadystatechange=function(){
                if(oReq.readyState==4){
                    if(oReq.status==200){
                        let res=$.parseJSON(oReq.responseText)
                        console.log(res);
                        if(res.success==true){
                            _this.$Message.success("操作成功")
                            _this.getlist()
                            _this.editModal=false
                        }else{
                            _this.$Message.error(res.message)
                        }

                    }
                }
                };
                oReq.open("POST", _this.gurl+"/api/market/update_suits");
                oReq.setRequestHeader("Authorization",'Bearer '+localStorage.getItem('token'))
                oReq.send(formData); 
            },
            deletes(){
                DeleteSuits({Id:this.deleteID}).then((res) => {
                        // console.log(res)
                        if(res.data.success==true){
                            this.$Message.success("操作成功")
                            this.deleteM=false
                        }else{
                            this.$Message.error(res.message)
                        }
                        this.getlist()
                })
            }
        },
        created:function(){
            this.getlist()
        }
    }
</script>
