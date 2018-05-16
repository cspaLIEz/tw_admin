<style lang="less">
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <Button type="primary" @click="addModal=true">添加套装</Button>
        <Button type="warning">确定</Button>
        <Table border  :columns="columns" :data="tableData"></Table>
        <Modal v-model="addModal" title="添加套装">
            <Form :label-width="100">
                <FormItem label="套装名称">
                    <Input v-model="suit"></Input>
                </FormItem> 
                <FormItem label="套装部件">
                    <Input v-model="suit"></Input>
                </FormItem> 
                <FormItem label="套装图片">
                    <Input v-model="suit"></Input>
                </FormItem> 
            </Form>    
            <div slot="footer">
                <Button type="warning" @click="addModal=false">关闭</Button>
                <Button type="primary" @click="addModal=false">确定</Button>
            </div>
        </modal>
    </Card>
</template>
<script>
    export default {
        name:"globalswith",
        data() {
            return {
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
                        title:"套装部件",
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
                        title:' ',
                        render:(h,params) => {
                            return h('Button',
                                {
                                    props: {
                                        type: "warning"
                                    },
                                    on:{
                                        click:()=>{
                                            console.log("321")
                                        }
                                    }    
                                },"删除"
                            )
                        }
                    }
                ],
                tableData:[{
                    name:"美团外卖",
                    number:"小黄衣，小黄裤",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/8HAGSsiO9OXk0bu4o76O6xabNUY8RRLf00e56zWT3IZUH8Flab9goIFna_837oFuZVQvrmhy3qr2r44kS69FLdKLuQ/90fx60f"
                },{
                    name:"小白衣",
                    number:"3",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f"
                },{
                    name:"小白衣",
                    number:"3",
                    salenumber:"https://huzu-steam-cdn.oss-cn-hangzhou.aliyuncs.com/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXaCO1pqE8uh9Fmnw_N1dRE/90fx60f"
                }]
            }
        },
        methods:{
            chenge(e){
                console.log(e)
            }
        },
        created:function(){

        }
    }
</script>
