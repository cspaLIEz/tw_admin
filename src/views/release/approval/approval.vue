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
                      <Tag v-for="item in Object.keys(tagObj)" :key="item" :name="item" closable @on-close="handleCloseTag">{{tagObj[item]}}</Tag>
                    </div>
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:90px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search" @click="handleSearch"></Button>
                    </div>
                </Col>
            </Row>
        </div>
        <Table border  :columns="columns" :data="ContData.pinfo"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
            </div>
        </div>
        <Modal v-model="deleteModal" title="发布详情" width="880">
            <p style="font-size:16px;font-weigth:bold" >1.节目信息</p>
                <Form :model="AlertData" :label-width="80" >
                  <Row>
                    <Col span='8'>
                    <FormItem label="节目名称">
                        <Input v-model="AlertData.progName"></Input>
                    </FormItem>
                    </Col>
                    <Col span='8'>
                    <FormItem label="节目时长">
                        <Input v-model="AlertData.progTime"></Input>
                    </FormItem>
                     </Col>
                    <Col span='8'>
                    <FormItem label="节目分辨率">
                        <Input v-model="AlertData.resolutionValue"></Input>
                    </FormItem>
                     </Col>
                     </Row>
                    <FormItem label="节目描述">
                        <Input v-model="AlertData.resolutionValue"></Input>
                    </FormItem>
                    <Row>
                    <Col span='12'>
                    <FormItem label="发布模式">
                        <Select  style="width:200px">
                            <Option value="1">定时发布</Option>
                            <Option value="2">周期发布</Option>
                        </Select> 
                    </FormItem>
                    </Col>
                    <Col span='12'>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"  ></DatePicker> 
                    </FormItem>
                    </Col>
                    </Row>
                    <FormItem label="播放模式">
                        <Select  style="width:200px">
                            <Option value="3" >定时发布</Option>
                            <Option value="4" >周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="起止时间">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> 
                    </FormItem>
                
            <p style="font-size:16px;font-weigth:bold" >2.播放日程</p>
            <p style="border:1px solid #dddee1;text-align:center">星期一 13:10~13:20</p>
            <p style="font-size:16px;font-weigth:bold" >3.终端信息</p>
            <Table border  :columns="Twocolumns" :data="data3.devlist"></Table>
            <p style="font-size:16px;font-weigth:bold" >4.审批操作</p>
            <FormItem label="审批结果">
                <Select  style="width:200px" >
                <Option value="5" >通过</Option>
                <Option value="6" >不通过</Option>
                </Select> 
            </FormItem>
            <FormItem label="审批意见">
                <Input v-model="terminalType"></Input>
            </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="deleteModal=false">取消</Button>
                <Button type="primary" >确认</Button>
            </div>
        </Modal>
        
    </Card>
</template>

<script>
import { Getprginfolist,Getreldetail } from "@/api/api";
export default {
  name: "releaseschedule",
  data() {
    return {
      searchLikes: "",
      terminalType: "",
      tagObj: {},
      totalRecord:1,
      selectSearch:{},
      searchLikes: "",
      terminalType: "",
      tagObj: {},
      pageSize: 20,
      currentPage: 1,
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
      Twocolumns:[
                {
                    title:"终端名称",
                    key:"devName"
                },{
                    title:"终端状态",
                    key:"devTypeName"
                },{
                    title:"分辨率",
                    key:"resolutionValue"
                },{
                    title:"终端类型",
                    key:"devTypeName"
                },{
                    title:"所属机构",
                    key:"groupName"
                },{
                    title:"位置信息",
                    key:"devLocation"
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
            const text = params.row.approveResultCode == "已通过" ? "详情" : "审批";

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
                    // console.log(params.row.progId)
                    this.detail(params.row.progId);
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
          progid: "1", //(节目ID)
            progName: "1", //(节目名)
            progCode: "1", //(节目源码)
            progTime: "1", //(节目时长)
            resolutionCode: "1", //(节目分辨率代码)
            resolutionValue: "1", //(节目分辨率)
            progSize: "1", //(节目大小)
            progTypeCode: "1", //(节目类型代码)
            progTypeName: "1", //(节目类型)
            progStatusCode: "1", //(节目状态代码)
            progStatusName: "1", //(节目状态)
            updateTime: "1", //(节目更新时间)
            progSourceCode: "1", //(节目来源代码)
            progSourceName: "1", //(节目来源)
            progUrl: "1", //(节目下载地址)
            approveResultCode: "1", //(审批结果代码）
            approveUserId: "1", //(审批人代码）
            approveUserName: "1", //(审批人名)
            approveTime: "1" //(审批时间)
      },
      data3: {
        relinfo:{
            id:"",//(记录顺序号)
            releaseId:"",//(发布编号)
            releaseName:"",//(发布名称)
            releaseTypeCode:"",//(发布类型代码)
            releaseType:"",//(发布类型)
            releaseModeCode:"",//(发布模式代码)
            releaseMode:"",//(发布模式)
            releaseTime:"",//(发布时间)
          },
          proginfo:{
          progId:"",//(节目ID)
          progName:"",//(节目名称)
            prgPlayModeCode:"",//(播放模式代码)
            prgPlayMode:"",//(播放模式)
            expirationStartTime:"",//(有效期开始时间)
            expirationEndTime:"",//(有效期结束时间)
            releaseStatusCode:"",//(发布状态代码)
            releaseStatus:"",//(发布状态)

            },
          playSchedule:[ "Time1","time2"],//(播放时段)
          devlist:[{
              id:"",//(记录顺序号)
              devId:"",//(终端代码)
              devIdentification:"",//(终端标识)
              devName:"",//(终端名称)
              devTypeCode:"",//(终端类型代码)
              devTypeName:"",//(终端类型)
              devIpAddr:"",//(终端IP地址)
              devLocation:"",//(终端地点)
              resolutionCode:"",//(终端分辨率代码)
              resolutionValue:"",//(终端分辨率)
              groupCode:"",//(终端所在组代码)
              groupName:"",//(终端所在组)
          }],
          approveinfo:{
            approveUserId:"",//(审批人代码)
            approveUserName:"",//(审批人)
            approveResult:"",//(审结结果代码)
            approveOption:"",//(审批意见)
            approveTime:"",//(审批时间)
            }
	
  }

    };
  },
  methods: {
    detail(data) {
      // console.log(data)
      Getreldetail({
        "loginer":"admin",
        "loginId":"YH0001",
        "releaseId":data
      }).then((res)=>{
        // console.log(res)
      })
      this.deleteModal = true;
    },
    approve(index) {
      this.deleteModal = true;
    },
    changePage() {
      // this.tableData1 = this.mockTableData1();
    },
    getlist(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
      let data = {
                pageSize,
                currentPage,
                ...searchInfo
            }
      Getprginfolist(data).then(
        (res) =>{
          this.ContData = res.data;
        }
      );
    },
    handleSearch() {
      let { tagObj, terminalType, searchLikes } = this;
      tagObj[terminalType] = searchLikes;
        this.getlist(1,this.pageSize,tagObj)
    },
    handleCloseTag(e, name) {
      let tagObj = { ...this.tagObj };
      delete tagObj[name];
      this.tagObj = tagObj;
    }
  },
  created: function() {
    // this.tableData=this.data.pinfo
    this.getlist()
  }
};
</script>
