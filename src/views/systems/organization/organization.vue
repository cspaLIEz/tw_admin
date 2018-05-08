0<style lang="less">
@import "./organization.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-organization">
    <div class="view-top margin-bottom-10">
      <Row type="flex">
          <Col span="12" class="handle-top-left">
              <Button type="primary" @click="handleEditRole(false)">添加机构</Button>
              <Button type="primary" @click="handleDel()">删除机构</Button>
              <Button type="primary" @click="handleEditRole(true)">编辑机构</Button>
              <Button type="primary" @click="organupdata=true">机构导入</Button>
              <Button type="primary">机构导出</Button>
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
    <Table border @on-selection-change="hangdleSelect"  :columns="columns" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
        </div>
    </div>
    <!-- 添加机构 -->
	<Modal v-model="addOrgModal" width="360" @on-visible-change="orgModalCancel">
		<p slot="header" style="color:#f60;text-align:center">
			<span>{{isEdit?"编辑机构":"新建机构"}}</span>
		</p>
		<div style="text-align:center">
			<Form :model="formInfo" :label-width="80">
				<FormItem label="机构名称">
					<Input v-model="formInfo.organName"></Input>
				</FormItem>
				<FormItem label="上级机构">
					<Select v-model="formInfo.superiororganId">
						<Option v-for="item in orgSelection" :value="item.organId" :key="item.organId">{{item.organName}}</Option>
					</Select>
				</FormItem>
				<FormItem label="机构描述">
					<Input v-model="formInfo.organDescr"></Input>
				</FormItem>
				<FormItem label="负责人">
					<Input v-model="formInfo.organLeader"></Input>
				</FormItem>
				<FormItem label="联系电话">
					<Input v-model="formInfo.organTele"></Input>
				</FormItem>
			</Form>
		</div>
		<div slot="footer" class="btn_center_wrap">			
			<Button type="primary" @click="handleAddOrg">确认</Button>
			<Button type="default" @click="addOrgModal=false">取消</Button>
		</div>
	</Modal>
  <Modal v-model="organupdata" width="360" title='机构导入'>
      <Upload action="http://118.31.15.7:89/file/upload" :headers="headers">
        <Button type="ghost" icon="ios-cloud-upload-outline">点击选择文件</Button>
      </Upload>
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
import {organizationList,editorgan,addorgan,delorgan} from '@/api/api';
export default {
  data() {
    return {
    terminalType: '',
    tagObj:{},
    headers:{"Access-Control-Allow-Origin": '*'},
	  addOrgModal:false,
    delModelConfig: false,
    organupdata:false,
    selectSearch:{},
    totalRecord:1,
    totalPage:1,
    pageSize:20,
    currentPage:1,
    isEdit:false,
    checkSelection:[],
    orgSelection:[],
	  formInfo:{
		  superiororganId:'',
		  organName:'',
		  organDescr:'',
		  organLeader:'',
		  organTele:''

	  },
      typeList: [
        {
          value: "organName",
          label: "机构名称"
        },
        {
          value: "OrganDescr",
          label: "机构描述"
        },
        {
          value: "SuperiororganId",
          label: "上属机构"
        },
        {
          value: "OrganLeader",
          label: "负责人"
        },
        {
          value: "OrganTele",
          label: "联系电话"
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
		  key: "index",
        },
        {
          title: "机构ID",
          key: "organId"
        },
        {
          title: "机构名称",
          key: "organName"
        },
        {
          title: "上属机构",
          key: "superiorOrganName",        
        },
        {
          title:"机构描述",
          key:'organDescr'
        },
        {
          title:"负责人",
          key:"organLeader"
        },
        {
          title:"联系电话",
          key:"organTele"
        }
      ],
      tableData: []
    };
  },
  mounted:function(){
    this.getList()
  },
  methods: {
    getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
      let data = {
        pageSize,
        currentPage,
        ...searchInfo
      }
      organizationList(data).then((res)=>{
        console.log(res)
        if(res.status==0){
          this.tableData=res.data.pinfo;
          this.pageSize=pageSize;
          this.currentPage=currentPage;
          this.totalPage=res.data.totalPage;
          this.totalRecord=res.data.totalRecord;
          this.selectSearch=searchInfo;
          this.orgSelection=res.data.tree;
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
      let organIdStr=""
      this.checkSelection.map((item,index)=>{
        if(index==this.checkSelection.length-1){
          organIdStr+=item.organId
        }else{
          organIdStr += item.organId + ";";
        }
      })
      delorgan({organIdList:organIdStr}).then((res)=>{
        if(res.status==0){
          this.$Message.success("删除成功");
          this.delModelConfig=false;
          this.getList();
        }else{
          this.$Message.error(res.message)
        }
      })
      
    },
    handleAddOrg(){
      let obj = this.formInfo;
      if(this.isEdit){
        editorgan(obj).then((res)=>{
          if(res.status==0){
            this.$Message.success("编辑成功");
            this.getList();
            this.addOrgModal=false;
          }else{
            this.$Message.error(res.message);
          }
        })
      }else{
         addorgan(obj).then((res)=>{
          if(res.status==0){
            this.$Message.success("添加成功");
            this.getList();
            this.addOrgModal=false;
          }else{
            this.$Message.error(res.message);
          }
        })
      }
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
      this.addOrgModal=true;
    },
    handleSearch(){
      let { tagObj, terminalType, searchLikes} = this;
      tagObj[terminalType]=searchLikes;
      this.getList(1,this.pageSize,tagObj)
    },
    handleCloseTag(e,name){
      let tagObj= { ...this.tagObj };
      delete tagObj[name];
      this.tagObj=tagObj;
    },
    orgModalCancel(e){
      if(!e){
        let obj ={
          superiororganId:'',
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