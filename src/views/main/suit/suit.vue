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
                        key:'number'
                    },{
                        title:"套装图片",
                        key:'salenumber',
                        render:(h,params) =>{
                            return h("img",
                                {
                                    attrs:{
                                        'src':params.row.salenumber
                                    }  
                                }
                            )
                        }
                    },{
                        title:"套装游戏截图",
                        key:'gameimg',
                        render:(h,params) =>{
                            return h("img",
                                {
                                    attrs:{
                                        'src':params.row.gameimg
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
                tableData:[
                    {
                    name:"美团外卖",
                    number:"小黄衣，小黄裤",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/8HAGSsiO9OXk0bu4o76O6xabNUY8RRLf00e56zWT3IZUH8Flab9goIFna_837oFuZVQvrmhy3qr2r44kS69FLdKLuQ/90fx60f",
                    gameimg:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f"
                    },{
                    name:"小白衣",
                    number:"3",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f",
                    gameimg:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f"
                    },{
                    name:"小白衣",
                    number:"3",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f",
                    gameimg:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f"
                    }
                ],
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
            }
        },
        created:function(){

        }
    }
</script>
