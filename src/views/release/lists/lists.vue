<style lang="less">
@import "../../../styles/common.less";
@import "./lists.less";
</style>

<template>
    <Card class="view-release-lists">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="info" @click="NewRelease=true">新建发布</Button>
                    <Button type="success">素材发布</Button>
                    <Button type="warning" @click="getlist">一键发布</Button>
                </Col>
                <Col span="12" class="handle-top-right">
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
        <Table border  :columns="columns" :data="tableData.data.pinfo"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="tableData.data.totalRecord" :current="tableData.data.currentPage" @on-change="changePage" :page-size="tableData.data.pageSize" show-elevator show-total></Page>
            </div>
        </div>
        <Modal v-model="deleteModal" title="发布详情" width="880">
            <p style="font-size:16px;font-weigth:bold" >1.节目信息</p>
            
                <Form :model="terminalType" :label-width="80">
                    <Col span='8'>
                    <FormItem label="节目名称">
                        <Input v-model="terminalType" ></Input>
                    </FormItem>
                    </Col>
                    <Col span='8'>
                    <FormItem label="节目时长">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                     </Col>
                    <Col span='8'>
                    <FormItem label="节目分辨率">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                     </Col>
                    <FormItem label="节目描述">
                        <Input v-model="terminalType"></Input>
                    </FormItem>
                    <Col span='12'>
                    <FormItem label="发布模式">
                        <Select  style="width:200px">
                            <Option value="6">定时发布</Option>
                            <Option value="5">周期发布</Option>
                        </Select> 
                    </FormItem>
                    </Col>
                    <Col span='12'>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker> 
                    </FormItem>
                    </Col>
                    <FormItem label="播放模式">
                        <Select  style="width:200px">
                            <Option  value="4">定时发布</Option>
                            <Option  value="3">周期发布</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="起止时间">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> 
                    </FormItem>
                
            <p style="font-size:16px;font-weigth:bold" >2.播放日程</p>
            <p style="border:1px solid #dddee1;text-align:center">星期一 13:10~13:20</p>
            <p style="font-size:16px;font-weigth:bold" >3.终端信息</p>
            <Table border   :columns="Twocolumns" :data="data3.devlist"></Table>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="deleteModal=false">取消</Button>
                <Button type="primary" >确认</Button>
            </div>
        </Modal>
        <Modal v-model="detilModal" title="发布进度详情" width="880">
            <Table border  :columns="ProgressTitle" :data="speacData.pinfo"></Table>
            <div slot="footer">
                <Button type="primary" @click="detilModal=false">取消</Button>
                <Button type="primary" >确认</Button>
            </div>
        </Modal>
        <Modal v-model="NewRelease" width="880" title="第1步：节目选择">
            <Form :label-width="80">
                <Row>
                <Col span='18'>
                <FormItem label="节目名">
                    <Input v-model="releaseData"></Input>
                </FormItem>
                </Col>
                <Col span='6'>
                <Button type="primary" style="margin-left:20px">预览</Button>
                </Col>
                </Row>
            </Form>    
            <div slot="footer">
                <Button type="primary" @click="detilModal=false">取消</Button>
                <Button type="primary" @click="sNewRelease1">下一步</Button>
            </div>
        </Modal>
        <Modal v-model="NewRelease2" width="880" title="第2步：节目选择">
            <Form :label-width="80">
                <Row>
                <Col span='12'>
                    <FormItem label="节目名称">
                        <Input  v-model="terminalType"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="节目时长">
                        <Input  v-model="terminalType"></Input>
                    </FormItem>
                </Col>
                </Row>
                <Row>
                <Col span='12'>
                    <FormItem label="节目分辨率">
                        <Input  v-model="terminalType"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="播放模式">
                        <Input  v-model="terminalType"></Input>
                    </FormItem>
                </Col>
                </Row>
                <Row>
                <Col span='12'>
                    <FormItem label="发布模式">
                        <Select>
                            <Option value="1">立即发布</Option>
                            <Option value="2">定时发布</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="发布时间">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" ></DatePicker>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="起止时间">
                        <DatePicker type="daterange" show-week-numbers placement="bottom-end"></DatePicker>
                    </FormItem>
                </Col>
                </Row>
            </Form>    
            <div slot="footer">
                <Button type="primary" @click="detilModal=false">取消</Button>
                <Button type="primary"  @click="sNewRelease2">下一步</Button>
            </div>
        </Modal>
        <Modal v-model="NewRelease3" width="1280" title="第3步：播放终端设置">
            <div  class="handle-top-right margin-bottom-10">
                    <div class="search-item">
                        <Select v-model="terminalType" style="width:80px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-item">
                        <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                        <Button type="ghost" shape="circle" icon="ios-search"></Button>
                    </div>
                </div>
            <Row>
                <Col span="3">
                    <Card>
                        <p slot="title">终端列表</p>
                        <Tree :data="treeData"></Tree>
                    </Card>
                </Col>
                <Col span="21">
                    <Table class="margin-left-10" border  :columns="columns" :data="tableData"></Table>
                </Col>
            </Row>

            <div slot="footer">
                <Button type="primary" @click="detilModal=false">取消</Button>
                <Button type="primary"  @click="sNewRelease3">下一步</Button>
            </div>
        </Modal>
        <Modal v-model="NewRelease4" width="1280" title="第4步：播放日程设置">
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Button type="info">上一周</Button>
                    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    <Button type="info" @click="one()">下一周</Button>
                    <span>&nbsp;&nbsp;</span>
                    <Input v-model="value2" style="width: 30px"></Input>
                    <Button type="info">跳转</Button>
                </div>
            </div>
                    <Table class="margin-left-10" border  :columns="Twocolumns" :data="data3.devlist"></Table>
            

            <div slot="footer">
                <Button type="primary" @click="detilModal=false">取消</Button>
                <Button type="primary" @click="sNewRelease4">下一步</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import { Getrellist } from "@/api/api";
export default {
  name: "releaseschedule",
  data() {
    return {
      searchLikes: "",
      terminalType: "1",
      tagObj: {},
      pageSize: 20,
      currentPage: 1,
      NewRelease2: false,
      NewRelease3: false,
      NewRelease4: false,
      detilModal: false,
      deleteModal: false,
      NewRelease: false,
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
      /*treeData: [
        {
          title: "未注册",
          expand: true,
          children: [
            {
              title: "终端1"
            }
          ]
        },
        {
          title: "机构1",
          expand: true,
          children: [
            {
              title: "管理员1",
              expand: true,
              children: [
                {
                  title: "分组1",
                  expand: true,
                  children: [
                    {
                      title: "终端1"
                    }
                  ]
                },
                {
                  title: "分组2"
                }
              ]
            },
            {
              title: "管理员2",
              expand: true,
              children: [
                {
                  title: "分组1"
                },
                {
                  title: "分组2"
                }
              ]
            }
          ]
        },
        {
          title: "机构2",
          expand: true,
          children: [
            {
              title: "管理员1"
            },
            {
              title: "管理员2"
            }
          ]
        }
      ],*/
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "节目编号",
          key: "progId"
        },
        {
          title: "节目名称",
          key: "progName"
        },
        {
          title: "分辨率",
          key: "resolutionValue"
        },
        {
          title: "预览",
          key: "resolutionValue"
        },
        {
          title: "时长",
          key: "resolutionValue"
        },
        {
          title: "大小（MB）",
          key: "progSize"
        },
        {
          title: "创建人",
          key: "userName"
        },
        {
          title: "更新时间",
          key: "updateTime"
        },
        {
          title: "节目来源",
          key: "progSourceName"
        },
        {
          title: "审批状态",
          key: "progSourceName"
        },
        {
          title: "审批状态",
          key: "progSourceName"
        },
        {
          title: "Action",
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
                      this.deleteModal = true;
                    }
                  }
                },
                "详情"
              ),
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
                      this.detilModal = true;
                    }
                  }
                },
                "进度详情"
              )
            ]);
          }
        }
      ],
      Twocolumns: [
        {
          title: "终端名称",
          key: "devName"
        },
        {
          title: "终端状态",
          key: "devTypeName"
        },
        {
          title: "分辨率",
          key: "resolutionValue"
        },
        {
          title: "终端类型",
          key: "devTypeName"
        },
        {
          title: "所属机构",
          key: "groupName"
        },
        {
          title: "位置信息",
          key: "devLocation"
        }
      ],
      tableData: {
        data: {
          pinfo: [
            {
              progId: "(节目ID)",
              progName: "(节目名)",
              progCode: "(节目源码)",
              progTime: "(节目时长)",
              resolutionCode: "(节目分辨率代码)",
              resolutionValue: "(节目分辨率)",
              progSize: "(节目大小)",
              progTypeCode: "(节目类型代码)",
              progTypeName: "(节目类型)",
              progStatusCode: "(节目状态代码)",
              progStatusName: "(节目状态)",
              updateTime: "(节目更新时间)",
              progSourceCode: "(节目来源代码)",
              progSourceName: "(节目来源)",
              progUrl: "(节目下载地址)"
            }
          ],
          rinfo: [
            {
              resolutionCode: "(分辨率代码)",
              resolutionValue: "(分辨率)"
            }
          ],
          tinfo: [
            {
              progTypeCode: "(节目类型代码)",
              progTypeValue: "(节目类型)"
            }
          ],
          sinfo: [
            {
              progStatusCode: "（节目状态代码)",
              progStatusValue: "(节目状态)"
            }
          ],
          tinfo: [
            {
              progSourceCode: "(节目来源代码)",
              progSourceValue: "(节目来源)"
            }
          ],
          totalPage: 1,
          pageSize: 20,
          currentPage: 1,
          totalRecord: 3
        }
      },

      ProgressData: {
        pinfo: [
          {
            id: "", //(记录顺序号)
            releaseId: "", //(发布编号)
            progId: "", //(节目代码)
            progName: "", //(节目名称)
            devId: "", //(终端代码)
            devName: "", //(终端名称)
            devLocation: "", //(终端地点)
            releaseStartTime: "", //(发布开始时间)
            resultCode: "", //(发布结果代码)
            resultName: "" //(发布结果)
          }
        ]
      },
      ProgressTitle: [
        {
          title: "节目名称",
          key: "progName"
        },
        {
          title: "终端名称",
          key: "devName"
        },
        {
          title: "终端地点",
          key: "devLocation"
        },
        {
          title: "发布开始时间",
          key: "releaseStartTime"
        },
        {
          title: "发布进度",
          key: "resultName"
        },
        {
          title: " ",
          key: "resultName",
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
                    //   this.deleteModal = true;
                    }
                  }
                },
                "立即发布"
              ),
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
                    //   this.detilModal = true;
                    }
                  }
                },
                "重新发布"
              )
            ]);
          }
        }
      ],
      data3: {
        relinfo: {
          id: "", //(记录顺序号)
          releaseId: "", //(发布编号)
          releaseName: "", //(发布名称)
          releaseTypeCode: "", //(发布类型代码)
          releaseType: "", //(发布类型)
          releaseModeCode: "", //(发布模式代码)
          releaseMode: "", //(发布模式)
          releaseTime: "" //(发布时间)
        },
        proginfo: {
          progId: "", //(节目ID)
          progName: "", //(节目名称)
          prgPlayModeCode: "", //(播放模式代码)
          prgPlayMode: "", //(播放模式)
          expirationStartTime: "", //(有效期开始时间)
          expirationEndTime: "", //(有效期结束时间)
          releaseStatusCode: "", //(发布状态代码)
          releaseStatus: "" //(发布状态)
        },
        playSchedule: ["Time1", "time2"], //(播放时段)
        devlist: [
          {
            id: "", //(记录顺序号)
            devId: "", //(终端代码)
            devIdentification: "", //(终端标识)
            devName: "", //(终端名称)
            devTypeCode: "", //(终端类型代码)
            devTypeName: "", //(终端类型)
            devIpAddr: "", //(终端IP地址)
            devLocation: "", //(终端地点)
            resolutionCode: "", //(终端分辨率代码)
            resolutionValue: "", //(终端分辨率)
            groupCode: "", //(终端所在组代码)
            groupName: "" //(终端所在组)
          }
        ],
        approveinfo: {
          approveUserId: "", //(审批人代码)
          approveUserName: "", //(审批人)
          approveResult: "", //(审结结果代码)
          approveOption: "", //(审批意见)
          approveTime: "" //(审批时间)
        }
      },
      speacData: {
        pinfo: [
          {
            id: "", //(记录顺序号)
            releaseId: "", //(发布编号)
            progId: "", //(节目代码)
            progName: "", //(节目名称)
            devId: "", //(终端代码)
            devName: "", //(终端名称)
            devLocation: "", //(终端地点)
            releaseStartTime: "", //(发布开始时间)
            resultCode: "", //(发布结果代码)
            resultName: "" //(发布结果)
          }
        ]
      },
      releaseData:{}
    };
  },
  methods: {
    detail(index) {},
    approve(index) {},
    changePage(index) {
      // this.tableData1 = this.mockTableData1();
      console.log(index);
    },
    getlist(
      currentPage = this.currentPage,
      pageSize = this.pageSize,
      searchInfo = this.selectSearch
    ) {
      let data = {
        pageSize,
        currentPage,
        ...searchInfo
      };
      Getrellist(data).then(res => {
        this.tableData = res;
        this.selectSearch = searchInfo;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
      });
    },
    sNewRelease1() {
      this.NewRelease = false;
      this.NewRelease2 = true;
    },
    sNewRelease2() {
      this.NewRelease2 = false;
      this.NewRelease3 = true;
    },
    sNewRelease3() {
      this.NewRelease3 = false;
      this.NewRelease4 = true;
    },
    sNewRelease4() {
      this.NewRelease4 = false;
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
    this.getlist();
  }
};
</script>
