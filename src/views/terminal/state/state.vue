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
        <Table border  :columns="columns" :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
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
      <Modal v-model="GrouoRunModel" width="560">
          <p slot="header" style="color:#f60;text-align:center">
              终端运行参数设置
          </p>
          <div style="text-align:center">
              <Form :model="runGroupdata" :label-width="80">
                <FormItem label="终端代码">
                    <Input v-model="runGroupdata.devId"></Input>
                </FormItem>
                <FormItem label="终端名称">
                    <Input v-model="runGroupdata.devname"></Input>
                </FormItem>
                <FormItem label="音量">
                    <Slider v-model="runGroupdata.volume"></Slider>

                </FormItem>
                <FormItem label="存储报警阈值">
                    <Input v-model="runGroupdata.devStoragethresh" style="width:200px"></Input><span>GB</span>
                </FormItem>
                <FormItem label="无操作返回等待时间">
                    <Select v-model="runGroupdata.spareTime">
                        <Option value="1">1分钟</Option>
                        <Option value="3">3分钟</Option>
                        <Option value="5">5分钟</Option>
                        <Option value="10">10分钟</Option>
                    </Select>
                </FormItem>
                <FormItem label="自动开机时间">
                    <TimePicker :value="runGroupdata.spareTime" format="HH:mm" placeholder="选择时、分" style="width: 168px"></TimePicker>
                </FormItem>
                <FormItem label="自动关机时间">
                    <TimePicker :value="runGroupdata.devAutoOffTime" format="HH:mm" placeholder="选择时、分" style="width: 168px"></TimePicker>
                </FormItem>
                <Checkbox v-model="runGroupdata.singleUsb">USB接口使能</Checkbox>
                <Checkbox v-model="runGroupdata.singleAutoplay">开机自动播放节目</Checkbox>
                <Checkbox v-model="runGroupdata.singleAutohidden">自动隐藏鼠标</Checkbox>
                <Checkbox v-model="runGroupdata.singleFullscreen">自动全屏播放节目</Checkbox>
            </Form>
          </div>
          <div slot="footer">
              <Button type="warning">关闭</Button>
              <Button type="primary" @click="uploadGroupdata">保存</Button>
          </div>
      </Modal>
    </div>
  </Card>
</template>
<script>

import {Getdevstatusinfolist,getdevgroupinfolist,Savedevruninfo} from '@/api/api';
export default {
  data() {
    return {
        sliderone:50,
        GrouoRunModel:false,
        totalRecord:"",
        searchLikes: "",
      terminalType: "",
      tagObj: {},
      pageSize: 20,
      currentPage: 1,
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
                      editorModel=true
                    }
                  }
                },
                "基本属性"
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
                    //   this.showModel(params.index)
                    // this.GrouoRunModel=true
                    this.showGroup(params.index)
                    }
                  }
                },
                "运行配置"
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
      },
      runGroupdata:{
            devname:'',
            devId:"",//(终端代码)
            // devAutoUpdateFlag(设备信息自动更新)
            devStoragethresh:"",//(存储阈值)
            devUsable:"",//(端口使能，0-否，1-是)
            devAutoOnTime:"",//(开机时间,HH:mm)
            devAutoOffTime:"",//(关机时间,HH:mm)
            devMouseHide:"",//(鼠标是否隐藏，0-否，1-是)
            devFullScreen:"",//(终端全屏，0-否，1-是)
            spareTime:"3",//(无操作时间，取值1~10，默认3)
            autoPlay:"",//(自动播放，0-否，1-是)
            volume:50,//(终端音量，0~100，默认50)
            singleUsb:false,
            singleAutoplayb:false,
            singleAutohidden:false,
            singleFullscreen:false,
      },
      alldata:''
    };
  },
  methods: {
    showModel(index) {
      this.editorModel = true;
    },
    changePage (){
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
        Getdevstatusinfolist({
            currentPage:"1",
            pageSize:"10"
        }).then((res)=>{
            // console.log(res)
            this.alldata=res
            this.tableData=res.data.pinfo
            this.selectSearch=searchInfo;
            this.pageSize=pageSize;
            this.currentPage=currentPage;
            this.totalPage=res.data.totalPage;
            this.totalRecord=res.data.totalRecord;
          
        })
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
        },
        showGroup(i){
            console.log(this.alldata.data.pinfo[i].devId)
            this.runGroupdata.devId=this.alldata.data.pinfo[i].devId
            this.runGroupdata.devname=this.alldata.data.pinfo[i].devName
            this.GrouoRunModel=true
        },
        uploadGroupdata(){
            console.log(this.runGroupdata)
            this.GrouoRunModel=false
            Savedevruninfo().then((res) => {
                console.log(res)
            })    
            
        }
  },
  created:function(){
      this.getlist()
       this.getLeftGroup()
  }
};
</script>