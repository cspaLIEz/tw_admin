<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Card>
        <div>
            <Input v-model="bhurl" placeholder="交易URL" style="width:200px"></Input>
            <Button @click="replenis" type="primary">补货</Button>
        </div>
        
         <Alert v-if="isshow" style="margin-top:10px">
            <span style="margin-right:20px">{{responsdata.botName}}</span>
            <span style="margin-right:20px">验证码:{{responsdata.code}}</span>
            <!-- <span style="margin-right:20px">{{responsdata.message}}</span> -->
            <!-- <span v-html="htmldata"></span> -->
            <a v-if="statev==1" @click="blanker" target="_blank" :src="tzurl">{{responsdata.message}}</a>
            <span v-if="statev==2">{{responsdata.message}}</span>
            <span v-if="statev==3" @click="isshow=false">{{responsdata.message}}</span>
        </Alert>
        <Checkbox @on-change="ist" style="margin-top:10px" v-model="single">只显示数量少于待发货的饰品</Checkbox>
        <Table style="margin-top:10px" border :columns="columns" :data="tableData"></Table>
    </Card>
</template>
<script>
    import {
        monitoring,
        replenishment,
        processing,
        replenishment_status
    } from '@/api/api.js'
    import axios from '@/libs/axios';
    export default {
        name: "globalswith",
        data() {
            return {
                gurl:'http://adminapi.stmpai.com',
                // gurl:'http://localhost:5002',
                tzurl:'',
                statev:"",
                htmldata:"",
                isshow:false,
                bhId:'',
                understockOnly: false,
                bhurl: '',
                alipay: true,
                wechatpay: true,
                Notice: '',
                NoticeSwitch: true,
                GlobalPopup: true,
                animal: "新页面",
                single: false,
                columns: [{
                    title: "饰品名称",
                    key: 'name',
                    type: "center"
                }, {
                    title: "售价",
                    key: 'price'
                }, {
                    title: "库存数量",
                    key: 'stock',
                    render(h, params) {
                        const colors = Number(params.row.stock) < Number(params.row.sold) ? 'red' : 'black'
                        return h('span', {
                            style: {
                                color: colors
                            }
                        }, params.row.stock)


                    }
                }, {
                    title: "待发货",
                    key: 'sold'
                }],
                tableData: [],
                responsdata: { //结构与取回的data.responses[i]的结构相同
                    id: 1, //TradeLog.Id
                    botName: "名字", //机器人名字
                    code: "123654", //校验码
                    count: 1, //饰品数量
                    tradeOfferId: "", //steam tradeofferid
                    state: 1, //报价状态
                    message: "正在。。。。", //"报价状态对应的消息"
                    detail: null,
                    elapsed: 10 //报价从开始到现在已过时间(单位: 秒)
                },
                timer:'',
            }
        },
        methods: {
            chenge(e) {},
            getlist() {
                // let aa = {
                //     understockOnly: this.understockOnly
                // }
                // monitoring(aa).then((res) => {
                //     let respons = res.data
                //     if (respons.success == true) {
                //         this.tableData = respons.data
                //     }
                // })
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                let url=`${this.gurl}/api/market/monitoring?understockOnly=${this.understockOnly}`
                axios.get(url).then((res) => {
                        let respons = res.data
                        if (respons.success == true) {
                            this.tableData = respons.data
                        }
                    })
                processing().then((res) => {
                    if(res.data.data!=null){
                        this.responsdata=res.data.data
                        this.isshow=true
                        this.bhId=res.data.data.id
                        this.gettimer(this.bhId)
                    }
                })
            },
            replenis() {
                if (this.bhurl == '') {
                    this.$Message.error("请填写交易url")
                } else {
                    replenishment({
                        tradeUrl: this.bhurl,
                        game: "570"
                    }).then((res) => {
                        if (res.data.success == true) {
                            this.responsdata=res.data.data
                            this.isshow=true
                            this.bhId=res.data.data.id
                            this.gettimer(this.bhId)
                        } else {
                            this.$Message.error(res.data.message)
                        }
                    })
                }
            },
            gettimer(e){
                this.timer=setInterval(() => {
                    let url=`${this.gurl}/api/market/replenishment_status?id=${this.bhId}`
                    // replenishment_status(aa).then((res)=>{
                    //     console.log(res)
                    // })
                    
                    axios.get(url).then((res) => {
                        if(res.data.data!=null){
                            this.responsdata=res.data.data
                            let ts=res.data.data.state
                            if(ts==2){
                                this.tzurl=`https://steamcommunity.com/tradeoffer/${res.data.data.tradeOfferId}`
                                this.statev=1
                            }else
                            if(ts==8||ts==6||ts==10||ts==100||ts==11){
                                this.statev=2
                            }else{
                                this.statev=3
                            }
                            if(ts!=0&&ts!=2&&ts!=3&&ts!=9){
                                clearInterval(this.timer)
                            }
                            this.isshow=true
                        }else{
                            this.isshow=false
                        }
                    })
                },2000)
                
            },
            ist(e){
                 let url=`${this.gurl}/api/market/monitoring?understockOnly=${e}`
                axios.get(url).then((res) => {
                        let respons = res.data
                        if (respons.success == true) {
                            this.tableData = respons.data
                        }
                    })
            },
            blanker(){
                // console.log(111)
                window.open(this.tzurl)
            }

        },
        created: function () {
            this.getlist()
        },
        destroyed () {
            clearInterval(this.timer)
            }
    }
</script>