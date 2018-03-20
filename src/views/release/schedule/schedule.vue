<style lang="less">
    @import '../../../styles/common.less';
    @import './schedule.less';
</style>

<template>
  <Card class="view-release-schedule">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="8" class="handle-top-left">
                    终端名：终端1
                </Col>
                <Col span="8" class="handle-top-center">
                    显示当这一周日期起止时间（YYYY-MM-DD）
                </Col>
                <Col span="8" class="handle-top-right">
                    时段设置
                    <Select v-model="times" style="width:50px">
                        <Option v-for="item in timeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Button type="info">上一周</Button>
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                <Button type="info">下一周</Button>
                <span>&nbsp;&nbsp;</span>
                <Input v-model="value2" style="width: 30px"></Input>
                <Button type="info">跳转</Button>
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
            value2:1,
            treeData:[
                {
                    title: '终端分组1',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
                        }
                    ]
                },
                {
                    title: '终端分组2',
                    expand: true,
                    children: [
                        {
                            title: '终端1'
                        },
                        {
                            title: '终端2'
                        },
                        {
                            title: '终端2'
                        }
                    ]
                }
            ],
            times:"10",
            timeSelect:[
                {
                    value: '10',
                    label: '10'
                },
                {
                    value: '15',
                    label: '15'
                },
                {
                    value: '30',
                    label: '30'
                },
                {
                    value: '60',
                    label: '60'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.register(params.index)
                                }
                            }
                        }, '注册'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                    }
                }
            ],
            tableData: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
        }
    },
    methods:{
        register(index){

        },
        remove (index) {
            this.tableData.splice(index, 1);
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
};
</script>
