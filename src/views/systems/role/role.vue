<style lang="less">
@import "./role.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-role">
    <div class="view-top margin-bottom-10">
      <Row type="flex">
          <Col span="12" class="handle-top-left">
              <Button type="primary" @click="handleEditRole(false)">添加角色</Button>
              <Button type="primary" @click="handleDel()">删除角色</Button>
              <Button type="primary" @click="handleEditRole(true)">编辑角色</Button>
              <Button type="primary">角色导入</Button>
              <Button type="primary">角色导出</Button>
          </Col>
          <Col span="12" class="handle-top-right">
              <div class="search-item">
                  <Select v-model="terminalType" style="width:80px">
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
    <Table border @on-selection-change="hangdleSelect" :columns="columns" :data="tableData" ></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
        </div>
    </div>
    <!-- 添加和编辑角色 -->
    <Modal v-model="addRoleModal" width="600">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{isEdit?"编辑角色":"添加角色"}}</span>
      </p>
      <div style="text-align:center">
        <Form :model="formInfo" :label-width="80">
          <FormItem label="角色名">
            <Input v-model="formInfo.roleName" :disabled="isEdit"></Input>
          </FormItem>
          <FormItem label="权限指定">
            <ul v-for="item in checkAllGroup" class="checkGroupWrap">
                <li>
                  <Checkbox
                      :indeterminate="item.indeterminate"
                      :value="item.checkAll"
                      @click.prevent.native="handleCheckAll(item)" style="color:#2b85e4">{{item.AllLabel}}</Checkbox>
                </li>
                <li >
                    
                  <CheckboxGroup v-model="item.checkValue" @on-change="checkboxGroupChange(item)">
                      <Checkbox :label="childItem.value" :key="childItem.value" v-for="childItem in item.checkGroup">{{childItem.childLabel}}</Checkbox>
                  </CheckboxGroup>
                </li>
            </ul>            
          </FormItem>
          <FormItem label="角色说明">
            <Input v-model="formInfo.roleDesc" type="textarea" :rows="4"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="btn_center_wrap">			
        <Button type="primary" @click="handleAddRole">确认</Button>
        <Button type="default" @click="addRoleModal=false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="delModelConfig" width="360" title='删除角色'>
      <div>
        本操作将删除指定机构！所有被指定在该 机构下的用户在指定新机构前无法登录使用。请确认！
      </div>
      <div slot="footer" class="btn_center_wrap">			
        <Button type="primary" @click="handleDelOk">确认</Button>
        <Button type="default" @click="delModelConfig=false">取消</Button>
      </div>
  </Modal>
  </Card>
</template>
<script>
import {getroleinfolist,editrole,addrole,delrole} from '@/api/api';
export default {
  data() {
    return {
      terminalType: "all",
      addRoleModal:false,
      isEdit:false,
      delModelConfig: false,
      selectSearch:{},
      totalRecord:1,
      totalPage:1,
      pageSize:20,
      currentPage:1,
      checkSelection:[],
      checkAllGroup:[
        {
          AllLabel:"节目管理",
          checkAll:false,
          indeterminate:true,
          checkAllValue:["0","1","2","3"],
          checkValue:[],
          checkGroup:[
            {
              childLabel:"节目制作",
              value:"0"
            },
            {
              childLabel:"节目信息",
              value:"1"
            },
            {
              childLabel:"节目发布",
              value:"2"
            },
            {
              childLabel:"节目审批",
              value:"3"
            },
          ]
        },
        {
          AllLabel:"终端管理",
          checkAll:false,
          checkValue:[],
          indeterminate:true,
          checkAllValue:["0","1","2"],
          checkGroup:[
            {
              childLabel:"终端设置",
              value:"0"
            },
            {
              childLabel:"终端操作",
              value:"1"
            },
            {
              childLabel:"播放管理",
              value:"2"
            },
          ]
        },
        {
          AllLabel:"资源管理",
          checkAll:false,
          checkValue:[],
          indeterminate:true,
          checkAllValue:["0","1"],
          checkGroup:[
            {
              childLabel:"素材管理",
              value:"0"
            },
            {
              childLabel:"模板管理",
              value:"1"
            },
          ]
        },
        {
          AllLabel:"日志管理",
          checkAll:false,
          checkValue:[],
          indeterminate:true,
          checkAllValue:["0","1"],
          checkGroup:[
            {
              childLabel:"日志查询",
              value:"0"
            },
            {
              childLabel:"日志导出",
              value:"1"
            }
          ]
        },
        {
          AllLabel:"系统管理",
          checkAll:false,
          checkValue:[],
          indeterminate:true,
          checkAllValue:["0","1","2","3"],
          checkGroup:[
            {
              childLabel:"机构设置",
              value:"0"
            },
            {
              childLabel:"用户管理",
              value:"1"
            },
            {
              childLabel:"角色管理",
              value:"2"
            },
            {
              childLabel:"系统参数",
              value:"3"
            },
          ]
        },
        
      ],
      formInfo:{
        roleName:'',
        roleDesc:'',
        roleFunc:'',
      },
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "name",
          label: "角色名称"
        },
        {
          value: "status",
          label: "角色描述"
        },
        {
          value: "parent-org",
          label: "角色功能"
        }
      ],
      searchLikes: "",
      searchInResult: "",
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          title: "序号",
          key: "index"
        },
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "角色描述",
          key: "roleDesc"
        },
        {
         title:"更新时间",
         key:"updateTime"        
        }
      ],
      tableData: []
    };
  },
  mounted:function(){
    this.getList()
  },
  methods: {
    register(index) {},
    remove(index) {
      this.tableData.splice(index, 1);
    },
    handleCheckAll (e) {
        if (e.indeterminate) {
            e.checkAll = false;
        } else {
            e.checkAll = !e.checkAll;
        }
        console.log(e)
        e.indeterminate=false;
        if (e.checkAll) {
            e.checkValue = e.checkAllValue;
        } else {
            e.checkValue = [];
        }
    },
    checkboxGroupChange(item){
      if (item.checkValue.length === item.checkAllValue.length) {
            item.indeterminate = false;
            item.checkAll = true;
        } else if (item.checkValue.length > 0) {
            item.indeterminate = true;
            item.checkAll = false;
        } else {
            item.indeterminate = false;
            item.checkAll = false;
        }
      console.log(item)
      console.log(this.checkAllGroup)
    },
    handleAddRole(){
      this.addRoleModal=false
    },
    handleSearch(){
      this.selectSearch={
        [this.terminalType]:this.searchLikes
      }
    },
    getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
      let data = {
        pageSize,
        currentPage,
        ...searchInfo
      }
      getroleinfolist(data).then((res)=>{
          console.log(res)
        if(res.status==0){
          this.tableData=res.data.pinfo;
          this.pageSize=pageSize;
          this.currentPage=currentPage;
          this.totalPage=res.data.totalPage;
          this.totalRecord=res.data.totalRecord;
          this.selectSearch=searchInfo;
    
        }else{
          this.$Message.error(res.message);
        }
      })
    },
    hangdleSelect(selection){
      this.checkSelection=selection;
    },
    handleDel(){
      if(this.checkSelection.length>0){
        this.delModelConfig=true
      }else{
        this.$Message.error("至少选中一项")
      }
    },
    handleDelOk(){
      let roleIdStr=""
      this.checkSelection.map((item,index)=>{
        if(index==this.checkSelection.length-1){
          roleIdStr+=item.roleId
        }else{
          roleIdStr += item.roleId + ";";
        }
      })
      delrole({roleId:roleIdStr}).then((res)=>{
        if(res.status==0){
          this.$Message.success("删除成功");
          this.delModelConfig=false;
          this.getList();
        }else{
          this.$Message.error(res.message)
        }
      })
      
      
    },
    handleEditRole(isEdit){
      let obj = {}
      if(isEdit){
        obj ={
          roleName:'111',
          roleDesc:'111',
          roleFunc:'',
        }
      }else{
          obj ={
            roleName:'',
            roleDesc:'',
            roleFunc:'',
          }
      }
      this.formInfo=obj;
      this.isEdit=isEdit;
      this.addRoleModal=true;
    },
    roleModalCancel(e){
      if(!e){
        let obj ={
          superiorroleId:'',
          organName:'',
          organDescr:'',
          organLeader:'',
          organTele:''
        }
        this.formInfo=obj;
      }
      
    },
    changePage(current) {
      this.getList(current)
    }
  }
};
</script>