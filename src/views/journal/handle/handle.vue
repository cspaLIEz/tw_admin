<style lang="less">
    @import '../../../styles/common.less';
    @import './handle.less';
</style>

<template>
    <Card class="view-journal-handle">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info">导出日志</Button>
                    <Button type="warning">清理日志</Button>
                </Col>
                <Col span="12" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:90px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search"></Button>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="view-main">
          <Table border  :columns="columns" :data="tableData"></Table>
          <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                  <Page :total="100" :current="1" @on-change="changePage"></Page>
              </div>
          </div>
        </div>
    </Card>
</template>

<script>
export default {
    name: 'releaseschedule',
    data(){
        return {
            terminalType:"all",
            typeList:[
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'name',
                    label: '操作人'
                },
                {
                    value: 'status',
                    label: 'IP地址'
                },
                {
                    value: 'time',
                    label: '事件名'
                },
                {
                    value: 'e1',
                    label: '日志类型'
                },
                {
                    value: 'e2',
                    label: '日志级别'
                },
                {
                    value: 'e4',
                    label: '日志内容'
                },
                {
                    value: 'e3',
                    label: '操作结果'
                },
            ],
            searchLikes:"",
            columns: [
                {
                    type: 'index',
                    width: 70,
                    title: '序号',
                    align: 'center'
                },
                {
                    title: '日志时间',
                    key: 'createTime'
                },
                {
                    title: '操作人',
                    key: 'userId'
                },
                {
                    title: '操作模块',
                    key: 'operModule'
                },
                {
                    title: 'IP',
                    key: 'userIp',
                },
                {
                    title: '事件名',
                    key: 'ename',
                },
                {
                    title: '日志类型',
                    key: 'logType',
                },
                {
                    title: '日志内容',
                    key: 'logContent',
                },
                {
                    title: '操作结果',
                    key: 'operResult',
                },
            ],
            tableData: [
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                {
                    operResult: 'John Brown',
                    age: 18,
                    logContent: 'New York No. 1 Lake Park',
                    createTime: '2016-10-03'
                },
                
            ]
        }
    },
    methods:{
        detail(index){

        },
        approve (index) {
            
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
};
</script>
