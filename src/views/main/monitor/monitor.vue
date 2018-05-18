<style lang="less">
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <div><Input v-model="bhurl" placeholder="交易URL" style="width:200px"></Input><Button type="primary">补货</Button></div>
        <Checkbox v-model="single">只显示数量少于待发货的饰品</Checkbox>
        <Table border  :columns="columns" :data="tableData"></Table>
    </Card>
</template>
<script>
    export default {
        name:"globalswith",
        data() {
            return {
                bhurl:'',
                alipay:true,
                wechatpay:true,
                Notice:'',
                NoticeSwitch:true,
                GlobalPopup:true,
                animal:"新页面",
                single:false,
                columns:[
                    {
                        title:"饰品名称",
                        key:'name',
                        type:"center"
                    },{
                        title:"在架数量",
                        key:'number',
                        render(h,params){
                            const colors = Number(params.row.number) < Number(params.row.salenumber) ? 'red' : 'black'
                            return h('span',{
                                style:{
                                    color : colors
                                }
                            },params.row.number)

                            
                        }
                    },{
                        title:"待发货",
                        key:'salenumber'
                    }
                ],
                tableData:[{
                    name:"小黄衣",
                    number:"1",
                    salenumber:"3"
                },{
                    name:"小白衣",
                    number:"2",
                    salenumber:"3"
                },{
                    name:"小白衣",
                    number:"3",
                    salenumber:"3"
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
