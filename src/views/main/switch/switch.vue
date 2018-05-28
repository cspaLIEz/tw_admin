<style lang="less">
@import "./switch.less";
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <Form :label-width="100">
            <FormItem label="支付宝购买">
                <i-switch v-model="alipay" @on-change="changeali"></i-switch >
            </FormItem> 
            <FormItem label="微信购买">
                <i-switch  v-model="wechatpay" @on-change="changewcha"></i-switch >
            </FormItem>
            <Row>
                <Col span="3">
                    <FormItem label="公告栏">
                        <i-switch  v-model="NoticeSwitch" @on-change="changeglob"></i-switch >
                    </FormItem>
                </Col>
                <div>
                    <Col span='3'>
                            <Input v-model="Notice" style="width:200px" placeholder="请输入系统公告文本"></Input>
                    </Col>
                    <Col span="3">
                        <Button type="primary" @click="submitN">确定</Button>
                    </Col>
                </div>
            </Row>
            <FormItem label="全局弹窗">
                <i-switch  v-model="GlobalPopup"  @on-change="changpop"></i-switch >
            </FormItem>
            <div class="GlobalPopup">
            <Row><Input v-model="ptitle" style="width:240px;" placeholder="弹窗标题"></Input></Row>
            <Row><Input v-model="pconten" style="width:240px" placeholder="弹窗正文 换行内容用 | 隔开"></Input></Row>
            <Row><Input v-model="pcloseButtonText" style="width:240px" placeholder="关闭按钮名称"></Input></Row>
            <Button type="primary" style="margin-left:20px" @click="subpop">确定</Button>
            </div>
        </Form>
    </Card>
</template>
<script>
import {
        alipay_switch,
        toggle_alipay,
        tenpay_switch,
        toggle_tenpay,
        announcement,
        update_announcement,
        toggle_announcement,
        dialog,
        save_dialog,
        toggle_dialog,
    } from '@/api/api.js'
    export default {
        name:"globalswith",
        data() {
            return {
                alipay:true,
                wechatpay:true,
                Notice:'',
                NoticeSwitch:true,
                GlobalPopup:true,
                animal:"新页面",
                ptitle:'',
                pconten:"",
                pcloseButtonText:""
            }
        },
        methods:{
            subpop(){
                save_dialog({
                    isOpen: this.GlobalPopup,
                    title: this.ptitle,
                    content: this.pconten,
                    closeButtonText: this.pcloseButtonText,
                }).then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")
                    }else{
                        this.$Message.error(res.data.message)
                    }
                })
            },
            submitN(){
                
                update_announcement({
                    isOpen: this.NoticeSwitch,
                    content: this.Notice
                }).then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")
                    }else{
                        this.$Message.error(res.data.message)
                    }
                })
            },
            changeali(e){
                let bb = e
                toggle_alipay().then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")

                    }else{
                        this.$Message.error("操作失败")
                        this.alipay=!e
                    }    
                    
                })
            },
            changewcha(e){
                let bb = e
                toggle_tenpay().then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")

                    }else{
                        this.$Message.error("操作失败")
                        this.alipay=!e
                    }     
                })
            },
            changeglob(){
                toggle_announcement().then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")

                    }else{
                        this.$Message.error("操作失败")
                        this.alipay=!e
                    }  
                        
                })
            },
            changpop(){
                toggle_dialog().then( (res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")

                    }else{
                        this.$Message.error("操作失败")
                        this.alipay=!e
                    }  
                        
                })
            },
            getlist(){
                alipay_switch().then((res) => {
                    let aa = res.data
                    if(aa.success==true){
                        if(aa.data==true){
                            this.alipay=true
                        }else{
                            this.alipay=false
                        }
                    }else{
                        this.$Message.error(aa.message)
                    }
                })
                tenpay_switch().then((res) => {
                    let aa = res.data
                    if(aa.success==true){
                        if(aa.data==true){
                            this.wechatpay=true
                        }else{
                            this.wechatpay=false
                        }
                        
                    }else{
                        this.$Message.error(aa.message)
                    }
                })
                announcement().then((res) => {
                    let aa = res.data
                    if(aa.success==true){
                        // this.NoticeSwitch=aa.data
                        if(aa.data.isOpen){
                            this.NoticeSwitch=true
                            this.Notice=aa.data.content
                        }else{
                            this.NoticeSwitch=false
                            this.Notice=aa.data.content
                        }
                    }else{
                        this.$Message.error(aa.message)
                    }
                })
                dialog().then((res) => {
                    let aa = res.data
                    if(aa.success==true){
                        // this.GlobalPopup=aa.data
                        // console.log(aa.data)
                        if(aa.data.isOpen){
                            this.GlobalPopup=true
                            
                        }else{
                            this.GlobalPopup=false
                        }
                            this.ptitle=aa.data.title
                            this.pconten=aa.data.content
                            this.pcloseButtonText=aa.data.closeButtonText
                    }else{
                        this.$Message.error(aa.message)
                    }
                })
                
            }
        },
        created:function(){
           this.getlist()
        }
    }
</script>
