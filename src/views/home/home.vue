<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="16" :lg="16">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <home-gap></home-gap>
                        </Card>
                    </Col>
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <div class="border-top-3-blue">
                            <terminal-status :status-data="statusData"></terminal-status>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col :md="8" :lg="8">
                <Row :gutter="5">
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="unappData.unappProgSum"
                            iconType="android-person-add"
                            color="#4B89DC"
                            intro-text="节目待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="unappData.unappMatSum"
                            iconType="ios-eye"
                            color="#FECE4F"
                            :iconSize="50"
                            intro-text="素材待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="unappData.unappRelSum"
                            iconType="upload"
                            color="#8DBF55"
                            intro-text="发布待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="unappData.authSum"
                            iconType="shuffle"
                            color="#967BDC"
                            intro-text="已使用授权"
                        ></infor-card>
                    </Col>
                </Row>
                <Row :gutter="5">
                    <Col span="24" :style="{marginBottom: '10px',marginTop: '10px'}">
                        <div class="border-top-3-blue">
                            <Card class="reset-card data-statistics">
                                <Row>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">{{programNum.prograTotal}}</span> <br/>
                                                <span class="item-text-intro">节目总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">{{programNum.materialTotal}}</span> <br/>
                                                <span class="item-text-intro">素材总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">{{programNum.addProgramTotal}}</span> <br/>
                                                <span class="item-text-intro">新增节目总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">{{programNum.prgRelNum}}</span> <br/>
                                                <span class="item-text-intro">节目发布总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="ios-pulse-strong"></Icon>
                                终端类型
                            </p>
                            <div class="data-source-row">
                                <data-source-pie :source-data="devtype"></data-source-pie>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import homeGap from './components/homeGap.vue';
import terminalStatus from './components/terminalStatus.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import { getstatinfo } from '../../api/api';

export default {
    name: 'home',
    components: {
        homeGap,
        dataSourcePie,
        countUp,
        inforCard,
        terminalStatus
    },
    data () {
        return {
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            statusData:[],
            unappData:{
                authSum:0,
                unappMatSum:0,
                unappProgSum:0,
                unappRelSum:0
            },
            programNum:{},
            devtype:false
        };
    },
    computed: {
    },
    created(){
        //初始化数据
        let data = {
            loginer:this.$store.state.user.user,
            loginId:this.$store.state.user.userId
        };
        getstatinfo(data).then((res)=>{
            if(res.status==0){
                this.statusData = res.data.devstat;
                if(res.data.unapp){
                    res.data.unapp.authSum = parseInt(res.data.unapp.authSum);
                    res.data.unapp.unappMatSum = parseInt(res.data.unapp.unappMatSum);
                    res.data.unapp.unappProgSum = parseInt(res.data.unapp.unappProgSum);
                    res.data.unapp.unappRelSum = parseInt(res.data.unapp.unappRelSum);
                }
                this.unappData = res.data.unapp;
                this.programNum = res.data.prog;
                this.devtype = res.data.devtype;
            } else {
                this.$Message.error(res.message);
            }
        })
    },
    methods: {

    }
};
</script>
