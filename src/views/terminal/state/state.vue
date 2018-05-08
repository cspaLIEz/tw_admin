<style lang="less">
@import "./state.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-terminal-state">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="4" class="handle-top-left padding-top-8">
                    <Checkbox v-model="autoRefresh">自动刷新</Checkbox>
                </Col>
                <Col span="20" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:80px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search"></Button>
                    </div>
                    <div class="search-item">
                        <Checkbox v-model="searchInResult">在结果中查询</Checkbox>
                    </div>
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="tableData.data.pinfo"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal v-model="editorModel" width="560">
          <p slot="header" style="color:#f60;text-align:center">
              终端基本信息设置
          </p>
          <div style="text-align:center">
              <Form :model="detailForm" :label-width="80">
                <FormItem label="终端标识">
                    <Input></Input>
                </FormItem>
                <FormItem label="终端ID">
                    <Input></Input>
                </FormItem>
                <FormItem label="组名">
                    <Select>
                        <Option value="beijing">酒楼大厦</Option>
                        <Option value="shanghai">周边道路</Option>
                    </Select>
                </FormItem>
                <FormItem label="终端名称">
                    <Input></Input>
                </FormItem>
                <FormItem label="IP地址">
                    <Input></Input>
                </FormItem>
                <FormItem label="终端类型">
                    <Select>
                        <Option value="beijing">Windows</Option>
                        <Option value="shanghai">Mac</Option>
                        <Option value="shanghai">Android</Option>
                    </Select>
                </FormItem>
                <FormItem label="安装地址">
                    <Input></Input>
                </FormItem>
                <FormItem label="经度">
                    <Input></Input>
                </FormItem>
                <FormItem label="纬度">
                    <Input></Input>
                </FormItem>
                <FormItem label="下载带宽">
                    <Input></Input>
                </FormItem>
                <FormItem label="设置音量">
                    <Input></Input>
                </FormItem>
                <FormItem label="存储报警阈值">
                    <Input></Input>
                </FormItem>
            </Form>
          </div>
          <div slot="footer">
              <Button type="primary">保存</Button>
              <Button type="warning">关闭</Button>
          </div>
      </Modal>
    </div>
  </Card>
</template>
<script>

import {Getdevstatusinfolist} from '@/api/api';
export default {
  data() {
    return {
      autoRefresh: false,
      editorModel: false,
      modal_loading: false,
      treeData:[
          {
              title: '机构1',
              expand: true,
              children: [
                  {
                      title: '管理员1',
                      expand: true,
                      children: [{
                          title: '分组1',
                          expand: true,
                          children: [{
                              title:'终端1'
                          }]
                      },{
                          title: '分组2'
                      }]
                  },
                  {
                      title: '管理员2',
                      expand: true,
                      children: [{
                          title: '分组1'
                      },{
                          title: '分组2'
                      }]
                  }
              ]
          },
          {
              title: '机构2',
              expand: true,
              children: [
                  {
                      title: '管理员1'
                  },
                  {
                      title: '管理员2'
                  }
              ]
          }
      ],
      terminalType: "all",
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "name",
          label: "终端名称"
        },
        {
          value: "status",
          label: "终端状态"
        },
        {
          value: "ip",
          label: "IP"
        },
        {
          value: "分辨率",
          label: "分辨率"
        }
      ],
      searchLikes: "",
      searchInResult: "",
      columns: [
        {
            type: 'index',
            width: 70,
            title: '序号',
            align: 'center'
        },{
            title:'终端代码',
            key:'devId'
            },{
            title: '终端名称',
            key: 'devName'
        },
        {
            title:'终端地点',
            key:'devLocation'
        },
        {
            title:'组',
            key:'groupValue'
        },
        {
            title: '终端类型',
            key: 'devTypeValue'
        },
        {
            title: '终端状态',
            key: 'onlineStatusCode'
        },
        {
            title: '在线时长',
            key: 'onlineTime'
        },
        {
            title: '磁盘空间（GB）',
            key: 'diskSpace'
        },
        {
            title: '更新时间',
            key: 'updateTime'
        },
        {
          title: " ",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModel(params.index)
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      tableData: [],
      detailForm: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    };
  },
  methods: {
    showModel(index) {
      this.editorModel = true;
    },
    changePage (){
        // this.tableData1 = this.mockTableData1();
        
    }
  },
  created:function(){
      Getdevstatusinfolist({
            loginer:"admin",
            currentPage:"1",
            pageSize:"10"
        }).then((res)=>{
            this.tableData=res
        })
  }
};
</script>