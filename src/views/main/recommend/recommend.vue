<style lang="less">
@import '../../../styles/common.less';
.box{height: 40px;line-height: 40px}
</style>
<template>
    <Card>
        <Form :label-width="100">
            <Row>
                <Col span="2" style="margin-left:20px">
                    <div class="box">折扣</div>
                    <Input v-model="value1" type="textarea" :rows="12" placeholder=" "></Input>
                </Col>
                <Col span="2" style="margin-left:20px">
                    <div class="box">武器</div>
                    <Input v-model="value1" type="textarea" :rows="12" placeholder=" "></Input>
                </Col>
                <Col span="2" style="margin-left:20px">
                    <div class="box">套装</div>
                    <Input v-model="value1" type="textarea" :rows="12" placeholder=" "></Input>
                </Col>
                <Col span="2" style="margin-left:20px">
                    <div class="box">土豪</div>
                    <Input v-model="value1" type="textarea" :rows="12" placeholder=" "></Input>
                </Col>
            </Row>
            <div style="margin:20px">
               <Button type="success">确定</Button>     
            </div>
            
        </Form>
    </Card>
</template>
<script>
    export default {
        name:"globalswith",
        data() {
            return {
                value1:'',
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
