<style lang="less">
@import "./switch.less";
@import '../../../styles/common.less';
</style>
<template>
    <Card>
        <Form :label-width="100">
            <FormItem label="支付宝购买">
                <i-switch v-model="alipay"></i-switch >
            </FormItem> 
            <FormItem label="微信购买">
                <i-switch  v-model="wechatpay"></i-switch >
            </FormItem>
            <Row>
                <Col span="3">
                    <FormItem label="公告栏">
                        <i-switch  v-model="NoticeSwitch"></i-switch >
                    </FormItem>
                </Col>
                <div v-if="NoticeSwitch">
                    <Col span='3'>
                            <Input v-model="Notice" style="width:200px" placeholder="请输入系统公告文本"></Input>
                    </Col>
                    <Col span="3">
                        <Button type="primary">确定</Button>
                    </Col>
                </div>
            </Row>
            <FormItem label="全局弹窗">
                <i-switch  v-model="GlobalPopup"></i-switch >
            </FormItem>
            <div class="GlobalPopup" v-if="GlobalPopup">
            <Row><Input v-model="Notice" style="width:240px;" placeholder="弹窗标题"></Input></Row>
            <Row><Input v-model="Notice" style="width:240px" placeholder="弹窗正文 换行内容用 | 隔开"></Input></Row>
            <Row><Input v-model="Notice" style="width:240px" placeholder="关闭按钮名称"></Input></Row>
            <!-- <Row>
                <Input v-model="Notice" style="width:240px" placeholder="跳转按钮名称，若不跳则不写"></Input>
                <Input v-model="Notice" style="width:180px" placeholder="跳转链接"></Input>
                 <RadioGroup v-model="animal" style="margin-left:40px">
                    <Radio label="新页面"></Radio>
                    <Radio label="跳转"></Radio>
                </RadioGroup>
            </Row> -->
            <Button type="primary" style="margin-left:20px">确定</Button>
            </div>
        </Form>
    </Card>
</template>
<script>
    export default {
        name:"globalswith",
        data() {
            return {
                alipay:true,
                wechatpay:true,
                Notice:'',
                NoticeSwitch:true,
                GlobalPopup:true,
                animal:"新页面"
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
