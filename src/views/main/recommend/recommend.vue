<style lang="less">
    @import '../../../styles/common.less';
    .box {
        height: 40px;
        line-height: 40px
    }
</style>
<template>
    <Card>
        <Form :label-width="100">
            <Row>
                <Col span="4" style="margin-left:20px">
                <div class="box">精选</div>
                <Input v-model="value1" type="textarea" :rows="20" placeholder=""></Input>
                <Button style="margin-top:10px" type="success" @click="updateList(1,0)">确定</Button>
                </Col>
                <Col span="4" style="margin-left:20px">
                <div class="box">至宝</div>
                <Input v-model="value2" type="textarea" :rows="20" placeholder=""></Input>
                <Button style="margin-top:10px" type="success" @click="updateList(2,1)">确定</Button>
                </Col>
                <Col span="4" style="margin-left:20px">
                <div class="box">不朽</div>
                <Input v-model="value3" type="textarea" :rows="20" placeholder=" "></Input>
                <Button style="margin-top:10px" type="success" @click="updateList(3,2)">确定</Button>
                </Col>
                <Col span="4" style="margin-left:20px">
                <div class="box">土豪</div>
                <Input v-model="value4" type="textarea" :rows="20" placeholder=" "></Input>
                <Button style="margin-top:10px" type="success" @click="updateList(4,3)">确定</Button>
                </Col>
                <Col span="4" style="margin-left:20px">
                <div class="box">套装</div>
                <Input v-model="value5" type="textarea" :rows="20" placeholder=" "></Input>
                <Button style="margin-top:10px" type="success" @click="updateList(5,4)">确定</Button>
                </Col>
                
            </Row>

        </Form>
    </Card>
</template>
<script>
import {SaveRecommendedItems,GetRecommendedItems} from "@/api/api";
    export default {
        name: "globalswith",
        data() {
            return {
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                alipay: true,
                wechatpay: true,
                Notice: '',
                NoticeSwitch: true,
                GlobalPopup: true,
                animal: "新页面"
            }
        },
        methods: {
            updateList(val,num) {
                let vas='';
                if(val==1){
                    vas=this.value1
                }
                if(val==2){
                     vas=this.value2
                }
                if(val==3){
                    vas=this.value3
                }
                if(val==4){
                    vas=this.value4
                }
                if(val==5){
                     vas=this.value5
                }
                let dataList = vas.split("\n");
                let objData = {}
                objData['category']=num
                dataList.map((item, index) => {
                    let itemArr = []
                    let key = "item"
                    if (item) {
                        if (item.indexOf("，") > 1) {
                            item = item.replace(/，/ig, ',');
                        }
                        if (item.indexOf(",") < 0){
                            item+=",0"
                        }
                        itemArr = item.split(',')
                        objData[`items[${index}].Name`] = this.trim(itemArr[0])
                        objData[`items[${index}].Price`] = this.trim(itemArr[1])
                    }
                })
                // console.log(objData)
                SaveRecommendedItems(objData).then((res) => {
                    if(res.data.success==true){
                        this.$Message.success("操作成功")
                        this.getlist()
                    }else{
                        this.$Message.error(res.data.message)
                    }
                })
                
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            },
            getlist(){
                GetRecommendedItems().then((res)=>{
                    if(res.data.success==true){
                        let arrays=res.data.data
                                this.value2='';
                                this.value4='';
                                this.value5='';
                                this.value3='';
                                this.value1='';
                        arrays.map((item,index) => {
                            if(item.category==0){
                                if(item.isDynamic==true){item.price=0}
                                this.value1+=item.name+","+item.price+"\n"
                            }
                            if(item.category==1){
                                if(item.isDynamic==true){item.price=0}
                                this.value2+=item.name+","+item.price+"\n"
                            }
                            if(item.category==2){
                                if(item.isDynamic==true){item.price=0}
                                this.value3+=item.name+","+item.price+"\n"
                            }
                            if(item.category==3){
                                if(item.isDynamic==true){item.price=0}
                                this.value4+=item.name+","+item.price+"\n"
                            }
                            if(item.category==4){
                                if(item.isDynamic==true){item.price=0}
                                this.value5+=item.name+","+item.price+"\n"
                            }
                        })
                    }
                })
            }
        },
        created: function () {
            this.getlist()
        }
    }
</script>