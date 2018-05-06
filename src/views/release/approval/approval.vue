<style lang="less">
@import "../../../styles/common.less";
@import "./approval.less";
</style>

<template>
    <Card class="view-release-approval">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="24" class="handle-top-right">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:80px">
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
        <Table border  :columns="columns" :data="ContData.pinfo"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal v-model="deleteModal" title="发布详情" width="880">
            <p style="font-size:16px;font-weigth:bold" >1.节目信息</p>
            
                <Form :model="AlertData" :label-width="80" >
                    <Col span='8'>
                    <FormItem label="节目名称">
                        <Input v-model="AlertData.progName" readonly="this.disableds"></Input>
                    </FormItem>
                    </Col>
                    <Col span='8'>
                    <FormItem label="节目时长">
                        <Input v-model="AlertData.progTime" readonly="this.disableds"></Input>
                    </FormItem>
                     </Col>
                    <Col span='8'>
                    <FormItem label="节目分辨率">
                        <Input v-model="AlertData.resolutionValue" readonly="this.disableds"></Input>
                    </FormItem>
                     </Col>
                    <FormItem label="节目描述">
                        <Input v-model="AlertData.resolutionValue" readonly="this.disableds"></Input>
                    </FormItem>
                    <Col span='12'>
                    <FormItem label="发布模式">
                        <Select  style="width:200px" readonly="this.disableds">
                            <Option value="1">定时发布</Option>
                            <Option value="1">周期发布</Option>
                        </Select> 
                    </FormItem>
                    </Col>
                    <Col span='12'>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"  readonly="this.disableds"></DatePicker> 
                    </FormItem>
                    </Col>
                    <FormItem label="播放模式">
                        <Select  style="width:200px" readonly="this.disableds">
                            <Option >定时发布</Option>
                            <Option >周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="起止时间" readonly="this.disableds">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> 
                    </FormItem>
                
            <p style="font-size:16px;font-weigth:bold" >2.播放日程</p>
            <p style="border:1px solid #dddee1;text-align:center">星期一 13:10~13:20</p>
            <p style="font-size:16px;font-weigth:bold" >3.终端信息</p>
            <Table border  :columns="columns" :data="ContData.pinfo"></Table>
            <p style="font-size:16px;font-weigth:bold" >4.审批操作</p>
            <FormItem label="审批结果">
                <Select  style="width:200px" readonly="this.disableds">
                <Option >审批通过</Option>
                <Option >审批未通过</Option>
                </Select> 
            </FormItem>
            <FormItem label="审批意见">
                <Input v-model="terminalType" readonly="this.disableds"></Input>
            </FormItem>
            </Form>
            <div slot="footer">
                <Button type="" @click="deleteModal=false">取消</Button>
                <Button type="" >确认</Button>
            </div>
        </Modal>
        
    </Card>
</template>

<script>
import { Getprginfolist } from "@/api/api";
export default {
  name: "releaseschedule",
  data() {
    return {
      disableds:true,  
      deleteModal: false,
      value2: 1,
      treeData: [
        {
          title: "终端分组1",
          expand: true,
          children: [
            {
              title: "终端1"
            },
            {
              title: "终端2"
            },
            {
              title: "终端2"
            }
          ]
        },
        {
          title: "终端分组2",
          expand: true,
          children: [
            {
              title: "终端1"
            },
            {
              title: "终端2"
            },
            {
              title: "终端2"
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
      columns: [
        {
          align: "center",
          width: 60,
          title: "序号",
          type: "index"
          //key:'progid'
        },
        {
          title: "发布单号",
          key: "progId"
        },
        {
          title: "节目名称",
          key: "progName"
        },
        {
          title: "审批状态",
          key: "progStatusValue"
          /*render: (h, params) => {
                            const row = params.row;
                            const text = row.approveResultCode==1?'审核通过':'审核未通过';

                            return h('div', {
                                props: {
                                }
                            }, text);   
                        }*/
        },
        {
          title: "审批意见",
          key: "progDesc"
        },
        {
          title: "更新时间",
          key: "updateTime"
        },
        {
          title: " ",
          key: "approveResultCode",
          render: (h, params) => {
            const text =
              params.row.approveResultCode == "已通过" ? "详情" : "审批";

            return h(
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
                    this.detail(params.index);
                  }
                }
              },
              text
            );
          }
        }
      ],
      ContData: {
        pinfo: [
          {
            progid: "", //(节目ID)
            progName: "", //(节目名)
            progCode: "", //(节目源码)
            progTime: "", //(节目时长)
            resolutionCode: "", //(节目分辨率代码)
            resolutionValue: "", //(节目分辨率)
            progSize: "", //(节目大小)
            progTypeCode: "", //(节目类型代码)
            progTypeName: "", //(节目类型)
            progStatusCode: "", //(节目状态代码)
            progStatusName: "", //(节目状态)
            updateTime: "", //(节目更新时间)
            progSourceCode: "", //(节目来源代码)
            progSourceName: "", //(节目来源)
            progUrl: "", //(节目下载地址)
            approveResultCode: "", //(审批结果代码）
            approveUserId: "", //(审批人代码）
            approveUserName: "", //(审批人名)
            approveTime: "" //(审批时间)
          }
        ],
        totalPage: 1,
        pageSize: 20,
        currentPage: 1,
        totalRecord: 3
      },
      AlertData: {
          progid: "", //(节目ID)
            progName: "", //(节目名)
            progCode: "", //(节目源码)
            progTime: "", //(节目时长)
            resolutionCode: "", //(节目分辨率代码)
            resolutionValue: "", //(节目分辨率)
            progSize: "", //(节目大小)
            progTypeCode: "", //(节目类型代码)
            progTypeName: "", //(节目类型)
            progStatusCode: "", //(节目状态代码)
            progStatusName: "", //(节目状态)
            updateTime: "", //(节目更新时间)
            progSourceCode: "", //(节目来源代码)
            progSourceName: "", //(节目来源)
            progUrl: "", //(节目下载地址)
            approveResultCode: "", //(审批结果代码）
            approveUserId: "", //(审批人代码）
            approveUserName: "", //(审批人名)
            approveTime: "" //(审批时间)
      }
    };
  },
  methods: {
    detail(index) {
      console.log(index);
      this.deleteModal = true;
    },
    approve(index) {
      this.deleteModal = true;
    },
    changePage() {
      // this.tableData1 = this.mockTableData1();
    }
  },
  created: function() {
    // this.tableData=this.data.pinfo
    Getprginfolist({
      loginer: "admin"
    }).then(
      function(res) {
        this.ContData = res.data;
      }.bind(this)
    );
  }
};
</script>
