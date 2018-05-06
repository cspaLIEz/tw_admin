<style lang="less">
@import "./user.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-user">
    <div class="view-top margin-bottom-10">
      <Row type="flex">
          <Col span="12" class="handle-top-left">
              <Button type="primary" @click="handleEditRole(false)">添加用户</Button>
              <Button type="primary" @click="handleDel()">删除用户</Button>
              <Button type="primary" @click="handleEditRole(true)">编辑用户</Button>
              <Button type="primary" @click="setRole">设置角色</Button>
              <Button type="primary">用户导入</Button>
              <Button type="primary">用户导出</Button>
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
    <Table border @on-selection-change="hangdleSelect"  :columns="columns" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
          <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
      </div>
    </div>
    <!-- 编辑和添加用户 -->
    <Modal v-model="addUserModal" width="350">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{isEdit?"编辑用户":"添加用户"}}</span>
      </p>
      <div style="text-align:center">
        <Form :model="formInfo" :label-width="80">
          <FormItem label="用户名">
            <Input v-model="formInfo.userName" ></Input>
          </FormItem>
          <FormItem label="登录名">
            <Input v-model="formInfo.loginName" :disabled="isEdit"></Input>       
          </FormItem>
          <FormItem label="输入密码">
            <Input v-model="formInfo.password" type="password"></Input>       
          </FormItem>
          <FormItem label="再次输入">
            <Input v-model="codePassword" type="password"></Input>       
          </FormItem>
          <FormItem label="所属机构">
            <Select v-model="formInfo.organId">
                <Option v-for="item in userSelection" :value="item.organId" :key="item.organId">{{item.organValue}}</Option>
					  </Select>   
          </FormItem>
          <FormItem label="联系电话">
            <Input v-model="formInfo.userTel"></Input>       
          </FormItem>

        </Form>
      </div>
      <div slot="footer" class="btn_center_wrap">			
        <Button type="primary" @click="handleAddUser">确认</Button>
        <Button type="default" @click="addUserModal=false">取消</Button>
      </div>
    </Modal>
    <!-- 设置角色 -->
    <Modal v-model="setRoleModal" width="350">
      <p slot="header" style="color:#f60;text-align:center">
        <span>设置角色</span>
      </p>
      <div style="text-align:center">
        <Form :model="setRoleInfo" :label-width="80">
          <FormItem label="用户名">
            <Input v-model="setRoleInfo.userName" ></Input>
          </FormItem>
          <FormItem label="登录名">
            <Input v-model="setRoleInfo.loginName"></Input>       
          </FormItem>
          <FormItem label="所属机构">
            <Select v-model="setRoleInfo.organId">
              <Option v-for="item in userSelection" :value="item.organId" :key="item.organId">{{item.organValue}}</Option>
            </Select>
          </FormItem>
          <FormItem label="电子邮箱">
            <Input v-model="setRoleInfo.email"></Input>       
          </FormItem>
          <FormItem label="联系电话">
            <Input v-model="setRoleInfo.userTel"></Input>       
          </FormItem>
          <FormItem label="用户角色">
            <Select v-model="setRoleInfo.userRole">
						  <Option value="beijing">管理员</Option>
						  <Option value="shanghai">超级管理员</Option>
					  </Select>   
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="btn_center_wrap">			
        <Button type="primary" @click="handleAddUser">确认</Button>
        <Button type="default" @click="addUserModal=false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="delModelConfig" width="360" title='删除机构'>
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
import {getuserinfolist,edituser,adduser,deluser} from '@/api/api';
export default {
  data() {
    return {
      terminalType: "all",
      codePassword: '',
      addUserModal:false,
      setRoleModal:false,
      delModelConfig: false,
      setRoleInfo:{},
      selectSearch:{},
      userSelection:[],
      checkSelection:[],
      totalRecord:1,
      totalPage:1,
      pageSize:20,
      currentPage:1,
      isEdit:false,
      formInfo:{
        userName:"",
        loginName:"",
        password:"",
        organId:"",
        email:"",
        userTel:""
      },
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "name",
          label: "用户名"
        },
        {
          value: "status",
          label: "登录名"
        },
        {
          value: "parent-org",
          label: "所属机构"
        },
        {
          value: "role",
          label: "用户角色"
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
          title: "用户名",
          key: "userName"
        },
        {
          title: "登录名",
          key: "loginName"
        },
        {
          title: "用户电话",
          key: "userTel",
        },
        {
          title:"所属机构",
          key:'organName'
        },
        {
          title:"用户角色",
          key:'roleName'
        },
        {
          title:"更新时间",
          key:'updateTime'
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
    hangdleSelect(selection){
      this.checkSelection=selection;
    },
    getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
      let data = {
        pageSize,
        currentPage,
        ...searchInfo
      }
      getuserinfolist(data).then((res)=>{
        console.log(res)
        if(res.status==0){
          this.tableData=res.data.pinfo;
          this.pageSize=pageSize;
          this.currentPage=currentPage;
          this.totalPage=res.data.totalPage;
          this.totalRecord=res.data.totalRecord;
          this.selectSearch=searchInfo;
          this.userSelection=[{
            organId: 'JG0001',
            organValue: "武汉大学"
          }]
          console.log(this.userSelection)
        }else{
          this.$Message.error(res.message);
        }
      })
    },
    handleEditRole(isEdit){
      let obj = {}
      if(isEdit){
        if(this.checkSelection.length!=1){
          this.$Message.error("只能选中一项进行编辑");
          return;
        }
        obj =this.checkSelection[0]
      }
      this.formInfo=obj;
      this.isEdit=isEdit;
      this.addUserModal=true;
    },
    handleAddUser(){
      let obj = this.formInfo;
      if(this.codePassword != obj.password){
        this.$Message.error("两次输入密码不一致，请重新输入");
        return;
      }
      if(this.isEdit){
        edituser(obj).then((res)=>{
          if(res.status==0){
            this.$Message.success("编辑成功");
            this.getList();
            this.addUserModal=false;
          }else{
            this.$Message.error(res.message);
          }
        })
      }else{
         adduser(obj).then((res)=>{
          if(res.status==0){
            this.$Message.success("添加成功");
            this.getList();
            this.addUserModal=false;
          }else{
            this.$Message.error(res.message);
          }
        })
      }
    },
    handleDel(){
      if(this.checkSelection.length>0){
        this.delModelConfig=true
      }else{
        this.$Message.error("至少选中一项")
      }
    },
    handleDelOk(){
      let userIdStr=""
        this.checkSelection.map((item,index)=>{
        if(index==this.checkSelection.length-1){
          userIdStr+=item.userId
        }else{
          userIdStr += item.userId + ",";
        }
      })
      deluser({userId:userIdStr}).then((res)=>{
        if(res.status==0){
          this.$Message.success("删除成功");
          this.delModelConfig=false;
          this.getList();
        }else{
          this.$Message.error(res.message)
        }
      })
      
      
    },
    setRole(){
      let obj ={
          userName:"11",
          loginName:"222",
          password:"333",
          organId:"shanghai",
          email:"55",
          userTel:"145454"
        }
      this.setRoleInfo=obj;
      this.setRoleModal=true;
    },
    handleSearch(){
      this.selectSearch={
        [this.terminalType]:this.searchLikes
      }
      console.log({
        [this.terminalType]:this.searchLikes
      })
    },
    changePage(current) {
      this.getList(current)
    }
  }
};
</script>