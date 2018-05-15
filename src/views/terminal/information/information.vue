<style lang="less">
@import "./information.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-terminal-information">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="4" class="handle-top-left">
                    <Button type="primary" @click="ImportModal=true">批量导入</Button>
                </Col>
                <Col span="20" class="handle-top-right">
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
        <!-- 删除框 -->
        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>终端删除</span>
            </p>
            <div style="text-align:center">
                <p>本操作将删除指定终端！该终端所有信息将被删除，不可再使用。请确认！</p>
            </div>
            <div slot="footer">
                <Button type="error" @click="deleteModal=false">取消</Button>
                <Button type="error" @click="remove">确认</Button>
            </div>
        </Modal>
        <!-- 注册框 -->
        <Modal v-model="registerModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>终端注册</span>
            </p>
            <div style="text-align:center">
                <Form :model="formRegister" :label-width="80">
                    <FormItem label="终端名称">
                        <Input v-model="formRegister.name" readonly></Input>
                    </FormItem>
                    <FormItem label="终端ID">
                        <Input v-model="formRegister.id" readonly></Input>
                    </FormItem>
                    <FormItem label="终端标识">
                        <Input v-model="formRegister.mark" readonly></Input>
                    </FormItem>
                    <FormItem label="终端类型">
                        <Input v-model="formRegister.type" readonly></Input>
                    </FormItem>
                    <FormItem label="安装地址">
                        <Input v-model="formRegister.address" readonly></Input>
                    </FormItem>
                    <FormItem label="机构">
                      <!-- v-model="formRegister.ogr" -->
                        <Select value="all" >
                            <Option value="all">全部</Option>
                            <Option v-for="item in allOrgname" :value="item.organId">{{item.organName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="管理员">
                       <!-- v-model="formRegister.admin" -->
                        <Select>
                            <Option value="admin">admin</Option>
                            <Option value="zs">张三</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error" @click="registerModal=false">取消</Button>
                <Button type="error" @click="GroupRegist">确认</Button>
            </div>
        </Modal>
        <!--批量导入-->
        <Modal v-model="ImportModal"  title="终端基本信息批量导入">
            <Form :label-width="80">
                <FormItem label="文件地址">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" >浏览</Button>
                </Upload>
                </FormItem>
                <FormItem label="已选择素材名">
                    <Input  type="textarea" :autosize="{minRows: 4}" placeholder="（1）终端名称1（标识，IP地址，终端类型）
（2）终端名称2（标识，IP地址，终端类型）
（3）终端名称3（标识，IP地址，终端类型）
读取的内容采用文本或者表格进行显示，确认后再进行提交，更新已有终端信息，插入不存在的终端 信息"></Input>
                </FormItem>  
            </Form>
            <div slot="footer">
                <Button type="default" @click="ImportModal=false">取消</Button>
                <Button type="primary" @click="ImportModal=false">确认</Button>
            </div>
        </Modal>
    </div>
  </Card>
</template>
<script>
import { Getdeviceinfolist,Regdevice,Deldevice,Getorganname } from "@/api/api";
export default {
  data() {
    return {
      searchLikes: "",
      terminalType: "1",
      tagObj: {},
      pageSize: 20,
      currentPage: 1,
      deleteModal: false,
      deleteIndex: "",
      registerModal: false,
      ImportModal: false,
      formRegister: {
        name: "",
        id: "",
        mark: "",
        type: "",
        address: "",
        org:"",
        admin:""
      },
      treeData: [
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
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "终端名称",
          key: "devName"
        },
        {
          title: "设备ID",
          key: "devId"
        },
        {
          title: "终端状态",
          key: "devStatusValue"
        },
        {
          title: "分辨率",
          key: "resolutionValue"
        },
        {
          title: "终端类型",
          key: "devTypeValue"
        },
        {
          title: "IP地址",
          key: "devIpAddr"
        },
        {
          title: "所属机构",
          key: "organName"
        },
        {
          title: "管理员",
          key: "userName"
        },
        {
          title: "位置信息",
          key: "devLocation"
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
                      this.register(params.index);
                      
                    }
                  }
                },
                "注册"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      //  this.remove(params.index)
                      this.deleteModal = true;
                      this.deleteIndex = params.index;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: {
        status: 0,
        message: "success!",
        data: {
          pinfo: [
            {
              id: 2,
              devId: "ZD0002",
              devName: "大楼播放",
              devTypeCode: "2",
              devTypeValue: "windows",
              devIpAddr: "192.168.1.222",
              devMacAddr: "LKLKLJLJ",
              devGatewayAddr: "192.168.1.1",
              devLocation: "武汉世贸中心B座",
              resolutionCode: "1",
              resolutionValue: "1900*1600",
              bandWidthCode: "1",
              bandWidthValue: "1",
              devStatusCode: "1",
              devStatusValue: "在线",
              usableCode: "1",
              usableValue: "正常",
              groupId: "DG00000001",
              devIdentification: "222",
              onlineStatusCode: "1",
              onlineTime: "30分钟",
              diskSpace: "1256MB",
              updateTime: "2018-05-03 17:18:58.0"
            }
          ],
          totalPage: 1,
          ainfo: [
            {
              id: 1,
              devTypeCode: "1",
              devTypeValue: "安卓系统"
            },
            {
              id: 2,
              devTypeCode: "2",
              devTypeValue: "windows"
            }
          ],
          rinfo: [
            {
              id: 1,
              resolutionCode: "1",
              resolutionValue: "1900*1600"
            },
            {
              id: 2,
              resolutionCode: "2",
              resolutionValue: "1024*768"
            }
          ],
          tree: [
            {
              organName: "武汉大学CS",
              orggroup: [
                {
                  organId: "JG0003",
                  userName: "admin",
                  userId: "YH0001",
                  group: [
                    {
                      groupName: "大厅",
                      groupId: "DG00000001"
                    },
                    {
                      groupName: "一楼",
                      groupId: "DG00000002"
                    },
                    {
                      groupName: "超市",
                      groupId: "DG00000008"
                    },
                    {
                      groupName: "CHENDUN",
                      groupId: "DG00000009"
                    }
                  ]
                }
              ],
              organId: "JG0003"
            }
          ],
          pageSize: 20,
          currentPage: 1,
          totalRecord: 3
        }
        //
      },
      allOrgname:[{
        organId:"",
        organName: ""
      }]
    };
  },
  methods: {
    register(index) {
      // console.log(index)
      this.formRegister.name=this.tableData.data.pinfo[index].devName
      this.formRegister.id=this.tableData.data.pinfo[index].devId
      this.formRegister.mark=this.tableData.data.pinfo[index].devIdentification
      this.formRegister.type=this.tableData.data.pinfo[index].devTypeValue
      this.formRegister.address=this.tableData.data.pinfo[index].devLocation
      this.registerModal = true;
    },
    remove() {
      // this.tableData.data.pinfo.splice(this.deleteIndex, 1);
      let data={devId:this.tableData.data.pinfo[this.deleteIndex].devId}

      console.log(data)
      Deldevice(data).then((res)=>{
        // console.log(res)
        this.getlist()
      })
      this.deleteModal = false;
    },
    changePage() {
      // this.tableData1 = this.mockTableData1();
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
    },
    getlist(currentPage = this.currentPage,
      pageSize = this.pageSize,
      searchInfo = this.selectSearch){
        let data = {
          pageSize,
          currentPage,
          ...searchInfo
        };
        Getdeviceinfolist(data).then((res) => {
          console.log(res)
          this.tableData = res;
          this.selectSearch=searchInfo;
          this.pageSize=pageSize;
          this.currentPage=currentPage;
          this.totalPage=res.data.totalPage;
          this.totalRecord=res.data.totalRecord;
          
          let dataArr = []
                dataArr=res.data.tree;
                dataArr.map((item,index)=>{
                    if(item.orggroup){
                        item.children=item.orggroup;
                        item.title=item.organName;
                        item.children.map((childItem,index)=>{
                            if(childItem.group){
                                childItem.children=childItem.group;
                                childItem.title=childItem.userName;
                                childItem.children.map((grandsonItem,index)=>{
                                    grandsonItem.title=grandsonItem.groupName;
                                })
                            }
                            
                        })
                    }
                
                })
                this.treeData=dataArr
        });
    },
    GroupRegist(){
      Regdevice(this.formRegister).then((res)=>{
        this.registerModal = false;
      })
    },
    GetOrgAllName(){
      Getorganname({
        "loginer":"admin",
        "loginId":"YH0001"
      }).then((res) => {
        if(res.message=="success"){
          console.log(res)
          this.allOrgname=res.data
        }
      })
    }
  },
  created: function() {
    // this.tableData=this.data.pinfo
    this.getlist()
    this.GetOrgAllName()
  }
};
</script>



