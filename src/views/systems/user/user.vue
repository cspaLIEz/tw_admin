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
              <Button type="primary">删除用户</Button>
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
    <Table border  :columns="columns" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
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
						  <Option value="beijing">市场一部</Option>
						  <Option value="shanghai">市场二部</Option>
					  </Select>   
          </FormItem>
          <FormItem label="电子邮箱">
            <Input v-model="formInfo.email"></Input>       
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
						  <Option value="beijing">市场一部</Option>
						  <Option value="shanghai">市场二部</Option>
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
  </Card>
</template>
<script>
export default {
  data() {
    return {
      terminalType: "all",
      codePassword: '',
      addUserModal:false,
      setRoleModal:false,
      setRoleInfo:{},
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
          title: "密码",
          key: "password"
        },
        {
          title: "用户描述",
          key: "userDesc",
        },
        {
          title:"所属机构",
          key:'oganId'
        },
        {
          title:"用户角色",
          key:'userRole'
        },
        {
          title:"更新时间",
          key:'updateTime'
        }
      ],
      tableData: [
        {
          id: 1,
          userId: 18,
          userName: "New York No. 1 Lake Park",
          loginName: "张三",
          roleName: "sdsdfs",
          roleCode:"123",
          organId:234,
          organName:"机构手动释放",
          userTel: 3145648454,
          updateTime:'2018-12-15' 
        },
        {
          id: 1,
          userId: 18,
          userName: "New York No. 1 Lake Park",
          loginName: "张三",
          roleName: "sdsdfs",
          roleCode:"123",
          organId:234,
          organName:"机构手动释放",
          userTel: 3145648454,
          updateTime:'2018-12-15' 
        },
        {
          id: 1,
          userId: 18,
          userName: "New York No. 1 Lake Park",
          loginName: "张三",
          roleName: "sdsdfs",
          roleCode:"123",
          organId:234,
          organName:"机构手动释放",
          userTel: 3145648454,
          updateTime:'2018-12-15' 
        },
        {
          id: 1,
          userId: 18,
          userName: "New York No. 1 Lake Park",
          loginName: "张三",
          roleName: "sdsdfs",
          roleCode:"123",
          organId:234,
          organName:"机构手动释放",
          userTel: 3145648454,
          updateTime:'2018-12-15' 
        },
        {
          id: 1,
          userId: 18,
          userName: "New York No. 1 Lake Park",
          loginName: "张三",
          roleName: "sdsdfs",
          roleCode:"123",
          organId:234,
          organName:"机构手动释放",
          userTel: 3145648454,
          updateTime:'2018-12-15' 
        },
        
      ]
    };
  },
  methods: {
    register(index) {},
    remove(index) {
      this.tableData.splice(index, 1);
    },
    handleAddUser(){
      this.addUserModal=false
    },
    handleEditRole(isEdit){
      let obj = {}
      if(isEdit){
        obj ={
          userName:"11",
          loginName:"222",
          password:"333",
          organId:"shanghai",
          email:"55",
          userTel:"145454"
        }
      }else{
          obj ={
            userName:"",
            loginName:"",
            password:"",
            organId:"",
            email:"",
            userTel:""
          }
      }
      this.formInfo=obj;
      this.isEdit=isEdit;
      this.addUserModal=true;
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
    changePage() {
      // this.tableData1 = this.mockTableData1();
    }
  }
};
</script>