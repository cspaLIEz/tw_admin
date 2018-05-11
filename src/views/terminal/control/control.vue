<style lang="less">
@import "./control.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-terminal-control">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="margin-bottom-10">
            <Row type="flex">
                <Col span="12" class="handle-top-left">
                    <Button type="primary" @click="oneBut">开始播放</Button>
                    <Button type="primary" @click="oneBut">停止播放</Button>
                    <Button type="primary" @click="Restart=true">清空节目</Button>
                    <Button type="primary" @click="Restart=true">重启终端</Button>
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
        <Table border @on-selection-change="hangdleSelect"  :columns="columns" :data="tableData" ></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
            </div>
        </div>
    </div>
        <Modal v-model="Restart">
            <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>警  告</span>
            </p>
        <div style="text-align:center">
            <p>本操作将执行相对应操作，需要确认已有一个或多个终端 被选定，在此处理提示操作是否发送成功。点击确定后，后台再一定时间内将操作结果在页面上更新，超过规定时间完成操作的结果通过手动刷新页面获取结果</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large"  @click="Restart=false">确定</Button>
        </div>
        </Modal>
  </Card>
</template>
<script>
import { Getdevplayinfolist ,getdevgroupinfolist} from "@/api/api";
export default {
  data() {
    return {
      totalRecord: 1,
      searchLikes: "",
      terminalType: "",
      tagObj: {},
      pageSize: 20,
      currentPage: 1,
      userSelection: [],
      Restart: false,
      treeData: [
        {
          title: "机构1",
          expand: true,
          Restart: false,
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
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "终端代码",
          key: "devId"
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
          title: "分组",
          key: "groupName"
        },
        {
          title: "终端在线状态",
          key: "onlineStatusCode"
        },
        {
          title: "节目数",
          key: "programNum"
        },
        {
          title: "节目播放状态",
          key: "playStatus"
        }
      ],
      tableData: []
    };
  },
  methods: {
    register(index) {},
    remove(index) {
      this.tableData.splice(index, 1);
    },
    changePage() {
      // this.tableData1 = this.mockTableData1();
    },
    hangdleSelect(selection) {
      this.userSelection = selection;
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
      Getdevplayinfolist(data).then(res => {
        this.tableData = res.data.pinfo;
        this.selectSearch = searchInfo;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.totalPage = res.data.totalPage;
        this.totalRecord = res.data.totalRecord;
      });
    },
    handleSearch() {
      let { tagObj, terminalType, searchLikes } = this;
      tagObj[terminalType] = searchLikes;
      this.getlist(1, this.pageSize, tagObj);
    },
    handleCloseTag(e, name) {
      let tagObj = { ...this.tagObj };
      delete tagObj[name];
      this.tagObj = tagObj;
    },
    oneBut() {
      if (this.userSelection.length > 0) {
        this.Restart = true;
      } else {
        this.$Message.error("至少选中一项");
      }
    },
    getLeftGroup(){
            getdevgroupinfolist({loginId:'YH0001'}).then((res)=>{
                console.log(res)
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
            })
        }
  },
  created: function() {
    this.getlist();
    this.getLeftGroup()
  }
};
</script>