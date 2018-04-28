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
                            <terminal-status></terminal-status>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col :md="8" :lg="8">
                <Row :gutter="5">
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="android-person-add"
                            color="#4B89DC"
                            intro-text="节目待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-eye"
                            color="#FECE4F"
                            :iconSize="50"
                            intro-text="素材待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="upload"
                            color="#8DBF55"
                            intro-text="发布待审批"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
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
                                                <span class="item-text-num">1503</span> <br/>
                                                <span class="item-text-intro">节目总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">1503</span> <br/>
                                                <span class="item-text-intro">节目总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">1503</span> <br/>
                                                <span class="item-text-intro">节目总数</span>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span="12">
                                        <Row type="flex" align="middle" justify="center" class="data-statistics-item">
                                            <img src="../../images/index/copy.png" alt="">
                                            <div class="item-text">
                                                <span class="item-text-num">1503</span> <br/>
                                                <span class="item-text-intro">节目总数</span>
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
                                <data-source-pie></data-source-pie>
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
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import { apitest } from '../../api/api';

export default {
    name: 'home',
    components: {
        homeGap,
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem,
        terminalStatus
    },
    data () {
        return {
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    mounted(){
        //http://open.douyucdn.cn/api/RoomApi/live/1
        // util.ajax()
        // apitest().then(function(res){
        //     console.log(res)
        // })
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
